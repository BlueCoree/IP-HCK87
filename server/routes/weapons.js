const WeaponController = require('../controllers/weaponController');

const router = require('express').Router();

router.get('/', WeaponController.getAllWeapons);
router.get('/:id', WeaponController.getWeaponById);

module.exports = router;