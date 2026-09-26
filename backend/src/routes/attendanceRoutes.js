const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const { authenticateUser, authorizeRoles } = require('../middleware/authMiddleware');

router.use(authenticateUser);
router.get('/', attendanceController.getAttendance);
router.post('/', authorizeRoles('admin', 'teacher'), attendanceController.saveAttendance);
router.post('/send-warning', authorizeRoles('admin'), attendanceController.sendAttendanceWarning);

module.exports = router;
