const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema(
  {
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true, index: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    employeeId: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true, trim: true },
    role: { type: String, enum: ['librarian', 'transport_manager', 'staff', 'admin'], required: true },
    email: { type: String, required: true, lowercase: true },
    phone: { type: String, required: true },
    designation: { type: String, required: true },
    joiningDate: { type: Date, default: Date.now },
    salaryInfo: {
      basicSalary: { type: Number, default: 35000 },
      netSalary: { type: Number, default: 35000 },
    },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Staff', staffSchema);
