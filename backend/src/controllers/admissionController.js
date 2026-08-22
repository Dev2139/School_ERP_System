const Admission = require('../models/Admission');
const Student = require('../models/Student');
const User = require('../models/User');
const Parent = require('../models/Parent');
const Class = require('../models/Class');
const Section = require('../models/Section');
const bcrypt = require('bcryptjs');
const { logAudit } = require('../middleware/auditMiddleware');

exports.getAdmissions = async (req, res, next) => {
  try {
    const { status, search } = req.query;
    const query = { schoolId: req.user.schoolId };
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { studentFirstName: { $regex: search, $options: 'i' } },
        { studentLastName: { $regex: search, $options: 'i' } },
        { applicationNo: { $regex: search, $options: 'i' } },
        { parentEmail: { $regex: search, $options: 'i' } },
      ];
    }

    const admissions = await Admission.find(query)
      .populate('targetClassId', 'name code')
      .populate('targetSectionId', 'name roomNo')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: admissions });
  } catch (error) {
    next(error);
  }
};

exports.createAdmission = async (req, res, next) => {
  try {
    const appNo = 'APP-' + Date.now().toString().slice(-6) + Math.floor(10 + Math.random() * 90);

    const { targetClassId, targetSectionId } = req.body;
    let resolvedSectionId = targetSectionId;

    if (!resolvedSectionId && targetClassId) {
      const sec = await Section.findOne({ classId: targetClassId });
      if (sec) resolvedSectionId = sec._id;
    }

    const admission = await Admission.create({
      ...req.body,
      schoolId: req.user.schoolId,
      applicationNo: appNo,
      targetSectionId: resolvedSectionId,
    });

    await logAudit(req, 'ADMISSION_CREATED', 'Admission', admission._id.toString());
    res.status(201).json({ success: true, message: 'Admission application created', data: admission });
  } catch (error) {
    next(error);
  }
};

exports.updateStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, remarks } = req.body;

    const admission = await Admission.findById(id);
    if (!admission) return res.status(404).json({ success: false, message: 'Application not found' });

    admission.status = status;
    if (remarks) admission.remarks = remarks;
    await admission.save();

    let studentCreated = null;

    // IF APPROVED OR ADMITTED: Auto-enroll student into Student Directory & create User login account!
    if (['approved', 'admitted'].includes(status)) {
      const studentEmail = (admission.parentEmail || `student.${Date.now().toString().slice(-4)}@school.com`).toLowerCase().trim();

      // Check if student already enrolled
      let studentDoc = await Student.findOne({
        schoolId: admission.schoolId,
        firstName: admission.studentFirstName,
        lastName: admission.studentLastName,
        classId: admission.targetClassId,
      });

      if (!studentDoc) {
        // Resolve section
        let sectionId = admission.targetSectionId;
        if (!sectionId) {
          const sec = await Section.findOne({ classId: admission.targetClassId });
          sectionId = sec ? sec._id : admission.targetClassId;
        }

        const cls = await Class.findById(admission.targetClassId);
        const academicYearId = cls?.academicYearId || '60d0fe4f5311236168a109ca';

        const countInSec = await Student.countDocuments({ classId: admission.targetClassId, sectionId });
        const rollNumber = countInSec + 1;
        const admNo = `ADM-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;

        // Create Parent or link Parent
        let parentDoc = await Parent.findOne({ email: admission.parentEmail });
        if (!parentDoc) {
          parentDoc = await Parent.create({
            schoolId: admission.schoolId,
            parentId: `PAR-${Math.floor(1000 + Math.random() * 9000)}`,
            name: admission.parentName,
            email: admission.parentEmail,
            phone: admission.parentPhone,
            address: admission.address || 'Greenwood Residential Block',
            relationship: 'father',
          });
        }

        studentDoc = await Student.create({
          schoolId: admission.schoolId,
          academicYearId,
          classId: admission.targetClassId,
          sectionId,
          admissionNumber: admNo,
          rollNumber,
          studentId: `STU-${Math.floor(1000 + Math.random() * 9000)}`,
          firstName: admission.studentFirstName,
          lastName: admission.studentLastName,
          gender: admission.gender || 'male',
          dob: admission.dob || new Date('2013-01-01'),
          fatherName: admission.parentName,
          fatherPhone: admission.parentPhone,
          address: admission.address || 'Greenwood Residential Block',
          email: studentEmail,
          parentId: parentDoc._id,
          status: 'active',
        });

        // Add child to parent
        await Parent.findByIdAndUpdate(parentDoc._id, { $addToSet: { children: studentDoc._id } });

        // Create User account for Student login
        const username = `${admission.studentFirstName.toLowerCase()}${admission.studentLastName.toLowerCase()}${Math.floor(10 + Math.random() * 90)}`;
        const hashedPassword = await bcrypt.hash('06102006', 10);

        let userDoc = await User.findOne({ email: studentEmail });
        if (!userDoc) {
          userDoc = await User.create({
            schoolId: admission.schoolId,
            username,
            email: studentEmail,
            password: hashedPassword,
            role: 'student',
            profileId: studentDoc._id,
            profileModel: 'Student',
            status: 'active',
            mustChangePassword: false,
          });
        }

        studentDoc.userId = userDoc._id;
        await studentDoc.save();
        studentCreated = studentDoc;

        await logAudit(req, 'STUDENT_ADMITTED_VIA_PIPELINE', 'Student', studentDoc._id.toString(), {
          admissionNo: admNo,
          classId: admission.targetClassId,
        });
      }
    }

    await logAudit(req, 'ADMISSION_STATUS_UPDATED', 'Admission', admission._id.toString(), { status });

    res.status(200).json({
      success: true,
      message: studentCreated
        ? `Application Approved! Student ${admission.studentFirstName} ${admission.studentLastName} enrolled directly into Student Directory.`
        : `Admission status updated to ${status}`,
      data: admission,
      student: studentCreated,
    });
  } catch (error) {
    next(error);
  }
};
