const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Company = require('../models/Company');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var jsonParser = bodyParser.json();

router.get('/signup-indiv', (req, res) => {
    // res.sendFile(__dirname + "/signup.html");
    res.send('welcome to signup for individual page');
});

router.post('/signup-indiv', jsonParser, async (req,res) => {
    // checking if the user is already in database
    const emailExisted = await User.findOne({ email: req.body.email});
    if (emailExisted) return res.status(400).send('Email already exist');

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const hashRetypePassword = await bcrypt.hash(req.body.retypepassword, salt);

    // // passwords have to match
    if (hashPassword != hashRetypePassword) {
        return res.status(400).send('Passwords have to match');
    }

    // create a new user
    const user = new User({
        email: req.body.email,
        password: hashPassword,
        firstname: req.body.firstname,
        occupation: req.body.occupation,
        institute: req.body.institute
    });

    // save to database, return a promise
    try {
        const savedPost = await user.save();
        // res.json(savedPost);
        res.send({ user: user._id});
    } catch(err) {
        res.json( { message: err });
    }
});

router.get('/signup-company', (req, res) => {
    res.send('welcome to signup for company page');
});

router.post('/signup-company', jsonParser, async(req, res) => {
    // check if email is already existed
    const emailExisted = await Company.findOne({ email: req.body.email});
    if (emailExisted) return res.status(400).send('Email already exist');

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const hashRetypePassword = await bcrypt.hash(req.body.retypepassword, salt);

    // // passwords have to match
    if (hashPassword != hashRetypePassword) {
        return res.status(400).send('Passwords have to match');
    }

    const company = new Company({
        email: req.body.email,
        password: hashPassword,
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

    // save to database, return a promise
    try {
        const savedPost = await company.save();
        res.send({ id_company: company._id });
        console.log({ id_company: company._id }, req.body);
    } catch(err) {
        res.json( { message: err });
    }
});

router.get('/login', (req, res) => {
    res.send('welcome to login page');
});

router.post('/login', jsonParser, async (req,res) => {
    // checking if user exists
    const loginUser = await User.findOne({ email: req.body.email }); 
    if (!loginUser) {
        return res.status(400).send('Email is not found');
    }

    // password is correct やった！
    const validPass = await bcrypt.compare(req.body.password, loginUser.password);
    if (!validPass) {
        return res.status(400).send('Password is wrong');
    }

    // create token
    const token = jwt.sign({ _id: loginUser._id }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);

});

module.exports = router;