const mongoose = require('mongoose');

const admissionSchema = new mongoose.Schema(
  {
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true, index: true },
    applicationNo: { type: String, required: true, unique: true, index: true },
    studentFirstName: { type: String, required: true, trim: true },
    studentLastName: { type: String, required: true, trim: true },
    dob: { type: Date, required: true },
    gender: { type: String, enum: ['male', 'female', 'other'], required: true },
    targetClassId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
    parentName: { type: String, required: true },
    parentEmail: { type: String, required: true, lowercase: true },
    parentPhone: { type: String, required: true },
    address: { type: String, required: true },
    previousSchool: { type: String, default: '' },
    documents: [
      {
        title: String,
        fileUrl: String,
      },
    ],
    status: {
      type: String,
      enum: ['enquiry', 'applied', 'under_review', 'approved', 'rejected', 'admitted'],
      default: 'enquiry',
      index: true,
    },
    remarks: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Admission', admissionSchema);
