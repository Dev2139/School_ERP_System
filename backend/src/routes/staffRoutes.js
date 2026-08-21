const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController');
const { authenticateUser, authorizeRoles } = require('../middleware/authMiddleware');

router.use(authenticateUser);

router.get('/', authorizeRoles('super_admin', 'admin'), staffController.getStaff);
router.post('/', authorizeRoles('super_admin', 'admin'), staffController.createStaff);
router.put('/:id', authorizeRoles('super_admin', 'admin'), staffController.updateStaff);
router.delete('/:id', authorizeRoles('super_admin', 'admin'), staffController.deactivateStaff);

module.exports = router;
