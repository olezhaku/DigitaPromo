import Fastify from 'fastify';   
import User from './db/models/users.js';
import fastifyCors from '@fastify/cors';
import bcrypt from 'bcrypt'; 
import jwt from 'jsonwebtoken';
import sequelize from './db/db.js';
import { createClient } from 'redis';
import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios';

const redisClient = createClient();
await redisClient.connect(); 

const fastify = Fastify({
  logger: true
});

const TELEGRAM_BOT_TOKEN = '7257897167:AAHBsTwYk3UhwFe4HNHuNBqAg1EQd80Vank';
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

const SECRET_KEY = 'test'; 
const SECRET_KEY_TOKEN = 'test1'; 

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password + SECRET_KEY, salt);
};
async function sendVerificationCodeToTelegram(telegramId, verificationCode) {
  const message = `Ваш код подтверждения: ${verificationCode}. Пожалуйста, введите его для завершения входа.`;
  try {
    await axios.post(TELEGRAM_API_URL, {chat_id: telegramId, text: message, parse_mode: 'HTML'});
  } catch (error) {console.error(error);}
}

const generateToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username }, SECRET_KEY_TOKEN, { expiresIn: '24h' }); 
};
fastify.register(fastifyCors, {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
});

const verifyToken = (req, reply, done) => {
  const token = req.headers.authorization;
  if (!token) {return reply.status(401).send({ error: 'Токен отсутствует' });}
  const tokenWithoutBearer = token.startsWith('Bearer ') ? token.slice(7) : token;
  jwt.verify(tokenWithoutBearer, SECRET_KEY_TOKEN, (err, decoded) => {
    if (err) {return reply.status(403).send({ error: 'Неверный токен' });}
    req.user = decoded; 
    done();
  });
};

fastify.get('/', (req, reply) => {
  return {
    message: 'Heil Gitler!'
  };
});

fastify.post('/user', { preHandler: verifyToken }, async (req, reply) => {
  const user_id = req.user.id
  const user = await User.findByPk(user_id)
  return reply.send(user);
})


fastify.post('/register', async (req, reply) => {
  const { username, password, name, surname, patronymic, date_of_birth, passportPhoto1Url, passportPhoto2Url } = req.body;
  if (!username || !password || !name || !surname || !date_of_birth || !passportPhoto1Url || !passportPhoto2Url) 
    return reply.status(400).send({ error: 'Все поля обязательны' });
  if (!/^[A-Za-z0-9]{4,}$/.test(username)) 
    return reply.status(400).send({ error: 'Логин должен содержать 4 символа' });
  if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/.test(password)) 
    return reply.status(400).send({ error: 'Пароль должен содержать минимум 7 символов, включая одну заглавную, строчную букву, цифру и специальный символ.' });
  
  const birthDate = new Date(date_of_birth);
  if (isNaN(birthDate.getTime())) 
    return reply.status(400).send({ error: 'Неверный формат даты рождения' });
  if (!/^https?:\/\/[^\s$.?#].[^\s]*$/.test(passportPhoto1Url) || !/^https?:\/\/[^\s$.?#].[^\s]*$/.test(passportPhoto2Url)) 
    return reply.status(400).send({ error: 'Некорректные ссылки на фото паспорта.' });
  
  if (await User.findOne({ where: { username } })) 
    return reply.status(400).send({ error: 'Логин уже занят' });

  try {
    const hashedPassword = await hashPassword(password);
    await User.create({ username, password: hashedPassword, name, surname, patronymic, date_of_birth: birthDate, passportPhoto1Url, passportPhoto2Url });
    
    const user = await User.findOne({ where: { username } });
    const token = uuidv4();
    await redisClient.set(`token_reg_tg${user.id}`, token, { EX: 1800 });
    
    const telegramLink = `https://t.me/gasagsagasg_bot?start=${user.id}_${token}`;
    return reply.send({ message: 'Регистрация успешна', telegramLink });
  } catch (error) {
    console.error('Ошибка при регистрации пользователя:', error);
    return reply.status(500).send({ error: 'Ошибка при регистрации' });
  }
});


fastify.post('/login', async (req, reply) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return reply.status(400).send({ error: 'Логин и пароль обязательны' });
  }

  try {
    const user = await User.findOne({ where: { username } });
    if (!user || !(await bcrypt.compare(password + SECRET_KEY, user.password))) {
      return reply.status(401).send({ error: 'Неверный логин или пароль' });
    }

    if (user.role === 0 || !user.telegram_id) {
      const token = uuidv4();
      await redisClient.set(username, token);
      await redisClient.expire(username, 1800);
      return reply.send({ error: 'Аккаунт не подтверждён. Проверьте Telegram.', telegramLink: `https://t.me/gasagsagasg_bot?start=${user.id}_${token}` });
    }

    if (user.condition !== 1) {
      return reply.status(403).send({ error: user.condition === 0 ? 'Аккаунт на проверке' : 'Заявка отклонена' });
    }

    const verificationCode = crypto.randomInt(100000, 999999).toString();
    await redisClient.set(`verification_code_${username}`, verificationCode, 'EX', 300);
    await sendVerificationCodeToTelegram(user.telegram_id, verificationCode);
    return reply.send({ message: 'Код отправлен в Telegram. Введите его для завершения входа.' });
  } catch (error) {
    console.error('Ошибка при входе пользователя:', error);
    return reply.status(500).send({ error: 'Ошибка при входе' });
  }
});



fastify.post('/verify-code', async (req, reply) => {
  const { username, code } = req.body;

  if (!username || !code) {return reply.status(400).send({ error: 'Логин и код обязательны' });}

  try {
    const storedCode = await redisClient.get(`verification_code_${username}`);
    if (!storedCode) {return reply.status(400).send({ error: 'Код подтверждения недействителен или истек' });}
    if (storedCode !== code) {return reply.status(401).send({ error: 'Неверный код подтверждения' });}
    const user = await User.findOne({ where: { username } });
    if (!user) {return reply.status(404).send({ error: 'Пользователь не найден' });}
    await redisClient.del(`verification_code_${username}`); 
    const token = generateToken(user); 
    return reply.send({ token, message: 'Вы успешно авторизировались!' });
  } catch (error) {
    console.error('Ошибка при верификации кода:', error);
    return reply.status(500).send({ error: 'Ошибка при верификации кода' });
  }
});



fastify.post('/chektoken', { preHandler: verifyToken }, async (req, reply) => {
    return reply.send({  message: 'Token is correct' })
})

fastify.post('/users', { preHandler: verifyToken }, async (req, reply) => {
    const { date, city, contract, condition, role, prefix, invitedByUser, page = 1 } = req.body;
    const limit = 10; 
    const offset = (page - 1) * limit;  
  
    const whereConditions = {};
  
    if (date) {
      whereConditions.createdAt = {
        [Op.eq]: new Date(date)
      };
    }
  
    if (city) {
      whereConditions.city = city;
    }
  
    if (typeof contract !== 'undefined') {
      whereConditions.contract = contract;
    }
  
    if (typeof condition !== 'undefined') {
      whereConditions.condition = condition;
    }
  
    if (typeof role !== 'undefined') {
      whereConditions.role = role;
    }
  
    if (prefix) {
      whereConditions.prefix = prefix;
    }
  
    if (invitedByUser === 'yes') {
      whereConditions.ref_login = {
        [Op.ne]: null
      };
    } else if (invitedByUser === 'no') {
      whereConditions.ref_login = null;
    }
  
    try {
      const users = await User.findAndCountAll({
        where: Object.keys(whereConditions).length ? whereConditions : undefined,
        limit,
        offset,
        order: [['createdAt', 'DESC']]
      });
  
      const totalPages = Math.ceil(users.count / limit);
      return reply.send({
        data: users.rows,
        pagination: {
          totalPages,
          currentPage: page
        }
      });
    } catch (error) {
      console.error('Ошибка при получении пользователей:', error);
      return reply.status(500).send({ error: 'Ошибка при получении пользователей' });
    }
  });
  
fastify.post('/confirmuser', { preHandler: verifyToken }, async (req, reply) => {
    const { user_id, status } = req.body;
  
    const admin_id = req.user.id;
    const admin = await User.findByPk(admin_id);
    const condition = 1
    if (admin.role === 1) {
      const user = await User.findByPk(user_id);
      
      if (user !== null, user.condition == 0 ) {
        if (status != 'accept'){
          condition = 2
        }
        user.condition = condition;
        await user.save();
        return reply.send({ message: `Статус пользователя:"${status}"`, user_id });
      } else {
        return reply.status(404).send({ error: 'Пользователь не найден' });
      }
    } else {
      return reply.status(403).send({ error: 'Недостаточно прав' });
    }
  });
  

try {
  fastify.listen({ port: 5000 });
} catch (error) {
  fastify.log.error(error);
  process.exit(1);
}

// (async () => {
//   try {
//       await sequelize.sync();
//       console.log('Таблица создана, если её не было.');
//   } catch (error) {
//       console.error('Ошибка при синхронизации:', error);
//   } finally {
//       await sequelize.close();
//   }
// })();