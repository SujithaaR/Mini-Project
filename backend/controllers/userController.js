const User = require('../models/userModel');

// Controller function to fetch team leads
exports.getTeamLeads = async (req, res) => {
    try {
        const teamLeads = await User.find({ role: 'team_lead' });
        res.status(200).json(teamLeads);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching team leads' });
    }
};

// Controller function to fetch regular users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find({ role: 'user' });
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching users' });
    }
};

// Controller function to fetch all users (admin only)
exports.getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find({});
        res.status(200).json(allUsers);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching all users' });
    }
};
