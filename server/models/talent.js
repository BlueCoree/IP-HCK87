'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Talent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Talent.init({
    name: DataTypes.STRING,
    unlock: DataTypes.STRING,
    description: DataTypes.TEXT,
    type: DataTypes.STRING,
    characterId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Talent',
  });
  return Talent;
};