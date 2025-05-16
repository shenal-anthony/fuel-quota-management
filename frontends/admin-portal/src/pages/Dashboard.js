import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DashboardComponent from '../components/Dashboard';


const Dashboard = () => {
  const navigate = useNavigate();


  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };


  return (
    <div>
      <nav>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/vehicles">Vehicles</Link>
        <Link to="/fuelstations">Fuel Stations</Link>
        <button onClick={handleLogout}>Logout</button>
      </nav>
      <DashboardComponent />
    </div>
  );
};


export default Dashboard;