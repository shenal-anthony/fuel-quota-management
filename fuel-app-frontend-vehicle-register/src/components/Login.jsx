import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './common.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      if (!username || !password) {
        setError('Please enter both username and password');
        return;
      }

      setError('');
      const res = await api.post('/signup/login', { username, password });
      const token = res.data.token;
      localStorage.setItem('token', token);

      // Decode token and store userId
      const decoded = jwtDecode(token.replace('Bearer ', ''));
      localStorage.setItem('userId', decoded.userId); // Store for use in VehicleRegister

      onLogin();
      navigate('/dashboard-vehicle-owner');
    } catch (err) {
      console.error('Login failed:', err);
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className="form-box">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <input 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
        placeholder="Username" 
      />
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Password" 
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
