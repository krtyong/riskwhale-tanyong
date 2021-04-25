const router = require('express').Router();
const Bia = require('../models/BusinessImpacts');
const User = require('../models/User');
const Company = require('../models/Company');
const bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
const mongoose = require('mongoose');

router.post('/:id/:department', jsonParser, async (req, res) => {
  const { id, department } = req.params;
  const { situation } = req.body;
  mongoose.set('useFindAndModify', false);

  // const existed =
  //   (await User.findById(companyID)) || (await Company.findById(companyID));
  // if (!existed) res.send('user id does not match');

  const existed = await Bia.findOne({ id_company: id });
  if (!existed) {
    const bia = new Bia({
      id_company: id,
      department: [{ name: department, situation: situation }],
    });

    try {
      const savedPost = await bia.save();
      res.send(savedPost);
    } catch (err) {
      res.json({ message: err });
    }
  } else {
    const updated = await Bia.findOneAndUpdate(
      { id_company: id },
      {
        $push: {
          department: [{ name: department, situation: situation }],
        },
      }
    );
    res.send(updated);
  }

  // const user = await Bia.findOne({ id_company: companyID });
  // if(!user) {
  // }
});

router.get('/:id/:department', jsonParser, async (req, res) => {
  const { id, department } = req.params;
  const data = await Bia.findOne(
    {
      id_company: id,
      department: { $elemMatch: { name: department } },
    },
    { _id: false }
  );
  if (!data) {
    res.send('No information about this user');
  } else {
    res.send(data);
    console.log(data);
  }
});

router.post('/mtpd', jsonParser, async (req, res) => {
  const { departmentmtpd } = req.body;
  const id = req.body.id_company;

  for (const element in departmentmtpd) {
    const result = await Bia.find({
      id_company: id,
      department: { $elemMatch: { name: department } },
    });
  }
  console.log(result);
});

router.post('/:id/:department/mtpdandrto', jsonParser, async (req, res) => {
  const { id, department } = req.params;
  mongoose.set('useFindAndModify', false);
  const data = await Bia.findOneAndUpdate(
    {
      id_company: id,
      department: { $elemMatch: { name: department } },
    },
    {
      $set: {
        'department.$.mtpd': req.body.mtpd,
        'department.$.rto': req.body.rto,
        companymtpd: req.body.companymtpd,
        companyrto: req.body.companyrto,
      },
    },
    (err, result) => {
      if (err) {
        res.status(400).send('cannot add mtpd or rto');
      } else {
        res.send(result);
        //response is not update
      }
    }
  );
});

router.get('/:id', jsonParser, async (req, res) => {
  const { id } = req.params;
  // const existed = Bia.findOne({ id_company: id });
  // if (existed) res.send(existed);
  const data = await Bia.find({ id_company: id }, { _id: false }).exec();
  if (data) {
    res.send(data);
  } else {
    res.send('user not match');
  }
});

module.exports = router;
