const mongoose = require('mongoose');

const examSubjectSchema = new mongoose.Schema(
  {
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true, index: true },
    examinationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Examination', required: true, index: true },
    classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
    subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
    examDate: { type: Date, required: true },
    startTime: { type: String, default: '09:00 AM' },
    endTime: { type: String, default: '12:00 PM' },
    maxMarks: { type: Number, default: 100 },
    passMarks: { type: Number, default: 40 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ExamSubject', examSubjectSchema);
