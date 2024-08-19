// index.js
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider, useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import './index.css';

// Color Scheme
const colors = {
    primary: '#6C757D',
    secondary: '#17A2B8',
    accent: '#117a8b',
    highlight: '#DC3545',
};

// Redux Actions
const SET_USER = 'SET_USER';
const SET_SERVICES = 'SET_SERVICES';

const setUser = (user) => ({ type: SET_USER, payload: user });
const setServices = (services) => ({ type: SET_SERVICES, payload: services });

// Redux Reducer
const initialState = {
    user: null,
    services: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return { ...state, user: action.payload };
        case SET_SERVICES:
            return { ...state, services: action.payload };
        default:
            return state;
    }
};

// Create Redux Store
const store = createStore(reducer);

// Components
const Home = () => (
    <div style={{ backgroundColor: colors.primary, color: '#fff', padding: '20px' }}>
        <h1>Welcome to TaskTide</h1>
        <button style={{ backgroundColor: colors.accent, color: '#fff', border: 'none', padding: '10px' }}>
            Explore Services
        </button>
    </div>
);

const Services = () => {
    const dispatch = useDispatch();
    const services = useSelector((state) => state.services);

    useEffect(() => {
        axios.get('/api/services')
            .then(response => dispatch(setServices(response.data)))
            .catch(error => console.error('Error fetching services:', error));
    }, [dispatch]);

    return (
        <div style={{ backgroundColor: colors.secondary, color: '#fff', padding: '20px' }}>
            <h1>Services</h1>
            {services.map(service => (
                <div key={service._id} style={{ borderBottom: `1px solid ${colors.accent}`, padding: '10px' }}>
                    <h2>{service.title}</h2>
                    <p>{service.description}</p>
                    <button style={{ backgroundColor: colors.highlight, color: '#fff', border: 'none', padding: '10px' }}>
                        Book Now
                    </button>
                </div>
            ))}
        </div>
    );
};

const Login = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        axios.post('/api/login', { email, password })
            .then(response => {
                const { token } = response.data;
                localStorage.setItem('token', token);
                return axios.get('/api/user', { headers: { Authorization: `Bearer ${token}` } });
            })
            .then(response => dispatch(setUser(response.data)))
            .catch(error => console.error('Error logging in:', error));
    };

    return (
        <div style={{ backgroundColor: colors.primary, color: '#fff', padding: '20px' }}>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit" style={{ backgroundColor: colors.accent, color: '#fff', border: 'none', padding: '10px' }}>
                    Login
                </button>
            </form>
        </div>
    );
};

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('Customer');

    const handleRegister = (e) => {
        e.preventDefault();
        axios.post('/api/register', { name, email, password, userType })
            .then(response => alert('Registration successful'))
            .catch(error => console.error('Error registering:', error));
    };

    return (
        <div style={{ backgroundColor: colors.secondary, color: '#fff', padding: '20px' }}>
            <h1>Register</h1>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    required
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <select value={userType} onChange={(e) => setUserType(e.target.value)}>
                    <option value="Customer">Customer</option>
                    <option value="Service Provider">Service Provider</option>
                </select>
                <button type="submit" style={{ backgroundColor: colors.accent, color: '#fff', border: 'none', padding: '10px' }}>
                    Register
                </button>
            </form>
        </div>
    );
};

const Contact = () => (
    <div style={{ backgroundColor: colors.primary, color: '#fff', padding: '20px' }}>
        <h1>Contact Us</h1>
        <form>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea placeholder="Your Message" required></textarea>
            <button type="submit" style={{ backgroundColor: colors.highlight, color: '#fff', border: 'none', padding: '10px' }}>
                Send Message
            </button>
        </form>
    </div>
);

const AdminPanel = () => (
    <div style={{ backgroundColor: colors.secondary, color: '#fff', padding: '20px' }}>
        <h1>Admin Panel</h1>
        <p>Admin functionalities will be implemented here.</p>
    </div>
);

// App Component
const App = () => (
    <Router>
        <div style={{ color: '#fff' }}>
            <nav style={{ backgroundColor: colors.accent, padding: '10px' }}>
                <a href="/" style={{ color: '#fff', marginRight: '15px' }}>Home</a>
                <a href="/services" style={{ color: '#fff', marginRight: '15px' }}>Services</a>
                <a href="/login" style={{ color: '#fff', marginRight: '15px' }}>Login</a>
                <a href="/register" style={{ color: '#fff', marginRight: '15px' }}>Register</a>
                <a href="/contact" style={{ color: '#fff', marginRight: '15px' }}>Contact</a>
                <a href="/admin" style={{ color: '#fff' }}>Admin Panel</a>
            </nav>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/admin" element={<AdminPanel />} />
            </Routes>
        </div>
    </Router>
);

// Render App
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
