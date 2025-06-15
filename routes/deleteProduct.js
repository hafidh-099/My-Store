const express = require('express');
const router = express.Router();
const { deleteProduct } = require('../controllers/productController');
const { auth } = require('../middleware/auth');

router.get('/:id',auth,deleteProduct)

module.exports = router;