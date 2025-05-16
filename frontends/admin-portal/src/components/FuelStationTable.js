const express = require('express');
const router = express.Router();
const { registerFuelStation } = require('../controllers/fuelStationController');
const { verifyToken, isFuelStationOwnerOrOperator } = require('../middleware/auth');

router.post('/register', verifyToken, isFuelStationOwnerOrOperator, registerFuelStation);

module.exports = router


import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FuelStationTable = () => {
  const [stations, setStations] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
	const fetchStations = async () => {
  	try {
    	const res = await axios.get('http://localhost:3000/api/admin/fuelstations', {
      	headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    	});
    	setStations(res.data);
  	} catch (err) {
    	setError(err.response?.data?.error || 'Failed to fetch fuel stations');
  	}
	};
	fetchStations();
  }, []);

  return (
	<div>
  	<h2>Registered Fuel Stations</h2>
  	{error && <p style={{ color: 'red' }}>{error}</p>}
  	<table>
    	<thead>
      	<tr>
        	<th>Station Name</th>
        	<th>Owner Name</th>
        	<th>Address</th>
      	</tr>
    	</thead>
    	<tbody>
      	{stations.map((station) => (
        	<tr key={station._id}>
          	<td>{station.name}</td>
          	<td>{station.ownerName}</td>
          	<td>{station.address}</td>
        	</tr>
      	))}
    	</tbody>
  	</table>
	</div>
  );
};

export default FuelStationTable;;
