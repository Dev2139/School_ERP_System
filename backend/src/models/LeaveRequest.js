const mongoose = require('mongoose');

const leaveRequestSchema = new mongoose.Schema(
  {
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true, index: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    applicantName: { type: String, required: true },
    userRole: { type: String, required: true },
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
    sectionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Section' },
    classTeacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
    leaveType: { type: String, enum: ['casual', 'sick', 'maternity', 'paid', 'other'], default: 'casual' },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    reason: { type: String, required: true },
    status: {
      type: String,
      enum: ['pending_class_teacher', 'pending_principal', 'approved', 'rejected'],
      default: 'pending_class_teacher',
      index: true,
    },
    classTeacherApproval: {
      status: { type: String, enum: ['approved', 'rejected', 'pending'], default: 'pending' },
      approvedAt: Date,
      comments: String,
    },
    principalApproval: {
      status: { type: String, enum: ['approved', 'rejected', 'pending'], default: 'pending' },
      approvedAt: Date,
      comments: String,
    },
    reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    reviewComments: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('LeaveRequest', leaveRequestSchema);
