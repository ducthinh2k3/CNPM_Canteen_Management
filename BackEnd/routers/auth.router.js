const express = require('express');
const router = express.Router();
const {
    login,
    logout,
    showLoginForm
} = require('../controller/auth/login.controller');
const {
    create,
    register,
} = require('../controller/auth/register.controller');

const authMiddleWare = require('../Middlewares/auth.middleware');

// router.post('/login', login);
// router.post('/register', register);
router.get('/login', authMiddleWare.isAuth, showLoginForm);
router.post('/login', login);
router.get('/register', authMiddleWare.isAuth, create);
router.post('/register', register);
router.post('/logout', authMiddleWare.loggedin, logout);
module.exports = router;