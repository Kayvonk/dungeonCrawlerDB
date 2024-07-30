const { Highscores } = require("../models");

const highscoresData = [];

for (let i = 0; i < 100; i++) {
  let letters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  let userName = "";
  let score;
  for (let j = 0; j < 3; j++) {
    userName += letters[Math.floor(Math.random() * letters.length)];
  }
  score = Math.floor(Math.random() * 1000);

  let highscore = {
    userName: userName,
    score: score,
  };

  highscoresData.push(highscore);
}

const seedHighscores = async () => {
  try {
    await Highscores.bulkCreate(highscoresData);
    console.log("Highscores seeded successfully!");
  } catch (err) {
    console.error("Error seeding highscores:", err);
  }
};

module.exports = seedHighscores;
