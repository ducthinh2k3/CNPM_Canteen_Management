const express = require('express');
const router = express.Router();

const { getCoupons, applyCoupon, getCouponByCode, addCoupon, getCouponPage, updateCoupon,deleteCoupon } = require('../controller/coupon.controller');

router.get('/coupons', getCoupons);
router.get('/apply-coupon', applyCoupon);
router.get('/get-coupon-by-code', getCouponByCode);

// Xu ly them, xoa, sua ma khuyen mai
router.post('/coupon/add', addCoupon),
router.get('/coupon/read', getCouponPage),
router.post('/coupon/edit', updateCoupon),
router.get('/coupon/delete', deleteCoupon),

module.exports = router;