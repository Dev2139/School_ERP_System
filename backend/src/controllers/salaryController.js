const Salary = require('../models/Salary');
const Teacher = require('../models/Teacher');
const { logAudit } = require('../middleware/auditMiddleware');

exports.getSalaries = async (req, res, next) => {
  try {
    const schoolId = req.user.schoolId;
    const role = req.user.role;

    if (role === 'teacher') {
      const teacherDoc = await Teacher.findById(req.user.profileId);
      const teacherId = teacherDoc?._id || req.user.profileId;

      const salaries = await Salary.find({ schoolId, teacherId })
        .populate('teacherId', 'name employeeId department baseSalary designation')
        .sort({ paymentDate: -1 });

      const totalReceived = salaries.reduce((acc, s) => acc + (s.netSalary || 0), 0);

      return res.status(200).json({
        success: true,
        userRole: 'teacher',
        totalReceived,
        count: salaries.length,
        data: salaries,
      });
    }

    // Admin / Principal View: All salary records across school
    const salaries = await Salary.find({ schoolId })
      .populate('teacherId', 'name employeeId department baseSalary designation email phone')
      .sort({ paymentDate: -1 });

    const totalDisbursed = salaries.reduce((acc, s) => acc + (s.netSalary || 0), 0);
    const teachersList = await Teacher.find({ schoolId }).select('name employeeId baseSalary designation department');

    res.status(200).json({
      success: true,
      userRole: 'admin',
      totalDisbursed,
      teachersList,
      count: salaries.length,
      data: salaries,
    });
  } catch (error) {
    next(error);
  }
};

exports.disburseSalary = async (req, res, next) => {
  try {
    const {
      teacherId,
      month,
      basicSalary,
      allowances = 0,
      deductions = 0,
      paymentMethod = 'Bank Transfer',
      transactionRef,
      remarks = '',
    } = req.body;

    const schoolId = req.user.schoolId;

    const teacherDoc = await Teacher.findById(teacherId);
    if (!teacherDoc) {
      return res.status(404).json({ success: false, message: 'Teacher not found' });
    }

    const netSalary = Number(basicSalary) + Number(allowances) - Number(deductions);
    const txnCode = transactionRef || `TXN-${Date.now().toString().slice(-6)}${Math.floor(10 + Math.random() * 90)}`;

    const salary = await Salary.create({
      schoolId,
      teacherId: teacherDoc._id,
      teacherName: teacherDoc.name,
      month: month || `${new Date().toLocaleString('default', { month: 'long' })} ${new Date().getFullYear()}`,
      basicSalary: Number(basicSalary),
      allowances: Number(allowances),
      deductions: Number(deductions),
      netSalary,
      paymentMethod,
      transactionRef: txnCode,
      status: 'Paid',
      remarks,
      disbursedBy: req.user._id,
    });

    await logAudit(req, 'SALARY_DISBURSED', 'Salary', salary._id.toString(), {
      teacherName: teacherDoc.name,
      netSalary,
      month: salary.month,
    });

    res.status(201).json({
      success: true,
      message: `Salary of ₹${netSalary.toLocaleString()} disbursed to ${teacherDoc.name} for ${salary.month}`,
      data: salary,
    });
  } catch (error) {
    next(error);
  }
};
