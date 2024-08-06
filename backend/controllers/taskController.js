const Task = require('../models/taskModel');
const Project = require('../models/projectModel');
const User = require('../models/userModel');

// Create a new task
exports.createTask = async (req, res) => {
    const { title, description, assignedTo, projectId } = req.body;
    const userId = req.user.userId; // Team lead ID from JWT

    try {
        // Find the project
        const project = await Project.findById(projectId);

        if (!project) {
            console.error('Project not found:', projectId);
            return res.status(400).send('Project not found');
        }

        // Verify the team lead is assigned to the project
        if (project.teamLead.toString() !== userId) {
            console.error('Not authorized. Team lead does not match:', userId);
            return res.status(403).send('Not authorized');
        }

        // Verify the user to assign exists
        const user = await User.findById(assignedTo);
        if (!user) {
            console.error('User not found:', assignedTo);
            return res.status(400).send('User not found');
        }

        // Create a new task
        const task = new Task({
            title,
            description,
            assignedTo, // Updated field
            project: projectId // Updated field
        });

        await task.save();

        // Add task to the project
        project.tasks = project.tasks || []; // Ensure tasks field exists
        project.tasks.push(task._id);
        await project.save();

        res.status(201).send('Task created successfully');
    } catch (err) {
        console.error('Error creating task:', err);
        res.status(400).send('Error creating task');
    }
};

// Get all tasks for a project
exports.getTasks = async (req, res) => {
    const projectId = req.params.projectId;

    try {
        // Find the project
        const project = await Project.findById(projectId);

        if (!project) return res.status(400).send('Project not found');

        // Get tasks for the project
        const tasks = await Task.find({ project: projectId }).populate('assignedTo');
        res.json(tasks);
    } catch (err) {
        res.status(500).send('Error fetching tasks');
    }
};

// Update task status
exports.updateTaskStatus = async (req, res) => {
    const { taskId } = req.params;
    const { status } = req.body;
    const userId = req.user.userId; // ID from JWT

    try {
        // Verify status is valid (you can add more status values as needed)
        const validStatuses = ['doing', 'done', 'not completed'];
        if (!validStatuses.includes(status)) {
            return res.status(400).send('Invalid status');
        }

        // Find the task
        const task = await Task.findById(taskId);
        if (!task) return res.status(404).send('Task not found');

        // Check if the user is the one assigned to the task
        if (task.assignedTo.toString() !== userId) {
            return res.status(403).send('Not authorized to update this task');
        }

        // Update the task status
        task.status = status;
        await task.save();

        res.status(200).send('Task status updated successfully');
    } catch (err) {
        console.error('Error updating task status:', err);
        res.status(500).send('Error updating task status');
    }
};
