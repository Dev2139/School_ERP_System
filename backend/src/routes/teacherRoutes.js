const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');
const { authenticateUser, authorizeRoles } = require('../middleware/authMiddleware');

router.use(authenticateUser);
router.get('/', teacherController.getTeachers);
router.post('/', authorizeRoles('admin'), teacherController.createTeacher);
router.put('/:id', authorizeRoles('admin'), teacherController.updateTeacher);
router.delete('/:id', authorizeRoles('admin'), teacherController.deleteTeacher);

module.exports = router;
