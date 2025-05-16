import React, { useState, useEffect } from "react";
import axios from "axios";


const VehicleTable = () => {
  const [vehicles, setVehicles] = useState([]);
  const [error, setError] = useState("");


  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/admin/vehicles`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setVehicles(res.data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch vehicles");
      }
    };
    fetchVehicles();
  }, []);


  return (
    <div>
      <h2>Registered Vehicles</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Vehicle Number</th>
            <th>Chassis Number</th>
            <th>Owner Name</th>
            <th>Fuel Quota</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle._id}>
              <td>{vehicle.vehicle_number}</td>
              <td>{vehicle.chassis_number}</td>
              <td>{vehicle.owner_name}</td>
              <td>{vehicle.fuel_quota}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default VehicleTable;