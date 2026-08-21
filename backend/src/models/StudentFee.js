const mongoose = require('mongoose');

const studentFeeSchema = new mongoose.Schema(
  {
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true, index: true },
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true, index: true },
    feeStructureId: { type: mongoose.Schema.Types.ObjectId, ref: 'FeeStructure', required: true },
    academicYearId: { type: mongoose.Schema.Types.ObjectId, ref: 'AcademicYear', required: true },
    discountAmount: { type: Number, default: 0 },
    netAmount: { type: Number, required: true },
    paidAmount: { type: Number, default: 0 },
    balanceAmount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'partial', 'paid', 'overdue'], default: 'pending', index: true },
    dueDate: { type: Date, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('StudentFee', studentFeeSchema);
