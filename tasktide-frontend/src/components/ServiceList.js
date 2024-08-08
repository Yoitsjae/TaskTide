import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ServiceList = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchServices = async () => {
            const result = await axios.get('/api/services');
            setServices(result.data);
        };
        fetchServices();
    }, []);

    return (
        <div className="container">
            <h2>Available Services</h2>
            <div className="service-list">
                {services.map(service => (
                    <div key={service._id} className="service-item">
                        <h3>{service.title}</h3>
                        <p>{service.description}</p>
                        <p>Price: ${service.price}</p>
                        <p>Location: {service.location}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ServiceList;
