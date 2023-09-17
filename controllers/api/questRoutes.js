const router = require('express').Router();
const { Quest } = require('../../models');
const withAuth = require('../../utils/auth');

// router.post('/', withAuth, async (req, res) => {
//   try {
//     const newQuest = await Quest.create({
//       ...req.body,
//       user_id: req.session.user_id,
//     });

//     res.status(200).json(newQuest);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

router.post('/', withAuth, async (req, res) => {
  try {
    const { starting_date, ...otherFields } = req.body;
    const date = new Date(starting_date);
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    const monthDate = `${month}-${day}`;
    const newQuest = await Quest.create({
      ...otherFields,
      date_label: monthDate,
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
