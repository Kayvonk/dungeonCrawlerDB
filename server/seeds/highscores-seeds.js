const { Highscores } = require('../models');

const highscoresData = [
  {
    userName: 'AA',
    score: 900,
  },
  {
    userName: 'BB',
    score: 1000,
  },
  {
    userName: 'CC',
    score: 1100,
  },
  {
    userName: 'DD',
    score: 1200,
  },
  {
    userName: 'EE',
    score: 1300,
  },
  {
    userName: 'FF',
    score: 1400,
  },
  {
    userName: 'GG',
    score: 1500,
  },
  {
    userName: 'HH',
    score: 1600,
  },
  {
    userName: 'II',
    score: 1700,
  },
  {
    userName: 'JJ',
    score: 1800,
  },
  {
    userName: 'KK',
    score: 1900,
  },
];

const seedHighscores = async () => {
  try {
    await Highscores.bulkCreate(highscoresData);
    console.log('Highscores seeded successfully!');
  } catch (err) {
    console.error('Error seeding highscores:', err);
  }
};

module.exports = seedHighscores;