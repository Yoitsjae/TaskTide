import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    role: 'Customer', // Default role
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
    if (!formData.name || !formData.surname || !formData.email || !formData.password) {
      setError('All fields are required');
      return;
    }

    try {
      // Send data to the backend
      const response = await axios.post('/api/auth/signup', formData);

      // On success
      setSuccessMessage(`An email has been sent to ${formData.email} confirming your registration.`);
      setFormData({
        name: '',
        surname: '',
        email: '',
        password: '',
        role: 'Customer', // Reset to default role
      });
    } catch (err) {
      // Handle errors
      if (err.response && err.response.data) {
        if (err.response.data.message === 'This account already exists') {
          setError(
            <>
              This account already exists. Please{' '}
              <a href="/login.html" style={{ color: 'blue' }}>
                login here
              </a>
              .
            </>
          );
        } else if (err.response.data.message === 'Email could not be sent') {
          setError(
            <>
              Signup successful, but the confirmation email could not be sent. Please{' '}
              <a
                href={`mailto:ncubejason896@gmail.com?subject=TaskTide%20Signup%20Issue&body=Hello,%20I%20signed%20up%20for%20TaskTide%20but%20did%20not%20receive%20a%20confirmation%20email.`}
                style={{ color: 'blue' }}
              >
                send an email to support
              </a>
              .
            </>
          );
        } else {
          setError('An error occurred. Please try again later.');
        }
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  return (
    <div className="signup-container" style={{ padding: '2rem', maxWidth: '500px', margin: 'auto' }}>
      <h2>Sign Up for TaskTide</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
            style={{ padding: '0.5rem', marginBottom: '1rem' }}
          />
        </div>
        <div className="form-group">
          <label>Surname</label>
          <input
            type="text"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            placeholder="Enter your surname"
            required
            style={{ padding: '0.5rem', marginBottom: '1rem' }}
          />
        </div>
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
        <div className="form-group">
          <label>Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            style={{ padding: '0.5rem', marginBottom: '1rem' }}
          >
            <option value="Customer">Customer</option>
            <option value="Service Provider">Service Provider</option>
          </select>
        </div>
        <button type="submit" style={{ padding: '0.5rem', backgroundColor: 'blue', color: 'white' }}>
          Sign Up
        </button>
      </form>

      {/* Error message */}
      {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}

      {/* Success message */}
      {successMessage && <p style={{ color: 'green', marginTop: '1rem' }}>{successMessage}</p>}
    </div>
  );
};

export default Signup;
