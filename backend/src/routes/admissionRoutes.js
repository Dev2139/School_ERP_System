const express = require('express');
const router = express.Router();
const admissionController = require('../controllers/admissionController');
const { authenticateUser, authorizeRoles } = require('../middleware/authMiddleware');

router.use(authenticateUser);
router.get('/', admissionController.getAdmissions);
router.post('/', authorizeRoles('admin', 'accountant'), admissionController.createAdmission);
router.put('/:id/status', authorizeRoles('admin', 'accountant'), admissionController.updateStatus);

module.exports = router;
