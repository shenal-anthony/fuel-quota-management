const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');

const Vehicle = sequelize.define('Vehicle', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  vehicle_number: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
  },
  chassis_number: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  owner_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
  qr_code: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  fuel_quota: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 50.00,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'vehicles',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
});

Vehicle.belongsTo(User, { foreignKey: 'user_id' });
module.exports = Vehicle;