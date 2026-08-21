const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const errorHandler = require('./middleware/errorHandler');

const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const parentRoutes = require('./routes/parentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const academicRoutes = require('./routes/academicRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const timetableRoutes = require('./routes/timetableRoutes');
const examRoutes = require('./routes/examRoutes');
const homeworkRoutes = require('./routes/homeworkRoutes');
const feeRoutes = require('./routes/feeRoutes');
const admissionRoutes = require('./routes/admissionRoutes');
const noticeRoutes = require('./routes/noticeRoutes');
const eventRoutes = require('./routes/eventRoutes');
const leaveRoutes = require('./routes/leaveRoutes');
const libraryRoutes = require('./routes/libraryRoutes');
const transportRoutes = require('./routes/transportRoutes');
const reportRoutes = require('./routes/reportRoutes');
const searchRoutes = require('./routes/searchRoutes');
const settingRoutes = require('./routes/settingRoutes');

const staffRoutes = require('./routes/staffRoutes');

const app = express();

app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  message: { success: false, message: 'Too many requests from this IP' },
});
app.use('/api', limiter);

// Mount API Routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/parents', parentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/academics', academicRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/timetable', timetableRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/homework', homeworkRoutes);
app.use('/api/fees', feeRoutes);
app.use('/api/admissions', admissionRoutes);
app.use('/api/notices', noticeRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/leave', leaveRoutes);
app.use('/api/library', libraryRoutes);
app.use('/api/transport', transportRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/settings', settingRoutes);

app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'School ERP API Server is Healthy', timestamp: new Date() });
});

// Centralized error handler
app.use(errorHandler);

module.exports = app;
