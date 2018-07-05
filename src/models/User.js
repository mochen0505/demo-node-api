const mongoose = require('mongoose');
const UserSchema = require('../schemas/UserSchema');

// new model，'user' corresponding to 'users' collection in db
const User = mongoose.model('user', UserSchema);
module.exports = User;