const Event = require('../models/Event');
const { logAudit } = require('../middleware/auditMiddleware');

const seedDefaultEvents = async (schoolId) => {
  const count = await Event.countDocuments({ schoolId });
  if (count === 0) {
    const currentYear = new Date().getFullYear();
    const defaultEvents = [
      {
        schoolId,
        title: 'Gandhi Jayanti Holiday',
        description: 'National holiday observing Gandhi Jayanti.',
        category: 'holiday',
        startDate: new Date(`${currentYear}-10-02T00:00:00.000Z`),
        endDate: new Date(`${currentYear}-10-02T23:59:59.000Z`),
        location: 'School Wide',
      },
      {
        schoolId,
        title: 'Mid-Term Examinations 2026',
        description: 'Comprehensive mid-term exams for Classes 1 to 12.',
        category: 'exam',
        startDate: new Date(`${currentYear}-10-15T09:00:00.000Z`),
        endDate: new Date(`${currentYear}-10-25T17:00:00.000Z`),
        location: 'Main Exam Halls',
      },
      {
        schoolId,
        title: 'Diwali & Autumn Vacation',
        description: 'Annual festival holiday break.',
        category: 'holiday',
        startDate: new Date(`${currentYear}-11-01T00:00:00.000Z`),
        endDate: new Date(`${currentYear}-11-08T23:59:59.000Z`),
        location: 'School Wide',
      },
      {
        schoolId,
        title: 'Annual Sports & Track Meet',
        description: 'Inter-house athletic competitions, relay races, and sports showcase.',
        category: 'sports',
        startDate: new Date(`${currentYear}-11-20T08:30:00.000Z`),
        endDate: new Date(`${currentYear}-11-21T17:00:00.000Z`),
        location: 'Greenwood Sports Complex',
      },
      {
        schoolId,
        title: 'Parent-Teacher Interaction (PTA)',
        description: 'Discussion of Term 1 progress reports with parents.',
        category: 'meeting',
        startDate: new Date(`${currentYear}-12-05T09:30:00.000Z`),
        endDate: new Date(`${currentYear}-12-05T13:30:00.000Z`),
        location: 'Auditorium & Classrooms',
      },
      {
        schoolId,
        title: 'Science & Technology Exhibition',
        description: 'Student project models and interactive science stalls.',
        category: 'event',
        startDate: new Date(`${currentYear}-12-18T10:00:00.000Z`),
        endDate: new Date(`${currentYear}-12-18T16:00:00.000Z`),
        location: 'Exhibition Hall',
      },
    ];

    await Event.insertMany(defaultEvents);
  }
};

exports.getEvents = async (req, res, next) => {
  try {
    if (req.user?.schoolId) {
      await seedDefaultEvents(req.user.schoolId);
    }
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

exports.updateEvent = async (req, res, next) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!event) return res.status(404).json({ success: false, message: 'Event not found' });
    await logAudit(req, 'EVENT_UPDATED', 'Event', event._id.toString());
    res.status(200).json({ success: true, data: event });
  } catch (error) {
    next(error);
  }
};

exports.deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ success: false, message: 'Event not found' });
    await logAudit(req, 'EVENT_DELETED', 'Event', req.params.id);
    res.status(200).json({ success: true, message: 'Event deleted successfully' });
  } catch (error) {
    next(error);
  }
};
