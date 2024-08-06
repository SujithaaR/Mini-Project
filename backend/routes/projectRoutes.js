const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const authMiddleware = require('../middlewares/authMiddleware'); // Authentication middleware
const roleMiddleware = require('../middlewares/roleMiddleware'); // Role-based middleware
const taskController = require('../controllers/taskController');

// Apply authentication middleware to all routes
router.use(authMiddleware);

// Route to create a project (Admin only)
router.post('/projects', roleMiddleware('admin'), projectController.createProject);

// Route to get all projects (Accessible to all authenticated users)
router.get('/projects', projectController.getProjects);

// Route to create a new task (Accessible by admins and team leads)
router.post('/tasks', roleMiddleware(['admin', 'team_lead']), taskController.createTask); // Use 'team_lead' to match your database

// Route to get all tasks for a specific project
router.get('/projects/:projectId/tasks', roleMiddleware(['admin', 'team_lead']), taskController.getTasks); // Use 'team_lead' to match your database


// Route to update task status (Accessible by all authenticated users)
router.put('/tasks/:taskId/status', taskController.updateTaskStatus);

module.exports = router;


