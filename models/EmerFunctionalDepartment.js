const mongoose = require('mongoose');

const activitiesSchema = mongoose.Schema({
    name: {
        type: String
    },
    resources: {
        type: String
    },
    typeofresources: {
        type: String
    },
    amount: {
        type: Number
    }
});

const EmerFunctionalDepartmentSchema = mongoose.Schema({
    id_company: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    normalSituation: {
        objective: {
            type: String,
            required: true
        },
        activities: [activitiesSchema]
    }
});

module.exports = mongoose.model('EmerFunctionalDepartment', EmerFunctionalDepartmentSchema);