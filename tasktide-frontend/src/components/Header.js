import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ user }) => {
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);

  const handleLogout = () => {
    // Logic for logging out (e.g., clearing user data, redirecting to login page)
    setIsLogoutModalVisible(false);
    console.log('User logged out');
  };

  return (
    <header className="header">
      <div className="header-left">
        <h1 className="app-logo">TaskTide</h1>
      </div>

      <div className="header-center">
        <div className="user-info">
          <img src={user.profileImage} alt={`${user.firstName} ${user.lastName}`} className="profile-image" />
          <div className="user-details">
            <p>{`${user.firstName} ${user.lastName}`}</p>
            <p className="user-role">{user.role}</p>
          </div>
        </div>
      </div>

      <div className="header-right">
        <nav className="nav-menu">
          <Link to={user.role === 'Service Provider' ? '/provider-dashboard' : '/client-dashboard'}>Dashboard</Link>
          <Link to={user.role === 'Service Provider' ? '/provider-profile' : '/client-profile'}>Profile</Link>
          <button className="chatbot-button">Chatbot</button>
          <button className="logout-button" onClick={() => setIsLogoutModalVisible(true)}>Logout</button>
        </nav>
      </div>

      {/* Logout Confirmation Modal */}
      {isLogoutModalVisible && (
        <div className="logout-modal">
          <div className="modal-content">
            <p>Are you sure you want to log out?</p>
            <button onClick={handleLogout}>Yes</button>
            <button onClick={() => setIsLogoutModalVisible(false)}>Cancel</button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
