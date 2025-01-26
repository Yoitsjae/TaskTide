import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div style={{ width: '250px', background: '#232f3e', color: '#fff', padding: '20px', height: '100vh' }}>
      <h3>TaskTide</h3>
      <nav>
        <ul>
          <li><Link to="/dashboard" style={{ color: '#fff' }}>Dashboard</Link></li>
          <li><Link to="/messages" style={{ color: '#fff' }}>Messages</Link></li>
          <li><Link to="/jobs" style={{ color: '#fff' }}>Jobs</Link></li>
          <li><Link to="/profile" style={{ color: '#fff' }}>Profile</Link></li>
          <li><Link to="/support" style={{ color: '#fff' }}>Support</Link></li>
          <li><Link to="/logout" style={{ color: '#fff' }}>Logout</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
