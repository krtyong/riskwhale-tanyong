const mongoose = require('mongoose');

const raSchema = mongoose.Schema({
  id_company: {
    type: String,
    required: true,
  },
  box: [
    {
      model: {
        type: String,
        required: true,
      },
      typeofrisks: {
        type: String,
        required: true,
      },
      risk: {
        type: String,
        required: true,
      },
      impacts: {
        financial: {
          type: Number,
          required: true,
        },
        healthandsafety: {
          type: Number,
          required: true,
        },
        naturalenv: {
          type: Number,
          required: true,
        },
        socialheritage: {
          type: Number,
          required: true,
        },
        government: {
          type: Number,
          required: true,
        },
        legal: {
          type: Number,
          required: true,
        },
      },
      likelihood: Number,
      impact: Number,
      value: Number,
    },
  ],
});

module.exports = mongoose.model('ra', raSchema);
