const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    code: { type: String, required: true, unique: true, uppercase: true },
    logo: { type: String, default: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=200&h=200&fit=crop' },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    website: { type: String, default: '' },
    principalName: { type: String, required: true },
    establishedYear: { type: Number, default: 2005 },
    affiliationNo: { type: String, default: 'CBSE-998231' },
    settings: {
      academicYearId: { type: mongoose.Schema.Types.ObjectId, ref: 'AcademicYear' },
      gradingSystem: { type: String, enum: ['letter', 'percentage', 'gpa'], default: 'letter' },
      attendanceType: { type: String, enum: ['daily', 'subject'], default: 'daily' },
      currency: { type: String, default: 'USD' },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('School', schoolSchema);
