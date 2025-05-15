const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('admin', 'vehicle_owner', 'fuel_station_owner', 'operator'),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
  },
  phone: {
    type: DataTypes.STRING(15),
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'users',
  timestamps: true,
  createdAt: 'created_at', // Map Sequelize's createdAt to created_at
  updatedAt: false, // Disable updatedAt since it doesn't exist
});

module.exports = User;