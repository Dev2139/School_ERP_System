const Book = require('../models/Book');
const BookIssue = require('../models/BookIssue');
const { logAudit } = require('../middleware/auditMiddleware');

exports.getBooks = async (req, res, next) => {
  try {
    const books = await Book.find({ schoolId: req.user.schoolId }).sort({ title: 1 });
    res.status(200).json({ success: true, data: books });
  } catch (error) {
    next(error);
  }
};

exports.createBook = async (req, res, next) => {
  try {
    const book = await Book.create({ ...req.body, schoolId: req.user.schoolId, availableCopies: req.body.totalCopies });
    await logAudit(req, 'BOOK_CREATED', 'Book', book._id.toString());
    res.status(201).json({ success: true, data: book });
  } catch (error) {
    next(error);
  }
};

exports.getIssuedBooks = async (req, res, next) => {
  try {
    const issues = await BookIssue.find({ schoolId: req.user.schoolId })
      .populate('bookId', 'title author isbn')
      .populate('borrowerId', 'username email role')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: issues });
  } catch (error) {
    next(error);
  }
};

exports.issueBook = async (req, res, next) => {
  try {
    const { bookId, borrowerId, borrowerType, dueDate } = req.body;
    const book = await Book.findById(bookId);
    if (!book || book.availableCopies <= 0) {
      return res.status(400).json({ success: false, message: 'Book not available' });
    }

    const issue = await BookIssue.create({
      schoolId: req.user.schoolId,
      bookId,
      borrowerId,
      borrowerType,
      dueDate,
    });

    book.availableCopies -= 1;
    await book.save();

    await logAudit(req, 'BOOK_ISSUED', 'BookIssue', issue._id.toString());
    res.status(201).json({ success: true, message: 'Book issued successfully', data: issue });
  } catch (error) {
    next(error);
  }
};

exports.returnBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const issue = await BookIssue.findById(id);
    if (!issue || issue.status === 'returned') {
      return res.status(400).json({ success: false, message: 'Invalid or already returned issue record' });
    }

    issue.status = 'returned';
    issue.returnDate = new Date();
    await issue.save();

    await Book.findByIdAndUpdate(issue.bookId, { $inc: { availableCopies: 1 } });
    await logAudit(req, 'BOOK_RETURNED', 'BookIssue', issue._id.toString());
    res.status(200).json({ success: true, message: 'Book returned successfully' });
  } catch (error) {
    next(error);
  }
};
