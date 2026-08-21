const mongoose = require('mongoose');

const feeComponentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // e.g. "Tuition Fee", "Lab Fee"
    amount: { type: Number, required: true },
    type: { type: String, enum: ['tuition', 'admission', 'exam', 'transport', 'library', 'lab', 'other'], default: 'tuition' },
  },
  { _id: false }
);

const feeStructureSchema = new mongoose.Schema(
  {
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true, index: true },
    academicYearId: { type: mongoose.Schema.Types.ObjectId, ref: 'AcademicYear', required: true },
    classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true, index: true },
    title: { type: String, required: true }, // e.g. "Class 7 Annual Fee Structure"
    feeComponents: [feeComponentSchema],
    totalAmount: { type: Number, required: true },
    dueDate: { type: Date, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('FeeStructure', feeStructureSchema);
