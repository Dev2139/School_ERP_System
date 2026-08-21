const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema(
  {
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true, index: true },
    classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true, index: true },
    name: { type: String, required: true }, // e.g. "Mathematics"
    code: { type: String, required: true }, // e.g. "MATH-7"
    type: { type: String, enum: ['theory', 'practical', 'both'], default: 'theory' },
    maxMarks: { type: Number, default: 100 },
    passMarks: { type: Number, default: 40 },
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Subject', subjectSchema);
