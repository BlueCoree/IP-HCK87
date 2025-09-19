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
      Character.hasMany(models.Collection, {
        foreignKey: 'characterId'
      });
      
      Character.hasMany(models.Talent, {
        foreignKey: 'characterId'
      });
    }
  }
  Character.init({
    name: DataTypes.STRING,
    title: DataTypes.STRING,
    vision: DataTypes.STRING,
    rarity: DataTypes.INTEGER,
    weaponType: DataTypes.STRING,
    gender: DataTypes.STRING,
    nation: DataTypes.STRING,
    release: DataTypes.STRING,
    constellation: DataTypes.STRING,
    birthday: DataTypes.DATE,
    imageUrl: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Character',
  });
  return Character;
};