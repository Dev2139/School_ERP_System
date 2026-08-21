const Staff = require('../models/Staff');
const User = require('../models/User');
const { formatDOBToPassword } = require('../utils/passwordHelper');
const { logAudit } = require('../middleware/auditMiddleware');

exports.getStaff = async (req, res, next) => {
  try {
    const staffMembers = await Staff.find({ schoolId: req.user.schoolId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: staffMembers });
  } catch (error) {
    next(error);
  }
};

exports.createStaff = async (req, res, next) => {
  try {
    const data = req.body;
    data.schoolId = req.user.schoolId;

    const initialPassword = formatDOBToPassword(data.dob || '1990-01-01');
    const username = data.name.toLowerCase().replace(/\s+/g, '') + Math.floor(100 + Math.random() * 900);

    // Create User Account
    const user = await User.create({
      schoolId: req.user.schoolId,
      username,
      email: data.email.toLowerCase().trim(),
      password: initialPassword,
      role: data.role || 'staff',
      mustChangePassword: true,
    });

    data.userId = user._id;
    const staff = await Staff.create(data);

    user.profileId = staff._id;
    user.profileModel = 'Staff';
    await user.save();

    await logAudit(req, 'STAFF_CREATED', 'Staff', staff._id.toString(), { role: data.role, email: data.email });

    res.status(201).json({
      success: true,
      message: 'Staff account created successfully',
      data: { staff, user },
    });
  } catch (error) {
    next(error);
  }
};

exports.updateStaff = async (req, res, next) => {
  try {
    const staff = await Staff.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!staff) return res.status(404).json({ success: false, message: 'Staff member not found' });

    await logAudit(req, 'STAFF_UPDATED', 'Staff', staff._id.toString());
    res.status(200).json({ success: true, message: 'Staff profile updated', data: staff });
  } catch (error) {
    next(error);
  }
};

exports.deactivateStaff = async (req, res, next) => {
  try {
    const staff = await Staff.findByIdAndUpdate(req.params.id, { status: 'inactive' }, { new: true });
    if (!staff) return res.status(404).json({ success: false, message: 'Staff member not found' });

    if (staff.userId) {
      await User.findByIdAndUpdate(staff.userId, { status: 'inactive' });
    }

    await logAudit(req, 'STAFF_DEACTIVATED', 'Staff', staff._id.toString());
    res.status(200).json({ success: true, message: 'Staff member deactivated successfully' });
  } catch (error) {
    next(error);
  }
};
