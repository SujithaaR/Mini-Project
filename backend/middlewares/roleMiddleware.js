// const User = require('../models/userModel'); // Make sure this path is correct

// // Middleware to check if user has the required role(s)
// module.exports = (requiredRoles) => {
//     return async (req, res, next) => {
//         console.log('User ID from request:', req.user.userId); // Log user ID from request

//         try {
//             const user = await User.findById(req.user.userId);

//             if (!user) {
//                 console.error('User not found:', req.user.userId); // Log if user is not found
//                 return res.status(403).send('Access forbidden');
//             }

//             console.log('User role:', user.role); // Log the user role

//             // Convert requiredRoles to lowercase and compare with user role
//             if (!requiredRoles.map(role => role.toLowerCase()).includes(user.role.toLowerCase())) {
//                 console.error('Role not permitted:', user.role); // Log if role does not match
//                 return res.status(403).send('Access forbidden');
//             }

//             next(); // Proceed to the next middleware or route handler
//         } catch (err) {
//             console.error('Error fetching user:', err); // Log error details
//             res.status(400).send('Error fetching user');
//         }
//     };
// };

// const User = require('../models/userModel'); // Ensure this path is correct

// // Middleware to check if user has the required role(s)
// module.exports = (requiredRoles) => {
//     return async (req, res, next) => {
//         console.log('User ID from request:', req.user.userId); // Log user ID from request

//         // Convert requiredRoles to an array if it’s a string
//         if (typeof requiredRoles === 'string') {
//             requiredRoles = [requiredRoles];
//         }

//         // Check if requiredRoles is an array
//         if (!Array.isArray(requiredRoles)) {
//             console.error('Invalid requiredRoles:', requiredRoles); // Log if requiredRoles is not an array
//             return res.status(500).send('Server error');
//         }

//         try {
//             const user = await User.findById(req.user.userId);

//             if (!user) {
//                 console.error('User not found:', req.user.userId); // Log if user is not found
//                 return res.status(403).send('Access forbidden');
//             }

//             console.log('User role:', user.role); // Log the user role

//             // Convert requiredRoles to lowercase and compare with user role
//             const roles = requiredRoles.map(role => role.toLowerCase());
//             if (!roles.includes(user.role.toLowerCase())) {
//                 console.error('Role not permitted:', user.role); // Log if role does not match
//                 return res.status(403).send('Access forbidden');
//             }

//             next(); // Proceed to the next middleware or route handler
//         } catch (err) {
//             console.error('Error fetching user:', err); // Log error details
//             res.status(400).send('Error fetching user');
//         }
//     };
// };

module.exports = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).send('Access denied');
        }
        next();
    };
};









