import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { jwtDecode } from 'jwt-decode';
import QrCodeDisplay from './QrCodeDisplay';
import './common.css';

const VehicleRegister = () => {
  const [form, setForm] = useState({
    licensePlate: '',
    chassisNumber: '',
    vehicleType: '',
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

  const handleVehicleRegister = async () => {
    try {
      // Form validation
      if (!form.licensePlate || !form.chassisNumber || !form.vehicleType) {
        setError('Please fill in all fields');
        return;
      }
      
      setError('');
      const response = await api.post('/vehicles/register', form);
      const data = response.data;

      const token = localStorage.getItem('token');
      const imageRes = await fetch(`http://localhost:8080/${data.qrCodeUrl.replace(/\\/g, '/')}`, {
        headers: {
          Authorization: `${token}`,
        },
      });

      const blob = await imageRes.blob();
      const imageUrl = URL.createObjectURL(blob);

      setQrCodeUrl(imageUrl);
      setRegistered(true);
    } catch (err) {
      console.error('Vehicle registration failed:', err);
      setError('Vehicle registration failed. Please try again.');
    }
  };

  return (
    <div className="form-box">
      {!registered ? (
        <>
          <h2>Register Vehicle</h2>
          {error && <p className="error-message">{error}</p>}
          <input name="licensePlate" placeholder="License Plate" value={form.licensePlate} onChange={handleChange} />
          <input name="chassisNumber" placeholder="Chassis Number" value={form.chassisNumber} onChange={handleChange} />
          <input name="vehicleType" placeholder="Vehicle Type" value={form.vehicleType} onChange={handleChange} />
          <button onClick={handleVehicleRegister}>Register</button>
        </>
      ) : (
        <QrCodeDisplay qrCodeUrl={qrCodeUrl} />
      )}
    </div>
  );
};

export default VehicleRegister;