const User = require('../models/User');
const Staff = require('../models/Staff');
const School = require('../models/School');
const bcrypt = require('bcryptjs');

const seedAccountant = async () => {
  try {
    let school = await School.findOne();
    if (!school) {
      school = await School.create({
        name: 'Greenwood International School',
        code: 'GWIS01',
        address: '123 Education Lane, Academic City',
        phone: '+1 800 555 0199',
        email: 'info@greenwood.edu',
      });
    }

    const email = 'account@school.com';
    let user = await User.findOne({ email });

    let staff = await Staff.findOne({ email });
    if (!staff) {
      staff = await Staff.create({
        schoolId: school._id,
        employeeId: 'ACC-001',
        name: 'Chief Accounts Officer',
        role: 'staff',
        email: email,
        phone: '9876543210',
        designation: 'Chief Accountant',
        joiningDate: new Date('2020-01-01'),
        salaryInfo: { basicSalary: 55000, netSalary: 55000 },
        status: 'active',
      });
    }

    if (!user) {
      user = await User.create({
        schoolId: school._id,
        username: 'Accountant',
        email: email,
        password: '06102006',
        role: 'accountant',
        mustChangePassword: false,
        status: 'active',
        profileId: staff._id,
        profileModel: 'Staff',
      });
      staff.userId = user._id;
      await staff.save();
      console.log('[Seed]: Created accountant user (account@school.com / 06102006)');
    } else {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash('06102006', salt);
      user.role = 'accountant';
      user.mustChangePassword = false;
      user.status = 'active';
      if (!user.profileId) {
        user.profileId = staff._id;
        user.profileModel = 'Staff';
      }
      await user.save();
      console.log('[Seed]: Verified/Updated accountant user credentials (account@school.com / 06102006)');
    }
  } catch (err) {
    console.error('[Seed Error]: Failed to seed accountant user:', err.message);
  }
};

module.exports = seedAccountant;
