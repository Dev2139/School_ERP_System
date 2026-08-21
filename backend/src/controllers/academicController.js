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
    const sections = await Section.find({ schoolId: req.user.schoolId }).populate('classTeacher');
    const subjects = await Subject.find({ schoolId: req.user.schoolId }).populate('teacherId');
    const Teacher = require('../models/Teacher');
    const allTeachers = await Teacher.find({ schoolId: req.user.schoolId });

    const result = classes.map((c) => {
      const classSections = sections.filter((s) => s.classId.toString() === c._id.toString());
      const classSubjects = subjects.filter((sb) => sb.classId.toString() === c._id.toString()).map((sb) => {
        const sbObj = sb.toObject();
        if (!sbObj.teacherId) {
          const subjName = sbObj.name ? sbObj.name.toLowerCase() : '';
          const matchedTeacher = allTeachers.find((t) => {
            const hasSubjMatch =
              t.subjects &&
              t.subjects.some(
                (sub) => (sub._id || sub).toString() === sbObj._id.toString() || (sub.name && sub.name.toLowerCase() === subjName)
              );
            const qualString = (t.qualification || '').toLowerCase();
            const hasQualMatch = qualString.length > 0 && (subjName.includes(qualString) || qualString.includes(subjName));
            return hasSubjMatch || hasQualMatch;
          });
          if (matchedTeacher) {
            sbObj.teacherId = {
              _id: matchedTeacher._id,
              name: matchedTeacher.name,
              qualification: matchedTeacher.qualification,
            };
          }
        }
        return sbObj;
      });

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
    // If teacher role, return ONLY subjects assigned to this teacher!
    if (req.user.role === 'teacher') {
      const Teacher = require('../models/Teacher');
      const teacherDoc = await Teacher.findById(req.user.profileId);
      if (teacherDoc) {
        const subjectIds = teacherDoc.subjects || [];
        const qualString = (teacherDoc.qualification || '').trim().toLowerCase();

        const allSchoolSubjects = await Subject.find({ schoolId: req.user.schoolId }).populate('teacherId classId');
        const matched = allSchoolSubjects.filter((s) => {
          const sName = s.name ? s.name.toLowerCase() : '';
          const sTeacherId = s.teacherId?._id ? s.teacherId._id.toString() : s.teacherId ? s.teacherId.toString() : '';

          // 1. Direct teacherId match on Subject
          const isDirectTeacher = sTeacherId === teacherDoc._id.toString();

          // 2. Direct ObjectId match in teacher.subjects array
          const hasObjMatch = subjectIds.some((sub) => (sub._id || sub).toString() === s._id.toString());

          // 3. Bi-directional name match between qualification & subject name
          const hasQualMatch = qualString.length > 0 && (sName.includes(qualString) || qualString.includes(sName));

          return isDirectTeacher || hasObjMatch || hasQualMatch;
        });

        return res.status(200).json({ success: true, data: matched });
      }
    }

    const subjects = await Subject.find({ schoolId: req.user.schoolId }).populate('teacherId classId');
    res.status(200).json({ success: true, data: subjects });
  } catch (error) {
    next(error);
  }
};

exports.deleteClass = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Class.findOneAndDelete({ _id: id, schoolId: req.user.schoolId });
    await Section.deleteMany({ classId: id });
    await Subject.deleteMany({ classId: id });
    await logAudit(req, 'CLASS_DELETED', 'Class', id);
    res.status(200).json({ success: true, message: 'Class deleted successfully' });
  } catch (error) {
    next(error);
  }
};

exports.deleteSection = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Section.findOneAndDelete({ _id: id, schoolId: req.user.schoolId });
    await logAudit(req, 'SECTION_DELETED', 'Section', id);
    res.status(200).json({ success: true, message: 'Section deleted successfully' });
  } catch (error) {
    next(error);
  }
};

exports.deleteSubject = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Subject.findOneAndDelete({ _id: id, schoolId: req.user.schoolId });
    await logAudit(req, 'SUBJECT_DELETED', 'Subject', id);
    res.status(200).json({ success: true, message: 'Subject deleted successfully' });
  } catch (error) {
    next(error);
  }
};

exports.updateSection = async (req, res, next) => {
  try {
    const { id } = req.params;
    const section = await Section.findOneAndUpdate({ _id: id, schoolId: req.user.schoolId }, req.body, { new: true }).populate('classTeacher');
    await logAudit(req, 'SECTION_UPDATED', 'Section', id);
    res.status(200).json({ success: true, data: section });
  } catch (error) {
    next(error);
  }
};

exports.updateSubject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const subject = await Subject.findOneAndUpdate({ _id: id, schoolId: req.user.schoolId }, req.body, { new: true }).populate('teacherId');
    await logAudit(req, 'SUBJECT_UPDATED', 'Subject', id);
    res.status(200).json({ success: true, data: subject });
  } catch (error) {
    next(error);
  }
};
