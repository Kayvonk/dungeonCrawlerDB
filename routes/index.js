const router = require('express').Router();
const apiRoutes = require('./api');
const path = require('path');

router.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '../public/index.html'))
);

router.use('/api', apiRoutes);

module.exports = router;