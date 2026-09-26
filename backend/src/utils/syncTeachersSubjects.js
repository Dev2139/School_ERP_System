const mongoose = require('mongoose');
require('dotenv').config();
const Teacher = require('../models/Teacher');
const Subject = require('../models/Subject');
const User = require('../models/User');

async function syncTeachersAndSubjects() {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/school_erp';
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(mongoUri);
    }

    // 1. Delete orphan subjects (classId: null)
    const deleteRes = await Subject.deleteMany({ classId: null });
    console.log('Deleted orphan subjects count:', deleteRes.deletedCount);

    // 2. Fetch all teachers
    const teachers = await Teacher.find();
    console.log('Found teachers count:', teachers.length);

    for (const t of teachers) {
      const qual = (t.qualification || '').toLowerCase();
      const tName = (t.name || '').toLowerCase();

      let subjName = '';
      if (qual.includes('math') || tName.includes('manu')) subjName = 'Mathematics';
      else if (qual.includes('hindi') || tName.includes('harshida')) subjName = 'Hindi';
      else if (qual.includes('physics') || tName.includes('mahesh')) subjName = 'Physics';
      else if (qual.includes('chem') || tName.includes('ajit')) subjName = 'Chemistry';
      else if (qual.includes('computer') || tName.includes('alpesh')) subjName = 'Computer Science';

      if (subjName) {
        // Find all class subjects matching subjName
        const matchingSubjects = await Subject.find({ name: new RegExp(`^${subjName}$`, 'i') });
        const matchingIds = matchingSubjects.map(s => s._id);

        if (matchingIds.length > 0) {
          // Update Subject teacherId for all matching subjects across classes
          await Subject.updateMany({ _id: { $in: matchingIds } }, { teacherId: t._id });
          // Store only 1 primary subject ID per teacher (1 teacher = 1 subject)
          t.subjects = [matchingIds[0]];
        } else {
          t.subjects = [];
        }

        t.qualification = subjName;
        await t.save();

        console.log(`Synced teacher ${t.name} (${t.email}) with 1 '${subjName}' subject.`);
      }
    }
  } catch (err) {
    console.error('Error in syncTeachersAndSubjects:', err);
  }
}

if (require.main === module) {
  syncTeachersAndSubjects().then(() => {
    mongoose.disconnect();
    console.log('Sync complete.');
  });
}

module.exports = syncTeachersAndSubjects;
