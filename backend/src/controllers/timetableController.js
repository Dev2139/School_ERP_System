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
    const schoolId = req.user.schoolId;

    // Auto-detect teacher strictly matching subjectId without random fallbacks
    for (const slot of slots) {
      if (slot.subjectId) {
        const subjectDoc = await Subject.findById(slot.subjectId);
        if (subjectDoc) {
          let matchedTeacher = await Teacher.findOne({
            schoolId,
            subjects: slot.subjectId,
          });
          if (!matchedTeacher) {
            matchedTeacher = await Teacher.findOne({
              schoolId,
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

    // Comprehensive Conflict Validation: Teacher Double-Booking Check
    const allTimetables = await Timetable.find({
      schoolId,
      $or: [{ classId: { $ne: classId } }, { sectionId: { $ne: sectionId } }],
    })
      .populate('classId', 'name')
      .populate('sectionId', 'name')
      .populate('slots.teacherId', 'name');

    const conflicts = [];

    for (const slot of slots) {
      const { day, periodNumber, teacherId } = slot;

      for (const otherTT of allTimetables) {
        const targetClassName = `${otherTT.classId?.name || 'Class'} - ${otherTT.sectionId?.name || 'Section'}`;

        for (const otherSlot of otherTT.slots) {
          if (otherSlot.day === day && Number(otherSlot.periodNumber) === Number(periodNumber)) {
            // Teacher Conflict Check: Ensure teacher is not double-booked
            if (teacherId && otherSlot.teacherId) {
              const otherTeacherIdStr = otherSlot.teacherId._id?.toString() || otherSlot.teacherId.toString();
              const teacherIdStr = teacherId._id?.toString() || teacherId.toString();

              if (otherTeacherIdStr === teacherIdStr) {
                const teacherName = otherSlot.teacherId.name || 'Teacher';
                conflicts.push(
                  `Teacher Conflict: ${teacherName} is already teaching ${targetClassName} on ${day} Period ${periodNumber}`
                );
              }
            }
          }
        }
      }
    }

    if (conflicts.length > 0) {
      return res.status(400).json({
        success: false,
        message: conflicts.join(' | '),
        conflicts,
      });
    }

    const timetable = await Timetable.findOneAndUpdate(
      { schoolId, classId, sectionId },
      { schoolId, academicYearId, classId, sectionId, slots },
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
    const { teacherId, day, periodNumber, classId, sectionId } = req.query;
    const schoolId = req.user.schoolId;

    if (!day || !periodNumber || !teacherId) {
      return res.status(200).json({ success: true, hasConflict: false, conflicts: [] });
    }

    const otherTimetables = await Timetable.find({
      schoolId,
      $or: [{ classId: { $ne: classId } }, { sectionId: { $ne: sectionId } }],
    })
      .populate('classId', 'name')
      .populate('sectionId', 'name')
      .populate('slots.teacherId', 'name');

    const conflicts = [];
    let teacherConflict = null;

    const currentPeriod = Number(periodNumber);

    for (const tt of otherTimetables) {
      const className = `${tt.classId?.name || 'Class'} - ${tt.sectionId?.name || 'Section'}`;

      for (const slot of tt.slots) {
        if (slot.day === day && Number(slot.periodNumber) === currentPeriod) {
          // Check Teacher Conflict
          if (teacherId && slot.teacherId) {
            const slotTeacherId = slot.teacherId._id?.toString() || slot.teacherId.toString();
            if (slotTeacherId === teacherId.toString()) {
              const teacherName = slot.teacherId.name || 'Teacher';
              teacherConflict = `Teacher Conflict: ${teacherName} is already assigned to ${className} on ${day} Period ${periodNumber}`;
              conflicts.push(teacherConflict);
            }
          }
        }
      }
    }

    res.status(200).json({
      success: true,
      hasConflict: conflicts.length > 0,
      teacherConflict,
      roomConflict: null,
      conflicts,
      message: conflicts.join(' | '),
    });
  } catch (error) {
    next(error);
  }
};
