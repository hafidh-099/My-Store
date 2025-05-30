//it take route of application
const express = require('express')
const route = express.Router()
const { renderProducts } = require('../controllers/productController');

route.get('/',renderProducts)

module.exports = route;
