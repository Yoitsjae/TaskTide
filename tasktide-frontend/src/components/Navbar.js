import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ userName, userRole }) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: '#232f3e',
      color: '#fff',
      padding: '10px 20px',
    }}>
      <h3>TaskTide</h3>
      <div>
        <span>{userName} - {userRole}</span>
        <div>
          <Link to="/logout" style={{ color: '#fff', marginLeft: '10px' }}>Logout</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
