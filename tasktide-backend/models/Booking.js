const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
    date: Date,
    status: { type: String, enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'] },
    payment: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment' }
});

module.exports = mongoose.model('Booking', bookingSchema);
