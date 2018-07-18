const mongoose = require('mongoose');
const ProductSchema = require('../schemas/ProductSchema');

// new model，'product' corresponding to 'products' collection in db
const Product = mongoose.model('product', ProductSchema);
module.exports = Product;