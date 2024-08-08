const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
    rating: Number,
    comment: String,
    date: Date
});

module.exports = mongoose.model('Review', reviewSchema);
