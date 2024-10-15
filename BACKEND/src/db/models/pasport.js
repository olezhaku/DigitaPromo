import { DataTypes } from 'sequelize';
import sequelize from '../db.js';
import User from './users.js'; 

const Passport = sequelize.define('Passport', {
    passportNumber: {
      type: DataTypes.STRING(10),
      allowNull: true,  
    },
    issuedBy: {
      type: DataTypes.STRING,
      allowNull: true,  
    },
    issueDate: {
      type: DataTypes.DATE,
      allowNull: true, 
    },
    divisionCode: {
      type: DataTypes.STRING(6),
      allowNull: true, 
    },
    registrationAddress: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    residenceAddress: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    inn: {
      type: DataTypes.STRING(12),
      allowNull: true, 
    }
  });
  

User.hasOne(Passport, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});
Passport.belongsTo(User, {
  foreignKey: 'userId',
});

export default Passport;