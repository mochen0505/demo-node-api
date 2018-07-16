const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// new UserProfileSchema
const UserProfileSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
    },
    gender: {
        type: String,
    },
    country: {
        type: String,
    },
    city: {
        type: String,
    },
    role: {
        type: String,
        enum: ['client', 'admin'],
        default: 'client'
    }
});
module.exports = UserProfileSchema;