const mongoose = require('mongoose');

const raSchema = mongoose.Schema({
    id_company: {
        type: String,
        required: true
    },
    canvas: {
        model: {
            type: String,
            required: true
        },
        typeofrisks: {
            type: String,
            required: true
        },
        risk: {
            type: String,
            required: true
        },
        impacts: {
            financial: {
                type: Number,
                required: true
            },
            healthandsafety: {
                type: Number,
                required: true
            },
            naturalenv: {
                type: Number,
                required: true
            },
            socialheritage: {
                type: Number,
                required: true
            },
            government: {
                type: Number,
                required: true
            },
            legal: {
                type: Number,
                required: true
            }
        },
        likelihood: {
                type: Number,
                required: true
            },
        levelofacceptance: {
            type: String,
            required: true
        },
        impact: Number,
        coordinate: Array,
        score: Number
    }
    // keypartners: {
    //     typeofrisks: String,
    //     risk: String,
    //     Impacts: {
    //         financial: Number,
    //         healthandsafety: Number,
    //         naturalenv: Number,
    //         socialheritage: Number,
    //         government: Number,
    //         legal: Number
    //     },
    //     likelihood: Number,
    //     levelofacceptance: String
    // },
    // keyactivities: {
    //     typeofrisks: String,
    //     risk: String,
    //     Impacts: {
    //         financial: Number,
    //         healthandsafety: Number,
    //         naturalenv: Number,
    //         socialheritage: Number,
    //         government: Number,
    //         legal: Number
    //     },
    //     likelihood: Number,
    //     levelofacceptance: String
    // },
    // valueprepositions: {
    //     typeofrisks: String,
    //     risk: String,
    //     Impacts: {
    //         financial: Number,
    //         healthandsafety: Number,
    //         naturalenv: Number,
    //         socialheritage: Number,
    //         government: Number,
    //         legal: Number
    //     },
    //     likelihood: Number,
    //     levelofacceptance: String
    // },
    // customerrelationships: {
    //     typeofrisks: String,
    //     risk: String,
    //     Impacts: {
    //         financial: Number,
    //         healthandsafety: Number,
    //         naturalenv: Number,
    //         socialheritage: Number,
    //         government: Number,
    //         legal: Number
    //     },
    //     likelihood: Number,
    //     levelofacceptance: String
    // },
    // customersegments: {
    //     typeofrisks: String,
    //     risk: String,
    //     Impacts: {
    //         financial: Number,
    //         healthandsafety: Number,
    //         naturalenv: Number,
    //         socialheritage: Number,
    //         government: Number,
    //         legal: Number
    //     },
    //     likelihood: Number,
    //     levelofacceptance: String
    // },
    // coststructure: {
    //     typeofrisks: String,
    //     risk: String,
    //     Impacts: {
    //         financial: Number,
    //         healthandsafety: Number,
    //         naturalenv: Number,
    //         socialheritage: Number,
    //         government: Number,
    //         legal: Number
    //     },
    //     likelihood: Number,
    //     levelofacceptance: String
    // },
    // revenuestreams: {
    //     typeofrisks: String,
    //     risk: String,
    //     Impacts: {
    //         financial: Number,
    //         healthandsafety: Number,
    //         naturalenv: Number,
    //         socialheritage: Number,
    //         government: Number,
    //         legal: Number
    //     },
    //     likelihood: Number,
    //     levelofacceptance: String
    // },
    // keyresources: {
    //     typeofrisks: String,
    //     risk: String,
    //     Impacts: {
    //         financial: Number,
    //         healthandsafety: Number,
    //         naturalenv: Number,
    //         socialheritage: Number,
    //         government: Number,
    //         legal: Number
    //     },
    //     likelihood: Number,
    //     levelofacceptance: String
    // },
    // channels: {
    //     typeofrisks: String,
    //     risk: String,
    //     Impacts: {
    //         financial: Number,
    //         healthandsafety: Number,
    //         naturalenv: Number,
    //         socialheritage: Number,
    //         government: Number,
    //         legal: Number
    //     },
    //     likelihood: Number,
    //     levelofacceptance: String
    // }
})

module.exports = mongoose.model('ra', raSchema)