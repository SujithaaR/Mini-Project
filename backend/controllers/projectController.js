const Project = require('../models/projectModel');
const User = require('../models/userModel');
const { param } = require('../routes/projectRoutes');


// // Create a new project
// exports.createProject = async (req, res) => {
//     const { name, description, teamLeadName } = req.body; // Team lead name provided in the request
//     const userId = req.user.userId; // Extracted from the JWT token

//     try {
//         // Find the user with the given teamLeadName
//         const teamLead = await User.findOne({ name: teamLeadName });

//         // If the team lead does not exist, return an error
//         if (!teamLead) return res.status(400).send('Team lead not found');

//         // Create a new project with the found team lead
//         const project = new Project({
//             name,
//             description,
//             teamLead: teamLead._id, // Use the team lead's ID
//             createdBy: userId
//         });

//         // Save the project to the database
//         await project.save();

//         res.status(201).send('Project created successfully');
//     } catch (err) {
//         res.status(400).send('Error creating project');
//     }
// };

exports.createProject = async (req, res) => {
    const { name, description, teamLeadid } = req.body;
    // const userRole = req.param; // Access the user ID from the request
//     const userRole = req.user.role; // Check the user's role
    const {id, role} = req.params;
    console.log(id, role, teamLeadid)
    try {
        // const teamLead = await User.findOne({ name: teamLeadName });
        if (!teamLeadid) return res.status(400).send('Team lead not found');

        const project = new Project({
            name,
            description,
            teamLead: teamLeadid,
            createdBy: id
        });
console.log({
    name,
    description,
    teamLead: teamLeadid,
    createdBy: id
})
        await project.save();
        res.status(201).send('Project created successfully');
    } catch (err) {
        res.status(400).send('Error creating project');
    }
};



// Get all projects
exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find();
  
        res.json(projects);
        // get teamlead name from project user id and send it with other info from project
    } catch (err) {
        res.status(500).send('Error fetching projects');
    }
};


