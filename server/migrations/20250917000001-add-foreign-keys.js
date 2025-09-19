'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add foreign key to Talents (characterId references Characters)
    await queryInterface.addConstraint('Talents', {
      fields: ['characterId'],
      type: 'foreign key',
      name: 'fk_talent_character',
      references: {
        table: 'Characters',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    // Add foreign key to AttScales (talentId references Talents)
    await queryInterface.addConstraint('AttScales', {
      fields: ['talentId'],
      type: 'foreign key',
      name: 'fk_attscale_talent',
      references: {
        table: 'Talents',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    // Add foreign key to Upgrades (talentId references Talents)
    await queryInterface.addConstraint('Upgrades', {
      fields: ['talentId'],
      type: 'foreign key',
      name: 'fk_upgrade_talent',
      references: {
        table: 'Talents',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    // Add foreign keys to Collections
    // await queryInterface.addConstraint('Collections', {
    //   fields: ['userId'],
    //   type: 'foreign key',
    //   name: 'fk_collection_user',
    //   references: {
    //     table: 'Users',
    //     field: 'id'
    //   },
    //   onDelete: 'CASCADE',
    //   onUpdate: 'CASCADE'
    // });

    // await queryInterface.addConstraint('Collections', {
    //   fields: ['characterId'],
    //   type: 'foreign key',
    //   name: 'fk_collection_character',
    //   references: {
    //     table: 'Characters',
    //     field: 'id'
    //   },
    //   onDelete: 'CASCADE',
    //   onUpdate: 'CASCADE'
    // });

    // await queryInterface.addConstraint('Collections', {
    //   fields: ['weaponId'],
    //   type: 'foreign key',
    //   name: 'fk_collection_weapon',
    //   references: {
    //     table: 'Weapons',
    //     field: 'id'
    //   },
    //   onDelete: 'CASCADE',
    //   onUpdate: 'CASCADE'
    // });
  },

  async down(queryInterface, Sequelize) {
    // Remove all foreign key constraints
    await queryInterface.removeConstraint('Talents', 'fk_talent_character');
    await queryInterface.removeConstraint('AttScales', 'fk_attscale_talent');
    await queryInterface.removeConstraint('Upgrades', 'fk_upgrade_talent');
    // await queryInterface.removeConstraint('Collections', 'fk_collection_user');
    // await queryInterface.removeConstraint('Collections', 'fk_collection_character');
    // await queryInterface.removeConstraint('Collections', 'fk_collection_weapon');
  }
};