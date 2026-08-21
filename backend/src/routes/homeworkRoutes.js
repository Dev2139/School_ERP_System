const express = require('express');
const router = express.Router();
const homeworkController = require('../controllers/homeworkController');
const { authenticateUser, authorizeRoles } = require('../middleware/authMiddleware');

router.use(authenticateUser);
router.get('/', homeworkController.getHomework);
router.post('/', authorizeRoles('admin', 'teacher'), homeworkController.createHomework);
router.post('/submit', authorizeRoles('student'), homeworkController.submitHomework);

module.exports = router;
