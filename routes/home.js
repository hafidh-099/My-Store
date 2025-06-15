//it take route of application
const express = require('express')
const route = express.Router()
const { renderProducts } = require('../controllers/productController');
const { auth } = require('../middleware/auth');

route.get('/',auth,renderProducts)

module.exports = route;
