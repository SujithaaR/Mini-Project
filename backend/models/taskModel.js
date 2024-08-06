const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true }, // Ensure title is used here
    description: { type: String },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Changed from teamLead
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true }, // Changed from teamLead
    status: { type: String, default: 'Pending' }
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
