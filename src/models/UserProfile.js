const mongoose = require('mongoose');
const UserProfileSchema = require('../schemas/UserProfileSchema');

// new model，'user_profile' corresponding to 'user_profiles' collection in db
const UserProfile = mongoose.model('user_profile', UserProfileSchema);
module.exports = UserProfile;