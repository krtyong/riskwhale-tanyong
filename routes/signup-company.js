const express = require('express');
const router = express.Router();
const Company = require('../models/Company');
const bodyParser = require('body-parser');

var jsonParser = bodyParser.json();

router.get('/', (req, res) => {
    res.send('welcome to signup for company page');
});

router.post('/', jsonParser, async(req, res) => {
    const company = new Company({
        email: req.body.email,
        password: req.body.password,
        retypepassword: req.body.retypepassword,
        companyname: req.body.companyname,
        businessmodel: {
            keypartners: req.body.businessmodel.keypartners,
            keyactivities: req.body.businessmodel.keyactivities,
            keyresources: req.body.businessmodel.keyresources,
            valueproposition: req.body.businessmodel.valueproposition,
            customerrelationships: req.body.businessmodel.customerrelationships,
            channels: req.body.businessmodel.channels,
            customersegments: req.body.businessmodel.customersegments,
            coststructure: req.body.businessmodel.coststructure,
            revenuestream: req.body.businessmodel.revenuestream
        },
        functionaldepartments: req.body.functionaldepartments,
        confirmed: req.body.confirmed
    }); 

    // console.log(req.body);

        // save to database, return a promise
    try {
        const savedPost = await company.save()
        res.json(savedPost);
    } catch(err) {
        res.json( { message: err });
    }

    res.send('company user created');
});

module.exports = router;