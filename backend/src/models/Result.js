const mongoose = require('mongoose');

const markDetailSchema = new mongoose.Schema(
  {
    subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
    marksObtained: { type: Number, required: true },
    maxMarks: { type: Number, default: 100 },
    passMarks: { type: Number, default: 40 },
    grade: { type: String, default: 'A' },
    isPass: { type: Boolean, default: true },
  },
  { _id: false }
);

const resultSchema = new mongoose.Schema(
  {
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true, index: true },
    examinationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Examination', required: true, index: true },
    classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true, index: true },
    sectionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Section', required: true },
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true, index: true },
    marks: [markDetailSchema],
    totalMarks: { type: Number, required: true },
    maxTotalMarks: { type: Number, required: true },
    percentage: { type: Number, required: true },
    gpa: { type: Number, default: 4.0 },
    rank: { type: Number, default: 1 },
    status: { type: String, enum: ['pass', 'fail'], default: 'pass' },
    remarks: { type: String, default: 'Excellent Performance' },
  },
  { timestamps: true }
);

resultSchema.index({ examinationId: 1, studentId: 1 }, { unique: true });

module.exports = mongoose.model('Result', resultSchema);
