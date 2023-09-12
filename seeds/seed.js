const sequelize = require('../config/connection');
const { User, Quest, DailyLog} = require('../models');

const userData = require('./userData.json');
const questData = require('./questData.json');
const dailyLogData = require('./dailyLogData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const quest of questData) {
    await Quest.create({
      ...quest,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();