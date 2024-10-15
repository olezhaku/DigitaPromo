import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  surname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  patronymic: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  balance: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
  telegram_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  telegram_username: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ref_login: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  document_ver: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: true,
  },
  contract: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  condition: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: true,
  },
  prefix: {
    type: DataTypes.STRING,
    defaultValue: 'no',
    allowNull: true,
  },
  role: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: true,
  },
  photo: {
    type: DataTypes.STRING,
    defaultValue: 'https://yt3.ggpht.com/ytc/AMLnZu_zSBQykFsHpHiaJ_SvbqRHbOqJvNxbfWRjps-jfg=s900-c-k-c0x00ffffff-no-rj',
    allowNull: true,
  },
  date_of_birth: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  passportPhoto1Url: { 
    type: DataTypes.STRING,
    allowNull: false,
  },
  passportPhoto2Url: { 
    type: DataTypes.STRING,
    allowNull: false,
  },
  parent_phone: {
    type: DataTypes.STRING,
    allowNull: true,
  }
});

export default User;
