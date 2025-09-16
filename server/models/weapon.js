'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Weapon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Weapon.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    rarity: DataTypes.NUMBER,
    baseAttack: DataTypes.NUMBER,
    subStat: DataTypes.STRING,
    passiveName: DataTypes.STRING,
    passiveDesc: DataTypes.STRING,
    location: DataTypes.STRING,
    ascensionMaterial: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Weapon',
  });
  return Weapon;
};