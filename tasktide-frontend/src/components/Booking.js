import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Booking.css'; // Include CSS for styling

const Booking = ({ match }) => {
    const [serviceProvider, setServiceProvider] = useState(null);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
    const [bookingDetails, setBookingDetails] = useState({});
    const [error, setError] = useState('');
    const [confirmation, setConfirmation] = useState('');

    const serviceProviderId = match.params.id; // Assuming you pass serviceProviderId as a route parameter

    useEffect(() => {
        // Fetch service provider details from the API
        axios.get(`/api/service-providers/${serviceProviderId}`)
            .then(response => {
                setServiceProvider(response.data);
                setBookingDetails({
                    providerName: response.data.name,
                    providerEmail: response.data.email,
                });
            })
            .catch(error => setError('Error fetching service provider details.'));
    }, [serviceProviderId]);

    const handleTimeSlotChange = (e) => {
        setSelectedTimeSlot(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!selectedTimeSlot) {
            setError('Please select a time slot.');
            return;
        }
        
        const bookingData = {
            serviceProviderId,
            timeSlot: selectedTimeSlot,
            customerId: '12345', // Replace with actual customer ID from user state or context
        };

        axios.post('/api/bookings', bookingData)
            .then(response => {
                setConfirmation('Booking confirmed! We have sent a confirmation email.');
                setError('');
            })
            .catch(error => setError('Error creating booking.'));
    };

    return (
        <div className="booking-container">
            <h1>Book a Service</h1>
            {serviceProvider ? (
                <div className="booking-form">
                    <h2>Service Provider: {serviceProvider.name}</h2>
                    <p><strong>Email:</strong> {serviceProvider.email}</p>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="time-slot">Select Time Slot:</label>
                        <select
                            id="time-slot"
                            value={selectedTimeSlot}
                            onChange={handleTimeSlotChange}
                            className="time-slot-select"
                        >
                            <option value="">--Select--</option>
                            {serviceProvider.availableTimeSlots.map((slot, index) => (
                                <option key={index} value={slot}>{slot}</option>
                            ))}
                        </select>
                        <button type="submit" className="submit-button">Book Now</button>
                    </form>
                    {error && <p className="error-message">{error}</p>}
                    {confirmation && <p className="confirmation-message">{confirmation}</p>}
                </div>
            ) : (
                <p>Loading service provider details...</p>
            )}
        </div>
    );
};

export default Booking;
