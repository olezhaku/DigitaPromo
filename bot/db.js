import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: '../backend/prom.db', 
});


export default sequelize;