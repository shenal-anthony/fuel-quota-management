import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./common.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [fuelStations, setFuelStations] = useState([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [approvedCount, setApprovedCount] = useState(0);
  const [vehicleCount, setVehicleCount] = useState(0);
  const [ownerCount, setOwnerCount] = useState(0);
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

    const fetchData = async () => {
      try {
        // Fetch fuel stations
        const stationsResponse = await api.get("/station/all");
        // console.log("Stations API Response:", stationsResponse.data);
        const mappedStations = stationsResponse.data
          .filter((station) => !station.isApproved)
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
        setPendingCount(stationsResponse.data.filter((s) => !s.isApproved).length);
        setApprovedCount(stationsResponse.data.filter((s) => s.isApproved).length);

        // Fetch vehicle count
        const vehicleResponse = await api.get("/station/vehicles/count");
        // console.log("Vehicle Count Response:", vehicleResponse.data);
        setVehicleCount(vehicleResponse.data);

        // Fetch owner count
        const ownerResponse = await api.get("/station/owners/count");
        // console.log("Owner Count Response:", ownerResponse.data);
        setOwnerCount(ownerResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        if (error.response?.status === 403) {
          setError("Access denied: Invalid or expired token. Please log in again.");
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          setError("Failed to load dashboard data");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleApprove = async (stationId) => {
    try {
      await api.post(`/station/approve/${stationId}`);
      setFuelStations((prev) =>
        prev.filter((station) => station.id !== stationId)
      );
      setPendingCount((prev) => prev - 1);
      setApprovedCount((prev) => prev + 1);
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

      {/* Widgets */}
      <div className="widget-container">
        <div className="widget">
          <h3>Pending Stations</h3>
          <p>{pendingCount}</p>
        </div>
        <div className="widget">
          <h3>Approved Stations</h3>
          <p>{approvedCount}</p>
        </div>
        <div className="widget">
          <h3>Total Vehicles</h3>
          <p>{vehicleCount}</p>
        </div>
        <div className="widget">
          <h3>Station Owners</h3>
          <p>{ownerCount}</p>
        </div>
      </div>

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