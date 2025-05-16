const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const sequelize = require("./db");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Sync database
sequelize.sync({ force: false }).then(() => {
  console.log("Database synced");
});

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/vehicle", require("./routes/vehicleRoutes"));
// app.use("/api/fuelstation", require("./routes/fuelStationRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

// Placeholder route
app.get("/", (req, res) => res.send("Fuel Management Backend"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
