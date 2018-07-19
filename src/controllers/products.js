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
        const obj = picture === null ? {uid: userId, name, price, brief} : {uid: userId, name, price, brief, picture};
        if (!name || !price) {
            return res.send({
                code: 3000,
                message: 'Required input cannot be blank'
            });
        }
        const product = new Product(obj);
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
    updateProduct: (req, res, next) => {
        const {userId} = req.decoded;
        const {productId, name, price, brief} = req.body;
        const picture = req.file ? req.file.path : null;
        const obj = picture === null ? {name: name, price, brief} : {name: name, price, brief, picture};
        if (!name || !price) {
            return res.send({
                code: 3000,
                message: 'Required input cannot be blank'
            });
        }
        Product.findOne({
            _id: productId,
        }).then(product => {
            if (!product || product.uid !== userId) {
                return res.send({
                    code: 3000,
                    message: 'Product not found'
                });
            }
            Product.update({
                _id: productId,
            }, {
                $set: obj
            }).then(product => {
                return res.send({
                    code: 1000,
                    message: 'Success'
                });
            }).catch(err => {
                return res.send({
                    code: 3000,
                    message: 'Server error'
                })
            });
        }).catch(err => {
            return res.send({
                code: 3000,
                message: 'Server error'
            })
        });
    },
};