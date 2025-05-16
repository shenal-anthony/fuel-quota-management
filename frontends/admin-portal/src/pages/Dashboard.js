import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();



  return (
    <div>
      <nav>
        <Link to="/dashboard">Dashboard</Link>
      </nav>
    </div>
  );
};

export default Dashboard;