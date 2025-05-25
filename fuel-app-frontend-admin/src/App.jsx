import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import DashboardAdmin from "./components/DashboardAdmin";
import FuelConfigure from "./components/FuelConfigureAdmin";
import ProtectedRoute from "./components/ProtectedRoute";
import "./components/common.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <nav className="nav-bar">
        {!isLoggedIn ? (
          <>
            <Link to="/">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard-admin">Dashboard</Link>
            <Link to="/configure-admin">Fuel Configure</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </nav>
      <Routes>
        <Route
          path="/"
          element={<Login onLogin={() => setIsLoggedIn(true)} />}
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard-admin"
          element={
            <ProtectedRoute>
              <DashboardAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/configure-admin"
          element={
            <ProtectedRoute>
              <FuelConfigure />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
