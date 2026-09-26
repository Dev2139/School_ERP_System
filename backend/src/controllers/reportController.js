const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const Attendance = require('../models/Attendance');
const StudentFee = require('../models/StudentFee');
const Payment = require('../models/Payment');
const Result = require('../models/Result');
const Admission = require('../models/Admission');
const Class = require('../models/Class');
const Section = require('../models/Section');
const Notice = require('../models/Notice');

exports.getSummaryMetrics = async (req, res, next) => {
  try {
    const schoolId = req.user.schoolId;

    const totalStudents = await Student.countDocuments({ schoolId, status: 'active' });
    const totalTeachers = await Teacher.countDocuments({ schoolId, status: 'active' });
    const totalAdmissions = await Admission.countDocuments({ schoolId });

    // Dynamic Fee metrics from database
    const studentFees = await StudentFee.find({ schoolId });
    const totalExpectedFees = studentFees.reduce((acc, f) => acc + (f.netAmount || 0), 0);
    const totalCollectedFees = studentFees.reduce((acc, f) => acc + (f.paidAmount || 0), 0);
    const totalPendingFees = studentFees.reduce((acc, f) => acc + (f.balanceAmount || 0), 0);

    // Today's attendance calculation with date range
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const todayAttendance = await Attendance.find({
      schoolId,
      date: { $gte: todayStart, $lte: todayEnd },
    });

    // Fetch all classes & sections to build class-wise attendance tracking
    const classes = await Class.find({ schoolId }).populate('classTeacher', 'name email userId').sort({ name: 1 });
    const sections = await Section.find({ schoolId }).populate('classTeacher', 'name email userId').sort({ name: 1 });

    let totalPresentToday = 0;
    let totalMarkedToday = 0;
    let markedSectionsCount = 0;
    const classAttendanceStatus = [];

    for (const c of classes) {
      const cSections = sections.filter((s) => s.classId.toString() === c._id.toString());
      for (const sec of cSections) {
        const secStudents = await Student.countDocuments({ schoolId, classId: c._id, sectionId: sec._id, status: 'active' });

        const attDoc = todayAttendance.find(
          (a) => a.classId.toString() === c._id.toString() && a.sectionId.toString() === sec._id.toString()
        );

        let isTaken = false;
        let presentCount = 0;
        let absentCount = 0;
        let leaveCount = 0;
        let markedCount = 0;

        if (attDoc && attDoc.records && attDoc.records.length > 0) {
          isTaken = true;
          markedSectionsCount++;
          attDoc.records.forEach((r) => {
            markedCount++;
            totalMarkedToday++;
            if (r.status === 'present') {
              presentCount++;
              totalPresentToday++;
            } else if (r.status === 'absent') {
              absentCount++;
            } else if (r.status === 'leave' || r.status === 'late') {
              leaveCount++;
            }
          });
        }

        const teacherObj = sec.classTeacher || c.classTeacher;

        classAttendanceStatus.push({
          classId: c._id,
          sectionId: sec._id,
          className: c.name,
          sectionName: sec.name,
          fullClassName: `${c.name} - ${sec.name}`,
          classTeacherId: teacherObj?._id || null,
          classTeacherName: teacherObj?.name || 'Unassigned',
          classTeacherEmail: teacherObj?.email || null,
          totalStudents: secStudents,
          presentCount,
          absentCount,
          leaveCount,
          markedCount,
          isTaken,
        });
      }
    }

    const totalSectionsCount = classAttendanceStatus.length;

    // Overall School Attendance Rate (Present Students / Total Enrolled Active Students)
    const todayAttendancePercentage = totalStudents > 0
      ? Number(((totalPresentToday / totalStudents) * 100).toFixed(1))
      : 0;

    // Calculate actual historical attendance for Mon-Fri of the current week from Attendance database
    const now = new Date();
    const currentDayOfWeek = now.getDay(); // 0 = Sun, 1 = Mon, 2 = Tue, ..., 6 = Sat

    // Calculate Monday of current week
    const distanceToMonday = currentDayOfWeek === 0 ? -6 : 1 - currentDayOfWeek;
    const mondayDate = new Date(now);
    mondayDate.setDate(now.getDate() + distanceToMonday);

    const weekDays = [
      { name: 'Mon', dayOffset: 0 },
      { name: 'Tue', dayOffset: 1 },
      { name: 'Wed', dayOffset: 2 },
      { name: 'Thu', dayOffset: 3 },
      { name: 'Fri', dayOffset: 4 },
    ];

    const weeklyAttendance = [];

    for (const wDay of weekDays) {
      const targetDate = new Date(mondayDate);
      targetDate.setDate(mondayDate.getDate() + wDay.dayOffset);

      const dStart = new Date(targetDate);
      dStart.setHours(0, 0, 0, 0);

      const dEnd = new Date(targetDate);
      dEnd.setHours(23, 59, 59, 999);

      // Query actual attendance records for this specific weekday from DB
      const dayLogs = await Attendance.find({
        schoolId,
        date: { $gte: dStart, $lte: dEnd },
      });

      let dayPresent = 0;
      let dayMarked = 0;

      dayLogs.forEach((att) => {
        if (att.records && att.records.length > 0) {
          att.records.forEach((r) => {
            dayMarked++;
            if (r.status === 'present') dayPresent++;
          });
        }
      });

      const dayPct = (totalStudents > 0 && dayMarked > 0)
        ? Number(((dayPresent / totalStudents) * 100).toFixed(1))
        : 0;

      weeklyAttendance.push({
        day: wDay.name,
        attendance: dayPct,
        date: dStart.toISOString().split('T')[0],
      });
    }

    // Dynamic Class Academic Performance from Result database
    const gradePerformance = [];
    for (const cls of classes) {
      const classResults = await Result.find({ schoolId, classId: cls._id });
      if (classResults.length > 0) {
        const avg = classResults.reduce((acc, r) => acc + r.percentage, 0) / classResults.length;
        gradePerformance.push({ class: cls.name, avgPct: Number(avg.toFixed(1)) });
      } else {
        gradePerformance.push({ class: cls.name, avgPct: 0 });
      }
    }

    // Recent Notices from Database
    const recentNotices = await Notice.find({ schoolId }).sort({ createdAt: -1 }).limit(3);

    res.status(200).json({
      success: true,
      data: {
        totalStudents,
        totalTeachers,
        totalAdmissions,
        totalExpectedFees,
        totalCollectedFees,
        totalPendingFees,
        todayAttendancePercentage,
        totalPresentToday,
        totalMarkedToday,
        markedSectionsCount,
        totalSectionsCount,
        classAttendanceStatus,
        weeklyAttendance,
        gradePerformance,
        recentNotices,
      },
    });
  } catch (error) {
    next(error);
  }
};
