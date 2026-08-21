const express = require('express');
const router = express.Router();
const studyMaterialController = require('../controllers/studyMaterialController');
const { authenticateUser, authorizeRoles } = require('../middleware/authMiddleware');

router.use(authenticateUser);

router.get('/', studyMaterialController.getStudyMaterials);
router.post('/', authorizeRoles('admin', 'teacher'), studyMaterialController.createStudyMaterial);
router.delete('/:id', authorizeRoles('admin', 'teacher'), studyMaterialController.deleteStudyMaterial);

module.exports = router;
