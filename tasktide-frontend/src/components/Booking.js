import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Booking = () => {
    const { id } = useParams();
    const [service, setService] = useState({});
    const [date, setDate] = useState('');
    const [orderId, setOrderId] = useState('');

    useEffect(() => {
        const fetchService = async () => {
            const result = await axios.get(`/api/services/${id}`);
            setService(result.data);
        };
        fetchService();
    }, [id]);

    const handleBooking = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Please log in to book a service.');
            return;
        }
        try {
            const bookingResult = await axios.post('/api/bookings', { serviceId: service._id, date }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const bookingId = bookingResult.data._id;
            const paymentResult = await axios.post('/api/payments/create', { bookingId, amount: service.price }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setOrderId(paymentResult.data.id);
        } catch (err) {
            alert('Error booking service: ' + err.message);
        }
    };

    const handlePayment = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Please log in to make a payment.');
            return;
        }
        try {
            const captureResult = await axios.post('/api/payments/capture', { orderId, bookingId: service._id }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Payment successful! Booking confirmed.');
        } catch (err) {
            alert('Error processing payment: ' + err.message);
        }
    };

    return (
        <div className="container">
            <h2>Book Service</h2>
            <div className="service-details">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <p>Price: ${service.price}</p>
                <p>Location: {service.location}</p>
            </div>
            <div className="booking-form">
                <label>Date:</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                <button onClick={handleBooking} className="cta-button">Book Now</button>
            </div>
            {orderId && <button onClick={handlePayment} className="cta-button">Make Payment</button>}
        </div>
    );
}

export default Booking;
