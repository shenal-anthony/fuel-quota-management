const Transaction = require('../models/Transaction');
const Vehicle = require('../models/Vehicle');
const FuelStation = require('../models/FuelStation');


const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      include: [
        { model: Vehicle, attributes: ['vehicle_number'] },
        { model: FuelStation, attributes: ['name'] },
      ],
    });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
};


const getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.findAll();
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch vehicles' });
  }
};


const getFuelStations = async (req, res) => {
  try {
    const stations = await FuelStation.findAll();
    res.json(stations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch fuel stations' });
  }
};


module.exports = { getTransactions, getVehicles, getFuelStations };
