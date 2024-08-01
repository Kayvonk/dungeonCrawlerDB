const router = require("express").Router();
const { Highscores } = require("../../models");

router.get("/", (req, res) => {
  Highscores.findAll({
    order: [["score", "DESC"]],
  })
    .then((scores) => res.json(scores))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", async (req, res) => {
  const { userName, score, lowestHighscoreId, count } = req.body;

  try {
    const newScore = await Highscores.create({ userName, score });

    if (count >= 100 && lowestHighscoreId) {
      await Highscores.destroy({
        where: {
          id: lowestHighscoreId,
        },
      });
    }
    res.status(201).json(newScore);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
