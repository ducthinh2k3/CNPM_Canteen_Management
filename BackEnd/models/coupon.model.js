const mydb = require('../ultis/mydb');
const tableName = 'coupons';
const tableNameCoupon = 'khuyenmai'

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

    // xu ly them, xoa, sua khuyen mai
    addRow(entity) {
        return mydb.add(tableNameCoupon, entity);
    },

    getCouponByCode: function (code) {
        return mydb.loadSingle(tableNameCoupon, 'MaKM', code);
    },

    async getCouponByPage(page, pageSize) {
        try {
            const offset = (page - 1) * pageSize;
            const limit = pageSize;

            const dataPromise = mydb.load(`SELECT * FROM ${tableNameCoupon} LIMIT ${limit} OFFSET ${offset}`);
            const data = await dataPromise;

            const totalCountPromise = mydb.load(`SELECT COUNT(*) as total FROM ${tableNameCoupon}`);
            const totalCountResult = await totalCountPromise;

            if (Array.isArray(totalCountResult) && totalCountResult.length > 0) {
                const totalItems = totalCountResult[0].total;
                if (Number.isInteger(totalItems) && totalItems > 0) {
                    const totalPage = Math.ceil(totalItems / pageSize);
                    return {
                        data: data,
                        totalPage: totalPage,
                        total: totalItems,
                    };
                }
            }
        } catch (error) {
            console.error('Error in getCouponByPage:', error);
            throw error;
        }
    },

    updateRow(entity) {
        const condition = {
            MaKM: entity.MaKM
        }
        delete entity.MaKM;
        return mydb.update(tableNameCoupon, entity, condition);
    },

    deleteRowByID(PromotionCode) {
        const condition = {
            MaKM: PromotionCode
        }
        return mydb.delete(tableNameCoupon, condition);
    }
};