const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  rating: Number,
  reviewtext: String,
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
