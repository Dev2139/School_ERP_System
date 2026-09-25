const Examination = require('../models/Examination');
const ExamSubject = require('../models/ExamSubject');
const Result = require('../models/Result');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const Class = require('../models/Class');
const Section = require('../models/Section');
const mongoose = require('mongoose');
const { generateReportCardPDF } = require('../services/pdfService');
const { logAudit } = require('../middleware/auditMiddleware');

exports.getExams = async (req, res, next) => {
  try {
    const exams = await Examination.find({ schoolId: req.user.schoolId }).sort({ startDate: -1 });
    res.status(200).json({ success: true, data: exams });
  } catch (error) {
    next(error);
  }
};

exports.createExam = async (req, res, next) => {
  try {
    const exam = await Examination.create({ ...req.body, schoolId: req.user.schoolId });
    await logAudit(req, 'EXAM_CREATED', 'Examination', exam._id.toString());
    res.status(201).json({ success: true, data: exam });
  } catch (error) {
    next(error);
  }
};

exports.getExamSubjects = async (req, res, next) => {
  try {
    const { examinationId, classId } = req.query;
    const query = { schoolId: req.user.schoolId };

    if (req.user.role === 'student') {
      const studentDoc = await Student.findById(req.user.profileId);
      if (studentDoc && studentDoc.classId) {
        query.classId = studentDoc.classId;
      }
    } else {
      if (classId && mongoose.Types.ObjectId.isValid(classId)) query.classId = classId;
    }

    if (examinationId && mongoose.Types.ObjectId.isValid(examinationId)) query.examinationId = examinationId;

    const subjects = await ExamSubject.find(query)
      .populate('subjectId')
      .populate('classId', 'name');

    res.status(200).json({ success: true, data: subjects });
  } catch (error) {
    next(error);
  }
};

exports.saveExamSubject = async (req, res, next) => {
  try {
    const { classId, examinationId } = req.body;
    const schoolId = req.user.schoolId;

    // Check Class Teacher Permission for teachers
    if (req.user.role === 'teacher') {
      const teacherProfileId = (req.user.profileId?._id || req.user.profileId || '').toString();
      const teacherEmail = (req.user.email || '').toLowerCase().trim();

      const classObj = await Class.findById(classId).populate('classTeacher');
      const sections = await Section.find({ classId }).populate('classTeacher');

      let isAuthorizedTeacher = false;

      if (classObj && classObj.classTeacher) {
        const ctId = (classObj.classTeacher._id || classObj.classTeacher).toString();
        const ctEmail = (classObj.classTeacher.email || '').toLowerCase().trim();
        if (ctId === teacherProfileId || (teacherEmail && ctEmail === teacherEmail)) {
          isAuthorizedTeacher = true;
        }
      }

      for (const s of sections) {
        if (s.classTeacher) {
          const sCtId = (s.classTeacher._id || s.classTeacher).toString();
          const sCtEmail = (s.classTeacher.email || '').toLowerCase().trim();
          if (sCtId === teacherProfileId || (teacherEmail && sCtEmail === teacherEmail)) {
            isAuthorizedTeacher = true;
          }
        }
      }

      if (!isAuthorizedTeacher && req.user.profileId) {
        const teacherDoc = await Teacher.findById(req.user.profileId);
        if (teacherDoc && teacherDoc.assignedClasses && teacherDoc.assignedClasses.map((id) => id.toString()).includes(classId.toString())) {
          isAuthorizedTeacher = true;
        }
      }

      if (!isAuthorizedTeacher) {
        return res.status(403).json({
          success: false,
          message: 'Forbidden. Only assigned Class Teachers of this class standard can schedule or modify its exam timetable.',
        });
      }
    }

    const examSub = await ExamSubject.create({ ...req.body, schoolId });
    await logAudit(req, 'EXAM_SUBJECT_SCHEDULED', 'ExamSubject', examSub._id.toString());
    res.status(201).json({ success: true, data: examSub });
  } catch (error) {
    next(error);
  }
};

exports.saveResults = async (req, res, next) => {
  try {
    const { examinationId, classId, sectionId, results } = req.body;

    for (const item of results) {
      let total = 0;
      let maxTotal = 0;
      let isAllPassed = true;

      item.marks.forEach((m) => {
        total += Number(m.marksObtained);
        maxTotal += Number(m.maxMarks);
        if (m.marksObtained < m.passMarks) isAllPassed = false;

        // Auto Grade
        const pct = (m.marksObtained / m.maxMarks) * 100;
        if (pct >= 90) m.grade = 'A+';
        else if (pct >= 80) m.grade = 'A';
        else if (pct >= 70) m.grade = 'B';
        else if (pct >= 60) m.grade = 'C';
        else if (pct >= 50) m.grade = 'D';
        else m.grade = 'F';
      });

      const percentage = Number(((total / maxTotal) * 100).toFixed(2));
      const gpa = Number(((percentage / 100) * 4).toFixed(2));
      const status = isAllPassed ? 'pass' : 'fail';

      await Result.findOneAndUpdate(
        { schoolId: req.user.schoolId, examinationId, studentId: item.studentId },
        {
          schoolId: req.user.schoolId,
          examinationId,
          classId,
          sectionId,
          studentId: item.studentId,
          marks: item.marks,
          totalMarks: total,
          maxTotalMarks: maxTotal,
          percentage,
          gpa,
          status,
          remarks: status === 'pass' ? 'Good Performance' : 'Needs Improvement',
        },
        { upsert: true, new: true }
      );
    }

    // Recalculate Ranks
    const allResults = await Result.find({ examinationId, classId }).sort({ percentage: -1 });
    for (let index = 0; index < allResults.length; index++) {
      allResults[index].rank = index + 1;
      await allResults[index].save();
    }

    await logAudit(req, 'MARKS_SAVED', 'Result', examinationId);
    res.status(200).json({ success: true, message: 'Results recorded and ranks calculated successfully' });
  } catch (error) {
    next(error);
  }
};

exports.getResults = async (req, res, next) => {
  try {
    const { examinationId, classId, studentId } = req.query;
    const query = { schoolId: req.user.schoolId };

    if (req.user.role === 'student') {
      // PRIVACY RULE: One student = One Result! Students ONLY see their own result!
      query.studentId = req.user.profileId;
      if (examinationId && mongoose.Types.ObjectId.isValid(examinationId)) query.examinationId = examinationId;
    } else if (req.user.role === 'parent') {
      const Parent = require('../models/Parent');
      const parentDoc = await Parent.findById(req.user.profileId);
      query.studentId = { $in: parentDoc ? parentDoc.children : [] };
      if (examinationId && mongoose.Types.ObjectId.isValid(examinationId)) query.examinationId = examinationId;
    } else {
      if (examinationId && mongoose.Types.ObjectId.isValid(examinationId)) query.examinationId = examinationId;
      if (classId && mongoose.Types.ObjectId.isValid(classId)) query.classId = classId;
      if (studentId && mongoose.Types.ObjectId.isValid(studentId)) query.studentId = studentId;
    }

    const results = await Result.find(query)
      .populate('studentId', 'firstName lastName rollNumber admissionNumber email classId sectionId profilePhoto')
      .populate('marks.subjectId', 'name code')
      .populate('examinationId', 'name term startDate endDate');

    res.status(200).json({ success: true, data: results });
  } catch (error) {
    next(error);
  }
};

exports.getAdmitCardData = async (req, res, next) => {
  try {
    const { examinationId } = req.query;
    let studentId = req.user.profileId;

    if (req.user.role !== 'student' && req.query.studentId) {
      studentId = req.query.studentId;
    }

    const student = await Student.findById(studentId).populate('classId sectionId');
    if (!student) return res.status(404).json({ success: false, message: 'Student profile not found' });

    let exam = null;
    if (examinationId && mongoose.Types.ObjectId.isValid(examinationId)) {
      exam = await Examination.findById(examinationId);
    } else {
      exam = await Examination.findOne({ schoolId: req.user.schoolId }).sort({ startDate: -1 });
    }

    let timetable = [];
    if (exam && student.classId) {
      timetable = await ExamSubject.find({
        schoolId: req.user.schoolId,
        examinationId: exam._id,
        classId: student.classId._id || student.classId,
      }).populate('subjectId');
    }

    res.status(200).json({
      success: true,
      data: {
        student,
        examination: exam,
        timetable,
        hallNumber: student.sectionId?.roomNo ? `Room ${student.sectionId.roomNo}` : 'Room 101',
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.downloadReportCard = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Result.findById(id).populate('marks.subjectId');
    if (!result) return res.status(404).json({ success: false, message: 'Result not found' });

    const student = await Student.findById(result.studentId);
    const exam = await Examination.findById(result.examinationId);

    const pdfBuffer = await generateReportCardPDF(result, student, exam);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=ReportCard_${student.admissionNumber}.pdf`);
    res.send(pdfBuffer);
  } catch (error) {
    next(error);
  }
};
