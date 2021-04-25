const router = require('express').Router();
const Ra = require('../models/RiskAssessment');
const User = require('../models/User');
const Company = require('../models/Company');
const bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

router.post('/:id', jsonParser, async (req, res) => {
  const companyID = req.params.id;

  const existed = await User.findById(companyID) || await Company.findById(companyID);
  if(!existed) res.send('user id does not match');

  const impactaverage =
    (req.body.box[0].impacts.financial +
      req.body.box[0].impacts.healthandsafety +
      req.body.box[0].impacts.naturalenv +
      req.body.box[0].impacts.socialheritage +
      req.body.box[0].impacts.government +
      req.body.box[0].impacts.legal) /
    6;
  const likelihood = req.body.box[0].likelihood;
  const score = Math.round(impactaverage * likelihood);

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
          score: score,
          impactaverage: impactaverage,
          coordinate: [impactaverage, likelihood],
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
