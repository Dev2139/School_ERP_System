const { verifyAccessToken } = require('../config/jwt');
const User = require('../models/User');

const authenticateUser = async (req, res, next) => {
  try {
    let token = null;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authentication token missing or invalid',
      });
    }

    const decoded = verifyAccessToken(token);
    const user = await User.findById(decoded.id).select('-password');

    if (!user || user.status !== 'active') {
      return res.status(401).json({
        success: false,
        message: 'Account is inactive or does not exist',
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired access token',
      error: error.message,
    });
  }
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Unauthorized access' });
    }
    // super_admin gets universal access
    if (req.user.role === 'super_admin') {
      return next();
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Forbidden. Role '${req.user.role}' is not authorized to access this resource. Required roles: ${roles.join(', ')}`,
      });
    }
    next();
  };
};

module.exports = {
  authenticateUser,
  authorizeRoles,
};
