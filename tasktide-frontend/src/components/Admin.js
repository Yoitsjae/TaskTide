import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css'; // Include CSS for styling

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [services, setServices] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [analytics, setAnalytics] = useState({});
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch data for users, services, reviews, and analytics
        axios.get('/api/admin/users')
            .then(response => setUsers(response.data))
            .catch(error => setError('Error fetching users.'));

        axios.get('/api/admin/services')
            .then(response => setServices(response.data))
            .catch(error => setError('Error fetching services.'));

        axios.get('/api/admin/reviews')
            .then(response => setReviews(response.data))
            .catch(error => setError('Error fetching reviews.'));

        axios.get('/api/admin/analytics')
            .then(response => setAnalytics(response.data))
            .catch(error => setError('Error fetching analytics.'));
    }, []);

    const handleApproval = (userId) => {
        axios.post(`/api/admin/users/${userId}/approve`)
            .then(response => {
                if (response.data.success) {
                    setUsers(users.map(user =>
                        user.id === userId ? { ...user, approved: true } : user
                    ));
                } else {
                    setError('Error approving user.');
                }
            })
            .catch(error => setError('Error approving user.'));
    };

    const handleModeration = (serviceId, status) => {
        axios.post(`/api/admin/services/${serviceId}/moderate`, { status })
            .then(response => {
                if (response.data.success) {
                    setServices(services.map(service =>
                        service.id === serviceId ? { ...service, status } : service
                    ));
                } else {
                    setError('Error moderating service.');
                }
            })
            .catch(error => setError('Error moderating service.'));
    };

    return (
        <div className="admin-container">
            <h1>Admin Dashboard</h1>
            {error && <p className="error-message">{error}</p>}

            <section className="user-management">
                <h2>User Management</h2>
                <ul>
                    {users.map(user => (
                        <li key={user.id}>
                            {user.name} - {user.email} ({user.userType})
                            {!user.approved && (
                                <button
                                    className="approve-button"
                                    onClick={() => handleApproval(user.id)}
                                >
                                    Approve
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            </section>

            <section className="service-management">
                <h2>Service Management</h2>
                <ul>
                    {services.map(service => (
                        <li key={service.id}>
                            {service.name} - {service.description}
                            <select
                                value={service.status}
                                onChange={(e) => handleModeration(service.id, e.target.value)}
                            >
                                <option value="approved">Approved</option>
                                <option value="pending">Pending</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="review-management">
                <h2>Review Management</h2>
                <ul>
                    {reviews.map(review => (
                        <li key={review.id}>
                            {review.text} - {review.userName} ({review.rating})
                        </li>
                    ))}
                </ul>
            </section>

            <section className="analytics">
                <h2>Platform Analytics</h2>
                <p><strong>Total Users:</strong> {analytics.totalUsers}</p>
                <p><strong>Total Services:</strong> {analytics.totalServices}</p>
                <p><strong>Total Transactions:</strong> ${analytics.totalTransactions}</p>
                <p><strong>Active Bookings:</strong> {analytics.activeBookings}</p>
            </section>
        </div>
    );
};

export default Admin;
