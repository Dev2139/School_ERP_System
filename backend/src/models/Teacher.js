const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema(
  {
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true, index: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    employeeId: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true, trim: true },
    profilePhoto: { type: String, default: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop' },
    email: { type: String, required: true, lowercase: true, index: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    qualification: { type: String, required: true },
    experience: { type: String, default: '5 Years' },
    joiningDate: { type: Date, default: Date.now },
    subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }],
    assignedClasses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }],
    salaryInfo: {
      basicSalary: { type: Number, default: 50000 },
      allowance: { type: Number, default: 5000 },
      deductions: { type: Number, default: 2000 },
      netSalary: { type: Number, default: 53000 },
    },
    status: { type: String, enum: ['active', 'inactive', 'on_leave'], default: 'active' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Teacher', teacherSchema);
