import React from 'react';
import { Link } from 'react-router-dom';
import VehicleTable from '../components/VehicleTable';


const Vehicles = () => {
  return (
    <div>
      <nav>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/vehicles">Vehicles</Link>
        <Link to="/fuelstations">Fuel Stations</Link>
        <button onClick={() => localStorage.removeItem('token')}>Logout</button>
      </nav>
      <VehicleTable />
    </div>
  );
};


export default Vehicles;