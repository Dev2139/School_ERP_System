const Timetable = require('../models/Timetable');
const Subject = require('../models/Subject');
const Teacher = require('../models/Teacher');
const { logAudit } = require('../middleware/auditMiddleware');

exports.getTimetable = async (req, res, next) => {
  try {
    const { classId, sectionId } = req.query;
    const query = { schoolId: req.user.schoolId };

    // 1. STUDENT ROLE: Locked strictly to student's assigned class and section
    if (req.user.role === 'student') {
      const Student = require('../models/Student');
      const studentDoc = await Student.findById(req.user.profileId);
      if (!studentDoc || !studentDoc.classId) {
        return res.status(404).json({ success: false, message: 'Student class not assigned' });
      }
      query.classId = studentDoc.classId;
      query.sectionId = studentDoc.sectionId;

      const timetable = await Timetable.findOne(query)
        .populate('classId', 'name')
        .populate('sectionId', 'name')
        .populate('slots.subjectId', 'name code')
        .populate('slots.teacherId', 'name employeeId');

      return res.status(200).json({
        success: true,
        userRole: 'student',
        studentClass: studentDoc,
        data: timetable,
      });
    }

    // 2. TEACHER ROLE: Teacher can view the FULL timetable of any class where they are assigned to teach
    if (req.user.role === 'teacher') {
      const teacherProfileId = req.user.profileId ? req.user.profileId.toString() : '';

      // Find all timetables in school
      const allTimetables = await Timetable.find({ schoolId: req.user.schoolId })
        .populate('classId', 'name')
        .populate('sectionId', 'name')
        .populate('slots.subjectId', 'name code')
        .populate('slots.teacherId', 'name employeeId');

      // Allowed classes: timetables where teacher is assigned to at least 1 slot
      const allowedTimetables = allTimetables.filter((tt) =>
        tt.slots.some((s) => s.teacherId && s.teacherId._id.toString() === teacherProfileId)
      );

      const allowedClasses = allowedTimetables.map((tt) => ({
        classId: tt.classId?._id || tt.classId,
        sectionId: tt.sectionId?._id || tt.sectionId,
        className: `${tt.classId?.name || 'Class'} - ${tt.sectionId?.name || 'Section'}`,
      }));

      // Select active class timetable
      let activeTimetable = null;
      if (classId && sectionId) {
        activeTimetable = allowedTimetables.find(
          (tt) =>
            tt.classId?._id?.toString() === classId.toString() &&
            tt.sectionId?._id?.toString() === sectionId.toString()
        );
      } else if (allowedTimetables.length > 0) {
        activeTimetable = allowedTimetables[0];
      }

      return res.status(200).json({
        success: true,
        userRole: 'teacher',
        teacherProfileId,
        allowedClasses,
        data: activeTimetable,
      });
    }

    // 3. ADMIN / PRINCIPAL ROLE: Full access to all class timetables
    if (classId) query.classId = classId;
    if (sectionId) query.sectionId = sectionId;

    const timetable = await Timetable.findOne(query)
      .populate('classId', 'name')
      .populate('sectionId', 'name')
      .populate('slots.subjectId', 'name code')
      .populate('slots.teacherId', 'name employeeId');

    res.status(200).json({ success: true, userRole: 'admin', data: timetable });
  } catch (error) {
    next(error);
  }
};

exports.saveTimetable = async (req, res, next) => {
  try {
    const { academicYearId, classId, sectionId, slots } = req.body;

    // Auto-detect teacher strictly matching subjectId without random fallbacks
    for (const slot of slots) {
      if (slot.subjectId) {
        const subjectDoc = await Subject.findById(slot.subjectId);
        if (subjectDoc) {
          let matchedTeacher = await Teacher.findOne({
            schoolId: req.user.schoolId,
            subjects: slot.subjectId,
          });
          if (!matchedTeacher) {
            matchedTeacher = await Teacher.findOne({
              schoolId: req.user.schoolId,
              qualification: new RegExp(subjectDoc.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'),
            });
          }
          if (matchedTeacher) {
            slot.teacherId = matchedTeacher._id;
          } else {
            slot.teacherId = null;
          }
        }
      }
    }

    // Conflict Check: ensure teacher isn't double-booked at same day & period Number in ANOTHER class
    for (const slot of slots) {
      if (!slot.teacherId) continue;
      const existingConflict = await Timetable.findOne({
        schoolId: req.user.schoolId,
        classId: { $ne: classId },
        'slots.day': slot.day,
        'slots.periodNumber': slot.periodNumber,
        'slots.teacherId': slot.teacherId,
      });

      if (existingConflict) {
        return res.status(400).json({
          success: false,
          message: `Scheduling Conflict: Teacher is already assigned to another class on ${slot.day} Period ${slot.periodNumber}`,
        });
      }
    }

    const timetable = await Timetable.findOneAndUpdate(
      { schoolId: req.user.schoolId, classId, sectionId },
      { schoolId: req.user.schoolId, academicYearId, classId, sectionId, slots },
      { upsert: true, new: true }
    )
      .populate('slots.subjectId', 'name code')
      .populate('slots.teacherId', 'name employeeId');

    await logAudit(req, 'TIMETABLE_SAVED', 'Timetable', timetable._id.toString());
    res.status(200).json({ success: true, message: 'Timetable updated successfully', data: timetable });
  } catch (error) {
    next(error);
  }
};

exports.checkConflict = async (req, res, next) => {
  try {
    const { teacherId, day, periodNumber, classId } = req.query;
    if (!teacherId || !day || !periodNumber) {
      return res.status(200).json({ success: true, hasConflict: false });
    }

    const conflict = await Timetable.findOne({
      schoolId: req.user.schoolId,
      classId: { $ne: classId },
      'slots.day': day,
      'slots.periodNumber': parseInt(periodNumber),
      'slots.teacherId': teacherId,
    })
      .populate('classId', 'name')
      .populate('sectionId', 'name')
      .populate('slots.teacherId', 'name');

    if (conflict) {
      const conflictingClassName = `${conflict.classId?.name || 'Class'} - ${conflict.sectionId?.name || 'Section'}`;
      const teacherObj = conflict.slots.find((s) => s.teacherId?._id?.toString() === teacherId.toString())?.teacherId;
      const teacherName = teacherObj?.name || 'Teacher';

      return res.status(200).json({
        success: true,
        hasConflict: true,
        conflictingClass: conflictingClassName,
        teacherName,
        message: `Scheduling Conflict: ${teacherName} is already assigned to ${conflictingClassName} on ${day} Period ${periodNumber}`,
      });
    }

    res.status(200).json({ success: true, hasConflict: false });
  } catch (error) {
    next(error);
  }
};
