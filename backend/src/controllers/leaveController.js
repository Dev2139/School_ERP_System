const LeaveRequest = require('../models/LeaveRequest');
const { logAudit } = require('../middleware/auditMiddleware');

exports.getLeaves = async (req, res, next) => {
  try {
    const query = { schoolId: req.user.schoolId };
    const isAdmin = ['super_admin', 'admin'].includes(req.user.role);

    // Non-admin users only see their own leave requests
    if (!isAdmin) {
      query.userId = req.user._id;
    }

    const leaves = await LeaveRequest.find(query).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: leaves });
  } catch (error) {
    next(error);
  }
};

exports.createLeave = async (req, res, next) => {
  try {
    const leave = await LeaveRequest.create({
      ...req.body,
      schoolId: req.user.schoolId,
      userId: req.user._id,
      applicantName: req.user.username,
      userRole: req.user.role,
    });
    await logAudit(req, 'LEAVE_REQUESTED', 'LeaveRequest', leave._id.toString());
    res.status(201).json({ success: true, data: leave });
  } catch (error) {
    next(error);
  }
};

exports.updateLeaveStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, reviewComments } = req.body;
    const leave = await LeaveRequest.findByIdAndUpdate(
      id,
      { status, reviewComments, reviewedBy: req.user._id },
      { new: true }
    );
    await logAudit(req, 'LEAVE_STATUS_UPDATED', 'LeaveRequest', leave._id.toString(), { status });
    res.status(200).json({ success: true, data: leave });
  } catch (error) {
    next(error);
  }
};
