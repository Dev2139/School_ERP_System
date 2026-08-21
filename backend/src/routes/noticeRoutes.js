const express = require('express');
const router = express.Router();
const noticeController = require('../controllers/noticeController');
const { authenticateUser, authorizeRoles } = require('../middleware/authMiddleware');

router.use(authenticateUser);
router.get('/', noticeController.getNotices);
router.post('/', authorizeRoles('admin'), noticeController.createNotice);
router.delete('/:id', authorizeRoles('admin'), noticeController.deleteNotice);

module.exports = router;
