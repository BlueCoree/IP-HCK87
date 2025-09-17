'use strict';

const { default: axios } = require('axios');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = await axios.get('https://api.genshin.dev/characters/all');
    const talent = data.data;

    const talentData = [];
    for (const key in talent) {
      if (talent[key].skillTalents) {
        talent[key].skillTalents.forEach(t => {
          talentData.push({
            name: t.name,
            type: t.type,
            unlock: t.unlock,
            description: t.description,
            characterId: talent[key].id,
            createdAt: new Date(),
            updatedAt: new Date()
          });
        });
      }
    }

    await queryInterface.bulkInsert('Talents', talentData, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Talents', null, {})
  }
};
