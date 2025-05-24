import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import './common.css';

const Register = () => {
  const [form, setForm] = useState({
    username: '', 
    password: '', 
    firstName: '', 
    lastName: '',
    nic: '', 
    phoneNumber: '', 
    email: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!form.username || !form.password || !form.firstName || 
        !form.lastName || !form.nic || !form.phoneNumber || !form.email) {
      setError('All fields are required');
      return false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError('Please enter a valid email address');
      return false;
    }

    // Phone number validation
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(form.phoneNumber)) {
      setError('Please enter a valid 10-digit phone number');
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    try {
      if (!validateForm()) {
        return;
      }
      
      setError('');
      await api.post('/signup/user', form);
      setSuccess('Registered successfully! Redirecting to login...');
      
      // Redirect to login page after successful registration
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      console.error('Registration failed:', err);
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="form-box">
      <h2>Register</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      
      <input name="username" placeholder="Username" value={form.username} onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />
      <input name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} />
      <input name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} />
      <input name="nic" placeholder="NIC" value={form.nic} onChange={handleChange} />
      <input name="phoneNumber" placeholder="Phone Number" value={form.phoneNumber} onChange={handleChange} />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
      
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
