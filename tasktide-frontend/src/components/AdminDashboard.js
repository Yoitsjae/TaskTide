import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [services, setServices] = useState([]);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            const userResult = await axios.get('/api/admin/users', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(userResult.data);
            const serviceResult = await axios.get('/api/admin/services', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setServices(serviceResult.data);
            const reviewResult = await axios.get('/api/admin/reviews', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setReviews(reviewResult.data);
        };
        fetchData();
    }, []);

    const approveProvider = async (id) => {
        const token = localStorage.getItem('token');
        try {
            await axios.put(`/api/admin/users/${id}/approve`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Provider approved');
        } catch (err) {
            alert('Error approving provider: ' + err.message);
        }
    };

    const deleteUser = async (id) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`/api/admin/users/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(users.filter(user => user._id !== id));
            alert('User deleted');
        } catch (err) {
            alert('Error deleting user: ' + err.message);
        }
    };

    const deleteService = async (id) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`/api/admin/services/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setServices(services.filter(service => service._id !== id));
            alert('Service deleted');
        } catch (err) {
            alert('Error deleting service: ' + err.message);
        }
    };

    const deleteReview = async (id) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`/api/admin/reviews/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setReviews(reviews.filter(review => review._id !== id));
            alert('Review deleted');
        } catch (err) {
            alert('Error deleting review: ' + err.message);
        }
    };

    return (
        <div className="container">
            <h2>Admin Dashboard</h2>
            <div className="admin-section">
                <h3>Users</h3>
                <ul>
                    {users.map(user => (
                        <li key={user._id}>
                            {user.name} - {user.email} ({user.role})
                            {!user.isApproved && user.role === 'ServiceProvider' && (
                                <button onClick={() => approveProvider(user._id)}>Approve</button>
                            )}
                            <button onClick={() => deleteUser(user._id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="admin-section">
                <h3>Services</h3>
                <ul>
                    {services.map(service => (
                        <li key={service._id}>
                            {service.title} by {service.provider.name}
                            <button onClick={() => deleteService(service._id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="admin-section">
                <h3>Reviews</h3>
                <ul>
                    {reviews.map(review => (
                        <li key={review._id}>
                            {review.comment} - {review.rating}/5 by {review.customer.name} for {review.service.title}
                            <button onClick={() => deleteReview(review._id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AdminDashboard;
