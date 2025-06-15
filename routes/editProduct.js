const express = require('express');
const { renderEditProduct, editProduct } = require('../controllers/productController');
const route = express.Router();

route.get('/:id',renderEditProduct)//:id pass id 
route.post('/:id',editProduct);

module.exports =route;