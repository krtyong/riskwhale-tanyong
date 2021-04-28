const router = require('express').Router();
const Bia = require('../models/BusinessImpacts');
const User = require('../models/User');
const Company = require('../models/Company');
const bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
const mongoose = require('mongoose');

router.post('/:id/mtpd', jsonParser, async (req, res) => {
  const { departmentmtpd } = req.body;
  const { id } = req.params;
  // const id = req.body.id_company;
  mongoose.set('useFindAndModify', false);

  for (let element in departmentmtpd) {
    const department = departmentmtpd[element].name;
    await Bia.findOneAndUpdate(
      {
        id_company: id,
        department: { $elemMatch: { name: department } },
      },
      {
        $set: {
          'department.$.mtpd': req.body.departmentmtpd[element].mtpd,
          companymtpd: req.body.companymtpd,
        },
      }
    );
  }

  const result = await Bia.findOne({ id_company: id }, { _id: false });
  if (result) {
    res.send(result);
  } else {
    res.status(400).send('cannot post');
  }
});

router.post('/:id/rto', jsonParser, async (req, res) => {
  const { departmentrto } = req.body;
  const { id } = req.params;
  // const id = req.body.id_company;
  mongoose.set('useFindAndModify', false);

  for (const element in departmentrto) {
    const department = departmentrto[element].name;
    await Bia.findOneAndUpdate(
      {
        id_company: id,
        department: { $elemMatch: { name: department } },
      },
      {
        $set: {
          'department.$.rto': req.body.departmentrto[element].rto,
          companyrto: req.body.companyrto,
        },
      }
    );
  }

  const result = await Bia.findOne({ id_company: id }, { _id: false });
  if (result) {
    res.send(result);
  } else {
    res.status(400).send('cannot post');
  }
});

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
