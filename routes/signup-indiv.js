const express = require('express');
const router = express.Router();
const User = require('../models/User')
const bodyParser = require('body-parser');

var jsonParser = bodyParser.json();

router.get('/', (req, res) => {
    // res.sendFile(__dirname + "/signup.html");
    res.send('welcome to signup for individual page');
});

router.post('/', jsonParser, async (req,res) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password,
        retypepassword: req.body.retypepassword,
        firstname: req.body.firstname,
        occupation: req.body.occupation,
        institute: req.body.institute
    })

    // save to database, return a promise
    try {
        const savedPost = await user.save()
        res.json(savedPost);
    } catch(err) {
        res.json( { message: err });
    }
    //when user type in signup
    //submit the data in the inputs to our home route using a post request
    // var email = req.body.email;
    // var password = req.body.password;
    // var retypepassword = req.body.retypepassword;
    // var firstname = req.body.firstName;
    // var occupation = req.body.occupation;
    // var institute = req.body.institute;

    // console.log(email, password, retypepassword, firstname, occupation, institute);
    console.log(req.body);

    res.send('individual user created');
});

module.exports = router;