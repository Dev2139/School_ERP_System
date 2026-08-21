const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema(
  {
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true, index: true },
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    targetAudience: {
      type: String,
      enum: ['everyone', 'teachers', 'students', 'parents', 'class'],
      default: 'everyone',
    },
    targetClassId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
    targetSectionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Section' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    priority: { type: String, enum: ['low', 'medium', 'high', 'urgent'], default: 'medium' },
    isPinned: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Notice', noticeSchema);
