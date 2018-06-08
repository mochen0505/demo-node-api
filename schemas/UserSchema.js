const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const regs = require('../utils/validators');

// new UserSchema
const UserSchema = new Schema({
    name: {
        type: String,
        required: false
    },
    mobile: {
        type: String,
        required: [true, 'Mobile is required'],
        validate: [regs.mobileValidator, 'Mobile validate error']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    available: {
        type: Boolean,
        default: false
    }
});
module.exports = UserSchema;