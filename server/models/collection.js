'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Collection extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Collection.belongsTo(models.User, {
        foreignKey: 'userId'
      });
      Collection.belongsTo(models.Character, {
        foreignKey: 'characterId'
      });
    }
  }
  Collection.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    characterId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Characters',
        key: 'id'
      }
    },
    weaponId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Collection',
  });
  return Collection;
};