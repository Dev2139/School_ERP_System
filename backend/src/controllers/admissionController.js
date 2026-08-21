const Admission = require('../models/Admission');
const Student = require('../models/Student');
const User = require('../models/User');
const Parent = require('../models/Parent');
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

    const admissions = await Admission.find(query).populate('targetClassId', 'name').sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: admissions });
  } catch (error) {
    next(error);
  }
};

exports.createAdmission = async (req, res, next) => {
  try {
    const appNo = 'APP-' + Date.now().toString().slice(-6) + Math.floor(10 + Math.random() * 90);
    const admission = await Admission.create({
      ...req.body,
      schoolId: req.user.schoolId,
      applicationNo: appNo,
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

    const admission = await Admission.findByIdAndUpdate(id, { status, remarks }, { new: true });
    if (!admission) return res.status(404).json({ success: false, message: 'Application not found' });

    await logAudit(req, 'ADMISSION_STATUS_UPDATED', 'Admission', admission._id.toString(), { status });
    res.status(200).json({ success: true, message: `Admission status updated to ${status}`, data: admission });
  } catch (error) {
    next(error);
  }
};
