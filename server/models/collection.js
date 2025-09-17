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
      // Collection belongs to User
      Collection.belongsTo(models.User, {
        foreignKey: 'userId'
      });

      // Collection belongs to Character
      Collection.belongsTo(models.Character, {
        foreignKey: 'charaterId'
      });

      // Collection belongs to Weapon
      Collection.belongsTo(models.Weapon, {
        foreignKey: 'weaponId'
      });
    }
  }
  Collection.init({
    charaterId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Characters',
        key: 'id'
      }
    },
    weaponId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Weapons',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Collection',
  });
  return Collection;
};