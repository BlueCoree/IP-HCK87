const router = require('express').Router();
const character = require('./characters');
const weapon = require('./weapons');
const UserController = require('../controllers/userController');

router.get("/", (req, res) => {
  res.send("Server is running 🚀");
});
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/login/google', UserController.loginGoogle);
router.use('/characters', character);
router.use('/weapons', weapon);

module.exports = router;