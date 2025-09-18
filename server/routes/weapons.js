const WeaponController = require('../controllers/weaponController');

const router = require('express').Router();

router.get('/', WeaponController.getAllWeapons);

module.exports = router;