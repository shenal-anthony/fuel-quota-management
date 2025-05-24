import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './common.css';

const DashboardFuelstationOwner = () => {
  const navigate = useNavigate();
  const [fuelstations, setFuelstations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    
    const fetchFuelstations = async () => {
      try {
        const decoded = jwtDecode(token);
        const userId = decoded.userId || decoded.id || decoded.sub;

        const response = await api.post('/fuelstations/own-stations', { userId });
        setFuelstations(response.data);
      } catch (error) {
        console.error('Error in dashboard:', error);
        setError('Failed to load fuel station data');
      } finally {
        setLoading(false);
      }
    };

    fetchFuelstations();
  }, [navigate]);
  if (loading) {
    return <div className="dashboard-container">Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-heading">My Fuel Station</h1>
      
      {error && <p className="error-message">{error}</p>}
      
      {fuelstations.length === 0 ? (
        <p className="success-message">No fuel stations found. Please register your fuel station first.</p>
      ) : (
        <ul className="station-list">
          {fuelstations.map((station) => (
            <li key={station.id} className="station-card">
              <p><strong>Station Name:</strong> {station.stationName}</p>
              <p><strong>Address:</strong> {station.addressNo}, {station.streetName}, {station.city}</p>
              <p><strong>District:</strong> {station.district}</p>
              <p><strong>Province:</strong> {station.province}</p>
              <p><strong>Contact:</strong> {station.contactNumber}</p>
              <p><strong>Email:</strong> {station.email}</p>
            </li>          ))}
        </ul>      )}
      <button onClick={() => navigate('/register-fuelstation')} className="add-station-button">➕ Add Fuel Station</button>
    </div>
  );
};

export default DashboardFuelstationOwner;
