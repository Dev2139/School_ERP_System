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
const Staff = require('../models/Staff');
const Parent = require('../models/Parent');
const Student = require('../models/Student');
const Attendance = require('../models/Attendance');
const Timetable = require('../models/Timetable');
const Examination = require('../models/Examination');
const ExamSubject = require('../models/ExamSubject');
const Result = require('../models/Result');
const Homework = require('../models/Homework');
const FeeStructure = require('../models/FeeStructure');
const StudentFee = require('../models/StudentFee');
const Payment = require('../models/Payment');
const Admission = require('../models/Admission');
const Notice = require('../models/Notice');
const Event = require('../models/Event');
const LeaveRequest = require('../models/LeaveRequest');
const Book = require('../models/Book');
const BookIssue = require('../models/BookIssue');
const Vehicle = require('../models/Vehicle');
const Route = require('../models/Route');
const AuditLog = require('../models/AuditLog');
const TeacherAssignment = require('../models/TeacherAssignment');

const seed = async () => {
  try {
    console.log('[Seed] Connecting to database...');
    await connectDB();

    console.log('[Seed] Cleaning existing data...');
    await Promise.all([
      School.deleteMany({}),
      User.deleteMany({}),
      AcademicYear.deleteMany({}),
      Class.deleteMany({}),
      Section.deleteMany({}),
      Subject.deleteMany({}),
      Teacher.deleteMany({}),
      Staff.deleteMany({}),
      Parent.deleteMany({}),
      Student.deleteMany({}),
      Attendance.deleteMany({}),
      Timetable.deleteMany({}),
      Examination.deleteMany({}),
      ExamSubject.deleteMany({}),
      Result.deleteMany({}),
      Homework.deleteMany({}),
      FeeStructure.deleteMany({}),
      StudentFee.deleteMany({}),
      Payment.deleteMany({}),
      Admission.deleteMany({}),
      Notice.deleteMany({}),
      Event.deleteMany({}),
      LeaveRequest.deleteMany({}),
      Book.deleteMany({}),
      BookIssue.deleteMany({}),
      Vehicle.deleteMany({}),
      Route.deleteMany({}),
      AuditLog.deleteMany({}),
    ]);

    console.log('[Seed] Creating Demo School...');
    const school = await School.create({
      name: 'Greenwood International School',
      code: 'GIS-2026',
      logo: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=200&h=200&fit=crop',
      address: '123 Academic Boulevard, Innovation Park',
      city: 'Metropolis',
      state: 'New York',
      pincode: '10001',
      phone: '+1 (800) 555-0199',
      email: 'info@greenwoodschool.edu',
      website: 'https://greenwoodschool.edu',
      principalName: 'Dr. Eleanor Vance',
      establishedYear: 2008,
      affiliationNo: 'CBSE-998231',
    });

    console.log('[Seed] Creating Academic Year...');
    const academicYear = await AcademicYear.create({
      schoolId: school._id,
      name: '2026-2027',
      startDate: new Date('2026-04-01'),
      endDate: new Date('2027-03-31'),
      isCurrent: true,
    });
    school.settings.academicYearId = academicYear._id;
    await school.save();

    console.log('[Seed] Creating Classes, Sections & Subjects...');
    const class7 = await Class.create({
      schoolId: school._id,
      academicYearId: academicYear._id,
      name: 'Class 7',
      code: 'C7',
    });
    const class8 = await Class.create({
      schoolId: school._id,
      academicYearId: academicYear._id,
      name: 'Class 8',
      code: 'C8',
    });

    const sec7A = await Section.create({ schoolId: school._id, classId: class7._id, name: 'Section A', roomNo: 'Room 201' });
    const sec7B = await Section.create({ schoolId: school._id, classId: class7._id, name: 'Section B', roomNo: 'Room 202' });

    // Users & Profiles
    console.log('[Seed] Creating Admin Accounts...');

    const principalUser = await User.create({
      schoolId: school._id,
      username: 'principal',
      email: 'principal@school.com',
      password: 'Admin@123',
      role: 'admin',
    });

    console.log('[Seed] Creating Teachers...');
    const teacher1 = await Teacher.create({
      schoolId: school._id,
      employeeId: 'TCH-101',
      name: 'Prof. Robert Langdon',
      email: 'teacher@school.com',
      phone: '+1 555-0144',
      address: '45 Harvard Sq, Boston',
      qualification: 'Ph.D. in Mathematics & Physics',
      experience: '12 Years',
      assignedClasses: [class7._id, class8._id],
    });

    const teacherUser = await User.create({
      schoolId: school._id,
      username: 'robert.langdon',
      email: 'teacher@school.com',
      password: 'Teacher@123',
      role: 'teacher',
      profileId: teacher1._id,
      profileModel: 'Teacher',
    });
    teacher1.userId = teacherUser._id;
    await teacher1.save();

    class7.classTeacher = teacher1._id;
    await class7.save();

    const mathSub = await Subject.create({
      schoolId: school._id,
      classId: class7._id,
      name: 'Mathematics',
      code: 'MATH-7',
      type: 'theory',
      teacherId: teacher1._id,
    });

    const scienceSub = await Subject.create({
      schoolId: school._id,
      classId: class7._id,
      name: 'Science & Physics',
      code: 'SCI-7',
      type: 'both',
      teacherId: teacher1._id,
    });

    const englishSub = await Subject.create({
      schoolId: school._id,
      classId: class7._id,
      name: 'English Literature',
      code: 'ENG-7',
      type: 'theory',
      teacherId: teacher1._id,
    });

    teacher1.subjects = [mathSub._id, scienceSub._id, englishSub._id];
    await teacher1.save();

    await TeacherAssignment.create({
      schoolId: school._id,
      teacherId: teacher1._id,
      classId: class7._id,
      sectionId: sec7A._id,
      subjectId: mathSub._id,
      academicYearId: academicYear._id,
    });
    await TeacherAssignment.create({
      schoolId: school._id,
      teacherId: teacher1._id,
      classId: class7._id,
      sectionId: sec7A._id,
      subjectId: scienceSub._id,
      academicYearId: academicYear._id,
    });

    console.log('[Seed] Creating Staff Accounts...');
    const librarianStaff = await Staff.create({
      schoolId: school._id,
      employeeId: 'STF-201',
      name: 'Sarah Connor',
      role: 'librarian',
      email: 'librarian@school.com',
      phone: '+1 555-0177',
      designation: 'Head Librarian',
    });
    const librarianUser = await User.create({
      schoolId: school._id,
      username: 'librarian',
      email: 'librarian@school.com',
      password: 'Librarian@123',
      role: 'staff',
      profileId: librarianStaff._id,
      profileModel: 'Staff',
    });
    librarianStaff.userId = librarianUser._id;
    await librarianStaff.save();

    console.log('[Seed] Creating Students...');

    const studentUser = await User.create({
      schoolId: school._id,
      username: 'alex.pendelton',
      email: 'student@school.com',
      password: 'Student@123',
      role: 'student',
      mustChangePassword: true,
    });

    const student1 = await Student.create({
      schoolId: school._id,
      userId: studentUser._id,
      admissionNumber: 'ADM-2026-001',
      studentId: 'STU-1001',
      firstName: 'Alex',
      lastName: 'Pendelton',
      dob: new Date('2013-05-14'),
      gender: 'male',
      bloodGroup: 'A+',
      email: 'student@school.com',
      phone: '+1 555-0111',
      address: '742 Evergreen Terrace',
      city: 'Metropolis',
      state: 'New York',
      pincode: '10001',
      academicYearId: academicYear._id,
      classId: class7._id,
      sectionId: sec7A._id,
      rollNumber: 1,

      emergencyContact: '+1 555-0199',
      notes: 'Keen interest in Science & Robotics',
    });

    studentUser.profileId = student1._id;
    studentUser.profileModel = 'Student';
    await studentUser.save();



    // Additional Student 2
    const student2 = await Student.create({
      schoolId: school._id,
      admissionNumber: 'ADM-2026-002',
      studentId: 'STU-1002',
      firstName: 'Emma',
      lastName: 'Watson',
      dob: new Date('2013-08-20'),
      gender: 'female',
      bloodGroup: 'O+',
      email: 'emma.w@school.com',
      phone: '+1 555-0222',
      address: '12 Baker Street',
      city: 'Metropolis',
      state: 'New York',
      pincode: '10001',
      academicYearId: academicYear._id,
      classId: class7._id,
      sectionId: sec7A._id,
      rollNumber: 2,

      emergencyContact: '+1 555-0222',
    });

    console.log('[Seed] Generating Attendance Data...');
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    await Attendance.create({
      schoolId: school._id,
      academicYearId: academicYear._id,
      classId: class7._id,
      sectionId: sec7A._id,
      date: today,
      markedBy: teacherUser._id,
      records: [
        { studentId: student1._id, status: 'present', remark: 'On time' },
        { studentId: student2._id, status: 'present', remark: 'On time' },
      ],
    });

    console.log('[Seed] Generating Timetable...');
    await Timetable.create({
      schoolId: school._id,
      academicYearId: academicYear._id,
      classId: class7._id,
      sectionId: sec7A._id,
      slots: [
        { day: 'Monday', periodNumber: 1, startTime: '09:00 AM', endTime: '09:45 AM', subjectId: mathSub._id, teacherId: teacher1._id, classroom: 'Room 201' },
        { day: 'Monday', periodNumber: 2, startTime: '09:45 AM', endTime: '10:30 AM', subjectId: scienceSub._id, teacherId: teacher1._id, classroom: 'Lab 1' },
        { day: 'Tuesday', periodNumber: 1, startTime: '09:00 AM', endTime: '09:45 AM', subjectId: englishSub._id, teacherId: teacher1._id, classroom: 'Room 201' },
      ],
    });

    console.log('[Seed] Generating Examinations & Results...');
    const exam = await Examination.create({
      schoolId: school._id,
      academicYearId: academicYear._id,
      name: 'Mid-Term Examination 2026',
      term: 'Term 1',
      startDate: new Date('2026-09-10'),
      endDate: new Date('2026-09-20'),
      status: 'published',
    });

    await ExamSubject.create({
      schoolId: school._id,
      examinationId: exam._id,
      classId: class7._id,
      subjectId: mathSub._id,
      examDate: new Date('2026-09-10'),
      maxMarks: 100,
      passMarks: 40,
    });

    await Result.create({
      schoolId: school._id,
      examinationId: exam._id,
      classId: class7._id,
      sectionId: sec7A._id,
      studentId: student1._id,
      marks: [
        { subjectId: mathSub._id, marksObtained: 95, maxMarks: 100, passMarks: 40, grade: 'A+', isPass: true },
        { subjectId: scienceSub._id, marksObtained: 92, maxMarks: 100, passMarks: 40, grade: 'A+', isPass: true },
        { subjectId: englishSub._id, marksObtained: 88, maxMarks: 100, passMarks: 40, grade: 'A', isPass: true },
      ],
      totalMarks: 275,
      maxTotalMarks: 300,
      percentage: 91.67,
      gpa: 3.8,
      rank: 1,
      status: 'pass',
      remarks: 'Outstanding performance',
    });

    console.log('[Seed] Generating Homework...');
    await Homework.create({
      schoolId: school._id,
      academicYearId: academicYear._id,
      classId: class7._id,
      sectionId: sec7A._id,
      subjectId: mathSub._id,
      teacherId: teacher1._id,
      title: 'Algebraic Expressions & Linear Equations Worksheet',
      description: 'Complete problems 1 to 25 from Chapter 4 in workbook.',
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      attachments: [{ name: 'Worksheet_Ch4.pdf', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' }],
      submissions: [
        {
          studentId: student1._id,
          submissionDate: new Date(),
          content: 'Completed all 25 problems on notebook.',
          fileUrl: '',
          status: 'submitted',
        },
      ],
    });

    console.log('[Seed] Generating Fees & Payments...');
    const feeStructure = await FeeStructure.create({
      schoolId: school._id,
      academicYearId: academicYear._id,
      classId: class7._id,
      title: 'Class 7 Annual Academic & Facility Fee 2026',
      feeComponents: [
        { name: 'Tuition Fee', amount: 2500, type: 'tuition' },
        { name: 'Laboratory & Library Fee', amount: 400, type: 'lab' },
        { name: 'Sports & Technology Fee', amount: 300, type: 'other' },
      ],
      totalAmount: 3200,
      dueDate: new Date('2026-10-31'),
    });

    const studentFee = await StudentFee.create({
      schoolId: school._id,
      studentId: student1._id,
      feeStructureId: feeStructure._id,
      academicYearId: academicYear._id,
      discountAmount: 200,
      netAmount: 3000,
      paidAmount: 1500,
      balanceAmount: 1500,
      status: 'partial',
      dueDate: new Date('2026-10-31'),
    });

    await Payment.create({
      schoolId: school._id,
      studentFeeId: studentFee._id,
      studentId: student1._id,
      receiptNo: 'REC-994821',
      amountPaid: 1500,
      paymentMethod: 'online',
      paymentDate: new Date(),
      status: 'success',
      remarks: 'First installment paid online',
      recordedBy: principalUser._id,
    });

    console.log('[Seed] Generating Admissions...');
    await Admission.create({
      schoolId: school._id,
      applicationNo: 'APP-2026-901',
      studentFirstName: 'Oliver',
      studentLastName: 'Twist',
      dob: new Date('2014-02-10'),
      gender: 'male',
      targetClassId: class7._id,
      parentName: 'Charles Dickens',
      parentEmail: 'charles.dickens@example.com',
      parentPhone: '+1 555-0333',
      address: '44 Victorian Street',
      status: 'under_review',
      remarks: 'Transcripts verified',
    });

    console.log('[Seed] Generating Notices & Events...');
    await Notice.create({
      schoolId: school._id,
      title: 'Annual Sports Day Announcement 2026',
      content: 'The Annual Sports Day will take place on November 15th. All students must register with physical education instructors.',
      targetAudience: 'everyone',
      priority: 'high',
      isPinned: true,
      createdBy: principalUser._id,
    });

    await Event.create({
      schoolId: school._id,
      title: 'Parent-Teacher Conference',
      description: 'Quarter 1 progress review meeting with parents.',
      category: 'meeting',
      startDate: new Date('2026-09-25'),
      endDate: new Date('2026-09-25'),
      isAllDay: true,
      location: 'Main Auditorium',
    });

    console.log('[Seed] Generating Library Books...');
    const book1 = await Book.create({
      schoolId: school._id,
      isbn: '978-0131103627',
      title: 'The C Programming Language',
      author: 'Brian W. Kernighan, Dennis M. Ritchie',
      category: 'Computer Science',
      publisher: 'Prentice Hall',
      totalCopies: 10,
      availableCopies: 9,
      rackNo: 'CS-01',
    });

    await BookIssue.create({
      schoolId: school._id,
      bookId: book1._id,
      borrowerId: studentUser._id,
      borrowerType: 'student',
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      status: 'issued',
    });

    console.log('[Seed] Generating Transport Routes...');
    const vehicle = await Vehicle.create({
      schoolId: school._id,
      vehicleNumber: 'BUS-104',
      vehicleModel: 'Mercedes-Benz Sprinter Bus',
      capacity: 45,
      driverName: 'John Doe',
      driverPhone: '+1 555-0999',
    });

    await Route.create({
      schoolId: school._id,
      routeName: 'Metropolis East Route 1',
      vehicleId: vehicle._id,
      startPoint: 'East Station',
      endPoint: 'Greenwood Campus',
      stops: [
        { stopName: '742 Evergreen Terrace', pickupTime: '07:30 AM', dropTime: '03:45 PM', fare: 50 },
        { stopName: 'Baker Street Corner', pickupTime: '07:45 AM', dropTime: '03:30 PM', fare: 50 },
      ],
      assignedStudents: [student1._id],
    });

    console.log('[Seed] Generating Initial Audit Logs...');
    await AuditLog.create({
      schoolId: school._id,
      userId: principalUser._id,
      userName: principalUser.username,
      userRole: principalUser.role,
      action: 'SYSTEM_INITIALIZED',
      entity: 'School',
      entityId: school._id.toString(),
      metadata: { note: 'Database seeded with default demo datasets' },
    });

    console.log('----------------------------------------------------');
    console.log('✅ DATABASE SEED COMPLETED SUCCESSFULLY!');
    console.log('----------------------------------------------------');
    console.log('Demo Credentials for Testing:');
    console.log('----------------------------------------------------');
    console.log('1. Principal:    principal@school.com    / Admin@123');
    console.log('2. Teacher:      teacher@school.com      / Teacher@123');
    console.log('3. Student:      student@school.com      / Student@123');
    console.log('----------------------------------------------------');

    process.exit(0);
  } catch (error) {
    console.error('[Seed Error]:', error);
    process.exit(1);
  }
};

seed();
