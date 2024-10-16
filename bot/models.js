<<<<<<< HEAD
import { DataTypes } from 'sequelize';
import sequelize from './db.js'; 

const BotUser = sequelize.define('User', {
  telegram_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true, 
  },
  username: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  telegram_username: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  role: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
});

BotUser.addHook('beforeSave', (botUser) => {
  botUser.updatedAt = new Date();
});

export default BotUser;
=======
import { DataTypes } from 'sequelize';
import sequelize from './db.js'; 

const BotUser = sequelize.define('User', {
  telegram_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true, 
  },
  username: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  role: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
});

BotUser.addHook('beforeSave', (botUser) => {
  botUser.updatedAt = new Date();
});

export default BotUser;
>>>>>>> 1a0da9a21de3e6da91a4937f2b4be3340ca40351
