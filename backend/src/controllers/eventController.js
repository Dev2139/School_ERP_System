const Event = require('../models/Event');
const { logAudit } = require('../middleware/auditMiddleware');

exports.getEvents = async (req, res, next) => {
  try {
    const events = await Event.find({ schoolId: req.user.schoolId }).sort({ startDate: 1 });
    res.status(200).json({ success: true, data: events });
  } catch (error) {
    next(error);
  }
};

exports.createEvent = async (req, res, next) => {
  try {
    const event = await Event.create({ ...req.body, schoolId: req.user.schoolId });
    await logAudit(req, 'EVENT_CREATED', 'Event', event._id.toString());
    res.status(201).json({ success: true, data: event });
  } catch (error) {
    next(error);
  }
};
