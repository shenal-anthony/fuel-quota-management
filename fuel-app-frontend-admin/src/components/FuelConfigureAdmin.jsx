import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./common.css";

const Configure = () => {
  const navigate = useNavigate();
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quotas, setQuotas] = useState({}); // Store new quotas
  const [newTypeName, setNewTypeName] = useState("");
  const [newQuota, setNewQuota] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    let decoded;
    try {
      decoded = jwtDecode(token);
      console.log("JWT Payload:", decoded); // Debug JWT payload
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

    const fetchVehicleTypes = async () => {
      try {
        const response = await api.get("/station/vehicle-types/all");
        console.log("API Response:", response.data); // Debug API response
        setVehicleTypes(response.data);
        // Initialize quotas state with current values
        const initialQuotas = {};
        response.data.forEach((type) => {
          initialQuotas[type.id] = type.defaultQuota?.toString() || "";
        });
        setQuotas(initialQuotas);
      } catch (error) {
        console.error("Error fetching vehicle types:", error);
        if (error.response?.status === 403) {
          setError("Access denied: Invalid or expired token. Please log in again.");
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          setError("Failed to load vehicle type data");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchVehicleTypes();
  }, [navigate]);

  const handleQuotaChange = (typeId, value) => {
    setQuotas((prev) => ({
      ...prev,
      [typeId]: value,
    }));
  };

  const handleSave = async (typeId) => {
    const newQuota = quotas[typeId];
    if (!newQuota || isNaN(newQuota) || Number(newQuota) <= 0) {
      setError("Please enter a valid positive fuel quota");
      return;
    }

    try {
      await api.post(`/station/vehicle-types/update-quota/${typeId}`, {
        defaultQuota: Number(newQuota),
      });
      setVehicleTypes((prev) =>
        prev.map((type) =>
          type.id === typeId ? { ...type, defaultQuota: Number(newQuota) } : type
        )
      );
      setError(""); // Clear error on success
    } catch (error) {
      console.error("Error updating fuel quota:", error);
      setError("Failed to update fuel quota");
    }
  };

  const handleAddVehicleType = async (e) => {
    e.preventDefault();
    if (!newTypeName.trim()) {
      setError("Vehicle type name is required");
      return;
    }
    if (!newQuota || isNaN(newQuota) || Number(newQuota) <= 0) {
      setError("Please enter a valid positive fuel quota");
      return;
    }

    try {
      const response = await api.post("/station/vehicle-types/add", {
        typeName: newTypeName.trim(),
        defaultQuota: Number(newQuota),
      });
      setVehicleTypes((prev) => [...prev, response.data]);
      setQuotas((prev) => ({
        ...prev,
        [response.data.id]: response.data.defaultQuota?.toString() || "",
      }));
      setNewTypeName("");
      setNewQuota("");
      setError(""); // Clear error on success
    } catch (error) {
      console.error("Error adding vehicle type:", error);
      setError("Failed to add vehicle type");
    }
  };

  if (loading) {
    return <div className="dashboard-container">Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-heading">
        Admin Dashboard - Configure Vehicle Type Fuel Quotas
      </h1>

      {error && <p className="error-message">{error}</p>}

      {/* Add Vehicle Type Form */}
      <form onSubmit={handleAddVehicleType} className="add-vehicle-type-form">
        <input
          type="text"
          value={newTypeName}
          onChange={(e) => setNewTypeName(e.target.value)}
          placeholder="Enter vehicle type (e.g., Van)"
          className="vehicle-type-input"
        />
        <input
          type="number"
          value={newQuota}
          onChange={(e) => setNewQuota(e.target.value)}
          placeholder="Enter default quota"
          className="fuel-limit-input"
          min="0"
          step="1"
        />
        <button type="submit" className="add-button">
          Add Vehicle Type
        </button>
      </form>

      {vehicleTypes.length === 0 ? (
        <p>No vehicle types available</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Vehicle Type</th>
              <th>Fuel Quota</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {vehicleTypes.map((type, index) => (
              <tr key={type.id}>
                <td>{index + 1}</td>
                <td>{type.typeName || "-"}</td>
                <td>{type.defaultQuota || "-"}</td>
                <td>
                  <input
                    type="number"
                    value={quotas[type.id] || ""}
                    onChange={(e) => handleQuotaChange(type.id, e.target.value)}
                    className="fuel-limit-input"
                    placeholder="Enter quota"
                    min="0"
                    step="1"
                  />
                  <button
                    className="save-button"
                    onClick={() => handleSave(type.id)}
                  >
                    Save
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

export default Configure;