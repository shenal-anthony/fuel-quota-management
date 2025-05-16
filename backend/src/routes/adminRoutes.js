const express = require('express');
const router = express.Router();
const { getTransactions, getVehicles, getFuelStations } = require('../controllers/adminController');
const { verifyToken, isAdmin } = require('../middleware/auth');

router.use(verifyToken);
router.use(isAdmin);

router.get('/transactions', getTransactions);
router.get('/vehicles', getVehicles);
router.get('/fuelstations', getFuelStations);

module.exports = router;
