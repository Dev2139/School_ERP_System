const express = require('express');
const router = express.Router();
const feeController = require('../controllers/feeController');
const { authenticateUser, authorizeRoles } = require('../middleware/authMiddleware');

router.use(authenticateUser);

router.get('/structures', feeController.getFeeStructures);
router.post('/structures', authorizeRoles('admin', 'accountant'), feeController.createFeeStructure);

router.get('/student-fees', feeController.getStudentFees);
router.get('/lookup', feeController.lookupStudentFeeAccount);
router.get('/standard-settings', feeController.getClassFeeSettings);
router.post('/standard-settings', authorizeRoles('admin', 'accountant'), feeController.updateClassFeeSettings);
router.post('/payments', authorizeRoles('admin', 'accountant'), feeController.recordPayment);
router.get('/payments', feeController.getPayments);
router.get('/receipt/:id', feeController.downloadReceipt);

module.exports = router;
