const mongoose = require("mongoose");

const CompanySchema = mongoose.Schema({
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
  companyname: {
    type: String,
    required: true,
  },
  businessmodel: {
    keypartners: {
      type: String,
      required: true,
    },
    keyactivities: {
      type: String,
      required: true,
    },
    keyresources: {
      type: String,
      required: true,
    },
    valueproposition: {
      type: String,
      required: true,
    },
    customerrelationships: {
      type: String,
      required: true,
    },
    channels: {
      type: String,
      required: true,
    },
    customersegments: {
      type: String,
      required: true,
    },
    coststructure: {
      type: String,
      required: true,
    },
    revenuestream: {
      type: String,
      required: true,
    }
  },
  functionaldepartments: 
    [{
        name: {
            type: String
        }
    }],
  confirmed: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Company", CompanySchema);
