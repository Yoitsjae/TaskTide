const axios = require("axios");

exports.verifyPayPalPayment = async (paymentId) => {
  try {
    // Call PayPal API for payment verification
    const response = await axios.get(
      `https://api-m.sandbox.paypal.com/v2/checkout/orders/${paymentId}`,
      {
        headers: {
          Authorization: `Bearer YOUR_PAYPAL_ACCESS_TOKEN`,
        },
      }
    );

    if (response.data.status === "COMPLETED") {
      return { success: true };
    }

    return { success: false, message: "Payment not completed" };
  } catch (error) {
    console.error("Error verifying payment:", error.message);
    return { success: false, message: error.message };
  }
};

exports.manualPaymentInstructions = () => {
  return `
    To complete your payment, please use the following details:

    Bank: Capitec
    Account Name: TaskTide
    Account Number: 123456789
    Reference: [Your Email]

    Once payment is made, please send proof of payment to payments@tasktide.com.
  `;
};
