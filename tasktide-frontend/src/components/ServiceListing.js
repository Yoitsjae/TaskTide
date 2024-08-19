import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ServiceListing.css'; // Include CSS for styling

const ServiceListing = () => {
    const [services, setServices] = useState([]);
    const [filteredServices, setFilteredServices] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('');

    useEffect(() => {
        // Fetch services data from API
        axios.get('/api/services')
            .then(response => {
                setServices(response.data);
                setFilteredServices(response.data);
            })
            .catch(error => console.error('Error fetching services:', error));
    }, []);

    useEffect(() => {
        // Apply search and filter
        const results = services.filter(service =>
            (service.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            service.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
            (filterCategory ? service.category === filterCategory : true)
        );
        setFilteredServices(results);
    }, [searchTerm, filterCategory, services]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleFilterChange = (e) => {
        setFilterCategory(e.target.value);
    };

    const handleViewProfile = (providerId) => {
        // Redirect to provider's profile
        window.location.href = `/profile/${providerId}`;
    };

    return (
        <div className="service-listing-container">
            <h1>Available Services</h1>
            <div className="search-filter-container">
                <input
                    type="text"
                    placeholder="Search services..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="search-input"
                />
                <select
                    value={filterCategory}
                    onChange={handleFilterChange}
                    className="filter-select"
                >
                    <option value="">All Categories</option>
                    <option value="Plumbing">Plumbing</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Cleaning">Cleaning</option>
                    {/* Add more categories as needed */}
                </select>
            </div>
            <div className="service-list">
                {filteredServices.length > 0 ? (
                    filteredServices.map(service => (
                        <div key={service._id} className="service-card">
                            <h2>{service.name}</h2>
                            <p>{service.description}</p>
                            <p><strong>Price:</strong> ${service.price}</p>
                            <p><strong>Availability:</strong> {service.availability}</p>
                            <button
                                onClick={() => handleViewProfile(service.providerId)}
                                className="view-profile-button"
                            >
                                View Profile
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No services found.</p>
                )}
            </div>
        </div>
    );
};

export default ServiceListing;
