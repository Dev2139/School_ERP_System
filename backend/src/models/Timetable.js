const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema(
  {
    day: { type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], required: true },
    periodNumber: { type: Number, required: true },
    startTime: { type: String, required: true }, // e.g. "09:00 AM"
    endTime: { type: String, required: true },   // e.g. "09:45 AM"
    subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
    classroom: { type: String, default: 'Room 101' },
  },
  { _id: true }
);

const timetableSchema = new mongoose.Schema(
  {
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true, index: true },
    academicYearId: { type: mongoose.Schema.Types.ObjectId, ref: 'AcademicYear', required: true },
    classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true, index: true },
    sectionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Section', required: true, index: true },
    slots: [slotSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Timetable', timetableSchema);
