const express = require('express');
const router = express.Router();

const { saveOrder } = require('../controller/order.controller');

router.post('/save-order', saveOrder);
module.exports = router;