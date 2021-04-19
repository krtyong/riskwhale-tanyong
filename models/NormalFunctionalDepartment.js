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

const NormalFunctionalDepartmentSchema = mongoose.Schema({
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

// const FunctionalDepartmentsSchema = mongoose.Schema({
//     id_company: {
//         type: String,
//         required: true
//     },
//     functionalDepartment: [
//         {
//             normalSituation: {
//                 objective: {
//                     type: String,
//                     required: true
//                 },
//                 activities: [activitiesSchema]
//             },
//             emergencySituation: {
//                 objective: {
//                     type: String,
//                     required: true
//                 },
//                 activities: [activitiesSchema]
//             }
//         }
//     ]
// });

module.exports = mongoose.model('NormalFunctionalDepartment', NormalFunctionalDepartmentSchema);