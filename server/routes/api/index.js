const router = require('express').Router();
const highscoresRoutes = require('./highscores-routes');

router.use('/highscoress', highscoresRoutes);
module.exports = router;
