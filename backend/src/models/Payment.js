const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
  {
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true, index: true },
    studentFeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'StudentFee', required: true, index: true },
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true, index: true },
    receiptNo: { type: String, required: true, unique: true, index: true },
    amountPaid: { type: Number, required: true },
    paymentMethod: { type: String, enum: ['cash', 'card', 'online', 'cheque', 'bank_transfer'], default: 'cash' },
    paymentDate: { type: Date, default: Date.now },
    transactionId: { type: String, default: '' },
    status: { type: String, enum: ['success', 'pending', 'failed'], default: 'success' },
    remarks: { type: String, default: '' },
    recordedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Payment', paymentSchema);
