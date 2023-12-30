const mydb = require('../ultis/mydb');
const tableNameReviews = 'DanhGia'

module.exports = class Review {
    static getByID(productID) {
        return mydb.load(`select * from ${tableNameReviews}
                          where ${tableNameReviews}.MaSP = ${productID}`);
    }

    static addRow(entity) {
        return mydb.add(tableNameReviews, entity);
    }
}