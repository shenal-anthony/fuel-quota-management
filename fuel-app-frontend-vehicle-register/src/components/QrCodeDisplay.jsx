import React from 'react';
import './common.css';

const QrCodeDisplay = ({ qrCodeUrl }) => {
  if (!qrCodeUrl) {
    return <p className="error-message">No QR code to display.</p>;
  }

  // Handle both full URLs and relative paths
  const imageUrl = qrCodeUrl.startsWith('http') 
    ? qrCodeUrl 
    : 'http://localhost:8080/' + qrCodeUrl.replace(/\\/g, '/');

  return (
    <div className="qr-section">
      <h2>Vehicle Registered Successfully!</h2>
      <p>Scan your QR code below:</p>
      <img src={imageUrl} alt="QR Code" />
      <br />
      <a
        href={imageUrl}
        download="vehicle-qrcode.png"
        className="download-button"
      >
        ⬇️ Download QR Code
      </a>
    </div>
  );
};

export default QrCodeDisplay;
