const router = require('express').Router();
const highscoresRoutes = require('./highscores-routes');

router.use('/highscores', highscoresRoutes);

module.exports = router;
