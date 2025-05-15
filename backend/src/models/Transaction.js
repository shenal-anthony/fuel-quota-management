const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Vehicle = require('./Vehicle');
const FuelStation = require('./FuelStation');

const Transaction = sequelize.define('Transaction', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  pumped_litres: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  remaining_quota: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'transactions',
  timestamps: true,
  createdAt: 'timestamp', // Map to timestamp column
  updatedAt: false,
});

Transaction.belongsTo(Vehicle, { foreignKey: 'vehicle_id' });
Transaction.belongsTo(FuelStation, { foreignKey: 'fuel_station_id' });
module.exports = Transaction;