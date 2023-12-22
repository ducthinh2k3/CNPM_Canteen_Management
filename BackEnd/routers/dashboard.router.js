const {
    getDashboardPage,
    getAllReviews,
    addReview
} = require('../controller/dashboard.controller');

const express = require('express');
const router = express.Router();

router.get('/product-reviews/:id', getAllReviews);
router.post('/product-reviews/add', addReview);
router.get('/dashboard', getDashboardPage);

module.exports = router;