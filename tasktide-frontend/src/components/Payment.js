import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PayPalButtons } from "@paypal/react-paypal-js"; // Import PayPal Buttons component
import './Payment.css'; // Include CSS for styling

const Payment = ({ match }) => {
    const [paymentDetails, setPaymentDetails] = useState(null);
    const [error, setError] = useState('');
    const [confirmation, setConfirmation] = useState('');

    const bookingId = match.params.id; // Assuming you pass bookingId as a route parameter

    useEffect(() => {
        // Fetch payment details from the API
        axios.get(`/api/bookings/${bookingId}/payment`)
            .then(response => {
                setPaymentDetails(response.data);
            })
            .catch(error => setError('Error fetching payment details.'));
    }, [bookingId]);

    const handlePaymentSuccess = (details) => {
        // Notify the backend about the successful payment
        axios.post(`/api/payments/${bookingId}/confirm`, {
            paymentId: details.id,
            payerId: details.payer.payer_id,
        })
        .then(response => {
            if (response.data.success) {
                setConfirmation('Payment successful! You will receive a confirmation email.');
                setError('');
            } else {
                setError('Payment confirmation failed. Please try again.');
            }
        })
        .catch(error => setError('Error confirming payment.'));
    };

    return (
        <div className="payment-container">
            <h1>Payment</h1>
            {paymentDetails ? (
                <div className="payment-form">
                    <h2>Payment Details</h2>
                    <p><strong>Amount:</strong> ${paymentDetails.amount}</p>
                    <p><strong>Service Provider:</strong> {paymentDetails.providerName}</p>
                    <PayPalButtons
                        createOrder={(data, actions) => {
                            return actions.order.create({
                                purchase_units: [{
                                    amount: {
                                        value: paymentDetails.amount
                                    }
                                }]
                            });
                        }}
                        onApprove={(data, actions) => {
                            return actions.order.capture().then(details => {
                                handlePaymentSuccess(details);
                            });
                        }}
                        onError={err => {
                            setError('Payment failed. Please try again.');
                        }}
                    />
                    {error && <p className="error-message">{error}</p>}
                    {confirmation && <p className="confirmation-message">{confirmation}</p>}
                </div>
            ) : (
                <p>Loading payment details...</p>
            )}
        </div>
    );
};

export default Payment;
