const mongoose = require('mongoose');

const raSchema = mongoose.Schema({
  id_company: {
    type: String,
    required: true,
  },
  box: [
    {
      model: String,
      typeofrisks: String,
      risk: String,
      impacts: {
        financial: Number,
        healthandsafety: Number,
        naturalenv: Number,
        socialheritage: Number,
        government: Number,
        legal: Number,
      },
      likelihood: Number,
      impact: Number,
      value: Number,
    },
  ],
});

module.exports = mongoose.model('ra', raSchema);
