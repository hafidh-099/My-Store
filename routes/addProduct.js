const express = require('express');
const bodyParse = require('body-parser')
const { renderAddProduct, postAddProduct } = require('../controllers/productController');
const route = express.Router()

route.use(bodyParse.urlencoded());

route.get('/',renderAddProduct);//configure add product from controller

route.post('/',postAddProduct);

module.exports = route;