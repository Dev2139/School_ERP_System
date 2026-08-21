const Attendance = require('../models/Attendance');
const Student = require('../models/Student');
const Parent = require('../models/Parent');
const { logAudit } = require('../middleware/auditMiddleware');

exports.getAttendance = async (req, res, next) => {
  try {
    const { classId, sectionId, date, studentId } = req.query;
    const userRole = req.user.role;

    // STUDENT ROLE: Restricted strictly to own attendance history
    if (userRole === 'student') {
      const targetStudentId = req.user.profileId;
      if (!targetStudentId) {
        return res.status(400).json({ success: false, message: 'Student profile not associated with user account' });
      }

      const studentDoc = await Student.findById(targetStudentId);
      if (!studentDoc) {
        return res.status(404).json({ success: false, message: 'Student profile not found' });
      }

      const attendanceLogs = await Attendance.find({
        schoolId: req.user.schoolId,
        classId: studentDoc.classId,
        'records.studentId': targetStudentId,
      }).sort({ date: -1 }).limit(60);

      const personalRecords = attendanceLogs.map((att) => {
        const myRecord = att.records.find((r) => r.studentId.toString() === targetStudentId.toString());
        return {
          date: att.date,
          status: myRecord ? myRecord.status : 'absent',
          remark: myRecord ? myRecord.remark : '',
        };
      });

      return res.status(200).json({
        success: true,
        isStudentView: true,
        data: {
          student: {
            name: `${studentDoc.firstName} ${studentDoc.lastName}`,
            admissionNumber: studentDoc.admissionNumber,
            rollNumber: studentDoc.rollNumber,
          },
          records: personalRecords,
        },
      });
    }

    // PARENT ROLE: Restricted to linked children's attendance
    if (userRole === 'parent') {
      const parentDoc = await Parent.findById(req.user.profileId);
      const childrenIds = parentDoc ? parentDoc.children.map((c) => c.toString()) : [];
      
      let reqStudentId = studentId;
      if (!reqStudentId && childrenIds.length > 0) {
        reqStudentId = childrenIds[0];
      }

      if (!reqStudentId || !childrenIds.includes(reqStudentId.toString())) {
        return res.status(403).json({ success: false, message: 'Unauthorized. You can only view attendance for your linked children.' });
      }

      const studentDoc = await Student.findById(reqStudentId);
      const attendanceLogs = await Attendance.find({
        schoolId: req.user.schoolId,
        classId: studentDoc.classId,
        'records.studentId': reqStudentId,
      }).sort({ date: -1 }).limit(60);

      const personalRecords = attendanceLogs.map((att) => {
        const myRecord = att.records.find((r) => r.studentId.toString() === reqStudentId.toString());
        return {
          date: att.date,
          status: myRecord ? myRecord.status : 'absent',
          remark: myRecord ? myRecord.remark : '',
        };
      });

      return res.status(200).json({
        success: true,
        isStudentView: true,
        data: {
          student: {
            name: `${studentDoc.firstName} ${studentDoc.lastName}`,
            admissionNumber: studentDoc.admissionNumber,
            rollNumber: studentDoc.rollNumber,
          },
          records: personalRecords,
        },
      });
    }

    // ADMIN / TEACHER / STAFF ROLE: Class-wide attendance grid for marking & management
    if (!classId || !sectionId || !date) {
      return res.status(400).json({ success: false, message: 'classId, sectionId and date required' });
    }

    const queryDate = new Date(date);
    queryDate.setHours(0, 0, 0, 0);

    // Fetch all active students in this class and section
    const activeStudents = await Student.find({
      schoolId: req.user.schoolId,
      classId,
      sectionId,
      status: 'active',
    }).sort({ rollNumber: 1 });

    const attendance = await Attendance.findOne({
      schoolId: req.user.schoolId,
      classId,
      sectionId,
      date: queryDate,
    }).populate('records.studentId', 'firstName lastName rollNumber admissionNumber profilePhoto');

    if (!attendance) {
      const records = activeStudents.map((s) => ({
        studentId: s,
        status: 'present',
        remark: '',
      }));

      return res.status(200).json({
        success: true,
        isNew: true,
        isStudentView: false,
        data: {
          classId,
          sectionId,
          date: queryDate,
          records,
        },
      });
    }

    // Merge existing attendance record map with active student list
    const existingMap = {};
    if (attendance.records) {
      attendance.records.forEach((r) => {
        const sId = r.studentId?._id ? r.studentId._id.toString() : r.studentId?.toString();
        if (sId) {
          existingMap[sId] = r;
        }
      });
    }

    const mergedRecords = activeStudents.map((s) => {
      const sIdStr = s._id.toString();
      if (existingMap[sIdStr]) {
        return {
          studentId: s,
          status: existingMap[sIdStr].status,
          remark: existingMap[sIdStr].remark || '',
        };
      }
      return {
        studentId: s,
        status: 'present',
        remark: '',
      };
    });

    res.status(200).json({
      success: true,
      isNew: false,
      isStudentView: false,
      data: {
        _id: attendance._id,
        classId,
        sectionId,
        date: queryDate,
        records: mergedRecords,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.saveAttendance = async (req, res, next) => {
  try {
    const { academicYearId, classId, sectionId, date, records } = req.body;
    const queryDate = new Date(date);
    queryDate.setHours(0, 0, 0, 0);

    const attendance = await Attendance.findOneAndUpdate(
      {
        schoolId: req.user.schoolId,
        classId,
        sectionId,
        date: queryDate,
      },
      {
        schoolId: req.user.schoolId,
        academicYearId,
        classId,
        sectionId,
        date: queryDate,
        markedBy: req.user._id,
        records,
      },
      { upsert: true, new: true }
    );

    await logAudit(req, 'ATTENDANCE_MARKED', 'Attendance', attendance._id.toString(), { classId, sectionId, date });
    res.status(200).json({ success: true, message: 'Attendance saved successfully', data: attendance });
  } catch (error) {
    next(error);
  }
};
