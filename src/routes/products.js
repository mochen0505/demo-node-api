const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const uploadFile = require('../middleware/uploadFile');
const ProductsController = require('../controllers/products');

// new product
router.post('/newProduct', checkAuth, uploadFile(), ProductsController.newProduct);

// update product
router.post('/updateProduct', checkAuth, uploadFile(), ProductsController.updateProduct);

// delete product

// get product list

// get all product

module.exports = router;

