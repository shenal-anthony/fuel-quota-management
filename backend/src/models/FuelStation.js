const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');

const FuelStation = sequelize.define('FuelStation', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  owner_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'fuel_stations',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
});

FuelStation.belongsTo(User, { foreignKey: 'user_id' });
module.exports = FuelStation;