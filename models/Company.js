const mongoose = require('mongoose');

const CompanySchema = mongoose.Schema({
  email: String,
  password: String,
  retypepassword: String,
  companyname: String,
  businessmodel: {
    keypartners: String,
    keyactivities: String,
    keyresources: String,
    valueproposition: String,
    customerrelationships: String,
    channels: String,
  },
  functionaldepartments: [
    {
      name: String,
    },
  ],
  confirmed: String,
  tick: String,
  typeofuser: String,
});

module.exports = mongoose.model('Company', CompanySchema);
