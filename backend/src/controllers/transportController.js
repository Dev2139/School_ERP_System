const Vehicle = require('../models/Vehicle');
const Route = require('../models/Route');
const { logAudit } = require('../middleware/auditMiddleware');

exports.getVehicles = async (req, res, next) => {
  try {
    const vehicles = await Vehicle.find({ schoolId: req.user.schoolId });
    res.status(200).json({ success: true, data: vehicles });
  } catch (error) {
    next(error);
  }
};

exports.createVehicle = async (req, res, next) => {
  try {
    const vehicle = await Vehicle.create({ ...req.body, schoolId: req.user.schoolId });
    res.status(201).json({ success: true, data: vehicle });
  } catch (error) {
    next(error);
  }
};

exports.getRoutes = async (req, res, next) => {
  try {
    const routes = await Route.find({ schoolId: req.user.schoolId }).populate('vehicleId').populate('assignedStudents', 'firstName lastName admissionNumber');
    res.status(200).json({ success: true, data: routes });
  } catch (error) {
    next(error);
  }
};

exports.createRoute = async (req, res, next) => {
  try {
    const route = await Route.create({ ...req.body, schoolId: req.user.schoolId });
    res.status(201).json({ success: true, data: route });
  } catch (error) {
    next(error);
  }
};
