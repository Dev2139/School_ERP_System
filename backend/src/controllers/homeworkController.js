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
      const Student = require('../models/Student');
      const parentDoc = await Parent.findById(req.user.profileId).populate('children');
      const classIds = parentDoc && parentDoc.children ? parentDoc.children.map((c) => c.classId) : [];
      query.classId = { $in: classIds };
    } else {
      if (classId) query.classId = classId;
      if (sectionId) query.sectionId = sectionId;
      if (subjectId) query.subjectId = subjectId;
    }

    const list = await Homework.find(query)
      .populate('subjectId', 'name code')
      .populate('teacherId', 'name')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: list });
  } catch (error) {
    next(error);
  }
};

exports.createHomework = async (req, res, next) => {
  try {
    const hw = await Homework.create({ ...req.body, schoolId: req.user.schoolId, teacherId: req.user.profileId });
    await logAudit(req, 'HOMEWORK_CREATED', 'Homework', hw._id.toString());
    res.status(201).json({ success: true, message: 'Homework created', data: hw });
  } catch (error) {
    next(error);
  }
};

exports.submitHomework = async (req, res, next) => {
  try {
    const { homeworkId, content, fileUrl } = req.body;
    const hw = await Homework.findById(homeworkId);
    if (!hw) return res.status(404).json({ success: false, message: 'Homework not found' });

    const existingSub = hw.submissions.find((s) => s.studentId.toString() === req.user.profileId.toString());
    if (existingSub) {
      existingSub.content = content;
      existingSub.fileUrl = fileUrl;
      existingSub.submissionDate = new Date();
    } else {
      hw.submissions.push({
        studentId: req.user.profileId,
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
