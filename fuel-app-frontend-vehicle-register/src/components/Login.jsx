import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
        const res = await api.post('/signup/login', { username, password });
        const token = res.data.token;
        localStorage.setItem('token', token);

        // Decode token and store userId
        const decoded = jwtDecode(token.replace('Bearer ', ''));
        localStorage.setItem('userId', decoded.userId); // Store for use in VehicleRegister

        onLogin();
        navigate('/dashboard-vehicle-owner');
    } catch (err) {
        alert('Login failed'+err);
    }
    };

  return (
    <div className="form-box">
      <h2>Login</h2>
      <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
