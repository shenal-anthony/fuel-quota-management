import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
// import VehicleRegister from './components/FuelstationRegister';
import DashboardFuelstationOwner from './components/DashboardFuelstationOwner';
import FuelstationRegister from './components/FuelstationRegister';
// import DashboardVehicleOwner from './components/DashboardVehicleOwner';
import ProtectedRoute from './components/ProtectedRoute';
// import QrCodePage from './components/QrCodePage';
import './components/common.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <nav className="nav-bar">
        {!isLoggedIn ? (
          <>
            <Link to="/">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard-fuelstation-owner">Dashboard</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </nav>      <Routes>
        <Route path="/" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard-fuelstation-owner"
          element={
            <ProtectedRoute>
              <DashboardFuelstationOwner />
            </ProtectedRoute>
          }
        />
        <Route
          path="/register-fuelstation"
          element={
            <ProtectedRoute>
              <FuelstationRegister />
            </ProtectedRoute>
          }
        />
        {/* <Route
          path="/add-vehicle"
          element={
            <ProtectedRoute>
              <VehicleRegister />
            </ProtectedRoute>
          }
        /> */}
        {/* <Route
          path="/qr-code"
          element={
            <ProtectedRoute>
              <QrCodePage />
            </ProtectedRoute>
          }
        /> */}
      </Routes>
    </Router>
  );
}

export default App;