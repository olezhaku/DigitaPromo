import Fastify from 'fastify';   
import User from './db/models/users.js';
import fastifyCors from '@fastify/cors';
import bcrypt from 'bcrypt'; 
import jwt from 'jsonwebtoken';
// import sequelize from './db/db.js';

const fastify = Fastify({
  logger: true
});

const SECRET_KEY = 'test'; 
const SECRET_KEY_TOKEN = 'test1'; 

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password + SECRET_KEY, salt);
};

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

  if (!token) {
    return reply.status(401).send({ error: 'Токен отсутствует' });
  }

  const tokenWithoutBearer = token.startsWith('Bearer ') ? token.slice(7) : token;

  jwt.verify(tokenWithoutBearer, SECRET_KEY_TOKEN, (err, decoded) => {
    if (err) {
      return reply.status(403).send({ error: 'Неверный токен' });
    }

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
  const { username, password, name, surname, patronymic, phone, date_of_birth } = req.body;

  if (!username || !password || !name || !surname || !phone || !date_of_birth) {
    return reply.status(400).send({ error: 'Все поля обязательны' });
  }

  const birthDate = new Date(date_of_birth);
  if (isNaN(birthDate)) {
    return reply.status(400).send({ error: 'Неверный формат даты рождения' });
  }

  const existingUser = await User.findOne({ where: { username } });
  if (existingUser) {
    return reply.status(400).send({ error: 'Логин уже занят' });
  }

  try {
    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      username,
      password: hashedPassword, 
      name,
      surname,
      patronymic,
      phone,
      date_of_birth: birthDate
    });

    const token = generateToken(user);

    return reply.code(201).send({ token }); 
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
      if (!user) {
        return reply.status(401).send({ error: 'Неверный логин или пароль' });
      }
      const isMatch = await bcrypt.compare(password + SECRET_KEY, user.password);
      if (!isMatch) {
        return reply.status(401).send({ error: 'Неверный логин или пароль' });
      }
      if (user.condition === 0) {
        return reply.status(403).send({ error: 'Аккаунт не подтверждён' });
      }
      const token = generateToken(user);
      
      return reply.send({ "token":token, "message":'Вы успешно авторизировались!'});
    } catch (error) {
      console.error('Ошибка при входе пользователя:', error);
      return reply.status(500).send({ error: 'Ошибка при входе' });
    }
  });



fastify.post('/chektoken', { preHandler: verifyToken }, async (req, reply) => {
    return reply.status(403).send({  message: 'Token is correct' })
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
    const { user_id } = req.body;
  
    const admin_id = req.user.id;
    const admin = await User.findByPk(admin_id);
  
    if (admin.role === 1) {
      const user = await User.findByPk(user_id);
      
      if (user !== null) {
        user.condition = 1;
        await user.save();
        return reply.send({ message: 'Пользователь подтверждён', user_id });
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