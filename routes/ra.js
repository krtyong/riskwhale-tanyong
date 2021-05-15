const router = require('express').Router();
const Ra = require('../models/RiskAssessment');
const User = require('../models/User');
const Company = require('../models/Company');
const bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
const mongoose = require('mongoose');
const verify = require('./verifytoken');

router.post('/:id', verify, jsonParser, async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  const companyID = req.params.id;
  mongoose.set('useFindAndModify', false);

  const existed =
    (await User.findById(companyID)) || (await Company.findById(companyID));
  if (!existed) res.send('user id does not match');

  const { box } = req.body;

  const boxes = box.map((item) => {
    const impactaverage =
      (item.impacts.financial +
        item.impacts.healthandsafety +
        item.impacts.naturalenv +
        item.impacts.socialheritage +
        item.impacts.government +
        item.impacts.legal) /
      6;
    const impact = Math.round(impactaverage);
    const likelihood = item.likelihood;
    let value = 0;
    if (impact === 1 && likelihood === 1) value = 1;
    if (impact === 2 && likelihood === 1) value = 2;
    if (impact === 3 && likelihood === 1) value = 3;

    if (impact === 1 && likelihood === 2) value = 4;
    if (impact === 2 && likelihood === 2) value = 5;
    if (impact === 3 && likelihood === 2) value = 6;

    if (impact === 1 && likelihood === 3) value = 7;
    if (impact === 2 && likelihood === 3) value = 8;
    if (impact === 3 && likelihood === 3) value = 9;

    return { ...item, impact: impact, likelihood: likelihood, value: value };
  });

  const boxexisted = await Ra.findOne({ id_company: companyID }).exec();
  if (!boxexisted) {
    const ra = new Ra({
      id_company: companyID,
      box: boxes,
    });

    try {
      const savedPost = await ra.save();
      res.send(savedPost);
    } catch (err) {
      res.json({ message: err });
    }
  } else {
    const updated = await Ra.findOneAndUpdate(
      { id_company: companyID },
      {
        $push: {
          box: boxes,
        },
      },
      { new: true }
    );
    res.send(updated);
  }
});

router.get('/:id/result', verify, async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  const companyID = req.params.id;
  const result = await Ra.findOne({ id_company: companyID }, { _id: false });
  if (!result) {
    res.status(400).json({ message: 'user id is not correct' });
  }

  try {
    res.send(result);
  } catch (err) {
    res.status(400).json({ message: 'cannot send result' });
  }
});

module.exports = router;
