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
    balance: {
        type: Number,
        default: 0
    },
    avatar: {
        type: String,
    },
    gender: {
        type: String,
    },
    birthday: {
        type: Date,
    },
    province: {
        type: String,
    },
    city: {
        type: String,
    },
    district: {
        type: String,
    },
    county: {
        type: String,
    },
    role: {
        type: String,
        enum: ['client', 'admin'],
        default: 'client'
    }
}, {
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
});

// new model，'user_profile' corresponding to 'user_profiles' collection in db
module.exports = mongoose.model('user_profile', UserProfileSchema);
