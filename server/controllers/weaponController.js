const { Weapon } = require('../models');
const qs = require('qs');
class WeaponController {
  static async getAllWeapons(req, res, next) {
    try {
      const { filter, sort, page, search } = qs.parse(req.query); 
      const weapons = await Weapon.findAll({
        order: [['id', 'ASC']]
      });

      res.status(200).json(weapons);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = WeaponController;