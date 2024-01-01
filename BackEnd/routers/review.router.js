const {
    getReviewByID,
    addReview
} = require('../controller/review.controller');

const express = require('express');
const router = express.Router();

router.get('/review', getReviewByID);
router.post('/review/add', addReview);

module.exports = router;