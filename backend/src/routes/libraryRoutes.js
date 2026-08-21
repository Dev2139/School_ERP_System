const express = require('express');
const router = express.Router();
const libraryController = require('../controllers/libraryController');
const { authenticateUser, authorizeRoles } = require('../middleware/authMiddleware');

router.use(authenticateUser);

router.get('/books', libraryController.getBooks);
router.post('/books', authorizeRoles('admin'), libraryController.createBook);

router.get('/issues', libraryController.getIssuedBooks);
router.post('/issue', authorizeRoles('admin'), libraryController.issueBook);
router.put('/return/:id', authorizeRoles('admin'), libraryController.returnBook);

module.exports = router;
