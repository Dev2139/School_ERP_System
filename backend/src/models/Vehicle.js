const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema(
  {
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true, index: true },
    vehicleNumber: { type: String, required: true, unique: true },
    vehicleModel: { type: String, required: true },
    capacity: { type: Number, default: 40 },
    driverName: { type: String, required: true },
    driverPhone: { type: String, required: true },
    driverLicense: { type: String, default: 'DL-9948123' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Vehicle', vehicleSchema);
