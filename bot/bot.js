<<<<<<< HEAD
import { Telegraf, Markup } from 'telegraf';
import User from './models.js';
import { createClient } from 'redis';

const redisClient = createClient();
await redisClient.connect();

let pendingUsers = [];

const bot = new Telegraf('7257897167:AAHBsTwYk3UhwFe4HNHuNBqAg1EQd80Vank');

bot.start(async (ctx) => {
    const args = ctx.startPayload ? ctx.startPayload.split('_') : [];

    if (args.length !== 2) {
        await ctx.reply("Некорректный формат команды.");
        return;
    }

    const [userId, token] = args;

    try {
        const storedToken = await redisClient.get(`token_reg_tg${userId}`);

        if (storedToken && storedToken === token) {
            const user = await User.findOne({ where: { id: parseInt(userId) } });

            if (user) {
                pendingUsers.push({ telegramId: ctx.from.id, userId, token });

                await ctx.reply("Подтвердите ваш номер телефона для завершения регистрации.", 
                    Markup.keyboard([
                        Markup.button.contactRequest('Подтвердить номер телефона')
                    ]).oneTime().resize());
            } else {
                await ctx.reply("Пользователь не найден.");
            }
        } else {
            await ctx.reply("Токен недействителен или истек.");
        }
    } catch (error) {
        console.error('Database or Redis error:', error);
        await ctx.reply("Произошла ошибка при обработке вашего запроса.");
    }
});

bot.on('contact', async (ctx) => {
    const contact = ctx.message.contact;
    const telegramId = ctx.from.id;

    const pendingUser = pendingUsers.find(user => user.telegramId === telegramId);

    if (pendingUser) {
        try {
            const user = await User.findOne({ where: { id: parseInt(pendingUser.userId) } });

            if (user) {
                const storedToken = await redisClient.get(`token_reg_tg${pendingUser.userId}`);
                if (storedToken === pendingUser.token) {
                    await redisClient.del(`token_reg_tg${pendingUser.userId}`);
                    user.role = 1;
                    user.telegram_id = ctx.from.id;
                    user.phone = contact.phone_number;
                    user.telegram_username = ctx.from.username || null;
                    await user.save();
                    await ctx.reply("Ваш номер телефона успешно сохранен, и регистрация завершена.");
                    pendingUsers = pendingUsers.filter(user => user.telegramId !== telegramId);
                } else {
                    await ctx.reply("Токен недействителен.");
                }
            } else {
                await ctx.reply("Пользователь не найден.");
            }
        } catch (error) {
            console.error('Ошибка при сохранении номера телефона:', error);
            await ctx.reply("Произошла ошибка при сохранении номера телефона.");
        }
    } else {
        await ctx.reply("Пользователь не найден в ожидающих подтверждение.");
    }

    await ctx.deleteMessage(ctx.message.message_id);
});

bot.launch().then(() => {
    console.log('Bot is up and running...');
}).catch((error) => {
    console.error('Failed to start bot:', error);
});

process.once('SIGINT', () => {
    bot.stop('SIGINT');
});
process.once('SIGTERM', () => {
    bot.stop('SIGTERM');
});
=======
import { Telegraf } from 'telegraf';
import User from './models.js'; 
import { createClient } from 'redis';

const redisClient = createClient();
await redisClient.connect(); 

const bot = new Telegraf('7257897167:AAHBsTwYk3UhwFe4HNHuNBqAg1EQd80Vank'); 

bot.start(async (ctx) => {
    const args = ctx.startPayload ? ctx.startPayload.split('_') : [];

    if (args.length !== 2) {
        await ctx.reply("Некорректный формат команды.");
        return;
    }

    const [userId, token] = args;

    try {
        const storedToken = await redisClient.get(`token_reg_tg${userId}`);
        
        if (storedToken && storedToken === token) {
            const user = await User.findOne({ where: { id: parseInt(userId) } });

        if (user) {
                user.telegram_id = ctx.from.id;
                user.role = 1; 
                await user.save();
                await ctx.reply("Вы успешно зарегистрированы и подтверждены.");
            } else {
                await ctx.reply("Пользователь не найден.");
            }
        } else {
            await ctx.reply("Токен недействителен или истек.");
        }
    } catch (error) {
        console.error('Database or Redis error:', error);
        await ctx.reply("Произошла ошибка при обработке вашего запроса.");
    }
});

bot.launch().then(() => {
    console.log('Bot is up and running...');
}).catch((error) => {
    console.error('Failed to start bot:', error);
});

process.once('SIGINT', () => {
    bot.stop('SIGINT');
});
process.once('SIGTERM', () => {
    bot.stop('SIGTERM');
});
>>>>>>> 1a0da9a21de3e6da91a4937f2b4be3340ca40351
