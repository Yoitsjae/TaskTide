import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const history = useHistory();

  // Handle form data change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    // Validate form inputs
    if (!formData.email || !formData.password) {
      setError('Email and Password are required');
      return;
    }

    try {
      // Send data to the backend
      const response = await axios.post('/api/auth/login', formData);

      // On success, store the JWT token
      localStorage.setItem('authToken', response.data.token);

      // Redirect user based on their role
      if (response.data.role === 'Customer') {
        history.push('/customer-dashboard');
      } else if (response.data.role === 'Service Provider') {
        history.push('/service-provider-dashboard');
      }

      setSuccessMessage('Login successful. Redirecting...');
    } catch (err) {
      // Handle errors
      if (err.response && err.response.data) {
        if (err.response.data.message === 'Your email is not registered yet') {
          setError(
            <>
              Your email is not registered yet. Please{' '}
              <a href="/signup.html" style={{ color: 'blue' }}>
                sign up here
              </a>
              .
            </>
          );
        } else if (err.response.data.message === 'Payment is pending') {
          setError('Payment is pending. Please complete your payment to proceed.');
        } else {
          setError('An error occurred. Please try again later.');
        }
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  return (
    <div className="login-container" style={{ padding: '2rem', maxWidth: '500px', margin: 'auto' }}>
      <h2>Login to TaskTide</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            style={{ padding: '0.5rem', marginBottom: '1rem' }}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
            style={{ padding: '0.5rem', marginBottom: '1rem' }}
          />
        </div>
        <button type="submit" style={{ padding: '0.5rem', backgroundColor: 'blue', color: 'white' }}>
          Login
        </button>
      </form>

      {/* Error message */}
      {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}

      {/* Success message */}
      {successMessage && <p style={{ color: 'green', marginTop: '1rem' }}>{successMessage}</p>}
    </div>
  );
};

export default Login;
