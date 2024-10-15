<<<<<<< HEAD
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'prom.db', 
});


=======
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'prom.db',
});


>>>>>>> 2c2a7a0ba04d4df67fed12ce1298dc53d0388c26
export default sequelize;