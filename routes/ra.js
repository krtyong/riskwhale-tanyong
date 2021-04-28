const router = require('express').Router();
const Ra = require('../models/RiskAssessment');
const User = require('../models/User');
const Company = require('../models/Company');
const bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

router.post('/:id', jsonParser, async (req, res) => {
  const companyID = req.params.id;

  const existed =
    (await User.findById(companyID)) || (await Company.findById(companyID));
  if (!existed) res.send('user id does not match');

  const impactaverage =
    (req.body.box[0].impacts.financial +
      req.body.box[0].impacts.healthandsafety +
      req.body.box[0].impacts.naturalenv +
      req.body.box[0].impacts.socialheritage +
      req.body.box[0].impacts.government +
      req.body.box[0].impacts.legal) /
    6;
  const likelihood = req.body.box[0].likelihood;
  const impact = Math.round(impactaverage);
  const value = 0;
  // const score = Math.round(impactaverage * likelihood);

  if (impact === 1 && likelihood === 1) value = 1;
  if (impact === 2 && likelihood === 1) value = 2;
  if (impact === 3 && likelihood === 1) value = 3;
  if (impact === 4 && likelihood === 1) value = 4;
  if (impact === 5 && likelihood === 1) value = 5;

  if (impact === 1 && likelihood === 2) value = 6;
  if (impact === 2 && likelihood === 2) value = 7;
  if (impact === 3 && likelihood === 2) value = 8;
  if (impact === 4 && likelihood === 2) value = 9;
  if (impact === 5 && likelihood === 2) value = 10;

  if (impact === 1 && likelihood === 3) value = 11;
  if (impact === 2 && likelihood === 3) value = 12;
  if (impact === 3 && likelihood === 3) value = 13;
  if (impact === 4 && likelihood === 3) value = 14;
  if (impact === 5 && likelihood === 3) value = 15;

  if (impact === 1 && likelihood === 4) value = 16;
  if (impact === 2 && likelihood === 4) value = 17;
  if (impact === 3 && likelihood === 4) value = 18;
  if (impact === 4 && likelihood === 4) value = 19;
  if (impact === 5 && likelihood === 4) value = 20;

  if (impact === 1 && likelihood === 5) value = 21;
  if (impact === 2 && likelihood === 5) value = 22;
  if (impact === 3 && likelihood === 5) value = 23;
  if (impact === 4 && likelihood === 5) value = 24;
  if (impact === 5 && likelihood === 5) value = 25;

  const box = await Ra.findOne({ id_company: companyID }).exec();
  if (!box) {
    const ra = new Ra({
      id_company: companyID,
      box: [
        {
          model: req.body.box[0].model,
          typeofrisks: req.body.box[0].typeofrisks,
          risk: req.body.box[0].risk,
          impacts: {
            financial: req.body.box[0].impacts.financial,
            healthandsafety: req.body.box[0].impacts.healthandsafety,
            naturalenv: req.body.box[0].impacts.naturalenv,
            socialheritage: req.body.box[0].impacts.socialheritage,
            government: req.body.box[0].impacts.government,
            legal: req.body.box[0].impacts.legal,
          },
          likelihood: req.body.box[0].likelihood,
          impact: impact,
          value: value,
        },
      ],
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
          box: {
            model: req.body.box[0].model,
            typeofrisks: req.body.box[0].typeofrisks,
            risk: req.body.box[0].risk,
            impacts: {
              financial: req.body.box[0].impacts.financial,
              healthandsafety: req.body.box[0].impacts.healthandsafety,
              naturalenv: req.body.box[0].impacts.naturalenv,
              socialheritage: req.body.box[0].impacts.socialheritage,
              government: req.body.box[0].impacts.government,
              legal: req.body.box[0].impacts.legal,
            },
            likelihood: req.body.box[0].likelihood,
            score: score,
            impactaverage: impactaverage,
            coordinate: [impactaverage, likelihood],
          },
        },
      }
    );
    res.send(updated);
  }
});

router.get('/:id/result', async (req, res) => {
  const companyID = req.params.id;
  console.log(companyID);
  const result = await Ra.findOne({ id_company: companyID }, (err, data) => {
    if (err) {
      res.send('no result');
    } else {
      res.send(data);
    }
  });
});

module.exports = router;
