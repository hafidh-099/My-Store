const express = require('express');
const { renderSignUp, registerUser, renderLogin } = require('../controllers/userAuthController');
const router = express.Router();

router.get('/sign-up',renderSignUp)
router.post('/sign-up',registerUser)
router.get('/',renderLogin)
module.exports = router;