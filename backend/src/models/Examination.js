const mongoose = require('mongoose');

const examinationSchema = new mongoose.Schema(
  {
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true, index: true },
    academicYearId: { type: mongoose.Schema.Types.ObjectId, ref: 'AcademicYear', required: true },
    name: { type: String, required: true }, // e.g. "Mid-Term Examination 2026"
    term: { type: String, enum: ['Term 1', 'Term 2', 'Final'], default: 'Term 1' },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: { type: String, enum: ['draft', 'scheduled', 'completed', 'published'], default: 'scheduled' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Examination', examinationSchema);
