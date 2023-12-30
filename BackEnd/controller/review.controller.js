const Review = require('../models/review.model');

const getReviewByID = async (req, res, next) => {
    try{
        const productID = req.query.id;
        const result = await Review.getByID(productID);
        if(result.length == 0){
            res.send('Invalid')
        }
        const review = result[0];
        res.json(review)
    } catch (error) {
        next(error);
    }
}

const addReview = async (req, res, next) => {
    try{
        const entity = {
            MaSP: req.body.productID,
            Rating: req.body.stars,
            NguoiThucHien: req.body.username,
            NoiDung: req.body.comment-content
        }
        const rs = await Review.addRow(entity);
        res.redirect('http://127.0.0.1:5500/FrontEnd/Shop/Review.html')
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getReviewByID,
    addReview
}