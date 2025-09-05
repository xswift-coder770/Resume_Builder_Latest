const express = require('express');
const { createReview, getReviews } = require('../controllers/reviewController');
const router = express.Router();

router.post('/reviewpg-homepg', createReview);
router.get('/reviews', getReviews);

module.exports = router;
