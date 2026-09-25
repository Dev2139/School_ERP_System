require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');

const School = require('../models/School');
const User = require('../models/User');
const AcademicYear = require('../models/AcademicYear');
const Class = require('../models/Class');
const Section = require('../models/Section');
const Subject = require('../models/Subject');
const Teacher = require('../models/Teacher');
const Timetable = require('../models/Timetable');
const TeacherAssignment = require('../models/TeacherAssignment');

const seedTimetables = async () => {
  try {
    console.log('[Seed 5 Timetables] Connecting to DB...');
    await connectDB();

    // 1. Get default School & AcademicYear
    let school = await School.findOne();
    if (!school) {
      school = await School.create({
        name: 'Greenwood International School',
        code: 'GIS-2026',
        address: '123 Academic Way',
        city: 'Metropolis',
        state: 'New York',
        pincode: '10001',
        phone: '+1 555-0199',
        email: 'info@greenwoodschool.edu',
      });
    }

    let academicYear = await AcademicYear.findOne({ schoolId: school._id, isCurrent: true })
      || await AcademicYear.findOne({ schoolId: school._id });

    if (!academicYear) {
      academicYear = await AcademicYear.create({
        schoolId: school._id,
        name: '2026-2027',
        startDate: new Date('2026-04-01'),
        endDate: new Date('2027-03-31'),
        isCurrent: true,
      });
    }

    // 2. Define the 5 Faculty Members from the user's seed image
    const facultyData = [
      {
        employeeId: 'TCH-692',
        name: 'Manubhai Parmar',
        email: 'manu@gmail.com',
        phone: '+91 0123456789',
        qualification: 'PGT Mathematics',
        experience: '5 Years',
        subjectName: 'Mathematics',
        subjectCodePrefix: 'MATH',
      },
      {
        employeeId: 'TCH-345',
        name: 'Harshida Parmar',
        email: 'harshida@gmail.com',
        phone: '+91 1234567890',
        qualification: 'PGT Hindi',
        experience: '5 Years',
        subjectName: 'Hindi',
        subjectCodePrefix: 'HIN',
      },
      {
        employeeId: 'TCH-405',
        name: 'Mahesh Tripathi',
        email: 'mahesh@gmail.com',
        phone: '+91 789461230',
        qualification: 'PGT Physics',
        experience: '5 Years',
        subjectName: 'Physics',
        subjectCodePrefix: 'PHY',
      },
      {
        employeeId: 'TCH-675',
        name: 'Ajitkumar Sharma',
        email: 'ajit@gmai.com',
        phone: '+91 987654321',
        qualification: 'PGT Chemestry',
        experience: '5 Years',
        subjectName: 'Chemistry',
        subjectCodePrefix: 'CHEM',
      },
      {
        employeeId: 'TCH-358',
        name: 'Alpesh Parmar',
        email: 'alpesh@gmail.com',
        phone: '+91 7412589630',
        qualification: 'PGT Computer Science',
        experience: '5 Years',
        subjectName: 'Computer Science',
        subjectCodePrefix: 'CS',
      },
    ];

    const teacherDocs = [];
    for (const f of facultyData) {
      let t = await Teacher.findOne({ email: f.email });
      if (!t) {
        t = await Teacher.create({
          schoolId: school._id,
          employeeId: f.employeeId,
          name: f.name,
          email: f.email,
          phone: f.phone,
          qualification: f.qualification,
          experience: f.experience,
        });
      } else {
        t.employeeId = f.employeeId;
        t.name = f.name;
        t.phone = f.phone;
        t.qualification = f.qualification;
        t.experience = f.experience;
        await t.save();
      }

      // Ensure User account for teacher exists
      let u = await User.findOne({ email: f.email });
      if (!u) {
        u = await User.create({
          schoolId: school._id,
          username: f.email.split('@')[0],
          email: f.email,
          password: 'Teacher@123',
          role: 'teacher',
          profileId: t._id,
          profileModel: 'Teacher',
        });
      }
      t.userId = u._id;
      await t.save();

      teacherDocs.push(t);
    }

    console.log(`[Seed 5 Timetables] ${teacherDocs.length} Teachers verified.`);

    // 3. Create Classes 1 to 5, Sections & Subjects
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const periods = [
      { periodNumber: 1, startTime: '09:00 AM', endTime: '09:45 AM' },
      { periodNumber: 2, startTime: '09:45 AM', endTime: '10:30 AM' },
      { periodNumber: 3, startTime: '10:30 AM', endTime: '11:15 AM' },
      { periodNumber: 4, startTime: '11:30 AM', endTime: '12:15 PM' },
      { periodNumber: 5, startTime: '12:15 PM', endTime: '01:00 PM' },
    ];

    for (let cIdx = 0; cIdx < 5; cIdx++) {
      const classNum = cIdx + 1;
      const className = `Class ${classNum}`;
      const classCode = `C${classNum}`;
      const roomNo = `Room ${101 + cIdx}`;

      let cls = await Class.findOne({ schoolId: school._id, name: className });
      if (!cls) {
        cls = await Class.create({
          schoolId: school._id,
          academicYearId: academicYear._id,
          name: className,
          code: classCode,
          classTeacher: teacherDocs[cIdx % teacherDocs.length]._id,
        });
      } else {
        cls.classTeacher = teacherDocs[cIdx % teacherDocs.length]._id;
        await cls.save();
      }

      let sec = await Section.findOne({ schoolId: school._id, classId: cls._id, name: 'Section A' });
      if (!sec) {
        sec = await Section.create({
          schoolId: school._id,
          classId: cls._id,
          name: 'Section A',
          roomNo,
          classTeacher: teacherDocs[cIdx % teacherDocs.length]._id,
        });
      } else {
        sec.roomNo = roomNo;
        sec.classTeacher = teacherDocs[cIdx % teacherDocs.length]._id;
        await sec.save();
      }

      // Create Subjects for this class (1 per faculty member)
      const classSubjects = [];
      for (let sIdx = 0; sIdx < facultyData.length; sIdx++) {
        const f = facultyData[sIdx];
        const tDoc = teacherDocs[sIdx];

        let subj = await Subject.findOne({
          schoolId: school._id,
          classId: cls._id,
          name: f.subjectName,
        });

        if (!subj) {
          subj = await Subject.create({
            schoolId: school._id,
            classId: cls._id,
            name: f.subjectName,
            code: `${f.subjectCodePrefix}-${classNum}`,
            type: 'theory',
            teacherId: tDoc._id,
          });
        } else {
          subj.teacherId = tDoc._id;
          await subj.save();
        }

        // Add to teacher's subjects array
        if (!tDoc.subjects.includes(subj._id)) {
          tDoc.subjects.push(subj._id);
          await tDoc.save();
        }

        // Teacher assignment
        let assign = await TeacherAssignment.findOne({
          schoolId: school._id,
          teacherId: tDoc._id,
          classId: cls._id,
          sectionId: sec._id,
          subjectId: subj._id,
        });
        if (!assign) {
          await TeacherAssignment.create({
            schoolId: school._id,
            teacherId: tDoc._id,
            classId: cls._id,
            sectionId: sec._id,
            subjectId: subj._id,
            academicYearId: academicYear._id,
          });
        }

        classSubjects.push({ subject: subj, teacher: tDoc });
      }

      // 4. Generate Conflict-Free Timetable for Class cIdx
      const slots = [];
      for (let dIdx = 0; dIdx < days.length; dIdx++) {
        const dayName = days[dIdx];
        for (let pIdx = 0; pIdx < periods.length; pIdx++) {
          const p = periods[pIdx];
          // Conflict-free rotation formula: (class_index + day_index + period_index) % 5
          const facultyIdx = (cIdx + dIdx + pIdx) % 5;
          const { subject, teacher } = classSubjects[facultyIdx];

          slots.push({
            day: dayName,
            periodNumber: p.periodNumber,
            startTime: p.startTime,
            endTime: p.endTime,
            subjectId: subject._id,
            teacherId: teacher._id,
            classroom: roomNo,
          });
        }
      }

      // Upsert Timetable for Class cIdx Section A
      await Timetable.findOneAndUpdate(
        { schoolId: school._id, classId: cls._id, sectionId: sec._id },
        {
          schoolId: school._id,
          academicYearId: academicYear._id,
          classId: cls._id,
          sectionId: sec._id,
          slots,
        },
        { upsert: true, new: true }
      );

      console.log(`[Seed 5 Timetables] ✅ Timetable seeded for ${className} - ${sec.name} (${roomNo}) with ${slots.length} periods.`);
    }

    console.log('------------------------------------------------------------');
    console.log('🎉 5 Timetables for Classes 1 to 5 Seeded Successfully!');
    console.log('------------------------------------------------------------');
    process.exit(0);
  } catch (err) {
    console.error('[Seed Timetables Error]:', err);
    process.exit(1);
  }
};

seedTimetables();
