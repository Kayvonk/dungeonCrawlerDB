const router = require('express').Router();
const apiRoutes = require('./api');
const path = require('path');

router.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '../public/index.html'))
);

router.use('/api', apiRoutes);

// router.use((req, res) => {
//   res.send("<h1>Wrong Route!</h1>")
// });

module.exports = router;