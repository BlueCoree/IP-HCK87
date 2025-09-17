'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AttScale extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // AttScale belongs to Talent
      AttScale.belongsTo(models.Talent, {
        foreignKey: 'talentId'
      });
    }
  }
  AttScale.init({
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
    modelName: 'AttScale',
  });
  return AttScale;
};