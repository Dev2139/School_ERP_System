const Notice = require('../models/Notice');
const { logAudit } = require('../middleware/auditMiddleware');

exports.getNotices = async (req, res, next) => {
  try {
    const query = { schoolId: req.user.schoolId };

    if (req.user.role === 'student') {
      query.targetAudience = { $in: ['everyone', 'students'] };
    } else if (req.user.role === 'parent') {
      query.targetAudience = { $in: ['everyone', 'parents'] };
    } else if (req.user.role === 'teacher') {
      query.targetAudience = { $in: ['everyone', 'teachers'] };
    }

    const notices = await Notice.find(query).sort({ isPinned: -1, createdAt: -1 });
    res.status(200).json({ success: true, data: notices });
  } catch (error) {
    next(error);
  }
};

exports.createNotice = async (req, res, next) => {
  try {
    const notice = await Notice.create({ ...req.body, schoolId: req.user.schoolId, createdBy: req.user._id });
    await logAudit(req, 'NOTICE_CREATED', 'Notice', notice._id.toString());
    res.status(201).json({ success: true, data: notice });
  } catch (error) {
    next(error);
  }
};

exports.deleteNotice = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Notice.findOneAndDelete({ _id: id, schoolId: req.user.schoolId });
    await logAudit(req, 'NOTICE_DELETED', 'Notice', id);
    res.status(200).json({ success: true, message: 'Notice deleted successfully' });
  } catch (error) {
    next(error);
  }
};
