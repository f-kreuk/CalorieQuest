const router = require('express').Router();
const userRoutes = require('./userRoutes');
const dailylogRoutes = require('./dailylogRoutes')
const questRoutes = require('./questRoutes')

router.use('/users', userRoutes);
router.use('/dailylogs', dailylogRoutes);
router.use('/quests', questRoutes);

module.exports = router;