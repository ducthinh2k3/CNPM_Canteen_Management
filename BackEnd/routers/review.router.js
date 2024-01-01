const {
    getAllReviews,
    addReview
} = require('../controller/review.controller');

const express = require('express');
const router = express.Router();

router.get('/product-reviews/:id', getAllReviews);
router.post('/product-reviews/add', addReview);

module.exports = router;