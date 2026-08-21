const express = require('express');
const router = express.Router();
const transportController = require('../controllers/transportController');
const { authenticateUser, authorizeRoles } = require('../middleware/authMiddleware');

router.use(authenticateUser);

router.get('/vehicles', transportController.getVehicles);
router.post('/vehicles', authorizeRoles('admin'), transportController.createVehicle);

router.get('/routes', transportController.getRoutes);
router.post('/routes', authorizeRoles('admin'), transportController.createRoute);

module.exports = router;
