const User = require('../models/userModel'); // Make sure this path is correct

// Middleware to check if user has the required role(s)
module.exports = (requiredRoles) => {
    return async (req, res, next) => {
        console.log('User ID from request:', req.user.userId); // Log user ID from request

        try {
            const user = await User.findById(req.user.userId);

            if (!user) {
                console.error('User not found:', req.user.userId); // Log if user is not found
                return res.status(403).send('Access forbidden');
            }

            console.log('User role:', user.role); // Log the user role

            // Convert requiredRoles to lowercase and compare with user role
            if (!requiredRoles.map(role => role.toLowerCase()).includes(user.role.toLowerCase())) {
                console.error('Role not permitted:', user.role); // Log if role does not match
                return res.status(403).send('Access forbidden');
            }

            next(); // Proceed to the next middleware or route handler
        } catch (err) {
            console.error('Error fetching user:', err); // Log error details
            res.status(400).send('Error fetching user');
        }
    };
};






