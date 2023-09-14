const router = require('express').Router();
const { Quest, DailyLog, User } = require('../models');
const withAuth = require('../utils/auth');

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
      projects,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/quest/:id', async (req, res) => {
  try {
    const questData = await Quest.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const quest = questData.get({ plain: true });

    res.render('activequest', {
      ...quest,
      logged_in: req.session.logged_in
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
      include: [{ model: Quest }],
    });

    const user = userData.get({ plain: true });
    console.log(userData)
    console.log(user)
    res.render('user', {
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
