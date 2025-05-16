const express = require('express');
const router = express.Router();
const { registerFuelStation } = require('../controllers/fuelStationController');
const { verifyToken, isFuelStationOwnerOrOperator } = require('../middleware/auth');

router.post('/register', verifyToken, isFuelStationOwnerOrOperator, registerFuelStation);

module.exports = router;
