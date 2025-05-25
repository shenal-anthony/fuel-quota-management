import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./common.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [fuelStations, setFuelStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    let decoded;
    try {
      decoded = jwtDecode(token);
      // console.log("JWT Payload:", decoded); // Debug JWT payload
    } catch (e) {
      setError("Invalid token. Please log in again.");
      localStorage.removeItem("token");
      navigate("/login");
      return;
    }

    if (decoded.role !== "ROLE_ADMIN") {
      setError("Access denied: Admin role required");
      setLoading(false);
      return;
    }

    const fetchFuelStations = async () => {
      try {
        const response = await api.get("/station/all");
        // console.log("API Response:", response.data); // Debug API response
        const mappedStations = response.data
          .filter((station) => !station.isApproved) // Show only pending stations
          .map((station) => ({
            ...station,
            address: [
              station.addressNo,
              station.streetName,
              station.city,
              station.district,
              station.province,
            ]
              .filter(Boolean)
              .join(", ")
              .trim(),
            ownerName: station.user?.username || "Unknown",
          }));
        setFuelStations(mappedStations);
      } catch (error) {
        console.error("Error fetching fuel stations:", error);
        if (error.response?.status === 403) {
          setError("Access denied: Invalid or expired token. Please log in again.");
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          setError("Failed to load fuel station data");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFuelStations();
  }, [navigate]);

  const handleApprove = async (stationId) => {
    try {
      await api.post(`/station/approve/${stationId}`);
      setFuelStations((prev) =>
        prev.filter((station) => station.id !== stationId) // Remove approved station
      );
    } catch (error) {
      console.error("Error approving fuel station:", error);
      setError("Failed to approve fuel station");
    }
  };

  if (loading) {
    return <div className="dashboard-container">Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-heading">
        Admin Dashboard - Approve Fuel Stations
      </h1>

      {error && <p className="error-message">{error}</p>}

      {fuelStations.length === 0 ? (
        <p>No pending fuel stations available</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>ID</th>
              <th>Station Name</th>
              <th>Owner</th>
              <th>City</th>
              <th>District</th>
              <th>Province</th>
              <th>Address</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {fuelStations.map((station, index) => (
              <tr key={station.id}>
                <td>{index + 1}</td>
                <td>{station.id}</td>
                <td>{station.stationName}</td>
                <td>{station.ownerName}</td>
                <td>{station.city || "-"}</td>
                <td>{station.district || "-"}</td>
                <td>{station.province || "-"}</td>
                <td>{station.address || "-"}</td>
                <td>{station.contactNumber || "-"}</td>
                <td>{station.email || "-"}</td>
                <td>Pending</td>
                <td>
                  <button
                    className="approve-button"
                    onClick={() => handleApprove(station.id)}
                  >
                    Approve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDashboard;