const { Character } = require('../models');

class CharacterController {
  static async getAllCharacters(req, res, next) {
    try {
      const characters = await Character.findAll({
        order: [['id', 'ASC']]
      });
      res.status(200).json(characters);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CharacterController;