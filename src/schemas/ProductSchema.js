const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

// new ProductSchema
const ProductSchema = new Schema({
    uid: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    picture: {
        type: String,
    },
    brief: {
        type: String,
    },
    created_at: {
        type: Date,
    },
    updated_at: {
        type: Date,
    }
});

ProductSchema.plugin(mongoosePaginate);

ProductSchema.pre('save', function(next) {
    const now = Date.now();
    this.updated_at = now;
    if (!this.created_at) {
        this.created_at = now;
    }
    next();
});

ProductSchema.pre('update', function(next) {
    this.update({}, { $set: {updated_at: Date.now()}});
    next();
});

module.exports = ProductSchema;