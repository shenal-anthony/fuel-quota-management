import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './common.css';

const DashboardVehicleOwner = () => {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);
  const [qrCodes, setQrCodes] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchVehicles = async () => {
      try {
        const decoded = jwtDecode(token);
        const userId = decoded.userId || decoded.id || decoded.sub;

        const response = await api.post('/vehicles/own-vehicles', { userId });
        setVehicles(response.data);

        const qrMap = {};
        for (const vehicle of response.data) {
          if (vehicle.qrCodeUrl) {
            const cleanPath = vehicle.qrCodeUrl.replace(/\\/g, '/');
            const imageUrl = `http://localhost:8080/${cleanPath}`;

            try {
              const imageRes = await fetch(imageUrl, {
                headers: {
                  Authorization: `${token}`,
                },
              });

              if (imageRes.ok) {
                const blob = await imageRes.blob();
                const blobUrl = URL.createObjectURL(blob);
                qrMap[vehicle.id] = blobUrl;
              }
            } catch (error) {
              console.error('Error fetching QR code image:', error);
            }
          }
        }
        setQrCodes(qrMap);
      } catch (error) {
        console.error('Error in dashboard:', error);
        setError('Failed to load vehicle data');
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, [navigate]);

  const handleAddVehicle = () => {
    navigate('/add-vehicle');
  };

  if (loading) {
    return <div className="dashboard-container">Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-heading">My Vehicles</h1>
      
      {error && <p className="error-message">{error}</p>}
      
      {vehicles.length === 0 ? (
        <p className="success-message">No vehicles found. Add your first vehicle below!</p>
      ) : (
        <ul className="vehicle-list">
          {vehicles.map((vehicle) => (
            <li key={vehicle.id} className="vehicle-card">
              <p><strong>Plate No:</strong> {vehicle.licensePlate}</p>
              <p><strong>Type:</strong> {vehicle.type}</p>
              <p><strong>Fuel Type:</strong> {vehicle.fuelType}</p>
              {qrCodes[vehicle.id] && (
                <div className="qr-section">
                  <img src={qrCodes[vehicle.id]} alt="QR Code" />
                  <br />
                  <a
                    href={qrCodes[vehicle.id]}
                    download={`vehicle-${vehicle.id}-qrcode.png`}
                    className="download-button"
                  >
                    ⬇️ Download QR Code
                  </a>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
      <button onClick={handleAddVehicle} className="add-vehicle-button">➕ Add Vehicle</button>
    </div>
  );
};

export default DashboardVehicleOwner;
