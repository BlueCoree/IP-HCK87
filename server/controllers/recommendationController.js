const { Character } = require('../models');
const geminiAPI = require('../helpers/gemini');
const { Sequelize } = require('sequelize');

class RecommendationController {
    static async getRecommendation(req, res, next) {
        try {
            const randomCharacter = await Character.findOne({
                order: Sequelize.literal('RANDOM()'),
            });

            if (!randomCharacter) {
                throw { name: 'NotFound', message: 'No characters available' };
            }

            const prompt = `Given the Genshin Impact character ${randomCharacter.name}, who has ${randomCharacter.weaponType} as weapon type and ${randomCharacter.vision} as their element, generate a concise 2-3 sentence recommendation explaining why players should use this character. Focus on their strengths and unique abilities.`;

            const aiResponse = await geminiAPI(prompt);

            res.json({
                character: randomCharacter,
                recommendation: aiResponse
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = RecommendationController;