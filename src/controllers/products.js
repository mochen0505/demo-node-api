/**
 * code explanation
 * 1000：succeed
 * 2000：authentication error
 * 3000：other error
 */

// import models
const Product = require('../models/Product');

module.exports = {
    newProduct: (req, res, next) => {
        const {userId} = req.decoded;
        const {name, price, brief} = req.body;
        const picture = req.file ? req.file.path : null;
        if (!name || !price) {
            return res.send({
                code: 3000,
                message: 'Required input cannot be blank'
            });
        }
        const product = new Product({
            uid: userId,
            name: name,
            price: price,
            brief: brief,
            picture: picture
        });
        product.save().then(product => {
            return res.send({
                code: 1000,
                message: 'Success'
            })
        }).catch(err => {
            return res.send({
                code: 3000,
                message: 'Server error'
            })
        })
    },
};