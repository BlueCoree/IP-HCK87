'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Weapons', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      rarity: {
        type: Sequelize.INTEGER
      },
      baseAttack: {
        type: Sequelize.INTEGER
      },
      subStat: {
        type: Sequelize.STRING
      },
      passiveName: {
        type: Sequelize.STRING
      },
      passiveDesc: {
        type: Sequelize.TEXT
      },
      location: {
        type: Sequelize.STRING
      },
      ascensionMaterial: {
        type: Sequelize.STRING
      },
      imageUrl: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Weapons');
  }
};