const router = require('express').Router();
const { Quest } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const { starting_date, height_ft, height_in, ...otherFields } = req.body;
    
    //code for converting starting_date into a properly formatted label
    const date = new Date(starting_date);
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.toLocaleString('default', { year: 'numeric' });
    const monthDate = `${month}-${year}`;
    
    //code for converting height_ft and height_in into height_centimeters
    const heightFt = parseFloat(req.body.height_ft) || 0;
    const heightIn = parseFloat(req.body.height_in) || 0;
    const cmPerFoot = 30.48;
    const cmPerInch = 2.54;
    const heightInCm = (heightFt * cmPerFoot) + (heightIn * cmPerInch);

    //code for converting starting_weight into starting_weight_kg
    const startingWeight = parseFloat(req.body.starting_weight) || 0;
    const lbPerKg = 2.20462;
    const startingWeightKg = (startingWeight / lbPerKg);
    const roundedWeightKg = Math.round(startingWeightKg * 100) / 100;
    const numroundedWeightKg = parseFloat(roundedWeightKg);

    //code for calculating the daily_loss_goal
    const goalWeight = parseFloat(req.body.goal_weight) || 0;
    const questLength = parseFloat(req.body.quest_length) || 0;
    const totalGoalLoss = (startingWeight - goalWeight);
    const dailyLossGoal = (totalGoalLoss / questLength);
    const roundedDailyLossGoal = Math.round(dailyLossGoal * 100) / 100;
    const numroundedDailyLossGoal = parseFloat(roundedDailyLossGoal);
    
    //code for calculating BMR
    // Men: BMR = 88.362 + (13.397 x weight in kg) + (4.799 x height in cm) – (5.677 x age in years) 
    // Women: BMR = 447.593 + (9.247 x weight in kg) + (3.098 x height in cm) – (4.330 x age in years)
    let bmr2;
    const gender = req.body.gender;
    if (gender === 'male') {
      bmr2 = 88.362 + (13.397 * numroundedWeightKg) + (4.799 * heightInCm) - (5.677 * req.body.age);
    } else {
      bmr2 = 447.593 + (9.247 * numroundedWeightKg) + (3.098 * heightInCm) - (4.330 * req.body.age);
    };

    const newQuest = await Quest.create({
      ...otherFields,
      bmr: bmr2,
      daily_loss_goal: numroundedDailyLossGoal,
      starting_weight_kg: numroundedWeightKg,
      date_label: monthDate,
      height_centimeters: heightInCm,
      active: true,
      user_id: req.session.user_id,
});
    res.status(200).json(newQuest);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.delete('/:id', withAuth, async (req, res) => {
  try {
    const questData = await Quest.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!questData) {
      res.status(404).json({ message: 'No quest found with this id!' });
      return;
    }

    res.status(200).json(questData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
