const Booking = require('../models/Booking');

const createBooking = async (req, res) => {
  const { serviceId, date } = req.body;

  try {
    const booking = new Booking({
      serviceId,
      customerId: req.user.id,
      date,
    });

    const createdBooking = await booking.save();
    res.status(201).json(createdBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createBooking };
