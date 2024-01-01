const Review = require('../models/review.model');

const getAllReviews = async (req, res, next) => {
    try {
        const productId = req.params.MaSP;
        const reviews = await Review.getAllReviewsWithID(productId);
        res.json(reviews); 
    } catch (error) {
        next(error);
    }
}

const addReview = async (req, res, next) => {
    try {
        const entity = req.body
        const rs = await Review.addRowReview(entity);
        res.json(rs); 
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllReviews,
    addReview
}