import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    phone: '',
    role: 'admin',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/signup`, formData);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'Sign-up failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Username"
        required
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        type="text"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Phone (e.g., +1234567890)"
      />
      <select name="role" value={formData.role} onChange={handleChange} required>
        <option value="admin">Admin</option>
        <option value="vehicle_owner">Vehicle Owner</option>
        <option value="fuel_station_owner">Fuel Station Owner</option>
        <option value="operator">Operator</option>
      </select>
      <button type="submit">Sign Up</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>
        Already have an account? <Link to="/login">Log In</Link>
      </p>
    </form>
  );
};

export default SignUpForm;