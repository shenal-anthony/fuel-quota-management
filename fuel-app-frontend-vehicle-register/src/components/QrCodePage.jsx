import React from 'react';
import QrCodeDisplay from './QrCodeDisplay';
import { useLocation } from 'react-router-dom';
import './common.css';

const QrCodePage = () => {
  const location = useLocation();
  const qrCodeUrl = location.state?.qrCodeUrl || '';

  return (
    <div className="form-box">
      <QrCodeDisplay qrCodeUrl={qrCodeUrl} />
    </div>
  );
};

export default QrCodePage;
