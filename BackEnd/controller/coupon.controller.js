const Coupon = require('../models/coupon.model');

const getCoupons = async (req, res, next) => {
    try {
        const coupons = await Coupon.getAll();
        res.json(coupons);
    } catch (error) {
        next(error);
    }
};

const getCouponByCode = async (req, res, next) => {
    try{
        const couponCode = req.query.id;
        const result = await Coupon.getByCode(couponCode);
        if(result.length == 0){
            res.send('Invalid')
        }
        const code = result[0];
        res.json(code)
    } catch (error) {
        next(error);
    }
}

const applyCoupon = async (req, res, next) => {
    try {
        const couponCode = req.query.code;
        const totalAmount = req.body.totalAmount;

        const validation = await Coupon.isValidCoupon(couponCode, totalAmount);

        if (validation.isValid) {
            const discountedAmount = calculateDiscountedAmount(totalAmount, validation.coupon.DiscountPercent);
            const discountAmount = discountedAmount - totalAmount;
            res.json({ success: true, discountedAmount, totalAmount, discountAmount });
        } else {
            res.json({ success: false, message: validation.message });
        }
    } catch (error) {
        next(error);
    }
};

//function to calculate discounted amount
function calculateDiscountedAmount(totalAmount, discountPercent) {
    const discount = (totalAmount * discountPercent) / 100;
    return totalAmount - discount;
}

module.exports = {
    getCoupons,
    applyCoupon,
    getCouponByCode
};