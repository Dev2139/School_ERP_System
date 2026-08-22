const express = require('express');
const router = express.Router();
const leaveController = require('../controllers/leaveController');
const { authenticateUser, authorizeRoles } = require('../middleware/authMiddleware');

router.use(authenticateUser);
router.get('/', leaveController.getLeaves);
router.post('/', leaveController.createLeave);
router.put('/:id/status', authorizeRoles('admin', 'teacher'), leaveController.updateLeaveStatus);

module.exports = router;
