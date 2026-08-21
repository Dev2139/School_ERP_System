const express = require('express');
const router = express.Router();
const parentController = require('../controllers/parentController');
const { authenticateUser, authorizeRoles } = require('../middleware/authMiddleware');

router.use(authenticateUser);
router.get('/', parentController.getParents);
router.post('/', authorizeRoles('admin'), parentController.createParent);

module.exports = router;
