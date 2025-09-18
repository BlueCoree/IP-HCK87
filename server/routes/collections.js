const router = require('express').Router();
const CollectionController = require('../controllers/collectionController');
const { authentication } = require('../middlewares/auth');

router.use(authentication);

router.get('/', CollectionController.getUserCollection);
router.post('/character', CollectionController.addCharacter);
router.delete('/character/:id', CollectionController.removeCharacter);

module.exports = router;
