const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    submissionDate: { type: Date, default: Date.now },
    content: { type: String, default: '' },
    fileUrl: { type: String, default: '' },
    status: { type: String, enum: ['submitted', 'late', 'graded', 'pending'], default: 'submitted' },
    grade: { type: String, default: '' },
    feedback: { type: String, default: '' },
  },
  { _id: true }
);

const homeworkSchema = new mongoose.Schema(
  {
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true, index: true },
    academicYearId: { type: mongoose.Schema.Types.ObjectId, ref: 'AcademicYear', required: true },
    classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true, index: true },
    sectionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Section', required: true, index: true },
    subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    assignedDate: { type: Date, default: Date.now },
    dueDate: { type: Date, required: true },
    attachments: [
      {
        name: String,
        url: String,
      },
    ],
    submissions: [submissionSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Homework', homeworkSchema);
