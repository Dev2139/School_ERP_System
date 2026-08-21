const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema(
  {
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true, index: true },
    title: { type: String, required: true },
    category: {
      type: String,
      enum: ['student_doc', 'teacher_doc', 'certificate', 'id_card', 'other'],
      default: 'other',
    },
    relatedEntityId: { type: mongoose.Schema.Types.ObjectId, required: true, index: true },
    relatedEntityType: { type: String, enum: ['student', 'teacher', 'admission', 'school'], default: 'student' },
    fileUrl: { type: String, required: true },
    fileType: { type: String, default: 'application/pdf' },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Document', documentSchema);
