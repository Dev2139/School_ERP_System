const School = require('../models/School');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const Staff = require('../models/Staff');
const User = require('../models/User');

/**
 * Extracts clean, concise short form for school name/code
 * e.g., Greenwood High School -> GHS, Delhi Public School -> DPS
 */
function getSchoolShortForm(school) {
  if (!school) return 'GHS';
  if (school.code) {
    const cleanCode = school.code.replace(/[^A-Za-z]/g, '').toUpperCase();
    if (cleanCode.length >= 2 && cleanCode.length <= 6 && !cleanCode.startsWith('SCH')) {
      return cleanCode;
    }
  }
  if (school.name) {
    const words = school.name.trim().split(/\s+/);
    if (words.length > 1) {
      const initials = words
        .map((w) => w[0])
        .join('')
        .replace(/[^A-Za-z]/g, '')
        .toUpperCase();
      if (initials.length >= 2) return initials;
    }
    const cleanName = school.name.replace(/[^A-Za-z]/g, '').toUpperCase();
    if (cleanName.length >= 2) return cleanName.slice(0, 3);
  }
  return 'GHS';
}

/**
 * Formats entry/joining date or year into 2-digit string
 * e.g., 2026 -> '26'
 */
function getTwoDigitYear(dateOrYear) {
  if (!dateOrYear) {
    return String(new Date().getFullYear()).slice(-2);
  }
  if (typeof dateOrYear === 'number') {
    return String(dateOrYear).slice(-2);
  }
  const dateObj = new Date(dateOrYear);
  if (!isNaN(dateObj.getTime())) {
    return String(dateObj.getFullYear()).slice(-2);
  }
  const yearStr = String(dateOrYear).trim();
  if (yearStr.length >= 4) {
    return yearStr.slice(-2);
  }
  return String(new Date().getFullYear()).slice(-2);
}

/**
 * Auto-generate unique UID for Student:
 * year (last 2 digits) + school short form + sequential number (e.g. 26GHS001)
 */
async function generateStudentUID(schoolId, admissionDate) {
  const school = (await School.findById(schoolId)) || (await School.findOne());
  const schoolShort = getSchoolShortForm(school);
  const yearShort = getTwoDigitYear(admissionDate);

  let count = 0;
  if (schoolId) {
    count = await Student.countDocuments({ schoolId });
  } else {
    count = await Student.countDocuments();
  }

  let seqNumber = count + 1;
  let uid = '';
  let exists = true;

  while (exists) {
    const padded = String(seqNumber).padStart(3, '0');
    uid = `${yearShort}${schoolShort}${padded}`;
    const userDoc = await User.findOne({ username: uid });
    if (!userDoc) {
      exists = false;
    } else {
      seqNumber++;
    }
  }

  return uid;
}

/**
 * Auto-generate unique UID for Teacher / Staff:
 * year (last 2 digits) + school short form + STAFF + sequential number (e.g. 26GHSSTAFF001)
 */
async function generateTeacherUID(schoolId, joiningDate) {
  const school = (await School.findById(schoolId)) || (await School.findOne());
  const schoolShort = getSchoolShortForm(school);
  const yearShort = getTwoDigitYear(joiningDate);

  let teacherCount = 0;
  let staffCount = 0;
  if (schoolId) {
    teacherCount = await Teacher.countDocuments({ schoolId });
    staffCount = await Staff.countDocuments({ schoolId });
  } else {
    teacherCount = await Teacher.countDocuments();
    staffCount = await Staff.countDocuments();
  }

  let seqNumber = teacherCount + staffCount + 1;
  let uid = '';
  let exists = true;

  while (exists) {
    const padded = String(seqNumber).padStart(3, '0');
    uid = `${yearShort}${schoolShort}STAFF${padded}`;
    const userDoc = await User.findOne({ username: uid });
    if (!userDoc) {
      exists = false;
    } else {
      seqNumber++;
    }
  }

  return uid;
}

module.exports = {
  getSchoolShortForm,
  getTwoDigitYear,
  generateStudentUID,
  generateTeacherUID,
};
