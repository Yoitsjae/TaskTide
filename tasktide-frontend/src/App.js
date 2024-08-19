// app.js
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const PayFast = require('payfast'); // or 'paypal-rest-sdk' for PayPal integration
const cors = require('cors');
const User = require('./models/User');
const Service = require('./models/Service');
const Booking = require('./models/Booking');
const Review = require('./models/Review');

const app = express();

// Middleware Setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(session({
    secret: 'tasktide_secret_key',
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/tasktide', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Passport Local Strategy for Login
passport.use(new LocalStrategy(
    async (email, password, done) => {
        try {
            const user = await User.findOne({ email });
            if (!user) return done(null, false, { message: 'Incorrect email.' });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return done(null, false, { message: 'Incorrect password.' });

            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }
));

// Passport JWT Strategy
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'tasktide_jwt_secret',
}, async (jwt_payload, done) => {
    try {
        const user = await User.findById(jwt_payload.id);
        if (!user) return done(null, false);
        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));

// Register Route
app.post('/api/register', async (req, res) => {
    const { name, email, password, userType, serviceCategories, pricing, availability, serviceDescriptions } = req.body;
    
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            userType,
            serviceCategories,
            pricing,
            availability,
            serviceDescriptions,
        });
        
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login Route
app.post('/api/login', (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(400).json({ message: info.message });

        const token = jwt.sign({ id: user._id }, 'tasktide_jwt_secret', { expiresIn: '1h' });
        res.json({ token });
    })(req, res, next);
});

// Logout Route
app.post('/api/logout', (req, res) => {
    // Simply remove the JWT from the client-side
    res.json({ message: 'Logged out successfully' });
});

// Service Listings Endpoints
app.post('/api/services', async (req, res) => {
    const { title, description, price, category, providerId } = req.body;

    try {
        const newService = new Service({ title, description, price, category, providerId });
        await newService.save();
        res.status(201).json(newService);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/services', async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/services/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, price, category } = req.body;

    try {
        const updatedService = await Service.findByIdAndUpdate(id, { title, description, price, category }, { new: true });
        res.json(updatedService);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/services/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await Service.findByIdAndDelete(id);
        res.json({ message: 'Service deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Booking System Endpoints
app.post('/api/bookings', async (req, res) => {
    const { userId, serviceId, date, time } = req.body;

    try {
        const newBooking = new Booking({ userId, serviceId, date, time });
        await newBooking.save();
        res.status(201).json(newBooking);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/bookings/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const bookings = await Booking.find({ userId });
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Payment Processing (Example with PayFast)
// Note: Ensure to install PayFast SDK or use appropriate integration
app.post('/api/payment', async (req, res) => {
    const { amount, paymentDetails } = req.body;

    try {
        // Example code, adjust according to PayFast SDK documentation
        const response = await PayFast.processPayment(amount, paymentDetails);
        res.json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Review System Endpoints
app.post('/api/reviews', async (req, res) => {
    const { userId, serviceId, rating, comment } = req.body;

    try {
        const newReview = new Review({ userId, serviceId, rating, comment });
        await newReview.save();
        res.status(201).json(newReview);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/reviews/:serviceId', async (req, res) => {
    const { serviceId } = req.params;

    try {
        const reviews = await Review.find({ serviceId });
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Server Setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
