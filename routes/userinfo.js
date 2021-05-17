const router = require('express').Router();
const User = require('../models/User');
const Company = require('../models/Company');
const bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
const mongoose = require('mongoose');
const verify = require('./verifytoken');

router.get('/company/:id', verify, jsonParser, async (req, res) => {
  // res.sendFile(__dirname + "/signup.html");
  const id = req.params.id;

  const user = (await Company.findById(id)) || (await User.findById(id));

  if (!user) {
    res.send({ message: err });
  }

  try {
    res.send(user);
  } catch (err) {
    res.status(400).send('cannot get user information');
  }
});

router.post('/company/:id/edit', verify, jsonParser, async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  mongoose.set('useFindAndModify', false);
  const { id } = req.params;
  const existed = await Company.findByIdAndUpdate(
    id,
    req.body,
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
  if (!existed) res.send('Cannot find users');
});

router.post('/ind/:id/edit', verify, jsonParser, async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  mongoose.set('useFindAndModify', false);
  const { id } = req.params;
  const existed = await Company.findByIdAndUpdate(
    id,
    req.body,
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
  if (!existed) res.send('Cannot find users');
});

router.get('/ind/:id', verify, jsonParser, async (req, res) => {
  // res.sendFile(__dirname + "/signup.html");
  const id = req.params.id;
  const user = await User.findById(id);
  if (!user) {
    res.json({ message: 'user is not in database' });
  }

  const business = req.query.business;
  mongoose.set('useFindAndModify', false);

  if (business) {
    if (business === 'pizza') {
      const pizzashop = {
        companyname: 'Homemade Pizza Restaurant',
        businessmodel: {
          keypartners:
            'Natural ingredients directly from farmers and producers/ and delivery company who provide a delivery service',
          keyactivities:
            'Purchase of ingredients/ pizza ordering/ pizza production',
          keyresources:
            '50,000 Baht of funding/ a team of 5 staff: 3 in the kitchen, and 2 receiving orders',
          valueproposition: 'Using only natural ingredients',
          customerrelationships:
            'We offer the best pizza from high-quality products, which is made on-demand and using sustainable packaging biodegradable and compostable. We also provide today’s deals which is the special menu for each day. Referring to more friends get free pizza',
          channels:
            'Customers can reach us through both online and offline site. For online, we have Phone call, Instagram, Facebook, Line account ready to take order. For offline site, customers can present at the restaurants to order the food',
          customersegments: 'Fast food consumers/ Pizza Nerds/ Millennials',
          coststructure:
            'Human salaries reduction/ Raw material/ Gas and fleet/ Restaurants/ Taxes',
          revenuestream: 'Sale of pizzas',
        },
        functionaldepartments: [
          {
            name: 'kitchen',
          },
          {
            name: 'front desk',
          },
        ],
      };

      try {
        const completeusers = await User.findByIdAndUpdate(
          id,
          {
            $set: {
              companyname: pizzashop.companyname,
              businessmodel: {
                keypartners: pizzashop.businessmodel.keypartners,
                keyactivities: pizzashop.businessmodel.keyactivities,
                keyresources: pizzashop.businessmodel.keyresources,
                valueproposition: pizzashop.businessmodel.valueproposition,
                customerrelationships:
                  pizzashop.businessmodel.customerrelationships,
                channels: pizzashop.businessmodel.channels,
                customersegments: pizzashop.businessmodel.customersegments,
                coststructure: pizzashop.businessmodel.coststructure,
                revenuestream: pizzashop.businessmodel.revenuestream,
              },
              functionaldepartments: pizzashop.functionaldepartments,
            },
          },
          { new: true }
        );
        console.log(completeusers);
        res.send(completeusers);
      } catch (err) {
        console.log('cannot fins and get data from users schema');
      }
    }

    if (business === 'dogwalker') {
      const pizzashop = {
        companyname: 'Dog Walking Service',
        businessmodel: {
          keypartners: 'Pet supplies Retailers',
          keyactivities:
            'Commission negotiations and unified platform maintenance',
          keyresources: 'Software Development',
          customerrelationships: 'Continuously maintaining a customized',
          channels:
            'Customers can reach us through both online and offline site. For online, we have Phone call, Instagram, Facebook, Line account ready to take order. For offline site, customers can present at the restaurants to order the food',
          customersegments: 'Fast food consumers/ Pizza Nerds/ Millennials',
          coststructure:
            'Human salaries reduction/ Raw material/ Gas and fleet/ Restaurants/ Taxes',
          revenuestream: 'Sale of pizzas',
        },
        functionaldepartments: [
          {
            name: 'kitchen',
          },
          {
            name: 'front desk',
          },
        ],
      };

      try {
        const completeusers = await User.findByIdAndUpdate(
          id,
          {
            $set: {
              companyname: pizzashop.companyname,
              businessmodel: {
                keypartners: pizzashop.businessmodel.keypartners,
                keyactivities: pizzashop.businessmodel.keyactivities,
                keyresources: pizzashop.businessmodel.keyresources,
                valueproposition: pizzashop.businessmodel.valueproposition,
                customerrelationships:
                  pizzashop.businessmodel.customerrelationships,
                channels: pizzashop.businessmodel.channels,
                customersegments: pizzashop.businessmodel.customersegments,
                coststructure: pizzashop.businessmodel.coststructure,
                revenuestream: pizzashop.businessmodel.revenuestream,
              },
              functionaldepartments: pizzashop.functionaldepartments,
            },
          },
          { new: true }
        );
        console.log(completeusers);
        res.send(completeusers);
      } catch (err) {
        console.log('cannot fins and get data from users schema');
      }
    }
  } else {
    const user = await User.findById(id);
    res.send(user);
  }
});

module.exports = router;
