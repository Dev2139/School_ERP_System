const AcademicYear = require('../models/AcademicYear');
const Class = require('../models/Class');
const Section = require('../models/Section');
const Subject = require('../models/Subject');
const { logAudit } = require('../middleware/auditMiddleware');

exports.getAcademicYears = async (req, res, next) => {
  try {
    const years = await AcademicYear.find({ schoolId: req.user.schoolId }).sort({ startDate: -1 });
    res.status(200).json({ success: true, data: years });
  } catch (error) {
    next(error);
  }
};

exports.createAcademicYear = async (req, res, next) => {
  try {
    const year = await AcademicYear.create({ ...req.body, schoolId: req.user.schoolId });
    res.status(201).json({ success: true, data: year });
  } catch (error) {
    next(error);
  }
};

exports.getClasses = async (req, res, next) => {
  try {
    const classes = await Class.find({ schoolId: req.user.schoolId }).populate('classTeacher');
    const sections = await Section.find({ schoolId: req.user.schoolId });
    const subjects = await Subject.find({ schoolId: req.user.schoolId }).populate('teacherId');

    const result = classes.map((c) => {
      const classSections = sections.filter((s) => s.classId.toString() === c._id.toString());
      const classSubjects = subjects.filter((sb) => sb.classId.toString() === c._id.toString());
      return {
        ...c.toObject(),
        sections: classSections,
        subjects: classSubjects,
      };
    });

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

exports.createClass = async (req, res, next) => {
  try {
    const newClass = await Class.create({ ...req.body, schoolId: req.user.schoolId });
    res.status(201).json({ success: true, data: newClass });
  } catch (error) {
    next(error);
  }
};

exports.createSection = async (req, res, next) => {
  try {
    const section = await Section.create({ ...req.body, schoolId: req.user.schoolId });
    res.status(201).json({ success: true, data: section });
  } catch (error) {
    next(error);
  }
};

exports.createSubject = async (req, res, next) => {
  try {
    const subject = await Subject.create({ ...req.body, schoolId: req.user.schoolId });
    res.status(201).json({ success: true, data: subject });
  } catch (error) {
    next(error);
  }
};

exports.getSubjects = async (req, res, next) => {
  try {
    const subjects = await Subject.find({ schoolId: req.user.schoolId }).populate('teacherId classId');
    res.status(200).json({ success: true, data: subjects });
  } catch (error) {
    next(error);
  }
};
