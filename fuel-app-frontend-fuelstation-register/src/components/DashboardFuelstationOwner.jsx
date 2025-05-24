import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './common.css';

const DashboardFuelstationOwner = () => {
  const navigate = useNavigate();
  const [fuelstation, setFuelstation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchFuelstation = async () => {
      try {
        const decoded = jwtDecode(token);
        const userId = decoded.userId || decoded.id || decoded.sub;

        const response = await api.post('/station/own-stations', { userId });
        setFuelstation(response.data);
      } catch (error) {
        console.error('Error in dashboard:', error);
        setError('Failed to load fuel station data');
      } finally {
        setLoading(false);
      }
    };

    fetchFuelstation();
  }, [navigate]);

  if (loading) {
    return <div className="dashboard-container">Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-heading">My Fuel Station</h1>

      {error && <p className="error-message">{error}</p>}

      {!fuelstation ? (
        <p className="success-message">No fuel station found. Please register your fuel station first.</p>
      ) : (
        <div className="station-card">
          <p><strong>Station Name:</strong> {fuelstation.stationName}</p>
          <p><strong>Address:</strong> {fuelstation.addressNo}, {fuelstation.streetName}, {fuelstation.city}</p>
          <p><strong>District:</strong> {fuelstation.district}</p>
          <p><strong>Province:</strong> {fuelstation.province}</p>
          <p><strong>Contact:</strong> {fuelstation.contactNumber}</p>
          <p><strong>Email:</strong> {fuelstation.email}</p>
        </div>
      )}

      <button onClick={() => navigate('/register-fuelstation')} className="add-station-button">
        ➕ Add Fuel Station
      </button>
    </div>
  );
};

export default DashboardFuelstationOwner;
