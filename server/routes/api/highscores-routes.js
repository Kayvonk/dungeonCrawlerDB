const router = require("express").Router();
const { Highscores } = require("../../models");

router.get("/", (req, res) => {
  Highscores.findAll({})
    .then((scores) => res.json(scores))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", async (req, res) => {
  const scoreData = await Highscores.create(req.body)    .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });;

  return res.json(scoreData);
});

module.exports = router;
