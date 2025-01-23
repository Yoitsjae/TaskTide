const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const axios = require('axios');

// Utility function to send emails
const sendEmail = async (to, subject, text, attachments = []) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_USER,
      to,
      subject,
      text,
      attachments,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (err) {
    console.error('Email sending failed:', err);
    return false;
  }
};

// Controller to handle user signup
const signupUser = async (req, res) => {
  try {
    const { name, surname, email, password, role } = req.body;

    // Validate input fields
    if (!name || !surname || !email || !password || !role) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Check email validity using a mock validation API
    const emailValidationResponse = await axios.get(
      `https://api.mockemailvalidation.com/validate?email=${email}`
    );
    if (!emailValidationResponse.data.isValid) {
      return res.status(400).json({ message: 'Invalid email address.' });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: 'This account already exists. Please log in.',
        loginLink: '/login.html',
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = new User({ name, surname, email, password: hashedPassword, role });
    await newUser.save();

    // Send confirmation email
    const subject = 'Welcome to TaskTide';
    const text = `Dear ${name},\n\nThank you for signing up for TaskTide! Your account will be activated after payment confirmation.\n\nBest regards,\nTaskTide Team`;

    const emailSent = await sendEmail(email, subject, text);

    if (emailSent) {
      return res.status(201).json({ message: 'Signup successful. Confirmation email sent.' });
    } else {
      return res.status(500).json({
        message: 'Signup successful, but the confirmation email could not be sent.',
        emailFallback: `mailto:${process.env.SMTP_USER}?subject=TaskTide%20Signup%20Issue&body=Hello,%20I%20signed%20up%20but%20did%20not%20receive%20a%20confirmation%20email.`,
      });
    }
  } catch (err) {
    console.error('Signup error:', err);
    return res.status(500).json({ message: 'An error occurred during signup.', error: err.message });
  }
};

// Controller to handle payment confirmation via PayPal IPN
const confirmPayment = async (req, res) => {
  try {
    const data = req.body;

    // Verify the PayPal payment notification
    const params = new URLSearchParams(data).toString();
    const response = await axios.post(
      `https://ipnpb.sandbox.paypal.com/cgi-bin/webscr`,
      `cmd=_notify-validate&${params}`,
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    if (response.data === 'VERIFIED' && data.payment_status === 'Completed') {
      const userEmail = data.payer_email;

      // Find user by email
      const user = await User.findOne({ email: userEmail });
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }

      // Update payment status
      user.paymentConfirmed = true;
      await user.save();

      // Send payment confirmation email
      const subject = 'Payment Confirmation - TaskTide';
      const text = `Dear ${user.name},\n\nYour payment was received. You now have full access to TaskTide.\n\nBest regards,\nTaskTide Team`;

      const emailSent = await sendEmail(userEmail, subject, text);

      if (emailSent) {
        return res.status(200).json({ message: 'Payment confirmed and email sent.' });
      } else {
        return res.status(500).json({
          message: 'Payment confirmed, but the confirmation email could not be sent.',
        });
      }
    } else {
      return res.status(400).json({ message: 'Payment verification failed or incomplete payment.' });
    }
  } catch (err) {
    console.error('Payment confirmation error:', err);
    return res.status(500).json({ message: 'An error occurred during payment confirmation.' });
  }
};

module.exports = { signupUser, confirmPayment };
