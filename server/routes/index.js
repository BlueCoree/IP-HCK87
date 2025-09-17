const router = require('express').Router();
const character = require('./characters');

router.get("/", (req, res) => {
  res.send("Server is running 🚀");
});
router.use('/characters', character)

module.exports = router;