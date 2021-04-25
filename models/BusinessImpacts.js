const mongoose = require('mongoose');

const situation = {
  normalsituation: {
    objective: String,
    activities: [
      {
        activity: String,
        resources: [
          {
            resource: String,
            typeofresources: String,
            amount: String,
          },
        ],
      },
    ],
  },
  emergencysituation: {
    objective: String,
    activities: [
      {
        activity: String,
        resources: [
          {
            resource: String,
            typeofresources: String,
            amount: String,
          },
        ],
      },
    ],
  },
};

const biaSchema = mongoose.Schema({
  id_company: String,
  department: [
    { 
      name: String, 
      situation: [situation], 
      mtpd: String, 
      rto: String },
  ],
  companymtpd: String,
  companyrto: String,
});

module.exports = mongoose.model('bia', biaSchema);
