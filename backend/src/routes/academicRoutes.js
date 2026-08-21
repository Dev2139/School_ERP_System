const express = require('express');
const router = express.Router();
const academicController = require('../controllers/academicController');
const { authenticateUser, authorizeRoles } = require('../middleware/authMiddleware');

router.use(authenticateUser);
router.get('/years', academicController.getAcademicYears);
router.post('/years', authorizeRoles('admin'), academicController.createAcademicYear);

router.get('/classes', academicController.getClasses);
router.post('/classes', authorizeRoles('admin'), academicController.createClass);
router.delete('/classes/:id', authorizeRoles('admin'), academicController.deleteClass);

router.post('/sections', authorizeRoles('admin'), academicController.createSection);
router.put('/sections/:id', authorizeRoles('admin'), academicController.updateSection);
router.delete('/sections/:id', authorizeRoles('admin'), academicController.deleteSection);

router.get('/subjects', academicController.getSubjects);
router.post('/subjects', authorizeRoles('admin'), academicController.createSubject);
router.put('/subjects/:id', authorizeRoles('admin'), academicController.updateSubject);
router.delete('/subjects/:id', authorizeRoles('admin'), academicController.deleteSubject);

module.exports = router;
