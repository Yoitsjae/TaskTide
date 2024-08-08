import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role'); // Assuming role is stored in local storage after login

    return (
        <div className="navbar">
            <h1>TaskTide</h1>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/services">Services</Link>
                {token && <Link to="/profile">Profile</Link>}
                {role === 'Admin' && <Link to="/admin">Admin</Link>}
                {token ? (
                    <Link to="/logout">Logout</Link>
                ) : (
                    <Link to="/login">Login</Link>
                )}
            </nav>
        </div>
    );
};

export default Navbar;
