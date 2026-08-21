const FeeStructure = require('../models/FeeStructure');
const StudentFee = require('../models/StudentFee');
const Payment = require('../models/Payment');
const Student = require('../models/Student');
const { generateFeeReceiptPDF } = require('../services/pdfService');
const { logAudit } = require('../middleware/auditMiddleware');

exports.getFeeStructures = async (req, res, next) => {
  try {
    const list = await FeeStructure.find({ schoolId: req.user.schoolId }).populate('classId', 'name');
    res.status(200).json({ success: true, data: list });
  } catch (error) {
    next(error);
  }
};

exports.createFeeStructure = async (req, res, next) => {
  try {
    const total = req.body.feeComponents.reduce((acc, curr) => acc + Number(curr.amount), 0);
    const feeStruct = await FeeStructure.create({
      ...req.body,
      schoolId: req.user.schoolId,
      totalAmount: total,
    });

    // Assign to students in this class
    const students = await Student.find({ schoolId: req.user.schoolId, classId: req.body.classId, status: 'active' });
    for (const student of students) {
      await StudentFee.create({
        schoolId: req.user.schoolId,
        studentId: student._id,
        feeStructureId: feeStruct._id,
        academicYearId: req.body.academicYearId,
        discountAmount: 0,
        netAmount: total,
        paidAmount: 0,
        balanceAmount: total,
        dueDate: req.body.dueDate,
        status: 'pending',
      });
    }

    await logAudit(req, 'FEE_STRUCTURE_CREATED', 'FeeStructure', feeStruct._id.toString());
    res.status(201).json({ success: true, data: feeStruct });
  } catch (error) {
    next(error);
  }
};

exports.getStudentFees = async (req, res, next) => {
  try {
    const { studentId, status } = req.query;
    const query = { schoolId: req.user.schoolId };

    if (req.user.role === 'student') {
      query.studentId = req.user.profileId;
    } else if (req.user.role === 'parent') {
      const Parent = require('../models/Parent');
      const parentDoc = await Parent.findById(req.user.profileId);
      query.studentId = { $in: parentDoc ? parentDoc.children : [] };
    } else {
      if (studentId) query.studentId = studentId;
      if (status) query.status = status;
    }

    const fees = await StudentFee.find(query)
      .populate('studentId', 'firstName lastName rollNumber admissionNumber')
      .populate('feeStructureId');

    res.status(200).json({ success: true, data: fees });
  } catch (error) {
    next(error);
  }
};

exports.recordPayment = async (req, res, next) => {
  try {
    const { studentFeeId, amountPaid, paymentMethod, remarks } = req.body;
    const studentFee = await StudentFee.findById(studentFeeId);
    if (!studentFee) return res.status(404).json({ success: false, message: 'Student fee record not found' });

    const newPaidAmount = studentFee.paidAmount + Number(amountPaid);
    const newBalance = studentFee.netAmount - newPaidAmount;
    let newStatus = 'partial';
    if (newBalance <= 0) newStatus = 'paid';

    studentFee.paidAmount = newPaidAmount;
    studentFee.balanceAmount = Math.max(0, newBalance);
    studentFee.status = newStatus;
    await studentFee.save();

    const receiptNo = 'REC-' + Date.now().toString().slice(-6) + Math.floor(100 + Math.random() * 900);
    const payment = await Payment.create({
      schoolId: req.user.schoolId,
      studentFeeId,
      studentId: studentFee.studentId,
      receiptNo,
      amountPaid,
      paymentMethod,
      remarks,
      recordedBy: req.user._id,
    });

    await logAudit(req, 'FEE_PAYMENT_RECORDED', 'Payment', payment._id.toString(), { receiptNo, amountPaid });

    res.status(201).json({
      success: true,
      message: 'Payment recorded successfully',
      data: { payment, studentFee },
    });
  } catch (error) {
    next(error);
  }
};

exports.getPayments = async (req, res, next) => {
  try {
    const payments = await Payment.find({ schoolId: req.user.schoolId })
      .populate('studentId', 'firstName lastName admissionNumber')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: payments });
  } catch (error) {
    next(error);
  }
};

exports.downloadReceipt = async (req, res, next) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) return res.status(404).json({ success: false, message: 'Payment not found' });

    const student = await Student.findById(payment.studentId).populate('classId sectionId');
    const studentFee = await StudentFee.findById(payment.studentFeeId);
    const feeStructure = await FeeStructure.findById(studentFee.feeStructureId);

    const pdfBuffer = await generateFeeReceiptPDF(payment, student, feeStructure);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=FeeReceipt_${payment.receiptNo}.pdf`);
    res.send(pdfBuffer);
  } catch (error) {
    next(error);
  }
};
