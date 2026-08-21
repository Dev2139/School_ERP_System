const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true, index: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    category: { type: String, enum: ['holiday', 'exam', 'event', 'meeting', 'sports'], default: 'event' },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    isAllDay: { type: Boolean, default: true },
    location: { type: String, default: 'School Grounds' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Event', eventSchema);
