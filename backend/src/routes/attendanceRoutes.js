const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const { authenticateUser, authorizeRoles } = require('../middleware/authMiddleware');

router.use(authenticateUser);
router.get('/', attendanceController.getAttendance);
router.post('/', authorizeRoles('admin', 'teacher'), attendanceController.saveAttendance);

module.exports = router;
