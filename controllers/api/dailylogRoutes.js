const express = require('express');
const router = express.Router();
const { DailyLog, Quest, User } = require('../models');
const withAuth = require('../utils/auth');

// Display the form to create a new daily log
router.get('/new', withAuth, async (req, res) => {
  try {
    // Fetch the quests associated with the logged-in user
    const quests = await Quest.findAll({
      where: {
        user_id: req.session.user_id,
        active: true, // You may adjust this condition based on your logic
      },
    });

    res.render('new-dailylog', {
      quests,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new daily log entry
router.post('/new', withAuth, async (req, res) => {
  try {
    // Extract data from the request body
    const {
      quest_id,
      date,
      expectedWeight,
      weight,
      caloriesConsumed,
      exercise,
      dailyWeightLoss,
      bmr,
      adjustedBMR,
      exerciseReference,
      dailyGoal,
      targetCalories,
      calorieDeficit,
      actualToDeficit,
    } = req.body;

    // Create the daily log entry
    const newDailyLog = await DailyLog.create({
      quest_id,
      user_id: req.session.user_id,
      date,
      expectedWeight,
      weight,
      caloriesConsumed,
      exercise,
      dailyWeightLoss,
      bmr,
      adjustedBMR,
      exerciseReference,
      dailyGoal,
      targetCalories,
      calorieDeficit,
      actualToDeficit,
    });

    // Redirect to a success page or another appropriate route
    res.redirect('/profile');
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
