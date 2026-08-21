const express = require('express');
const router = express.Router();
const examController = require('../controllers/examController');
const { authenticateUser, authorizeRoles } = require('../middleware/authMiddleware');

router.use(authenticateUser);
router.get('/', examController.getExams);
router.post('/', authorizeRoles('admin'), examController.createExam);

router.get('/subjects', examController.getExamSubjects);
router.post('/subjects', authorizeRoles('admin'), examController.saveExamSubject);

router.get('/results', examController.getResults);
router.post('/results', authorizeRoles('admin', 'teacher'), examController.saveResults);
router.get('/report-card/:id', examController.downloadReportCard);

module.exports = router;
