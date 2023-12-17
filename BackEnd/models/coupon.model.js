const mydb = require('../ultis/mydb');
const tableName = 'coupons';

module.exports = {
    getAll: function () {
        return mydb.load(`SELECT * FROM ${tableName}`);
    },

    getByCode: function (code) {
        return mydb.loadSingle(tableName, 'Code', code);
    },

    isValidCoupon: async function (code, totalAmount) {
        const coupon = await this.getByCode(code);

        if (!coupon) {
            return { isValid: false, message: 'Invalid coupon code' };
        }

        return { isValid: true, coupon };
    },
};