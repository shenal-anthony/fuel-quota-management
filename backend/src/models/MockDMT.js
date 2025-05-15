const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const MockDMT = sequelize.define('MockDMT', {
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
  is_valid: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
}, {
  tableName: 'mock_dmt',
  timestamps: false, // No timestamp columns in mock_dmt
});

module.exports = MockDMT;