const Review = require('../models/Review');

// Create Review
exports.createReview = async (req, res) => {
  const { reviewText, rating } = req.body;
  try {
    const newReview = await Review.create({ rating, reviewtext: reviewText });
    res.status(201).json({ success: true, review: newReview });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating review' });
  }
};

// Get All Reviews
exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json({ success: true, reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching reviews' });
  }
};
