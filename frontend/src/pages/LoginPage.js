// import React, { useState } from 'react';
// import axios from 'axios';

// const LoginForm = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState(null);
//     const [success, setSuccess] = useState(null);

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await axios.post('/api/login', { email, password });
//             // Store the token in localStorage or sessionStorage
//             localStorage.setItem('authToken', response.data.token);
//             setSuccess('Login successful!');
//             setError(null);
//         } catch (err) {
//             if (err.response && err.response.data) {
//                 setError(err.response.data.error || 'Login failed');
//             } else {
//                 setError('An error occurred. Please try again.');
//             }
//             setSuccess(null);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <div className="form-group">
//                 <label htmlFor="email">Email:</label>
//                 <input
//                     id="email"
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                 />
//             </div>
//             <div className="form-group">
//                 <label htmlFor="password">Password:</label>
//                 <input
//                     id="password"
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                 />
//             </div>
//             <button type="submit">Login</button>
//             {success && <p>{success}</p>}
//             {error && <p>{error}</p>}
//         </form>
//     );
// };

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/login', { email, password });
            const token = response.data.token;

            // Store the token in localStorage
            localStorage.setItem('authToken', token);
            
            // Decode the token to get user information
            const decoded = jwtDecode(token);
            const userRole = decoded.role;
            const userid=decoded.userId;
            Cookies.set('userrole', userRole, { expires: 7 });
            Cookies.set('userid', userid, { expires: 7 });


            // Redirect based on user role
            if (userRole === 'admin') {
                navigate('/admin-dashboard');
            } else if (userRole === 'team_lead') {
                navigate('/team-lead-dashboard');
            } else if (userRole === 'user') {
                navigate('/user-dashboard');
            } else {
                setError('Unknown role');
            }

            setSuccess('Login successful!');
            setError(null);
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed');
            setSuccess(null);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
                {success && <p className="success">{success}</p>}
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
};

export default LoginPage;




