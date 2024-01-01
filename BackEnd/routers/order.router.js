const express = require('express');
const router = express.Router();

const { saveOrder
        ,getRevenueByHour
         } = require('../controller/order.controller');

router.post('/save-order', saveOrder);
router.get('/revenue-by-hour', getRevenueByHour);
module.exports = router;