const Teacher = require('../models/Teacher');
const User = require('../models/User');
const Subject = require('../models/Subject');
const Class = require('../models/Class');
const { logAudit } = require('../middleware/auditMiddleware');

async function resolveSubjectsFromInput(schoolId, subjectsInput) {
  if (!subjectsInput) return { subjectIds: [], names: [] };
  
  let names = [];
  if (typeof subjectsInput === 'string') {
    names = subjectsInput.split(',').map((s) => s.trim()).filter(Boolean);
  } else if (Array.isArray(subjectsInput)) {
    names = subjectsInput.map((s) => (typeof s === 'string' ? s.trim() : s.name)).filter(Boolean);
  }

  let fallbackClass = await Class.findOne({ schoolId });
  const defaultClassId = fallbackClass ? fallbackClass._id : '60d0fe4f5311236168a109ca';

  const subjectIds = [];
  for (const name of names) {
    let subject = await Subject.findOne({
      schoolId,
      name: new RegExp(`^${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i'),
    });

    if (!subject) {
      const code = name.replace(/[^A-Za-z0-9]/g, '').substring(0, 4).toUpperCase() || 'SUB';
      subject = await Subject.create({
        schoolId,
        classId: defaultClassId,
        name,
        code,
      });
    }
    subjectIds.push(subject._id);
  }
  return { subjectIds, names };
}

exports.getTeachers = async (req, res, next) => {
  try {
    const query = { schoolId: req.user.schoolId };

    if (req.user.role === 'student') {
      const Student = require('../models/Student');
      const studentDoc = await Student.findById(req.user.profileId);
      if (studentDoc) query.assignedClasses = studentDoc.classId;
    } else if (req.user.role === 'parent') {
      const Parent = require('../models/Parent');
      const Student = require('../models/Student');
      const parentDoc = await Parent.findById(req.user.profileId).populate('children');
      const classIds = parentDoc && parentDoc.children ? parentDoc.children.map((c) => c.classId) : [];
      query.assignedClasses = { $in: classIds };
    }

    const teachers = await Teacher.find(query)
      .populate('subjects')
      .populate('assignedClasses');
    res.status(200).json({ success: true, data: teachers });
  } catch (error) {
    next(error);
  }
};

exports.createTeacher = async (req, res, next) => {
  try {
    const data = req.body;
    data.schoolId = req.user.schoolId;

    if (data.subjectsInput || data.qualification) {
      const inputStr = data.subjectsInput || data.qualification;
      const { subjectIds, names } = await resolveSubjectsFromInput(req.user.schoolId, inputStr);
      if (subjectIds.length > 0) {
        data.subjects = subjectIds;
        data.qualification = names.join(', ');
      }
    }

    const { formatDOBToPassword } = require('../utils/passwordHelper');
    const TeacherAssignment = require('../models/TeacherAssignment');
    const initialPassword = formatDOBToPassword(data.dob || '1990-01-01');

    const user = await User.create({
      schoolId: req.user.schoolId,
      username: data.name.toLowerCase().replace(/\s+/g, '') + Math.floor(100 + Math.random() * 900),
      email: data.email.toLowerCase().trim(),
      password: initialPassword,
      role: 'teacher',
      mustChangePassword: true,
    });

    data.userId = user._id;
    let teacher = await Teacher.create(data);

    // Create TeacherAssignment records
    if (data.assignedClasses && Array.isArray(data.assignedClasses) && data.subjects && Array.isArray(data.subjects)) {
      for (const clsId of data.assignedClasses) {
        for (const subId of data.subjects) {
          await TeacherAssignment.create({
            schoolId: req.user.schoolId,
            teacherId: teacher._id,
            classId: clsId,
            sectionId: data.sectionId || clsId,
            subjectId: subId,
          });
        }
      }
    }

    user.profileId = teacher._id;
    user.profileModel = 'Teacher';
    await user.save();

    teacher = await Teacher.findById(teacher._id).populate('subjects');

    await logAudit(req, 'TEACHER_CREATED', 'Teacher', teacher._id.toString());
    res.status(201).json({ success: true, message: 'Teacher created successfully', data: teacher });
  } catch (error) {
    next(error);
  }
};

exports.updateTeacher = async (req, res, next) => {
  try {
    if (req.body.subjectsInput || req.body.qualification) {
      const inputStr = req.body.subjectsInput || req.body.qualification;
      const { subjectIds, names } = await resolveSubjectsFromInput(req.user.schoolId, inputStr);
      if (subjectIds.length > 0) {
        req.body.subjects = subjectIds;
        req.body.qualification = names.join(', ');
      }
    }

    const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('subjects')
      .populate('assignedClasses');

    if (!teacher) {
      return res.status(404).json({ success: false, message: 'Teacher not found' });
    }

    if (req.body.email && teacher.userId) {
      await User.findByIdAndUpdate(teacher.userId, { email: req.body.email.toLowerCase().trim() });
    }

    await logAudit(req, 'TEACHER_UPDATED', 'Teacher', teacher._id.toString());
    res.status(200).json({ success: true, message: 'Teacher updated successfully', data: teacher });
  } catch (error) {
    next(error);
  }
};

exports.deleteTeacher = async (req, res, next) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).json({ success: false, message: 'Teacher not found' });
    }

    if (teacher.userId) {
      await User.findByIdAndDelete(teacher.userId);
    }

    await Teacher.findByIdAndDelete(req.params.id);
    await logAudit(req, 'TEACHER_DELETED', 'Teacher', req.params.id);
    res.status(200).json({ success: true, message: 'Teacher deleted successfully' });
  } catch (error) {
    next(error);
  }
};
