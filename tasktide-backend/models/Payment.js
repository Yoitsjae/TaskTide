const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' },
    amount: Number,
    status: { type: String, enum: ['Pending', 'Completed', 'Failed'] },
    transactionId: String
});

module.exports = mongoose.model('Payment', paymentSchema);
