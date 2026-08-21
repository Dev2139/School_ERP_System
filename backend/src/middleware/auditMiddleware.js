const AuditLog = require('../models/AuditLog');

const logAudit = async (req, action, entity, entityId = '', metadata = {}) => {
  try {
    if (!req.user) return;
    await AuditLog.create({
      schoolId: req.user.schoolId,
      userId: req.user._id,
      userName: req.user.username,
      userRole: req.user.role,
      action,
      entity,
      entityId,
      ipAddress: req.ip || req.headers['x-forwarded-for'] || '127.0.0.1',
      metadata,
    });
  } catch (err) {
    console.error('[AuditLog Error]:', err.message);
  }
};

module.exports = { logAudit };
