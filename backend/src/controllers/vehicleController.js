const QRCode = require('qrcode');
const Vehicle = require('../models/Vehicle');
const MockDMT = require('../models/MockDMT');


const registerVehicle = async (req, res) => {
  const { vehicle_number, chassis_number, owner_name, phone } = req.body;
  try {
    // Validate against mock DMT
    const dmtRecord = await MockDMT.findOne({ where: { vehicle_number, chassis_number } });
    if (!dmtRecord || !dmtRecord.is_valid) {
      return res.status(400).json({ error: 'Invalid vehicle details' });
    }


    // Generate QR code
    const qrCode = await QRCode.toDataURL(vehicle_number);


    // Save vehicle
    const vehicle = await Vehicle.create({
      vehicle_number,
      chassis_number,
      owner_name,
      phone,
      qr_code: qrCode,
      user_id: req.user.id,
    });


    res.json({ qrCode });
  } catch (error) {
    res.status(500).json({ error: 'Failed to register vehicle' });
  }
};


const getQuota = async (req, res) => {
  const { qrCode } = req.params;
  try {
    const vehicle = await Vehicle.findOne({ where: { qr_code: qrCode } });
    if (!vehicle) return res.status(404).json({ error: 'Vehicle not found' });
    res.json({ vehicle_number: vehicle.vehicle_number, fuel_quota: vehicle.fuel_quota });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quota' });
  }
};


module.exports = { registerVehicle, getQuota };