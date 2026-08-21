const mongoose = require('mongoose');

const classSchema = new mongoose.Schema(
  {
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true, index: true },
    academicYearId: { type: mongoose.Schema.Types.ObjectId, ref: 'AcademicYear', required: true },
    name: { type: String, required: true }, // e.g. "Class 7"
    code: { type: String, required: true }, // e.g. "C7"
    classTeacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Class', classSchema);
