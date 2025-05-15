const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Admin access required" });
  }
  next();
};

const isVehicleOwner = (req, res, next) => {
  if (req.user.role !== "vehicle_owner") {
    return res.status(403).json({ error: "Vehicle owner access required" });
  }
  next();
};

const isFuelStationOwnerOrOperator = (req, res, next) => {
  if (!["fuel_station_owner", "operator"].includes(req.user.role)) {
    return res
      .status(403)
      .json({ error: "Fuel station owner or operator access required" });
  }
  next();
};

module.exports = {
  verifyToken,
  isAdmin,
  isVehicleOwner,
  isFuelStationOwnerOrOperator,
};
