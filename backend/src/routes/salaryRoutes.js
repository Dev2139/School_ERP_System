const express = require('express');
const router = express.Router();
const salaryController = require('../controllers/salaryController');
const { authenticateUser, authorizeRoles } = require('../middleware/authMiddleware');

router.use(authenticateUser);

router.get('/', salaryController.getSalaries);
router.post('/disburse', authorizeRoles('admin'), salaryController.disburseSalary);

module.exports = router;
