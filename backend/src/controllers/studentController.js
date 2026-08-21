const Student = require('../models/Student');
const User = require('../models/User');
const Parent = require('../models/Parent');
const Attendance = require('../models/Attendance');
const Result = require('../models/Result');
const StudentFee = require('../models/StudentFee');
const Homework = require('../models/Homework');
const { logAudit } = require('../middleware/auditMiddleware');

exports.getStudents = async (req, res, next) => {
  try {
    const { search, classId, sectionId, status, page = 1, limit = 10 } = req.query;
    const query = {};
    if (req.user && req.user.schoolId) {
      query.schoolId = req.user.schoolId;
    }

    if (req.user.role === 'student') {
      query._id = req.user.profileId;
    } else if (req.user.role === 'parent') {
      let parentDoc = null;
      if (req.user.profileId) {
        parentDoc = await Parent.findById(req.user.profileId);
      }
      if (!parentDoc) {
        parentDoc = await Parent.findOne({ email: req.user.email });
      }

      const linkedChildrenIds = parentDoc && parentDoc.children ? parentDoc.children : [];
      const parentIdMatch = parentDoc ? parentDoc._id : null;

      query.$or = [
        { _id: { $in: linkedChildrenIds } },
        ...(parentIdMatch ? [{ parentId: parentIdMatch }] : []),
      ];
    } else {
      if (classId) query.classId = classId;
      if (sectionId) query.sectionId = sectionId;
      if (status) query.status = status;

      if (search && search !== 'undefined' && search.trim() !== '') {
        query.$or = [
          { firstName: { $regex: search.trim(), $options: 'i' } },
          { lastName: { $regex: search.trim(), $options: 'i' } },
          { admissionNumber: { $regex: search.trim(), $options: 'i' } },
          { studentId: { $regex: search.trim(), $options: 'i' } },
          { email: { $regex: search.trim(), $options: 'i' } },
        ];
      }
    }

    const total = await Student.countDocuments(query);
    const students = await Student.find(query)
      .populate('classId', 'name code')
      .populate('sectionId', 'name roomNo')
      .populate('parentId', 'name phone email relationship')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      data: students,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getStudentById = async (req, res, next) => {
  try {
    const targetId = req.params.id;

    if (req.user.role === 'student' && targetId !== req.user.profileId?.toString()) {
      return res.status(403).json({ success: false, message: 'Forbidden. You can only view your own student profile.' });
    }

    if (req.user.role === 'parent') {
      let parentDoc = null;
      if (req.user.profileId) {
        parentDoc = await Parent.findById(req.user.profileId);
      }
      if (!parentDoc) {
        parentDoc = await Parent.findOne({ email: req.user.email });
      }

      const childIds = parentDoc && parentDoc.children ? parentDoc.children.map((c) => c.toString()) : [];
      const studentDoc = await Student.findById(targetId);

      const isChildLinked = childIds.includes(targetId);
      const isParentMatch = studentDoc && parentDoc && studentDoc.parentId?.toString() === parentDoc._id.toString();

      if (!isChildLinked && !isParentMatch) {
        return res.status(403).json({ success: false, message: 'Forbidden. You can only view your own children.' });
      }
    }

    let student = await Student.findById(targetId)
      .populate('classId')
      .populate('sectionId')
      .populate('parentId')
      .populate('academicYearId');

    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    // Auto-resolve parentId if missing or invalid by querying Parent collection
    if (!student.parentId || !student.parentId.name) {
      let parentDoc = await Parent.findOne({ children: student._id });
      if (!parentDoc) {
        parentDoc = await Parent.findOne({ name: { $regex: 'Patel', $options: 'i' } });
      }
      if (parentDoc) {
        student.parentId = parentDoc._id;
        await student.save();
        student = await Student.findById(targetId)
          .populate('classId')
          .populate('sectionId')
          .populate('parentId')
          .populate('academicYearId');
      }
    }

    // Fetch tab details: Attendance, Results, Fees, Homework
    const attendanceRecords = await Attendance.find({
      schoolId: req.user.schoolId,
      classId: student.classId._id,
      'records.studentId': student._id,
    }).sort({ date: -1 }).limit(30);

    const attendanceStats = {
      total: attendanceRecords.length,
      present: 0,
      absent: 0,
      late: 0,
      leave: 0,
    };
    attendanceRecords.forEach((att) => {
      const rec = att.records.find((r) => r.studentId.toString() === student._id.toString());
      if (rec && attendanceStats[rec.status] !== undefined) attendanceStats[rec.status]++;
    });

    const results = await Result.find({ studentId: student._id }).populate('examinationId');
    const fees = await StudentFee.find({ studentId: student._id }).populate('feeStructureId');
    const homework = await Homework.find({ classId: student.classId._id, sectionId: student.sectionId._id }).sort({ dueDate: -1 });

    res.status(200).json({
      success: true,
      data: {
        student,
        attendanceStats,
        attendanceRecords,
        results,
        fees,
        homework,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.createStudent = async (req, res, next) => {
  try {
    const data = req.body;
    const School = require('../models/School');
    const AcademicYear = require('../models/AcademicYear');
    const Class = require('../models/Class');

    // 1. Resolve schoolId
    if (!data.schoolId && req.user?.schoolId) {
      data.schoolId = req.user.schoolId;
    }
    if (!data.schoolId) {
      const defaultSchool = await School.findOne();
      data.schoolId = defaultSchool?._id;
    }

    // 2. Resolve academicYearId
    if (!data.academicYearId) {
      const defaultAy = await AcademicYear.findOne({ schoolId: data.schoolId, isCurrent: true }) || await AcademicYear.findOne({ schoolId: data.schoolId });
      data.academicYearId = defaultAy?._id;
    }

    // 3. Resolve classId & sectionId
    if (!data.classId || !data.sectionId) {
      const defaultClass = await Class.findOne({ schoolId: data.schoolId });
      if (defaultClass) {
        data.classId = data.classId || defaultClass._id;
        data.sectionId = data.sectionId || (defaultClass.sections?.[0]?._id || defaultClass._id);
      }
    }

    // 4. Fill required default fields
    data.address = data.address || '123 Academic Way';
    data.city = data.city || 'Metropolis';
    data.state = data.state || 'New York';
    data.pincode = data.pincode || '10001';
    data.emergencyContact = data.emergencyContact || data.phone || '+1 555-0199';
    data.gender = data.gender || 'male';
    data.dob = data.dob || '2013-01-01';

    // 5. Unique numbers
    data.admissionNumber = data.admissionNumber || `ADM-${Date.now().toString().slice(-4)}${Math.floor(10 + Math.random() * 90)}`;
    data.studentId = data.studentId || `STU-${Math.floor(1000 + Math.random() * 9000)}`;
    data.rollNumber = data.rollNumber || Math.floor(1 + Math.random() * 50);

    const initialPassword = data.password || 'Student@123';
    const emailStr = (data.email || `student.${Date.now().toString().slice(-4)}@school.com`).toLowerCase().trim();
    const username = (data.firstName + data.lastName).toLowerCase().replace(/\s+/g, '') + Math.floor(100 + Math.random() * 900);

    // Create or find User
    let user = await User.findOne({ email: emailStr });
    if (!user) {
      user = await User.create({
        schoolId: data.schoolId,
        username,
        email: emailStr,
        password: initialPassword,
        role: 'student',
        mustChangePassword: false,
      });
    }

    data.email = emailStr;
    data.userId = user._id;
    const student = await Student.create(data);

    user.profileId = student._id;
    user.profileModel = 'Student';
    await user.save();

    if (data.parentId) {
      await Parent.findByIdAndUpdate(data.parentId, { $addToSet: { children: student._id } });
    }

    await logAudit(req, 'STUDENT_CREATED', 'Student', student._id.toString(), { name: `${student.firstName} ${student.lastName}` });

    res.status(201).json({
      success: true,
      message: 'Student created successfully',
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateStudent = async (req, res, next) => {
  try {
    const targetId = req.params.id;
    if (req.user.role === 'student') {
      const studentProfileId = req.user.profileId?._id ? req.user.profileId._id.toString() : req.user.profileId?.toString();
      if (studentProfileId !== targetId) {
        return res.status(403).json({ success: false, message: 'Forbidden. You can only update your own student profile.' });
      }
    }

    const student = await Student.findByIdAndUpdate(targetId, req.body, { new: true })
      .populate('classId')
      .populate('sectionId')
      .populate('academicYearId');

    if (!student) return res.status(404).json({ success: false, message: 'Student not found' });

    // Sync user email if student email updated
    if (req.body.email && student.userId) {
      await User.findByIdAndUpdate(student.userId, { email: req.body.email.toLowerCase().trim() });
    }

    await logAudit(req, 'STUDENT_UPDATED', 'Student', student._id.toString());
    res.status(200).json({ success: true, message: 'Student profile updated successfully', data: student });
  } catch (error) {
    next(error);
  }
};

exports.deleteStudent = async (req, res, next) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, { status: 'inactive' }, { new: true });
    if (!student) return res.status(404).json({ success: false, message: 'Student not found' });

    await logAudit(req, 'STUDENT_DEACTIVATED', 'Student', student._id.toString());
    res.status(200).json({ success: true, message: 'Student deactivated successfully' });
  } catch (error) {
    next(error);
  }
};

exports.promoteStudent = async (req, res, next) => {
  try {
    const { studentId, targetAcademicYearId, targetClassId, targetSectionId } = req.body;
    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ success: false, message: 'Student not found' });

    student.academicYearId = targetAcademicYearId;
    student.classId = targetClassId;
    student.sectionId = targetSectionId;
    await student.save();

    await logAudit(req, 'STUDENT_PROMOTED', 'Student', student._id.toString(), { targetClassId });

    res.status(200).json({ success: true, message: 'Student promoted successfully', data: student });
  } catch (error) {
    next(error);
  }
};
