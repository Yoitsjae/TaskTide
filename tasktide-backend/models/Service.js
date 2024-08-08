const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    provider: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: String,
    description: String,
    price: Number,
    availability: [String], // List of available time slots
    location: String,
    images: [String],
    ratings: [Number]
});

module.exports = mongoose.model('Service', serviceSchema);
