'use strict';

const axios = require('axios');
const fs = require('fs');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const characterList = await axios.get('https://genshin.jmp.blue/characters');
    const charactersImages = JSON.parse(fs.readFileSync('./data/genshin_characters.json', 'utf-8'));

    const image = {}
    charactersImages.forEach(el => {
      image[el.name] = el.imageUrl
    });

    const characterPromises = characterList.data.map(async (name) => {
      try {
        const details = await axios.get(`https://genshin.jmp.blue/characters/${name}`);
        const imgUrl = image[name] || null;
        return {
          name: details.data.name || name,
          title: details.data.title || null,
          vision: details.data.vision || null,
          rarity: details.data.rarity ? Number(details.data.rarity) : null,
          weaponType: details.data.weapon || null,
          gender: details.data.gender || null,
          nation: details.data.nation || null,
          release: details.data.release ? new Date(details.data.release) : null,
          constellation: details.data.constellation || null, // API doesn't provide this in date format
          birthday: details.data.birthday || null,
          imageUrl: imgUrl,
          description: details.data.description || null,
          createdAt: new Date(),
          updatedAt: new Date()
        };
      } catch (error) {
        console.error(`Error fetching details for ${name}:`, error.message);
        return null;
      }
    });

    const characters = (await Promise.all(characterPromises)).filter(char => char !== null);

    // Insert all characters
    await queryInterface.bulkInsert('Characters', characters, {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Characters', null, {});
  }
};