const express = require('express');
const router = express.Router();
const settingController = require('../controllers/settingController');
const { authenticateUser, authorizeRoles } = require('../middleware/authMiddleware');

router.use(authenticateUser);

router.get('/school', settingController.getSchoolProfile);
router.put('/school', authorizeRoles('admin'), settingController.updateSchoolProfile);

router.get('/audit-logs', authorizeRoles('admin'), settingController.getAuditLogs);

module.exports = router;
