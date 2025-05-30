const express = require('express');
const { renderEditProduct } = require('../controllers/productController');
const route = express.Router();

route.get('/:id',renderEditProduct)//:id pass id 

module.exports =route;