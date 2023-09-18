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

    
    const newQuest = await Quest.create({
      ...otherFields,
      date_label: monthDate,
      height_centimeters: heightInCm,
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
