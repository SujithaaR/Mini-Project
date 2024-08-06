const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { JWT_SECRET } = process.env;

// Middleware to check authentication
module.exports = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) return res.status(401).send('Access denied');

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;

        // Fetch user details to attach them to req.user
        const user = await User.findById(decoded.userId);
        if (!user) return res.status(401).send('User not found'); // Handle case where user is not found

        req.user.role = user.role; // Attach role to req.user for role-based middleware

        console.log('Authenticated user:', req.user); // Log authenticated user details

        next();
    } catch (err) {
        console.error('Token verification error:', err); // Log error details
        res.status(401).send('Invalid token');
    }
};



