const router = require('express').Router();
const character = require('./characters');
const weapon = require('./weapons');
const collection = require('./collections');
const UserController = require('../controllers/userController');
const RecommendationController = require('../controllers/recommendationController');

router.get("/", (req, res) => {
  res.send("Server is running 🚀");
});
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/login/google', UserController.loginGoogle);
router.use('/characters', character);
router.use('/weapons', weapon);
router.use('/collections', collection);
router.get('/recommendation', RecommendationController.getRecommendation);

module.exports = router;