const router = require('express').Router();
const { Quest, DailyLog, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const questData = await Quest.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const quests = questData.map((quest) => quest.get({ plain: true }));

    res.render('homepage', {
      quests,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/quest/:id', async (req, res) => {
  try {
    const questId = req.params.id;
    const quest = await Quest.findByPk(questId, {
      include: [
        {
        model: User,
        attributes: ['name'],
        },
      ],
    });

    if (!quest) {
      return res.status(404).send('Quest not found');
    }
        const dailylogs = await DailyLog.findAll({
      where: {
        quest_id: questId,
      },
    });
// console.log(dailylogs);
    const quest2 = quest.get({ plain: true});
    const dailylogs2 = dailylogs.map((dailylog) => dailylog.get({ plain: true }));
    // const dailylogs2 = dailylogs.get({ plain: true});
    console.log(dailylogs2);

    res.render('quest', { 
      ...quest2,
      dailylogs2,
      logged_in: req.session.logged_in });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// added "withAuth" function to redirect false users to login page" 
router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const questData = await Quest.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const quests = questData.map((quest) => quest.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', {
      quests,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get('/quest/:id', async (req, res) => {
//   try {
//     const questData = await Quest.findByPk(req.params.id, {
//       include: [
//         {
//           model: User,
//           attributes: ['name'],
//         },
//       ],
//     });

//     const quest = questData.get({ plain: true });

//     res.render('homepage', {
//       ...quest,
//       logged_in: req.session.logged_in
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// Add a new route for viewing a specific daily log entry
router.get('/dailyLog/:id', withAuth, async (req, res) => {
  try {
    // Retrieve the daily log data based on the :id parameter
    const dailyLogId = req.params.id;
    const dailyLogData = await DailyLog.findByPk(dailyLogId, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // If the daily log entry doesn't exist, handle it appropriately (e.g., show a 404 page)
    if (!dailyLogData) {
      res.status(404).render('notfound'); // You can create a 'notfound.handlebars' template
      return;
    }

    // Serialize data so the template can read it
    const dailyLog = dailyLogData.get({ plain: true });

    // Render the dailyLog.handlebars template with the daily log data
    res.render('dailyLog', {
      ...dailyLog,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Quest, DailyLog }],
    });

    const user = userData.get({ plain: true });
  
    
    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
