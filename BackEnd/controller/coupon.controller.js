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

// Xy ly them, sua, xoa khuyen mai
const addCoupon = async (req, res, next) => {
    try {
        const exist = await Coupon.getCouponByCode(req.body.promotionCode);
        if (exist.length != 0) {
            return res.json({ success: false, message: "Coupon is exist" });
        }
        
        const entity = {
            MaKM: req.body.promotionCode,
            MoTa: req.body.promotionDescription,
            TGBatDau: req.body.promotionStartTime,
            TGKetThuc: req.body.promotionEndTime,
            ChietKhau: req.body.promotionPercent,
        }
        const rs = await Coupon.addRow(entity);
        res.json({ success: true, message: "Coupon add successfull" });
    } catch (error) {
        res.json({ success: false, message: "false" });
        next(error);
    }
}

const getCouponPage = async (req, res, next) => {
    try {
        const page = req.query.page || 1;
        const pageSize = req.query.pageSize || 4; // số dòng trên 1 trang

        const result = await Coupon.getCouponByPage(page, pageSize);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

const updateCoupon = async (req, res, next) => {
    try {
        const entity = {
            MaKM: req.body.editPromotionCode,
            MoTa: req.body.editPromotionDescription,
            TGBatDau: req.body.editPromotionStartTime,
            TGKetThuc: req.body.editPromotionEndTime,
            ChietKhau: req.body.editPromotionPercent,
        }
        const rs = await Coupon.updateRow(entity);
        res.redirect('http://127.0.0.1:5500/FrontEnd/Admin/discount-manager.html')
    } catch (error) {
        next(error);
    }
}

const deleteCoupon = async (req, res, next) => {
    try {
        const PromotionCode = req.query.id;
        const result = await Coupon.deleteRowByID(PromotionCode);
        res.json({ success: true, message: "Product deleted successfully." });
    } catch (error) {
        res.json({ success: false, message: "Product not found or could not be deleted." });
        next(error);
    }
}

module.exports = {
    getCoupons,
    applyCoupon,
    getCouponByCode,
    addCoupon,
    getCouponPage,
    updateCoupon,
    deleteCoupon
};