const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');
const { authenticateUser } = require('../middleware/authMiddleware');

router.use(authenticateUser);
router.get('/', searchController.globalSearch);

module.exports = router;
