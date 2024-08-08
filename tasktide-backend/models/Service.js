const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    provider: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: String,
    description: String,
    price: Number,
    availability: [String], // List of available time slots
    location: String,
    latitude: Number, // Add latitude for map integration
    longitude: Number, // Add longitude for map integration
    images: [String],
    ratings: [Number],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
});

module.exports = mongoose.model('Service', serviceSchema);
