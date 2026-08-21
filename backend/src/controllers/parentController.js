const Parent = require('../models/Parent');
const User = require('../models/User');
const { logAudit } = require('../middleware/auditMiddleware');

exports.getParents = async (req, res, next) => {
  try {
    const parents = await Parent.find({ schoolId: req.user.schoolId }).populate('children');
    res.status(200).json({ success: true, data: parents });
  } catch (error) {
    next(error);
  }
};

exports.createParent = async (req, res, next) => {
  try {
    const data = req.body;
    data.schoolId = req.user.schoolId;

    const { formatDOBToPassword } = require('../utils/passwordHelper');
    const initialPassword = formatDOBToPassword(data.dob || '1985-01-01');

    const user = await User.create({
      schoolId: req.user.schoolId,
      username: data.email.split('@')[0] + Math.floor(100 + Math.random() * 900),
      email: data.email.toLowerCase().trim(),
      password: initialPassword,
      role: 'parent',
      mustChangePassword: true,
    });

    data.userId = user._id;
    const parent = await Parent.create(data);

    user.profileId = parent._id;
    user.profileModel = 'Parent';
    await user.save();

    // Link selected children to parent profile
    if (data.children && Array.isArray(data.children) && data.children.length > 0) {
      const Student = require('../models/Student');
      for (const childId of data.children) {
        await Student.findByIdAndUpdate(childId, { parentId: parent._id });
      }
    }

    await logAudit(req, 'PARENT_CREATED', 'Parent', parent._id.toString());
    res.status(201).json({ success: true, message: 'Parent created successfully', data: parent });
  } catch (error) {
    next(error);
  }
};
