'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // User has many Characters through Collection
      User.belongsToMany(models.Character, {
        through: models.Collection,
        foreignKey: 'userId'
      });
      
      // User has many Weapons through Collection
      User.belongsToMany(models.Weapon, {
        through: models.Collection,
        foreignKey: 'userId'
      });

      // User has many Collections
      User.hasMany(models.Collection, {
        foreignKey: 'userId'
      });
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    element: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user) => {
    user.password = hashPassword(user.password);
  })
  return User;
};