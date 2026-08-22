const mongoose = require('mongoose');

const salarySchema = new mongoose.Schema(
  {
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true, index: true },
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true, index: true },
    teacherName: { type: String, required: true },
    month: { type: String, required: true }, // e.g. "August 2026"
    basicSalary: { type: Number, required: true },
    allowances: { type: Number, default: 0 },
    deductions: { type: Number, default: 0 },
    netSalary: { type: Number, required: true }, // basic + allowances - deductions
    paymentDate: { type: Date, default: Date.now },
    paymentMethod: { type: String, enum: ['Bank Transfer', 'UPI', 'Cash', 'Cheque'], default: 'Bank Transfer' },
    transactionRef: { type: String, required: true },
    status: { type: String, enum: ['Paid', 'Pending', 'Processing'], default: 'Paid' },
    remarks: { type: String, default: '' },
    disbursedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Salary', salarySchema);
