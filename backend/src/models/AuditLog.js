const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema(
  {
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true, index: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    userName: { type: String, required: true },
    userRole: { type: String, required: true },
    action: { type: String, required: true }, // e.g. "STUDENT_CREATED", "MARKS_ENTERED"
    entity: { type: String, required: true }, // e.g. "Student", "Result", "Payment"
    entityId: { type: String, default: '' },
    ipAddress: { type: String, default: '127.0.0.1' },
    metadata: { type: Object, default: {} },
  },
  { timestamps: true }
);

module.exports = mongoose.model('AuditLog', auditLogSchema);
