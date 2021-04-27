const router = require('express').Router();
const User = require('../models/User');
const Company = require('../models/Company');
const bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
const mongoose = require('mongoose');

router.get('/:id', jsonParser, async (req, res) => {
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

router.get('/ind/:id', jsonParser, async (req, res) => {
  // res.sendFile(__dirname + "/signup.html");
  const id = req.params.id;
  const business = JSON.stringify(req.query.business);
  mongoose.set('useFindAndModify', false);

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
      const completeusers = await User.findByIdAndUpdate(id, {
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
      });
      if (completeusers) {
        res.send(completeusers);
      }
    } catch (err) {
      console.log('cannot fins and get data from users schema');
    }
  }
  const user = (await Company.findById(id)) || (await User.findById(id));

  if (!user) {
    res.send({ message: err });
  }

  try {
    res.send(user);
  } catch (err) {
    console.log('cannot send user');
  }
});

module.exports = router;
