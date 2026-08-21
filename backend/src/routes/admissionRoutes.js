const express = require('express');
const router = express.Router();
const admissionController = require('../controllers/admissionController');
const { authenticateUser, authorizeRoles } = require('../middleware/authMiddleware');

router.use(authenticateUser);
router.get('/', admissionController.getAdmissions);
router.post('/', authorizeRoles('admin'), admissionController.createAdmission);
router.put('/:id/status', authorizeRoles('admin'), admissionController.updateStatus);

module.exports = router;
