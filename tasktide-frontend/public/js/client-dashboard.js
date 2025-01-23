import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/dashboard.css';

const ClientDashboard = () => {
    const [userData, setUserData] = useState({});

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('jwt');
                const response = await axios.get('/api/user/me', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserData();
    }, []);

    return (
        <div className="dashboard-container">
            <h1>Welcome, {userData.name}!</h1>
            <p>Role: {userData.role}</p>
            <div className="dashboard-links">
                <a href="/profile">Edit Profile</a>
                <a href="/services">View Services</a>
            </div>
        </div>
    );
};

export default ClientDashboard;