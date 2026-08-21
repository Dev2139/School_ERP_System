const Examination = require('../models/Examination');
const ExamSubject = require('../models/ExamSubject');
const Result = require('../models/Result');
const Student = require('../models/Student');
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
    const subjects = await ExamSubject.find({ schoolId: req.user.schoolId, examinationId, classId }).populate('subjectId');
    res.status(200).json({ success: true, data: subjects });
  } catch (error) {
    next(error);
  }
};

exports.saveExamSubject = async (req, res, next) => {
  try {
    const examSub = await ExamSubject.create({ ...req.body, schoolId: req.user.schoolId });
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
      query.studentId = req.user.profileId;
      if (examinationId) query.examinationId = examinationId;
    } else if (req.user.role === 'parent') {
      const Parent = require('../models/Parent');
      const parentDoc = await Parent.findById(req.user.profileId);
      query.studentId = { $in: parentDoc ? parentDoc.children : [] };
      if (examinationId) query.examinationId = examinationId;
    } else {
      if (examinationId) query.examinationId = examinationId;
      if (classId) query.classId = classId;
      if (studentId) query.studentId = studentId;
    }

    const results = await Result.find(query)
      .populate('studentId', 'firstName lastName rollNumber admissionNumber')
      .populate('marks.subjectId', 'name code');

    res.status(200).json({ success: true, data: results });
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
