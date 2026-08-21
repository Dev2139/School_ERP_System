const express = require('express');
const router = express.Router();
const academicController = require('../controllers/academicController');
const { authenticateUser, authorizeRoles } = require('../middleware/authMiddleware');

router.use(authenticateUser);
router.get('/years', academicController.getAcademicYears);
router.post('/years', authorizeRoles('admin'), academicController.createAcademicYear);

router.get('/classes', academicController.getClasses);
router.post('/classes', authorizeRoles('admin'), academicController.createClass);

router.post('/sections', authorizeRoles('admin'), academicController.createSection);
router.get('/subjects', academicController.getSubjects);
router.post('/subjects', authorizeRoles('admin'), academicController.createSubject);

module.exports = router;
