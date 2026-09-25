const FeeStructure = require('../models/FeeStructure');
const StudentFee = require('../models/StudentFee');
const Payment = require('../models/Payment');
const Student = require('../models/Student');
const Class = require('../models/Class');
const AcademicYear = require('../models/AcademicYear');
const { generateFeeReceiptPDF } = require('../services/pdfService');
const { logAudit } = require('../middleware/auditMiddleware');

// Helper to guarantee a StudentFee account exists for a student based on their Class Standard Fee
async function ensureStudentFeeAccount(schoolId, studentDoc) {
  let fees = await StudentFee.find({ schoolId, studentId: studentDoc._id }).populate('feeStructureId');
  if (fees && fees.length > 0) return fees;

  let classObj = studentDoc.classId;
  let classId = classObj?._id || classObj;

  if (!classId) {
    const firstClass = await Class.findOne({ schoolId });
    if (firstClass) {
      studentDoc.classId = firstClass._id;
      await studentDoc.save();
      classId = firstClass._id;
      classObj = firstClass;
    }
  }

  let feeStruct = null;
  if (classId) {
    feeStruct = await FeeStructure.findOne({ schoolId, classId });
  }

  let acadYear = (await AcademicYear.findOne({ schoolId, isCurrent: true })) || (await AcademicYear.findOne({ schoolId }));

  if (!feeStruct) {
    const classNameStr = classObj?.name || 'Standard';
    let standardAmount = 15000;
    if (classNameStr.includes('2')) standardAmount = 18000;
    if (classNameStr.includes('3')) standardAmount = 20000;
    if (classNameStr.includes('4')) standardAmount = 22000;
    if (classNameStr.includes('5')) standardAmount = 25000;
    if (classNameStr.includes('6')) standardAmount = 28000;
    if (classNameStr.includes('7')) standardAmount = 30000;
    if (classNameStr.includes('8')) standardAmount = 32000;
    if (classNameStr.includes('9')) standardAmount = 35000;
    if (classNameStr.includes('10')) standardAmount = 40000;

    feeStruct = await FeeStructure.create({
      schoolId,
      academicYearId: acadYear?._id || schoolId,
      classId: classId || schoolId,
      title: `${classNameStr} Annual Standard Fee`,
      feeComponents: [
        { name: 'Tuition Fee', amount: Math.round(standardAmount * 0.8), type: 'tuition' },
        { name: 'Exam & Lab Fee', amount: Math.round(standardAmount * 0.2), type: 'exam' },
      ],
      totalAmount: standardAmount,
      dueDate: new Date('2026-12-31'),
    });
  }

  await StudentFee.create({
    schoolId,
    studentId: studentDoc._id,
    feeStructureId: feeStruct._id,
    academicYearId: acadYear?._id || feeStruct.academicYearId,
    discountAmount: 0,
    netAmount: feeStruct.totalAmount,
    paidAmount: 0,
    balanceAmount: feeStruct.totalAmount,
    dueDate: feeStruct.dueDate || new Date('2026-12-31'),
    status: 'pending',
  });

  fees = await StudentFee.find({ schoolId, studentId: studentDoc._id }).populate('feeStructureId');
  return fees;
}

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

    let fees = await StudentFee.find(query)
      .populate('studentId', 'firstName lastName rollNumber admissionNumber email classId')
      .populate('feeStructureId');

    // Auto-ensure fee accounts for all active students if requested
    if (fees.length === 0 && !studentId && req.user.role !== 'student') {
      const students = await Student.find({ schoolId: req.user.schoolId, status: 'active' }).populate('classId');
      for (const s of students) {
        await ensureStudentFeeAccount(req.user.schoolId, s);
      }
      fees = await StudentFee.find(query)
        .populate('studentId', 'firstName lastName rollNumber admissionNumber email classId')
        .populate('feeStructureId');
    }

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
      amountPaid: Number(amountPaid),
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
      .populate('studentId', 'firstName lastName admissionNumber email')
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

exports.lookupStudentFeeAccount = async (req, res, next) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ success: false, message: 'Search query (email, admission number, or name) is required' });
    }

    const cleanQuery = query.trim();

    const student = await Student.findOne({
      schoolId: req.user.schoolId,
      $or: [
        { email: { $regex: cleanQuery, $options: 'i' } },
        { admissionNumber: { $regex: cleanQuery, $options: 'i' } },
        { firstName: { $regex: cleanQuery, $options: 'i' } },
        { lastName: { $regex: cleanQuery, $options: 'i' } },
      ],
    }).populate('classId sectionId');

    if (!student) {
      return res.status(404).json({ success: false, message: `No student record found matching '${query}'` });
    }

    // Auto-guarantee that a valid StudentFee account exists for this student!
    const fees = await ensureStudentFeeAccount(req.user.schoolId, student);
    const payments = await Payment.find({ schoolId: req.user.schoolId, studentId: student._id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: {
        student,
        fees,
        payments,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Standard-Wise Class Fee Settings (Class 1 - Class 10 Constant Fee Configurations)
exports.getClassFeeSettings = async (req, res, next) => {
  try {
    const classes = await Class.find({ schoolId: req.user.schoolId }).sort({ name: 1 });
    const structures = await FeeStructure.find({ schoolId: req.user.schoolId });

    const classSettings = classes.map((c) => {
      const fs = structures.find((s) => s.classId.toString() === c._id.toString());
      return {
        classId: c._id,
        className: c.name,
        structureId: fs?._id || null,
        totalAmount: fs?.totalAmount || (c.name.includes('10') ? 40000 : c.name.includes('5') ? 25000 : 15000),
        title: fs?.title || `${c.name} Standard Academic Annual Fee`,
      };
    });

    res.status(200).json({ success: true, data: classSettings });
  } catch (error) {
    next(error);
  }
};

exports.updateClassFeeSettings = async (req, res, next) => {
  try {
    const { classId, totalAmount, title } = req.body;
    const schoolId = req.user.schoolId;

    const classObj = await Class.findById(classId);
    if (!classObj) return res.status(404).json({ success: false, message: 'Class standard not found' });

    let acadYear = (await AcademicYear.findOne({ schoolId, isCurrent: true })) || (await AcademicYear.findOne({ schoolId }));
    let feeStruct = await FeeStructure.findOne({ schoolId, classId });

    const amount = Number(totalAmount);
    const structTitle = title || `${classObj.name} Standard Academic Annual Fee`;

    if (!feeStruct) {
      feeStruct = await FeeStructure.create({
        schoolId,
        academicYearId: acadYear?._id || schoolId,
        classId,
        title: structTitle,
        feeComponents: [
          { name: 'Tuition Fee', amount: Math.round(amount * 0.8), type: 'tuition' },
          { name: 'Exam & Lab Fee', amount: Math.round(amount * 0.2), type: 'exam' },
        ],
        totalAmount: amount,
        dueDate: new Date('2026-12-31'),
      });
    } else {
      feeStruct.totalAmount = amount;
      feeStruct.title = structTitle;
      feeStruct.feeComponents = [
        { name: 'Tuition Fee', amount: Math.round(amount * 0.8), type: 'tuition' },
        { name: 'Exam & Lab Fee', amount: Math.round(amount * 0.2), type: 'exam' },
      ];
      await feeStruct.save();
    }

    // Update all StudentFee records for students enrolled in this class standard
    const students = await Student.find({ schoolId, classId });
    for (const s of students) {
      let sf = await StudentFee.findOne({ schoolId, studentId: s._id, feeStructureId: feeStruct._id });
      if (!sf) {
        await StudentFee.create({
          schoolId,
          studentId: s._id,
          feeStructureId: feeStruct._id,
          academicYearId: acadYear?._id || schoolId,
          discountAmount: 0,
          netAmount: amount,
          paidAmount: 0,
          balanceAmount: amount,
          dueDate: new Date('2026-12-31'),
          status: 'pending',
        });
      } else {
        sf.netAmount = amount;
        sf.balanceAmount = Math.max(0, amount - sf.paidAmount);
        if (sf.balanceAmount <= 0) sf.status = 'paid';
        else if (sf.paidAmount > 0) sf.status = 'partial';
        else sf.status = 'pending';
        await sf.save();
      }
    }

    await logAudit(req, 'STANDARD_FEE_UPDATED', 'FeeStructure', feeStruct._id.toString(), { className: classObj.name, amount });

    res.status(200).json({
      success: true,
      message: `Updated standard annual fee for ${classObj.name} to ₹${amount.toLocaleString()}`,
      data: feeStruct,
    });
  } catch (error) {
    next(error);
  }
};
