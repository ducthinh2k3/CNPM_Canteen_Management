const express = require('express');
const router = express.Router();
const {
    login,
    logout
} = require('../controller/auth/login.controller');
const {
    register,
} = require('../controller/auth/register.controller');
const authMiddleWare = require('../Middlewares/auth.middleware');
// router.post('/login', login);
// router.post('/register', register);
router.post('/login', login);
router.post('/register', register);
router.get('/logout', authMiddleWare.loggedin, logout);
module.exports = router;