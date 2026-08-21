const User = require('../models/User');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const Parent = require('../models/Parent');
const Staff = require('../models/Staff');
const { formatDOBToPassword } = require('./passwordHelper');

/**
 * Migration function to ensure all existing entity profiles have linked User accounts
 * with DOB-based initial passwords and mustChangePassword = true.
 */
exports.migrateExistingUsers = async (schoolId) => {
  try {
    // 1. Migrate Students
    const students = await Student.find({ schoolId });
    for (const student of students) {
      if (!student.userId) {
        const rawPassword = formatDOBToPassword(student.dob);
        const email = student.email ? student.email.toLowerCase().trim() : `student.${student._id.toString().slice(-5)}@school.com`;
        const username = `${student.firstName}${student.lastName}`.toLowerCase().replace(/\s+/g, '') + Math.floor(100 + Math.random() * 900);

        const user = await User.create({
          schoolId,
          username,
          email,
          password: rawPassword,
          role: 'student',
          mustChangePassword: true,
          profileId: student._id,
          profileModel: 'Student',
        });

        student.userId = user._id;
        await student.save();
      }
    }

    // 2. Migrate Teachers
    const teachers = await Teacher.find({ schoolId });
    for (const teacher of teachers) {
      if (!teacher.userId) {
        const rawPassword = formatDOBToPassword(teacher.dob || '1990-01-01');
        const email = teacher.email ? teacher.email.toLowerCase().trim() : `teacher.${teacher._id.toString().slice(-5)}@school.com`;
        const username = teacher.name.toLowerCase().replace(/\s+/g, '') + Math.floor(100 + Math.random() * 900);

        const user = await User.create({
          schoolId,
          username,
          email,
          password: rawPassword,
          role: 'teacher',
          mustChangePassword: true,
          profileId: teacher._id,
          profileModel: 'Teacher',
        });

        teacher.userId = user._id;
        await teacher.save();
      }
    }

    // 3. Migrate Parents
    const parents = await Parent.find({ schoolId });
    for (const parent of parents) {
      if (!parent.userId) {
        const rawPassword = formatDOBToPassword(parent.dob || '1985-01-01');
        const email = parent.email ? parent.email.toLowerCase().trim() : `parent.${parent._id.toString().slice(-5)}@school.com`;
        const username = parent.email.split('@')[0] + Math.floor(100 + Math.random() * 900);

        const user = await User.create({
          schoolId,
          username,
          email,
          password: rawPassword,
          role: 'parent',
          mustChangePassword: true,
          profileId: parent._id,
          profileModel: 'Parent',
        });

        parent.userId = user._id;
        await parent.save();
      }
    }
  } catch (error) {
    console.error('[Migration Error]:', error.message);
  }
};
