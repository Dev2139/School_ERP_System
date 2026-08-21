const School = require('../models/School');
const AuditLog = require('../models/AuditLog');
const { logAudit } = require('../middleware/auditMiddleware');

exports.getSchoolProfile = async (req, res, next) => {
  try {
    const school = await School.findById(req.user.schoolId);
    res.status(200).json({ success: true, data: school });
  } catch (error) {
    next(error);
  }
};

exports.updateSchoolProfile = async (req, res, next) => {
  try {
    const school = await School.findByIdAndUpdate(req.user.schoolId, req.body, { new: true });
    await logAudit(req, 'SCHOOL_SETTINGS_UPDATED', 'School', school._id.toString());
    res.status(200).json({ success: true, message: 'School settings updated', data: school });
  } catch (error) {
    next(error);
  }
};

exports.getAuditLogs = async (req, res, next) => {
  try {
    const logs = await AuditLog.find({ schoolId: req.user.schoolId }).sort({ createdAt: -1 }).limit(100);
    res.status(200).json({ success: true, data: logs });
  } catch (error) {
    next(error);
  }
};
