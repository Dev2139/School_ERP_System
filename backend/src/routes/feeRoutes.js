const express = require('express');
const router = express.Router();
const feeController = require('../controllers/feeController');
const { authenticateUser, authorizeRoles } = require('../middleware/authMiddleware');

router.use(authenticateUser);

router.get('/structures', feeController.getFeeStructures);
router.post('/structures', authorizeRoles('admin'), feeController.createFeeStructure);

router.get('/student-fees', feeController.getStudentFees);
router.post('/payments', authorizeRoles('admin'), feeController.recordPayment);
router.get('/payments', feeController.getPayments);
router.get('/receipt/:id', feeController.downloadReceipt);

module.exports = router;
