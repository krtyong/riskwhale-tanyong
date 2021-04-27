const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  retypepassword: {
    type: String,
  },
  firstname: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  institute: String,
  companyname: String,
  businessmodel: {
    keypartners: String,
    keyactivities: String,
    keyresources: String,
    valueproposition: String,
    customerrelationships: String,
    channels: String,
    customersegments: String,
    coststructure: String,
    revenuestream: String,
  },
  functionaldepartments: [{ name: String }],
});

module.exports = mongoose.model('User', UserSchema);
