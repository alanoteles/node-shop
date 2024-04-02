const path = require('path');

const express = require('express');

const rootDir = require('../utils/path');

const router = express.Router();

const adminController = require('../controllers/admin');

router.get('/add-product', adminController.getAddProduct);

router.post('/add-product', adminController.postAddProduct);

router.get('/edit-product/:productId', adminController.getEditProduct);

router.post('/edit-product', adminController.postEditProduct);

router.get('/products', adminController.getProducts);

router.post('/delete-product', adminController.postDeleteProduct)

exports.routes = router;