//jshint esversion: 6

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const mongoose = require('mongoose');
const cors = require('cors');
const port = process.env.PORT || 1000;

// const corsOptions = {
//   origin: 'http://localhost:3000',
//   credentials: true,
//   optionSuccessStatus: 200,
// };

//Hide db user password
require('dotenv').config();
// Connect to DB
// mongoose.connect(
//     process.env.DB_CONNECT,
//     { useNewUrlParser: true, useUnifiedTopology: true }, () => {
//     console.log('connected to database');
// });
mongoose
  .connect(
    'mongodb://' +
      process.env.COSMOSDB_HOST +
      ':' +
      process.env.COSMOSDB_PORT +
      '/' +
      process.env.COSMOSDB_DBNAME +
      '?ssl=true&replicaSet=globaldb',
    {
      auth: {
        user: process.env.COSMOSDB_USER,
        password: process.env.COSMOSDB_PASSWORD,
      },
      useNewUrlParser: true,
      useUnifiedTopology: true,
      retryWrites: false,
    }
  )
  .then(() => console.log('Connection to CosmosDB successful'))
  .catch((err) => console.error(err));

const app = express();
app.use(cors({ credentials: true, origin: '*' }));

//Import Route
const auth = require('./routes/auth');
const bia = require('./routes/bia');
const ra = require('./routes/ra');
const userinfo = require('./routes/userinfo');

//middleware
app.use('/user', auth);
app.use('/bia', bia);
app.use('/ra', ra);
app.use('/userinfo', userinfo);

app.use(bodyParser.json());

app.get('/', (req, res) => {
  //landing at signup.html page
  // res.sendFile(__dirname + "/signup.html");
  res.send('welcome to risk whale');
});

app.listen(port, function () {
  console.log('Server is running on port 1000');
});
