'use strict';
const axios = require('axios');
const fs = require('fs')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const weaponList = await axios.get('https://genshin.jmp.blue/weapons');
        const weaponsImages = JSON.parse(fs.readFileSync('./data/weapons_full.json', 'utf-8'));
    
        const image = {}
        weaponsImages.forEach(el => {
          image[el.name] = el.imageUrl
        });
    
        const weaponPromises = weaponList.data.map(async (name) => {
          try {
            const details = await axios.get(`https://genshin.jmp.blue/weapons/${name}`);
            const imgUrl = image[name] || null;
            return {
              name: details.data.name || name,
              type: details.data.type || null,
              rarity: details.data.rarity ? Number(details.data.rarity) : null,
              baseAttack: details.data.baseAttack ? Number(details.data.baseAttack) : null,
              subStat: details.data.subStat || null,
              passiveName: details.data.passiveName || null,
              passiveDesc: details.data.passiveDesc || null,
              location: details.data.location || null,
              ascensionMaterial: details.data.ascensionMaterial || null,
              imageUrl: imgUrl,
              createdAt: new Date(),
              updatedAt: new Date()
            };
          } catch (error) {
            console.error(`Error fetching details for ${name}:`, error.message);
            return null;
          }
        });
    
        const weapons = (await Promise.all(weaponPromises)).filter(wpn => wpn !== null);
    
        // Insert all characters
        await queryInterface.bulkInsert('Weapons', weapons, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Weapons', null, {})
  }
};
