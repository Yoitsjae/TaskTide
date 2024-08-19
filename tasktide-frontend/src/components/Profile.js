import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css'; // Include CSS for styling

const Profile = () => {
    const [user, setUser] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        newPassword: '',
        role: '',
    });

    useEffect(() => {
        // Fetch user data from API
        axios.get('/api/user/profile')
            .then(response => {
                setUser(response.data);
                setFormData({
                    name: response.data.name,
                    email: response.data.email,
                    password: '',
                    newPassword: '',
                    role: response.data.role,
                });
            })
            .catch(error => console.error('Error fetching user data:', error));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleUpdateProfile = (e) => {
        e.preventDefault();
        axios.post('/api/user/update', formData)
            .then(response => {
                setUser(response.data);
                setEditMode(false);
                alert('Profile updated successfully');
            })
            .catch(error => console.error('Error updating profile:', error));
    };

    const handleToggleEditMode = () => {
        setEditMode(prevState => !prevState);
    };

    if (!user) return <div>Loading...</div>;

    return (
        <div className="profile-container">
            <h1>Profile</h1>
            {editMode ? (
                <form onSubmit={handleUpdateProfile}>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Current Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="newPassword">New Password:</label>
                        <input
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button type="submit" className="submit-button">Update Profile</button>
                </form>
            ) : (
                <div className="profile-info">
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Role:</strong> {user.role}</p>
                    <button onClick={handleToggleEditMode} className="edit-button">Edit Profile</button>
                </div>
            )}
            {user.role === 'Service Provider' && (
                <div className="service-provider-info">
                    <h2>Service Listings</h2>
                    {/* Render service listings here */}
                    <p>No service listings yet.</p>
                    <h2>Booking History</h2>
                    {/* Render booking history here */}
                    <p>No bookings yet.</p>
                </div>
            )}
            {user.role === 'Customer' && (
                <div className="customer-info">
                    <h2>Booking History</h2>
                    {/* Render booking history here */}
                    <p>No bookings yet.</p>
                    <h2>Reviews</h2>
                    {/* Render reviews here */}
                    <p>No reviews yet.</p>
                </div>
            )}
        </div>
    );
};

export default Profile;
