const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const { authenticateUser } = require('../middleware/authMiddleware');

router.use(authenticateUser);
router.get('/metrics', reportController.getSummaryMetrics);

module.exports = router;
