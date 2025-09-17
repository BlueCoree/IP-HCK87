const router = require('express').Router();
const CharacterController = require('../controllers/characterController');

router.get('/', CharacterController.getAllCharacters);

module.exports = router;