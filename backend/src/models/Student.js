const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true, index: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    admissionNumber: { type: String, required: true, unique: true, index: true },
    studentId: { type: String, required: true, unique: true, index: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    dob: { type: Date, default: '2006-01-01' },
    gender: { type: String, enum: ['male', 'female', 'other'], default: 'male' },
    bloodGroup: { type: String, default: 'O+' },
    email: { type: String, required: true, lowercase: true, index: true },
    phone: { type: String, default: '' },
    address: { type: String, default: '' },
    city: { type: String, default: '' },
    state: { type: String, default: '' },
    pincode: { type: String, default: '' },
    fatherName: { type: String, default: '' },
    fatherPhone: { type: String, default: '' },
    motherName: { type: String, default: '' },
    motherPhone: { type: String, default: '' },
    program: { type: String, default: '' },
    registrationNo: { type: String, default: '' },
    category: { type: String, default: 'Non-Sponsored' },
    isProfileComplete: { type: Boolean, default: false },
    profilePhoto: { type: String, default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop' },
    admissionDate: { type: Date, default: Date.now },
    academicYearId: { type: mongoose.Schema.Types.ObjectId, ref: 'AcademicYear', required: true },
    classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true, index: true },
    sectionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Section', required: true, index: true },
    rollNumber: { type: Number, required: true },
    parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Parent', index: true },
    emergencyContact: { type: String, default: '' },
    notes: { type: String, default: '' },
    status: { type: String, enum: ['active', 'inactive', 'transferred', 'graduated'], default: 'active', index: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Student', studentSchema);
