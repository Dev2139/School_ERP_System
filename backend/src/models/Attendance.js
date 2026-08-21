const mongoose = require('mongoose');

const attendanceRecordSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    status: { type: String, enum: ['present', 'absent', 'late', 'leave'], default: 'present' },
    remark: { type: String, default: '' },
  },
  { _id: false }
);

const attendanceSchema = new mongoose.Schema(
  {
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true, index: true },
    academicYearId: { type: mongoose.Schema.Types.ObjectId, ref: 'AcademicYear', required: true },
    classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true, index: true },
    sectionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Section', required: true, index: true },
    date: { type: Date, required: true, index: true },
    markedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    records: [attendanceRecordSchema],
  },
  { timestamps: true }
);

attendanceSchema.index({ schoolId: 1, classId: 1, sectionId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
