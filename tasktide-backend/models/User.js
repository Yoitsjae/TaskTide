const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ['Customer', 'ServiceProvider'] },
    services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
    bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
});

module.exports = mongoose.model('User', userSchema);
