const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { authenticateUser, authorizeRoles } = require('../middleware/authMiddleware');

router.use(authenticateUser);
router.get('/', eventController.getEvents);
router.post('/', authorizeRoles('admin', 'super_admin'), eventController.createEvent);
router.put('/:id', authorizeRoles('admin', 'super_admin'), eventController.updateEvent);
router.delete('/:id', authorizeRoles('admin', 'super_admin'), eventController.deleteEvent);

module.exports = router;
