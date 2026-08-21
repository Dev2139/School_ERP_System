const mongoose = require('mongoose');

const bookIssueSchema = new mongoose.Schema(
  {
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true, index: true },
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    borrowerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    borrowerType: { type: String, enum: ['student', 'teacher', 'staff'], default: 'student' },
    issueDate: { type: Date, default: Date.now },
    dueDate: { type: Date, required: true },
    returnDate: { type: Date, default: null },
    fineAmount: { type: Number, default: 0 },
    status: { type: String, enum: ['issued', 'returned', 'overdue'], default: 'issued', index: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('BookIssue', bookIssueSchema);
