const { Op } = require('sequelize');
const { Weapon, AttScale, Upgrade } = require('../models');
const qs = require('qs');
class WeaponController {
  static async getWeaponById(req, res, next) {
    try {
      const { id } = req.params;
      const weapon = await Weapon.findByPk(id);

      if (!weapon) {
        throw { name: 'NotFound', message: 'Weapon not found' };
      }

      res.json(weapon);
    } catch (error) {
      next(error);
    }
  }

  static async getAllWeapons(req, res, next) {
      try {
        const { filter, sort, page, search } = qs.parse(req.query);
  
        let paramsQuerySQL = {
          order: [['id', 'ASC']],
          limit: 12,
          offset: 0
        };
  
        if (search) {
          paramsQuerySQL.where = {
            name: {
              [Op.iLike]: `%${search}%`
            }
          }
        }
  
        if (filter) {
          paramsQuerySQL.where = {
            type: filter
          }
  
        }
  
        if (sort) {
          const ordering = sort[0] === '-' ? 'DESC' : 'ASC'
          paramsQuerySQL.order = [
            ['rarity', ordering]
          ]
        }
  
        if (page) {
          if (page?.size) {
            paramsQuerySQL.limit = Number(page.size)
          }
  
          if (page?.number) {
            paramsQuerySQL.offset = paramsQuerySQL.limit * (Number(page.number) - 1)
          }
        }
  
        const { rows, count } = await Weapon.findAndCountAll(paramsQuerySQL);
  
        res.status(200).json({
          data: rows,
          pagination: {
            total: count,
            page: page?.number ? Number(page.number) : 1,
            limit: paramsQuerySQL.limit,
            totalPages: Math.ceil(count / paramsQuerySQL.limit),
          }
        });
      } catch (error) {
        next(error);
      }
    }
}

module.exports = WeaponController;