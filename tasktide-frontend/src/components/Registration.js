// src/components/Registration.js
import React, { useState } from 'react';

function Registration() {
  const [userType, setUserType] = useState('customer');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    serviceCategories: '',
    pricing: '',
    availability: '',
    serviceDescriptions: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUserTypeChange = (type) => {
    setUserType(type);
    setFormData({
      name: '',
      email: '',
      password: '',
      serviceCategories: '',
      pricing: '',
      availability: '',
      serviceDescriptions: ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <div>
        <button onClick={() => handleUserTypeChange('customer')}>Customer</button>
        <button onClick={() => handleUserTypeChange('serviceProvider')}>Service Provider</button>
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Name" required />
        <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" required />
        <input type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="Password" required />
        {userType === 'serviceProvider' && (
          <>
            <input type="text" name="serviceCategories" value={formData.serviceCategories} onChange={handleInputChange} placeholder="Service Categories" />
            <input type="text" name="pricing" value={formData.pricing} onChange={handleInputChange} placeholder="Pricing" />
            <input type="text" name="availability" value={formData.availability} onChange={handleInputChange} placeholder="Availability" />
            <textarea name="serviceDescriptions" value={formData.serviceDescriptions} onChange={handleInputChange} placeholder="Service Descriptions"></textarea>
          </>
        )}
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Registration;
