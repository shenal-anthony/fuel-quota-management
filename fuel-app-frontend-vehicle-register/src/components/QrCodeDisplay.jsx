import React from 'react';
import { useLocation } from 'react-router-dom';

const QrCodeDisplay = () => {
  const location = useLocation();
  const qrCodeUrl = location.state?.qrCodeUrl;

  if (!qrCodeUrl) {
    return <p>No QR code to display.</p>;
  }

  const cleanedPath = 'http://localhost:8080/' + qrCodeUrl.replace(/\\/g, '/');

  return (
    <div className="qr-section">
      <h2>Vehicle Registered Successfully!</h2>
      <p>Scan your QR code below:</p>
      <img src={cleanedPath} alt="QR Code" style={{ width: '250px' }} />
    </div>
  );
};

export default QrCodeDisplay;
