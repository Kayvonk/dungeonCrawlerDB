const seedHighscores = require('./highscores-seeds');
const sequelize = require('../config/connection');

const seedAll = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');

    await seedHighscores();
    console.log('\n----- HIGHSCORES SEEDED -----\n');
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    process.exit(0);
  }
};

seedAll();