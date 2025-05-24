import React from 'react';
import QrCodeDisplay from './QrCodeDisplay';
import { useLocation } from 'react-router-dom';

const QrCodePage = () => {
  const location = useLocation();
  const qrCodeUrl = location.state?.qrCodeUrl || '';

  return (
    <div>
      <QrCodeDisplay qrCodeUrl={qrCodeUrl} />
    </div>
  );
};

export default QrCodePage;
