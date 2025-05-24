import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import VehicleRegister from './components/VehicleRegister';
import DashboardVehicleOwner from './components/DashboardVehicleOwner';
import ProtectedRoute from './components/ProtectedRoute';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <nav>
        {!isLoggedIn ? (
          <>
            <Link to="/">Login</Link> | <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard-vehicle-owner">Dashboard</Link> | <Link to="/add-vehicle">Add Vehicle</Link> | 
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard-vehicle-owner"
          element={
            <ProtectedRoute>
              <DashboardVehicleOwner />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-vehicle"
          element={
            <ProtectedRoute>
              <VehicleRegister />
            </ProtectedRoute>
          }
        />
        
      </Routes>
    </Router>
  );
}

export default App;
