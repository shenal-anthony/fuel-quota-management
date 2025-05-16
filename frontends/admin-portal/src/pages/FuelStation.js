import React from 'react';
import { Link } from 'react-router-dom';
import FuelStationTable from '../components/FuelStationTable';


const FuelStations = () => {
  return (
    <div>
      <nav>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/vehicles">Vehicles</Link>
        <Link to="/fuelstations">Fuel Stations</Link>
        <button onClick={() => localStorage.removeItem('token')}>Logout</button>
      </nav>
      <FuelStationTable />
    </div>
  );
};


export default FuelStations;
