const User = require('../models/User');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const Parent = require('../models/Parent');
const Staff = require('../models/Staff');
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require('../config/jwt');
const { logAudit } = require('../middleware/auditMiddleware');

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    if (user.status !== 'active') {
      return res.status(403).json({ success: false, message: 'Your account has been deactivated. Contact administrator.' });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    user.lastLogin = new Date();
    await user.save();

    let profile = null;
    if (user.role === 'student' && user.profileId) profile = await Student.findById(user.profileId).populate('classId sectionId');
    if (user.role === 'teacher' && user.profileId) profile = await Teacher.findById(user.profileId);

    if (user.role === 'staff' && user.profileId) profile = await Staff.findById(user.profileId);

    await logAudit(req, 'USER_LOGIN', 'User', user._id.toString(), { role: user.role });

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        token: accessToken,
        refreshToken,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
          mustChangePassword: user.mustChangePassword,
          schoolId: user.schoolId,
          profile,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(400).json({ success: false, message: 'Current password and new password are required' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, message: 'New password must be at least 6 characters long' });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User account not found' });
    }

    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Current password is incorrect' });
    }

    user.password = newPassword;
    user.mustChangePassword = false;
    await user.save();

    await logAudit(req, 'PASSWORD_CHANGED', 'User', user._id.toString());

    return res.status(200).json({
      success: true,
      message: 'Password changed successfully. You may now access the system.',
      mustChangePassword: false,
    });
  } catch (error) {
    next(error);
  }
};

exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    let profile = null;
    if (user.role === 'student' && user.profileId) profile = await Student.findById(user.profileId).populate('classId sectionId');
    if (user.role === 'teacher' && user.profileId) profile = await Teacher.findById(user.profileId);

    if (user.role === 'staff' && user.profileId) profile = await Staff.findById(user.profileId);

    res.status(200).json({
      success: true,
      data: {
        user,
        profile,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.refreshToken = async (req, res, next) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ success: false, message: 'Refresh token required' });

    const decoded = verifyRefreshToken(token);
    const user = await User.findById(decoded.id);
    if (!user || user.refreshToken !== token) {
      return res.status(401).json({ success: false, message: 'Invalid refresh token' });
    }

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    user.refreshToken = newRefreshToken;
    await user.save();

    res.status(200).json({
      success: true,
      data: {
        token: newAccessToken,
        refreshToken: newRefreshToken,
      },
    });
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid or expired refresh token' });
  }
};

exports.logout = async (req, res, next) => {
  try {
    if (req.user) {
      await User.findByIdAndUpdate(req.user._id, { refreshToken: null });
      await logAudit(req, 'USER_LOGOUT', 'User', req.user._id.toString());
    }
    res.status(200).json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    next(error);
  }
};
