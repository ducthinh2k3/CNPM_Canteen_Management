const express = require('express');
const router = express.Router();

const { getCoupons, applyCoupon, getCouponByCode } = require('../controller/coupon.controller');

router.get('/coupons', getCoupons);
router.get('/apply-coupon', applyCoupon);
router.get('/get-coupon-by-code', getCouponByCode);

module.exports = router;