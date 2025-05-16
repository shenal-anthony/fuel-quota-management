const express = require('express');
const router = express.Router();
const { registerVehicle, getQuota } = require('../controllers/vehicleController');
const { verifyToken, isVehicleOwner } = require('../middleware/auth');

router.post('/register', verifyToken, isVehicleOwner, registerVehicle);
router.get('/:qrCode/quota', verifyToken, isFuelStationOwnerOrOperator, getQuota);

module.exports = router;