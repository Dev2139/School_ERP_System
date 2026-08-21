const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { authenticateUser, authorizeRoles } = require('../middleware/authMiddleware');

router.use(authenticateUser);

router.get('/', studentController.getStudents);
router.get('/:id', studentController.getStudentById);
router.post('/', authorizeRoles('admin'), studentController.createStudent);
router.put('/:id', authorizeRoles('admin', 'student'), studentController.updateStudent);
router.delete('/:id', authorizeRoles('admin'), studentController.deleteStudent);
router.post('/promote', authorizeRoles('admin'), studentController.promoteStudent);

module.exports = router;
