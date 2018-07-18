const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const uploadFile = require('../middleware/uploadFile');
const ProductsController = require('../controllers/products');

// new product
router.post('/newProduct', checkAuth, uploadFile(), ProductsController.newProduct);

// edit product

// delete product

// get product

// get all product

module.exports = router;

