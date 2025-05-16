import React, { useState, useEffect } from "react";
import axios from "axios";
import TransactionTable from "./TransactionTable";


const Dashboard = () => {
  const [metrics, setMetrics] = useState({
    totalVehicles: 0,
    totalStations: 0,
    totalFuelDispensed: 0,
  });
  const [error, setError] = useState("");


  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/admin/metrics`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setMetrics(res.data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch metrics");
      }
    };
    fetchMetrics();
  }, []);


  return (
    <div>
      <h2>Admin Dashboard</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <p>Total Vehicles: {metrics.totalVehicles}</p>
        <p>Total Fuel Stations: {metrics.totalStations}</p>
        <p>Total Fuel Dispensed: {metrics.totalFuelDispensed} litres</p>
      </div>
      <TransactionTable />
    </div>
  );
};

export default Dashboard;