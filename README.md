# TaskTide Backend

TaskTide is a local service marketplace connecting service providers and customers.

## Features
- User Authentication (JWT)
- Service Listings CRUD
- Booking Management
- PayPal Payment Integration

## API Endpoints
- `POST /api/users/register`: Register a user.
- `POST /api/users/login`: Login a user.
- `GET /api/services`: Get all services.
- `POST /api/bookings`: Create a booking.
- `POST /api/paypal/create`: Create a PayPal payment.
- `POST /api/paypal/execute`: Execute a PayPal payment.

## Deployment
1. Deploy Backend on Render.
2. Configure environment variables:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `PAYPAL_CLIENT_ID`
   - `PAYPAL_CLIENT_SECRET`

## Installation
1. Clone the repository:
   ```bash
   git clone <repo-url>
