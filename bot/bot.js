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
