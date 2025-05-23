import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Vehicles from "./pages/Vehicles";
import FuelStations from "./pages/FuelStations";

import "./App.css";

function App() {
  const isAuthenticated = () => !!localStorage.getItem("token");

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/dashboard"
            element={
              isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/vehicles"
            element={
              isAuthenticated() ? <Vehicles /> : <Navigate to="/login" />
            }
          />
          {/* <Route
            path="/fuelstations"
            element={
              isAuthenticated() ? <FuelStations /> : <Navigate to="/login" />
            }
          /> */}

          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
