'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Upgrade extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Upgrade belongs to Talent
      Upgrade.belongsTo(models.Talent, {
        foreignKey: 'talentId'
      });
    }
  }
  Upgrade.init({
    name: DataTypes.STRING,
    value: DataTypes.STRING,
    talentId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Talents',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Upgrade',
  });
  return Upgrade;
};