const User = require('../models/User');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const Parent = require('../models/Parent');
const Staff = require('../models/Staff');
const { formatDOBToPassword } = require('./passwordHelper');
const { generateStudentUID, generateTeacherUID } = require('./uidGenerator');

/**
 * Migration function to ensure all existing entity profiles have linked User accounts
 * with auto-generated UID format as username and DOB-based initial passwords.
 */
exports.migrateExistingUsers = async (schoolId) => {
  try {
    const query = schoolId ? { schoolId } : {};

    // 1. Migrate Students
    const students = await Student.find(query);
    for (const student of students) {
      const email = student.email ? student.email.toLowerCase().trim() : `student.${student._id.toString().slice(-5)}@school.com`;
      const uid = await generateStudentUID(student.schoolId || schoolId, student.admissionDate || student.createdAt);

      if (!student.userId) {
        const rawPassword = formatDOBToPassword(student.dob);
        const user = await User.create({
          schoolId: student.schoolId || schoolId,
          username: uid,
          email,
          password: rawPassword,
          role: 'student',
          mustChangePassword: true,
          profileId: student._id,
          profileModel: 'Student',
        });

        student.userId = user._id;
        student.studentId = uid;
        await student.save();
      } else {
        const user = await User.findById(student.userId);
        if (user && (!user.username || user.username.includes('student') || !/^\d{2}[A-Z]+/.test(user.username))) {
          user.username = uid;
          await user.save();
        }
        if (!student.studentId) {
          student.studentId = uid;
          await student.save();
        }
      }
    }

    // 2. Migrate Teachers
    const teachers = await Teacher.find(query);
    for (const teacher of teachers) {
      const email = teacher.email ? teacher.email.toLowerCase().trim() : `teacher.${teacher._id.toString().slice(-5)}@school.com`;
      const uid = await generateTeacherUID(teacher.schoolId || schoolId, teacher.joiningDate || teacher.createdAt);

      if (!teacher.userId) {
        const rawPassword = formatDOBToPassword(teacher.dob || '1990-01-01');
        const user = await User.create({
          schoolId: teacher.schoolId || schoolId,
          username: uid,
          email,
          password: rawPassword,
          role: 'teacher',
          mustChangePassword: true,
          profileId: teacher._id,
          profileModel: 'Teacher',
        });

        teacher.userId = user._id;
        teacher.employeeId = uid;
        await teacher.save();
      } else {
        const user = await User.findById(teacher.userId);
        if (user && (!user.username || !/^\d{2}[A-Z]+STAFF/.test(user.username))) {
          user.username = uid;
          await user.save();
        }
        if (!teacher.employeeId) {
          teacher.employeeId = uid;
          await teacher.save();
        }
      }
    }

    // 3. Migrate Staff
    const staffMembers = await Staff.find(query);
    for (const staff of staffMembers) {
      const email = staff.email ? staff.email.toLowerCase().trim() : `staff.${staff._id.toString().slice(-5)}@school.com`;
      const uid = await generateTeacherUID(staff.schoolId || schoolId, staff.joiningDate || staff.createdAt);

      if (!staff.userId) {
        const rawPassword = formatDOBToPassword(staff.dob || '1990-01-01');
        const user = await User.create({
          schoolId: staff.schoolId || schoolId,
          username: uid,
          email,
          password: rawPassword,
          role: staff.role || 'staff',
          mustChangePassword: true,
          profileId: staff._id,
          profileModel: 'Staff',
        });

        staff.userId = user._id;
        await staff.save();
      } else {
        const user = await User.findById(staff.userId);
        if (user && user.role !== 'accountant' && (!user.username || !/^\d{2}[A-Z]+STAFF/.test(user.username))) {
          user.username = uid;
          await user.save();
        }
      }
    }

    // 4. Migrate Parents
    const parents = await Parent.find(query);
    for (const parent of parents) {
      if (!parent.userId) {
        const rawPassword = formatDOBToPassword(parent.dob || '1985-01-01');
        const email = parent.email ? parent.email.toLowerCase().trim() : `parent.${parent._id.toString().slice(-5)}@school.com`;
        const username = parent.email.split('@')[0] + Math.floor(100 + Math.random() * 900);

        const user = await User.create({
          schoolId: parent.schoolId || schoolId,
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

    console.log('[Migration]: Auto-generated UIDs for existing students and teachers successfully.');
  } catch (error) {
    console.error('[Migration Error]:', error.message);
  }
};
