const mydb = require('../ultis/mydb');
const tableNameReviews = 'DanhGia'

module.exports = class Review {
    static getAllReviewsWithID(productID) {
        return mydb.load(`select * from ${tableNameReviews}
                          where ${tableNameReviews}.MaSP = ${productID}`);
    }

    static addRowReview(entity) {
        return mydb.add(tableNameReviews, entity);
    }
}