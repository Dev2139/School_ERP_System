const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateUser } = require('../middleware/authMiddleware');

router.post('/login', authController.login);
router.post('/refresh-token', authController.refreshToken);
router.get('/me', authenticateUser, authController.getMe);
router.post('/change-password', authenticateUser, authController.changePassword);
router.post('/logout', authenticateUser, authController.logout);

module.exports = router;
