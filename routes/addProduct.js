const express = require('express');
const bodyParse = require('body-parser')
const { renderAddProduct, postAddProduct } = require('../controllers/productController');
const { auth } = require('../middleware/auth');
const route = express.Router()

route.use(bodyParse.urlencoded());

route.get('/',auth,renderAddProduct);//configure add product from controller

route.post('/',auth,postAddProduct);

module.exports = route;