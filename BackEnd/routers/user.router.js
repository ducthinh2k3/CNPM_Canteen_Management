const {
    getProductPage,
    addProduct
} = require('../controller/user.controller');

const express = require('express');
const router = express.Router();

router.get('/user', getProductPage);
router.post('/user/add', addProduct);

module.exports = router;