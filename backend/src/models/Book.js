const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true, index: true },
    isbn: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    category: { type: String, default: 'General' },
    publisher: { type: String, default: 'Academic Press' },
    totalCopies: { type: Number, default: 5 },
    availableCopies: { type: Number, default: 5 },
    rackNo: { type: String, default: 'A-12' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Book', bookSchema);
