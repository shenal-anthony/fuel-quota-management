import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { jwtDecode } from 'jwt-decode';

const VehicleRegister = () => {
  const [form, setForm] = useState({
    licensePlate: '',
    chassisNumber: '',
    vehicleType: '',
    userId: localStorage.getItem('userId'),
  });

  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [registered, setRegistered] = useState(false);

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
      console.log('Vehicle registration failed:', err);
      alert('Vehicle registration failed');
    }
  };

  return (
    <div className="form-box">
      {!registered ? (
        <>
          <h2>Register Vehicle</h2>
          <input name="licensePlate" placeholder="License Plate" value={form.licensePlate} onChange={handleChange} />
          <input name="chassisNumber" placeholder="Chassis Number" value={form.chassisNumber} onChange={handleChange} />
          <input name="vehicleType" placeholder="Vehicle Type" value={form.vehicleType} onChange={handleChange} />
          <button onClick={handleVehicleRegister}>Register</button>
        </>
      ) : (
        <div className="qr-section">
          <h2>Vehicle Registered Successfully!</h2>
          <p>Scan your QR code below:</p>
          <img src={qrCodeUrl} alt="QR Code" style={{ width: '250px' }} />
          <br />
          <a
            href={qrCodeUrl}
            download={`vehicle-qrcode.png`}
            style={styles.downloadButton}
          >
            ⬇️ Download QR Code
          </a>
          
        </div>
      )}
    </div>
  );
};
const styles = {
downloadButton: {
  display: 'inline-block',
  marginTop: '10px',
  padding: '6px 12px',
  backgroundColor: '#2196F3',
  color: 'white',
  textDecoration: 'none',
  borderRadius: '4px',
  fontSize: '14px',
}
};
export default VehicleRegister;