const User = require('../models/User');
const { sendEmail } = require('../utils/email');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Controller to handle user signup
const signupUser = async (req, res) => {
  try {
    const { name, surname, email, password, role } = req.body;

    // Validate input
    if (!email || !password || !name || !surname || !role) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Check if email already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: 'This account already exists. Please <a href="/login.html">login here</a>',
      });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user to the database
    const newUser = new User({
      name,
      surname,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    // Send confirmation email to the user
    const subject = 'TaskTide Registration Confirmation';
    const text = `Dear ${name},\n\nThank you for registering with TaskTide! An email has been sent to you confirming your registration. Please check your inbox for further instructions.\n\nBest regards,\nTaskTide Team`;

    await sendEmail(email, subject, text);

    // Respond to the frontend with a success message
    return res.status(201).json({
      message: `An email has been sent to ${email} confirming your registration.`,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller to handle payment confirmation
const confirmPayment = async (req, res) => {
  try {
    const data = req.body;

    // Verify the PayPal payment notification (same as previously explained)
    // Assuming the payment status and user verification were successful

    const userEmail = data.payer_email;
    const paymentStatus = data.payment_status;

    if (paymentStatus === 'Completed') {
      const user = await User.findOne({ email: userEmail });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Update payment status in the database
      user.paymentConfirmed = true;
      await user.save();

      // Send confirmation email to the user
      const subject = 'Payment Confirmation - TaskTide';
      const text = `Dear ${user.name},\n\nYour payment was received. You now have full access to TaskTide. You can log in using the following link:\n\nLogin Link: http://localhost:3000/login.html\n\nBest regards,\nTaskTide Team`;

      await sendEmail(userEmail, subject, text);

      return res.status(200).json({ message: 'Payment confirmed and email sent' });
    } else {
      return res.status(400).json({ message: 'Payment not completed' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  signupUser,
  confirmPayment,
};
