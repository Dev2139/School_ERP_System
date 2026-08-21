const mongoose = require('mongoose');

const parentSchema = new mongoose.Schema(
  {
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true, index: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    parentId: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true, trim: true },
    relationship: { type: String, enum: ['father', 'mother', 'guardian'], default: 'father' },
    phone: { type: String, required: true, index: true },
    email: { type: String, required: true, lowercase: true, index: true },
    address: { type: String, required: true },
    occupation: { type: String, default: 'Self-Employed' },
    children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Parent', parentSchema);
