const FuelStation = require('../models/FuelStation');


const registerFuelStation = async (req, res) => {
  const { name, owner_name, address } = req.body;
  try {
    const station = await FuelStation.create({
      name,
      owner_name,
      address,
      user_id: req.user.id,
    });
    res.json({ message: 'Fuel station registered successfully', station });
  } catch (error) {
    res.status(500).json({ error: 'Failed to register fuel station' });
  }
};


module.exports = { registerFuelStation };