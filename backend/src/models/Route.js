const mongoose = require('mongoose');

const stopSchema = new mongoose.Schema(
  {
    stopName: { type: String, required: true },
    pickupTime: { type: String, required: true },
    dropTime: { type: String, required: true },
    fare: { type: Number, default: 50 },
  },
  { _id: false }
);

const routeSchema = new mongoose.Schema(
  {
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true, index: true },
    routeName: { type: String, required: true }, // e.g. "North City Route 1"
    vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' },
    startPoint: { type: String, required: true },
    endPoint: { type: String, required: true },
    stops: [stopSchema],
    assignedStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Route', routeSchema);
