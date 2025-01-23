const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Get token from the "Authorization" header

    if (!token) {
      return res.status(401).json({ message: 'No token provided. Access denied.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user in the database
    const user = await User.findOne({ where: { id: decoded.userId } });

    if (!user) {
      return res.status(401).json({ message: 'User not found.' });
    }

    if (!user.isPaymentConfirmed) {
      return res.status(400).json({ message: 'Payment is pending.' });
    }

    req.user = user; // Attach user to the request object for use in other routes
    next(); // Pass control to the next middleware/route handler
  } catch (error) {
    res.status(500).json({ message: 'An error occurred during authentication.', error: error.message });
  }
};

module.exports = authenticateUser;
