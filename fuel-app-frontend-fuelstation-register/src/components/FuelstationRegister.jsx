import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { jwtDecode } from 'jwt-decode';
import QrCodeDisplay from './QrCodeDisplay';
import { useNavigate } from 'react-router-dom';
import './common.css';

const FuelstationRegister = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    stationName: '',
    addressNo: '',
    streetName: '',
    city: '',
    district: '',
    province: '',
    contactNumber: '',
    email: '',
    userId: localStorage.getItem('userId'),
  });

  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [registered, setRegistered] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && token.split('.').length === 3) {
      try {
        const decoded = jwtDecode(token);
        setForm(prevForm => ({ ...prevForm, ownerId: decoded.userId }));
      } catch (e) {
        console.error('Token decode failed', e);
      }
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFuelstationRegister = async () => {
    try {
      // Form validation
      if (!form.stationName || !form.addressNo || !form.streetName || !form.city || !form.district || 
          !form.province || !form.contactNumber || !form.email) {
        setError('Please fill in all fields');
        return;
      }

      setError('');
      const response = await api.post('/station/register', form);

      // Optional: set QR code if returned
      if (response.data.qrCodeUrl) {
        setQrCodeUrl(response.data.qrCodeUrl);
        setRegistered(true);
      }

      // Navigate to dashboard after successful registration
      navigate('/dashboard-fuelstation-owner');
    } catch (err) {
      console.error('Fuel station registration failed:', err);
      setError('Fuel station registration failed. Please try again.');
    }
  };

  return (
    <div className="form-box">
      {!registered ? (
        <>
          <h2>Register Fuel Station</h2>
          {error && <p className="error-message">{error}</p>}
          <input name="stationName" placeholder="Station Name" value={form.stationName} onChange={handleChange} />
          <input name="addressNo" placeholder="Address No" value={form.addressNo} onChange={handleChange} />
          <input name="streetName" placeholder="Street Name" value={form.streetName} onChange={handleChange} />
          <input name="city" placeholder="City" value={form.city} onChange={handleChange} />
          <input name="district" placeholder="District" value={form.district} onChange={handleChange} />
          <input name="province" placeholder="Province" value={form.province} onChange={handleChange} />
          <input name="contactNumber" placeholder="Contact Number" value={form.contactNumber} onChange={handleChange} />
          <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
          <button onClick={handleFuelstationRegister}>Register</button>
        </>
      ) : (
        <QrCodeDisplay qrCodeUrl={qrCodeUrl} />
      )}
    </div>
  );
};

export default FuelstationRegister;
