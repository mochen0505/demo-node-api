const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const uploadFile = require('../middleware/uploadFile');
const ProductsController = require('../controllers/products');

// new product
router.post('/newProduct', checkAuth, uploadFile(), ProductsController.newProduct);

// update product
router.post('/updateProduct', checkAuth, uploadFile(), ProductsController.updateProduct);

// get product
router.get('/:productId', checkAuth, ProductsController.getProduct);

// delete product
router.post('/deleteProducts', checkAuth, ProductsController.deleteProduct);

// get product list

// get all product

module.exports = router;

