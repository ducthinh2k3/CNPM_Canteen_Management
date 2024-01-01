const {
    getDashboardPage
} = require('../controller/dashboard.controller');

const express = require('express');
const router = express.Router();

router.get('/dashboard', getDashboardPage);

module.exports = router;