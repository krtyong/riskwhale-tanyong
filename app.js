//jshint esversion: 6

const express = require('express');
const bodyParser = require('body-parser');
const request = require("request");
const mongoose = require('mongoose');

const app = express();

//Import Route
const signupInd = require('./routes/signup-indiv');
const signupCompany = require('./routes/signup-company');

app.use('/signup-indiv', signupInd);
app.use('/signup-company', signupCompany);

// app.use(express.static("public"));
// app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    //landing at signup.html page
    // res.sendFile(__dirname + "/signup.html");
    res.send('welcome to risk whale');
});

// Connect to DB
mongoose.connect(
    "mongodb+srv://tanyong:tanyong1234@cluster0.yoxyp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", 
    { useUnifiedTopology: true }, () => {
    console.log('connected to database');
});

app.listen(3000, function() {
    console.log('Server is running on port 3000');
});