'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Character extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Character.init({
    name: DataTypes.STRING,
    title: DataTypes.STRING,
    vision: DataTypes.STRING,
    rarity: DataTypes.NUMBER,
    weaponType: DataTypes.STRING,
    gender: DataTypes.STRING,
    birthday: DataTypes.DATE,
    imageUrl: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Character',
  });
  return Character;
};