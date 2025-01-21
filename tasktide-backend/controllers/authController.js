const User = require('../models/User');

exports.signup = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        if (!name || !email || !password || !role) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists.' });
        }

        const user = new User({ name, email, password, role });
        await user.save();

        res.status(201).json({ message: 'Sign up successful.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
};
