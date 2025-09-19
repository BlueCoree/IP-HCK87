const router = require('express').Router();
const CharacterController = require('../controllers/characterController');

router.get('/', CharacterController.getAllCharacters);
router.get('/:id', CharacterController.getCharacterById);

module.exports = router;