const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    retypepassword: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    occupation: {
        type: String,
        required: true
    },
    institute: {
        type: String
    }
});

module.exports = mongoose.model('User', UserSchema);