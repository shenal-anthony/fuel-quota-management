import React, { useState } from 'react';
import api from '../services/api';

const Register = () => {
  const [form, setForm] = useState({
    username: '', password: '', firstName: '', lastName: '',
    nic: '', phoneNumber: '', email: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      await api.post('/signup/user', form);
      alert('Registered successfully');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <div className="form-box">
      <h2>Register</h2>
      {Object.entries(form).map(([key, value]) => (
        <input key={key} name={key} placeholder={key}
               value={value} onChange={handleChange} />
      ))}
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
