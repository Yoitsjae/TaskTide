import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Map from './Map';

const ServiceDetails = () => {
    const { id } = useParams();
    const [service, setService] = useState({});
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    useEffect(() => {
        const fetchService = async () => {
            const result = await axios.get(`/api/services/${id}`);
            setService(result.data);
        };
        const fetchReviews = async () => {
            const result = await axios.get(`/api/reviews/service/${id}`);
            setReviews(result.data);
        };
        fetchService();
        fetchReviews();
    }, [id]);

    const handleReview = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Please log in to leave a review.');
            return;
        }
        try {
            await axios.post('/api/reviews', { serviceId: service._id, rating, comment }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Review submitted!');
            setRating(0);
            setComment('');
            const result = await axios.get(`/api/reviews/service/${id}`);
            setReviews(result.data);
        } catch (err) {
            alert('Error submitting review: ' + err.message);
        }
    };

    return (
        <div className="container">
            <h2>{service.title}</h2>
            <p>{service.description}</p>
            <p>Price: ${service.price}</p>
            <p>Location: {service.location}</p>
            <h3>Reviews</h3>
            <div className="reviews">
                {reviews.map(review => (
                    <div key={review._id} className="review">
                        <p>Rating: {review.rating}/5</p>
                        <p>{review.comment}</p>
                        <p>By: {review.customer.name}</p>
                    </div>
                ))}
            </div>
            <div className="review-form">
                <h3>Leave a Review</h3>
                <label>Rating:</label>
                <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} min="1" max="5" />
                <label>Comment:</label>
                <textarea value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                <button onClick={handleReview} className="cta-button">Submit Review</button>
            </div>
            {service.latitude && service.longitude && (
                <Map latitude={service.latitude} longitude={service.longitude} />
            )}
        </div>
    );
}

export default ServiceDetails;
