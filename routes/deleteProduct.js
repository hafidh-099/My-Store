const express = require('express');
const router = express.Router();
const { deleteProduct } = require('../controllers/productController');

router.get('/:id',deleteProduct)

module.exports = router;