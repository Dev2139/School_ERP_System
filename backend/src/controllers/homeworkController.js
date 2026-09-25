const Homework = require('../models/Homework');
const { logAudit } = require('../middleware/auditMiddleware');

exports.getHomework = async (req, res, next) => {
  try {
    const { classId, sectionId, subjectId } = req.query;
    const query = { schoolId: req.user.schoolId };

    if (req.user.role === 'student') {
      const Student = require('../models/Student');
      const studentDoc = await Student.findById(req.user.profileId);
      if (studentDoc) {
        query.classId = studentDoc.classId;
        query.sectionId = studentDoc.sectionId;
      }
    } else if (req.user.role === 'parent') {
      const Parent = require('../models/Parent');
      const parentDoc = await Parent.findById(req.user.profileId).populate('children');
      const classIds = parentDoc && parentDoc.children ? parentDoc.children.map((c) => c.classId) : [];
      query.classId = { $in: classIds };
    } else if (req.user.role === 'teacher') {
      if (req.user.profileId) {
        query.teacherId = req.user.profileId;
      }
      const mongoose = require('mongoose');
      if (classId && mongoose.Types.ObjectId.isValid(classId)) query.classId = classId;
      if (sectionId && mongoose.Types.ObjectId.isValid(sectionId)) query.sectionId = sectionId;
      if (subjectId && mongoose.Types.ObjectId.isValid(subjectId)) query.subjectId = subjectId;
    } else {
      const mongoose = require('mongoose');
      if (classId && mongoose.Types.ObjectId.isValid(classId)) query.classId = classId;
      if (sectionId && mongoose.Types.ObjectId.isValid(sectionId)) query.sectionId = sectionId;
      if (subjectId && mongoose.Types.ObjectId.isValid(subjectId)) query.subjectId = subjectId;
    }

    const list = await Homework.find(query)
      .populate('classId', 'name code')
      .populate('sectionId', 'name roomNo')
      .populate('subjectId', 'name code')
      .populate('teacherId', 'name email employeeId')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: list });
  } catch (error) {
    next(error);
  }
};

exports.createHomework = async (req, res, next) => {
  try {
    if (req.user.role === 'student') {
      return res.status(403).json({ success: false, message: 'Forbidden. Students are not allowed to assign homework.' });
    }

    const AcademicYear = require('../models/AcademicYear');
    let academicYearId = req.body.academicYearId;
    if (!academicYearId || academicYearId === '60d0fe4f5311236168a109ca') {
      const ay = await AcademicYear.findOne({ schoolId: req.user.schoolId, isCurrent: true })
        || await AcademicYear.findOne({ schoolId: req.user.schoolId });
      if (ay) academicYearId = ay._id;
    }

    const teacherId = req.user.profileId ? req.user.profileId : req.user._id;

    const hw = await Homework.create({
      ...req.body,
      schoolId: req.user.schoolId,
      academicYearId,
      teacherId,
      allowOnlineSubmission: Boolean(req.body.allowOnlineSubmission),
    });

    await logAudit(req, 'HOMEWORK_CREATED', 'Homework', hw._id.toString());
    res.status(201).json({ success: true, message: 'Homework assignment posted successfully', data: hw });
  } catch (error) {
    next(error);
  }
};

exports.submitHomework = async (req, res, next) => {
  try {
    const { homeworkId, content, fileUrl } = req.body;
    const hw = await Homework.findById(homeworkId);
    if (!hw) return res.status(404).json({ success: false, message: 'Homework assignment not found' });

    if (!hw.allowOnlineSubmission) {
      return res.status(400).json({
        success: false,
        message: 'Online submission is disabled for this assignment by the teacher. Please submit your work physically in class.',
      });
    }

    const studentProfileId = req.user.profileId ? (req.user.profileId._id || req.user.profileId) : req.user._id;

    const existingSub = hw.submissions.find((s) => s.studentId.toString() === studentProfileId.toString());
    if (existingSub) {
      existingSub.content = content;
      existingSub.fileUrl = fileUrl;
      existingSub.submissionDate = new Date();
    } else {
      hw.submissions.push({
        studentId: studentProfileId,
        content,
        fileUrl,
        status: new Date() > hw.dueDate ? 'late' : 'submitted',
      });
    }

    await hw.save();
    res.status(200).json({ success: true, message: 'Homework submitted successfully' });
  } catch (error) {
    next(error);
  }
};
