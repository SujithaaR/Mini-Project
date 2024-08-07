import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdateTaskStatus = () => {
    const { taskId } = useParams();
    const [status, setStatus] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await axios.get(`/api/tasks/${taskId}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
                });
                setStatus(response.data.status);
            } catch (err) {
                setError('Error fetching task');
            }
        };

        fetchTask();
    }, [taskId]);

    const handleChange = (e) => {
        setStatus(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`/api/tasks/${taskId}/status`, { status }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
            });
            setSuccess('Task status updated successfully!');
            setError(null);
        } catch (err) {
            setError(err.response?.data?.error || 'Error updating task status');
            setSuccess(null);
        }
    };

    return (
        <div className="update-task-status-container">
            <h2>Update Task Status</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="status">Status:</label>
                    <select
                        id="status"
                        name="status"
                        value={status}
                        onChange={handleChange}
                        required
                    >
                        <option value="doing">Doing</option>
                        <option value="done">Done</option>
                        <option value="not completed">Not Completed</option>
                    </select>
                </div>
                <button type="submit">Update Status</button>
            </form>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
        </div>
    );
};

export default UpdateTaskStatus;
