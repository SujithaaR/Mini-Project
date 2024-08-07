import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateProject from './CreateProject'; // Assuming CreateProject is in the same directory

const AdminDashboard = () => {
    const [projects, setProjects] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get('/api/projects')
                    // , {
                //     headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
                // });
                setProjects(response.data);
            } catch (err) {
                setError('Error fetching projects');
            }
        };

        fetchProjects();
    }, []);

    return (
        <div className="admin-dashboard">
            <h2>Admin Dashboard</h2>
            {error && <p className="error">{error}</p>}
            <div>
                <h3>Projects</h3>
                <ul>
                    {projects.map(project => (
                        <li key={project._id}>
                            <h4>project title : {project.name}</h4>
                            <p>project description : {project.description}</p>
                            <p>Team Lead: {project.teamLeadName}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <CreateProject />
        </div>
    );
};

export default AdminDashboard;

