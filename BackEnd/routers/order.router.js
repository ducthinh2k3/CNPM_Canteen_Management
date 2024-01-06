const express = require('express');
const router = express.Router();

const { saveOrder
        , getRevenueByHour,
        saveOrderDetail
         } = require('../controller/order.controller');

router.post('/save-order', saveOrder);
router.post('/save-order-detail', saveOrderDetail);
router.get('/revenue-by-hour', getRevenueByHour);
module.exports = router;