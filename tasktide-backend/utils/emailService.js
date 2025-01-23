const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "your-email@gmail.com",
    pass: "your-email-password",
  },
});

exports.sendConfirmationEmail = async (email, { name, role }) => {
  const mailOptions = {
    from: "TaskTide <your-email@gmail.com>",
    to: email,
    subject: "Welcome to TaskTide",
    text: `Hello ${name},\n\nThank you for registering as a ${role}.\n\n- TaskTide Team`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Error sending email:", error.message);
    return false;
  }
};
