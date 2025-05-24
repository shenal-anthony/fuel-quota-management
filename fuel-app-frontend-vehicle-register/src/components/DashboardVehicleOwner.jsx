import React, { useEffect, useState } from 'react';
import api from '../services/api'; // Axios instance with token
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';  // fixed import syntax

const DashboardVehicleOwner = () => {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);
  const [qrCodes, setQrCodes] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const userId = decoded.userId || decoded.id || decoded.sub;

      api.post('/vehicles/own-vehicles', { userId })
        .then(async (response) => {
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
                } else {
                  console.error(`Failed to fetch QR code for vehicle ${vehicle.id}`);
                }
              } catch (error) {
                console.error('Error fetching QR code image:', error);
              }
            }
          }
          setQrCodes(qrMap);
        })
        .catch((error) => {
          console.error('Error fetching vehicles:', error);
        });
    } catch (e) {
      console.error('Invalid token:', e);
      navigate('/login');
    }
  }, [navigate]);
  const handleAddVehicle = () => {
    navigate('/add-vehicle');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>My Vehicles</h1>
      {vehicles.length === 0 ? (
        <p>No vehicles found.</p>
      ) : (
        <ul style={styles.list}>
          {vehicles.map((vehicle) => (
            <li key={vehicle.id} style={styles.card}>
              <p><strong>Plate No:</strong> {vehicle.licensePlate}</p>
              <p><strong>Type:</strong> {vehicle.type}</p>
              <p><strong>Fuel Type:</strong> {vehicle.fuelType}</p>
              {qrCodes[vehicle.id] && (
                <div style={{ marginTop: '10px' }}>
                  <img src={qrCodes[vehicle.id]} alt="QR Code" style={{ width: '150px' }} />
                  <br />
                  <a
                    href={qrCodes[vehicle.id]}
                    download={`vehicle-${vehicle.id}-qrcode.png`}
                    style={styles.downloadButton}
                  >
                    ⬇️ Download QR Code
                  </a>
                </div>
              )}

            </li>
          ))}
        </ul>
      )}
      <button onClick={handleAddVehicle} style={styles.button}>➕ Add Vehicle</button>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '40px auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  card: {
    backgroundColor: '#f5f5f5',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '10px',
  },
  button: {
    display: 'block',
    margin: '30px auto 0',
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
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

export default DashboardVehicleOwner;
