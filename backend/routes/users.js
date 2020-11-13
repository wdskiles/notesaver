const router = require('express').Router();
const userControl = require('../controllers/userController');
let User = require('../models/user.model');
const auth = require('../middleware/auth');

// Register User
router.post('/register', userControl.registerUser);

// Log in User
router.post('/login', userControl.loginUser);

// Verify Token
router.get('/verify', userControl.verifiedToken);

router.put('/reset-password', userControl.resetPassword);

module.exports = router;