import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const CreateProject = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        teamLeadid: '',
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [teamLeads, setTeamLeads] = useState([]);

    useEffect(() => {
        const fetchTeamLeads = async () => {
            try {
                const response = await axios.get('/api/team-leads', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
                });
                setTeamLeads(response.data);
                console.log(teamLeads)
            } catch (err) {
                setError('Error fetching team leads: ' + (err.response?.data?.error || err.message));
            }
        };
    
        fetchTeamLeads();
    }, []);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value)
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log(formData)
            const role = Cookies.get('userrole');
            const id = Cookies.get('userid');
            const response = await axios.post(`/api/projects/${role}/${id}`, formData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
            });
            setSuccess('Project created successfully!');
            setError(null);
           
        } catch (err) {
            setError(err.response?.data?.error || 'Error creating project');
            setSuccess(null);
        }
    };

    return (
        <div className="create-project-container">
            <h2>Create Project</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Project Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
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
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="teamLeadName">Team Lead:</label>
                    <select
                        id="teamLeadName"
                        name="teamLeadid"
                        value={formData.id}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a team lead</option>
                        {teamLeads.map(lead => (
                            <option key={lead._id} value={lead._id}>{lead.name}</option>
                        ))}
                    </select>
                </div>
                <button type="submit">Create Project</button>
            </form>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
        </div>
    );
};

export default CreateProject;
