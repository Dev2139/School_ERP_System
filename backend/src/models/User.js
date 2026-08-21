const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true, index: true },
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true, index: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['admin', 'teacher', 'student', 'staff'],
      required: true,
      index: true,
    },
    mustChangePassword: { type: Boolean, default: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    profileId: { type: mongoose.Schema.Types.ObjectId, refPath: 'profileModel' },
    profileModel: { type: String, enum: ['Student', 'Teacher', 'Parent', 'Staff'] },
    refreshToken: { type: String, default: null },
    lastLogin: { type: Date, default: null },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  if (this.password && (this.password.startsWith('$2a$') || this.password.startsWith('$2b$'))) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
