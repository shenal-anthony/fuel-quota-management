import React, { useState, useEffect } from "react";
import axios from "axios";


const TransactionTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");


  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/admin/transactions`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setTransactions(res.data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch transactions");
      }
    };
    fetchTransactions();
  }, []);


  return (
    <div>
      <h2>Fuel Transactions</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Vehicle ID</th>
            <th>Station ID</th>
            <th>Pumped Litres</th>
            <th>Remaining Quota</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx._id}>
              <td>{tx.vehicle_id}</td>
              <td>{tx.fuel_station_id}</td>
              <td>{tx.pumped_litres}</td>
              <td>{tx.remaining_quota}</td>
              <td>{new Date(tx.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default TransactionTable;
