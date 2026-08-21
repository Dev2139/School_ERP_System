const express = require('express');
const router = express.Router();
const timetableController = require('../controllers/timetableController');
const { authenticateUser, authorizeRoles } = require('../middleware/authMiddleware');

router.use(authenticateUser);
router.get('/', timetableController.getTimetable);
router.get('/check-conflict', timetableController.checkConflict);
router.post('/', authorizeRoles('admin'), timetableController.saveTimetable);

module.exports = router;
