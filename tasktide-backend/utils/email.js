const nodemailer = require('nodemailer');
const { EMAIL_FROM, EMAIL_PASS, SMTP_HOST, SMTP_PORT } = process.env;

/**
 * Sends an email using Nodemailer.
 * If sending fails, opens the user's default email client with pre-filled content.
 * 
 * @param {string} to - The recipient's email address.
 * @param {string} subject - The subject of the email.
 * @param {string} text - The plain text content of the email.
 * @returns {Promise<void>}
 */
const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // You can change this to another service if needed
    auth: {
      user: EMAIL_FROM,
      pass: EMAIL_PASS, // Ensure this is the correct password from Mailtrap or Gmail
    },
  });

  const mailOptions = {
    from: EMAIL_FROM,
    to,
    subject,
    text,
  };

  try {
    // Attempt to send email
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);

    // Fallback to opening the user's default email client
    const emailBody = `Subject: ${subject}\n\n${text}`;
    const mailtoLink = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

    // Open the user's email client
    const fallbackMessage = `Failed to send email automatically. Please click the link to send it manually: ${mailtoLink}`;
    console.log(fallbackMessage);
  }
};

module.exports = { sendEmail };
