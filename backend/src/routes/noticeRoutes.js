const express = require('express');
const router = express.Router();
const noticeController = require('../controllers/noticeController');
const { authenticateUser, authorizeRoles } = require('../middleware/authMiddleware');

router.use(authenticateUser);
router.get('/', noticeController.getNotices);
router.post('/', authorizeRoles('admin', 'teacher'), noticeController.createNotice);

module.exports = router;
