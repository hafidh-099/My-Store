const express = require('express');
const { renderSignUp, registerUser, renderLogin, validateLogin, logout } = require('../controllers/userAuthController');
const { auth } = require('../middleware/auth');
const router = express.Router();

router.get('/sign-up',renderSignUp);
router.post('/sign-up',registerUser);
router.get('/',renderLogin);
//to validate user we send him cockies which take it user credential
router.post('/login',validateLogin);
router.get('/logout',auth,logout);
module.exports = router;