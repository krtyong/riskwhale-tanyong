//jshint esversion: 6

const express = require('express');
const bodyParser = require('body-parser');
const request = require("request");
const mongoose = require('mongoose');


//Hide db user password
require('dotenv').config();
// Connect to DB
// mongoose.connect(
//     process.env.DB_CONNECT, 
//     { useNewUrlParser: true, useUnifiedTopology: true }, () => {
//     console.log('connected to database');
// });
mongoose.connect("mongodb://"+process.env.COSMOSDB_HOST+":"+process.env.COSMOSDB_PORT+"/"+process.env.COSMOSDB_DBNAME+"?ssl=true&replicaSet=globaldb", {
  auth: {
    user: process.env.COSMOSDB_USER,
    password: process.env.COSMOSDB_PASSWORD
  },
    useNewUrlParser: true,
    useUnifiedTopology: true,
    retryWrites: false
    })
.then(() => console.log('Connection to CosmosDB successful'))
.catch((err) => console.error(err));

const app = express();

//Import Route
// const signupInd = require('./routes/signup-indiv');
// const signupCompany = require('./routes/signup-company');
// const login = require('./routes/login');
const auth = require('./routes/auth');
const bia = require('./routes/bia');
const ra = require('./routes/ra');
const userinfo = require('./routes/userinfo');

//middleware
// app.use('/signup-indiv', signupInd);
// app.use('/signup-company', signupCompany);
// app.use('/login', login);
app.use('/user', auth);
app.use('/:id/bia', bia);
app.use('/:id/ra', bia);
app.use('/userinfo', userinfo);

app.use(bodyParser.json());

app.get('/', (req, res) => {
    //landing at signup.html page
    // res.sendFile(__dirname + "/signup.html");
    res.send('welcome to risk whale');
});

app.listen(1000, function() {
    console.log('Server is running on port 1000');
});