const Notification = require('../models/Notification');

exports.getNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.find({
      schoolId: req.user.schoolId,
      recipientId: req.user._id,
    })
      .sort({ createdAt: -1 })
      .limit(30);

    const unreadCount = await Notification.countDocuments({
      schoolId: req.user.schoolId,
      recipientId: req.user._id,
      isRead: false,
    });

    res.status(200).json({
      success: true,
      unreadCount,
      data: notifications,
    });
  } catch (error) {
    next(error);
  }
};

exports.markAsRead = async (req, res, next) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findOneAndUpdate(
      { _id: id, recipientId: req.user._id },
      { isRead: true },
      { new: true }
    );

    res.status(200).json({ success: true, data: notification });
  } catch (error) {
    next(error);
  }
};

exports.markAllAsRead = async (req, res, next) => {
  try {
    await Notification.updateMany(
      { schoolId: req.user.schoolId, recipientId: req.user._id, isRead: false },
      { isRead: true }
    );

    res.status(200).json({ success: true, message: 'All notifications marked as read' });
  } catch (error) {
    next(error);
  }
};
