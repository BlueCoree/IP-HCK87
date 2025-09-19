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
      // Talent belongs to Character
      Talent.belongsTo(models.Character, {
        foreignKey: 'characterId'
      });

      // Talent has many AttScales
      Talent.hasMany(models.AttScale, {
        foreignKey: 'talentId'
      });

      // Talent has many Upgrades
      Talent.hasMany(models.Upgrade, {
        foreignKey: 'talentId'
      });
    }
  }
  Talent.init({
    name: DataTypes.STRING,
    unlock: DataTypes.STRING,
    description: DataTypes.TEXT,
    type: DataTypes.STRING,
    characterId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Characters',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Talent',
  });
  return Talent;
};