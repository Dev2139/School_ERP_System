const LeaveRequest = require('../models/LeaveRequest');
const Student = require('../models/Student');
const Section = require('../models/Section');
const Teacher = require('../models/Teacher');
const { logAudit } = require('../middleware/auditMiddleware');

exports.getLeaves = async (req, res, next) => {
  try {
    const schoolId = req.user.schoolId;
    const role = req.user.role;

    if (role === 'student') {
      const leaves = await LeaveRequest.find({ schoolId, userId: req.user._id })
        .populate('classId sectionId classTeacherId')
        .sort({ createdAt: -1 });
      return res.status(200).json({ success: true, data: leaves });
    }

    if (role === 'teacher') {
      const teacherDoc = await Teacher.findById(req.user.profileId);
      const teacherId = teacherDoc?._id || req.user.profileId;

      // 1. Own leaves submitted by teacher
      const ownLeaves = await LeaveRequest.find({ schoolId, userId: req.user._id })
        .populate('classId sectionId')
        .sort({ createdAt: -1 });

      // 2. Student leaves routed to this teacher as Class Teacher
      const studentLeavesForApproval = await LeaveRequest.find({
        schoolId,
        userRole: 'student',
        classTeacherId: teacherId,
      })
        .populate('studentId classId sectionId')
        .sort({ createdAt: -1 });

      return res.status(200).json({
        success: true,
        data: {
          ownLeaves,
          studentLeavesForApproval,
        },
      });
    }

    // Admin / Principal view: return all leaves
    const leaves = await LeaveRequest.find({ schoolId })
      .populate('studentId classId sectionId classTeacherId')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: leaves });
  } catch (error) {
    next(error);
  }
};

exports.createLeave = async (req, res, next) => {
  try {
    const role = req.user.role;
    let initialStatus = 'pending_principal';
    let classTeacherId = null;
    let classId = null;
    let sectionId = null;
    let studentId = null;

    if (role === 'student' && req.user.profileId) {
      const studentDoc = await Student.findById(req.user.profileId);
      if (studentDoc) {
        studentId = studentDoc._id;
        classId = studentDoc.classId;
        sectionId = studentDoc.sectionId;

        if (sectionId) {
          const sectionDoc = await Section.findById(sectionId);
          if (sectionDoc && sectionDoc.classTeacher) {
            classTeacherId = sectionDoc.classTeacher;
            initialStatus = 'pending_class_teacher';
          }
        }
      }
    }

    const leave = await LeaveRequest.create({
      ...req.body,
      schoolId: req.user.schoolId,
      userId: req.user._id,
      applicantName: req.user.username,
      userRole: role,
      studentId,
      classId,
      sectionId,
      classTeacherId,
      status: initialStatus,
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
    const role = req.user.role;

    const existingLeave = await LeaveRequest.findById(id);
    if (!existingLeave) {
      return res.status(404).json({ success: false, message: 'Leave request not found' });
    }

    let nextStatus = status;
    let updateFields = {
      reviewedBy: req.user._id,
      reviewComments: reviewComments || '',
    };

    if (role === 'teacher') {
      // Class Teacher approval stage
      if (status === 'approved') {
        nextStatus = 'pending_principal'; // Advances to Principal approval
        updateFields.classTeacherApproval = {
          status: 'approved',
          approvedAt: new Date(),
          comments: reviewComments || 'Approved by Class Teacher',
        };
      } else {
        nextStatus = 'rejected';
        updateFields.classTeacherApproval = {
          status: 'rejected',
          approvedAt: new Date(),
          comments: reviewComments || 'Rejected by Class Teacher',
        };
      }
    } else if (['super_admin', 'admin'].includes(role)) {
      // Principal final approval stage
      if (status === 'approved') {
        nextStatus = 'approved';
        updateFields.principalApproval = {
          status: 'approved',
          approvedAt: new Date(),
          comments: reviewComments || 'Approved by Principal',
        };
      } else {
        nextStatus = 'rejected';
        updateFields.principalApproval = {
          status: 'rejected',
          approvedAt: new Date(),
          comments: reviewComments || 'Rejected by Principal',
        };
      }
    }

    updateFields.status = nextStatus;

    const updatedLeave = await LeaveRequest.findByIdAndUpdate(id, updateFields, { new: true });
    await logAudit(req, 'LEAVE_STATUS_UPDATED', 'LeaveRequest', id, { status: nextStatus });

    res.status(200).json({ success: true, data: updatedLeave });
  } catch (error) {
    next(error);
  }
};
