const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// new UserSchema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['client', 'admin'],
        default: 'client'
    }
});
module.exports = UserSchema;