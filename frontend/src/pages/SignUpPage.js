// // src/SignUp.js

// import React, { useState } from 'react';
// import axios from 'axios';

// const SignUp = () => {
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         password: '',
//         role: '',
//     });

//     const [error, setError] = useState(null);
//     const [success, setSuccess] = useState(null);

//     // Handle input changes
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value,
//         });
//     };
//     const handleSubmit = async (e) => {
//         e.preventDefault();
    
//         try {
//             const response = await axios.post('/api/signup', formData);
//             setSuccess(response.data.message); // Adjust based on backend response
//             setError(null);
//             setFormData({
//                 name: '',
//                 email: '',
//                 password: '',
//                 role: '',
//             });
//         } catch (err) {
//             if (err.response && err.response.data && err.response.data.error) {
//                 setError(err.response.data.error);
//             } else {
//                 setError('An error occurred. Please try again.');
//             }
//             setSuccess(null);
//         }
//     };
    

//     return (
//         <div className="signup-container">
//             <h2>Sign Up</h2>
//             <form onSubmit={handleSubmit}>
//                 <div className="form-group">
//                     <label htmlFor="name">Name:</label>
//                     <input
//                         type="text"
//                         id="name"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="email">Email:</label>
//                     <input
//                         type="email"
//                         id="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="password">Password:</label>
//                     <input
//                         type="password"
//                         id="password"
//                         name="password"
//                         value={formData.password}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="role">Role:</label>
//                     <select
//                         id="role"
//                         name="role"
//                         value={formData.role}
//                         onChange={handleChange}
//                         required
//                     >
//                         <option value="">Select a role</option>
//                         <option value="admin">Admin</option>
//                         <option value="team_lead">Team Lead</option>
//                         <option value="user">User</option>
//                     </select>
//                 </div>
//                 <button type="submit">Sign Up</button>
//             </form>
//             {error && <p className="error">{error}</p>}
//             {success && <p className="success">{success}</p>}
//         </div>
//     );
// };

// export default SignUp;
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: '',
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate(); // Use useNavigate hook for redirection

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
            await axios.post('/api/signup', formData);
            setSuccess('Signup successful! Redirecting to login...');
            setError(null);
            setFormData({
                name: '',
                email: '',
                password: '',
                role: '',
            });

            // Redirect to login page after successful signup
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            if (err.response && err.response.data && err.response.data.error) {
                setError(err.response.data.error);
            } else {
                setError('An error occurred. Please try again.');
            }
            setSuccess(null);
        }
    };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
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
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="role">Role:</label>
                    <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a role</option>
                        <option value="admin">Admin</option>
                        <option value="team_lead">Team Lead</option>
                        <option value="user">User</option>
                    </select>
                </div>
                <button type="submit">Sign Up</button>
            </form>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
        </div>
    );
};

export default SignUp;



