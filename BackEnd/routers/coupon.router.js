const express = require('express');
const router = express.Router();

const { getCoupons, applyCoupon } = require('../controller/coupon.controller');

router.get('/coupons', getCoupons);
router.get('/apply-coupon', applyCoupon);
module.exports = router;