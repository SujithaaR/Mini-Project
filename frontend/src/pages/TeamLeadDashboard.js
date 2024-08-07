import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateTask = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        assignedTo: '',
        projectId: '',
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [projects, setProjects] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get('/api/projects', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
                });
                setProjects(response.data);
            } catch (err) {
                setError('Error fetching projects');
            }
        };

        const fetchUsers = async () => {
            try {
                const response = await axios.get('/api/users', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
                });
                setUsers(response.data);
            } catch (err) {
                setError('Error fetching users');
            }
        };

        fetchProjects();
        fetchUsers();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('/api/tasks', formData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
            });
            setSuccess('Task created successfully!');
            setError(null);
            setFormData({
                title: '',
                description: '',
                assignedTo: '',
                projectId: '',
            });
        } catch (err) {
            setError(err.response?.data?.error || 'Error creating task');
            setSuccess(null);
        }
    };

    return (
        <div className="create-task-container">
            <h2>Create Task</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="assignedTo">Assign To:</label>
                    <select
                        id="assignedTo"
                        name="assignedTo"
                        value={formData.assignedTo}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a user</option>
                        {users.map(user => (
                            <option key={user._id} value={user._id}>{user.name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="projectId">Project:</label>
                    <select
                        id="projectId"
                        name="projectId"
                        value={formData.projectId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a project</option>
                        {projects.map(project => (
                            <option key={project._id} value={project._id}>{project.name}</option>
                        ))}
                    </select>
                </div>
                <button type="submit">Create Task</button>
            </form>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
        </div>
    );
};

export default CreateTask;
