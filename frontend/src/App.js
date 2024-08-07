import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import SignUpPage from './pages/SignUpPage';
import LoginForm from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import CreateTask from './pages/TeamLeadDashboard';
import UpdateTaskStatus from './pages/UserDashboard';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<SignUpPage />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/admin-dashboard" element={<AdminDashboard />} />
                    <Route path="/team-lead-dashboard" element={<CreateTask />} />
                    <Route path="/user-dashboard" element={<UpdateTaskStatus />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;





