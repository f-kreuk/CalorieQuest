const fs = require('fs/promises');
const sequelize = require('../config/connection');
const { User, Quest, DailyLog } = require('../models');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  try {
    // Read and parse user data from userData.json
    const userData = JSON.parse(await fs.readFile('seeds/userData.json', 'utf8'));

    // Create users
    await User.bulkCreate(userData);

    // Read and parse quest data from questData.json
    const questData = JSON.parse(await fs.readFile('seeds/questData.json', 'utf8'));

    // Create quests
    await Quest.bulkCreate(questData);

    // Read and parse daily log data from dailyLogData.json
    const dailyLogData = JSON.parse(await fs.readFile('seeds/dailyLogData.json', 'utf8'));

    // Create daily logs
    await DailyLog.bulkCreate(dailyLogData);

    console.log('Database seeded successfully.');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding the database:', error);
    process.exit(1);
  }
};

seedDatabase();
