const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const authController = require('../controllers/authController');

router.use(cookieParser());

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh_token', authController.refreshToken);
router.post('/logout', authController.logout);

module.exports = router;
