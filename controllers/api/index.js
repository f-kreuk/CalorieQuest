const router = require('express').Router();
const userRoutes = require('./userRoutes');
const dailylogRoutes = require('./dailylogRoutes')

router.use('/users', userRoutes);
router.use('/dailylogs', dailylogRoutes);

module.exports = router;