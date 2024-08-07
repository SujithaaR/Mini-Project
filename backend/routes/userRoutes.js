// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // Ensure this path is correct
// Ensure this path is correct

// Route to get all team leads
router.get('/team-leads', userController.getTeamLeads);

// Route to get all regular users
router.get('/users' , userController.getUsers);

// Route to get all users (for admins, includes team leads and users)
router.get('/all-users', userController.getAllUsers);

module.exports = router;
