const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Sign Up
// exports.signUp = async (req, res) => {
//     const { name, email, password, role } = req.body;

//     try {
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const user = new User({ name, email, password: hashedPassword, role });
//         await user.save();
//         res.status(201).send('User registered successfully');
//     } catch (err) {
//         res.status(400).send('Error registering user');
//     }
// };
exports.signUp = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        if (!name || !email || !password || !role) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword, role });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Error registering user:', err);

        if (err.code && err.code === 11000) {
            // Handle duplicate key error (shouldn't occur with the check above)
            res.status(400).json({ error: 'Email already exists' });
        } else if (err.name === 'ValidationError') {
            // Handle validation errors
            res.status(400).json({ error: 'Validation failed', details: err.errors });
        } else {
            // Handle other errors
            res.status(500).json({ error: 'Error registering user' });
        }
    }
};


// Login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).send('User not found');

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).send('Invalid password');
        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token });
       
    } catch (err) {
        res.status(500).send('Error logging in');
    }
};
