const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const Parent = require('../models/Parent');
const Class = require('../models/Class');
const Notice = require('../models/Notice');

exports.globalSearch = async (req, res, next) => {
  try {
    const { query } = req.query;
    if (!query || query.trim().length < 2) {
      return res.status(200).json({ success: true, data: { students: [], teachers: [], parents: [], classes: [], notices: [] } });
    }

    const regex = new RegExp(query, 'i');
    const schoolId = req.user.schoolId;

    const [students, teachers, parents, classes, notices] = await Promise.all([
      Student.find({ schoolId, $or: [{ firstName: regex }, { lastName: regex }, { admissionNumber: regex }] }).limit(5),
      Teacher.find({ schoolId, $or: [{ name: regex }, { employeeId: regex }] }).limit(5),
      Parent.find({ schoolId, $or: [{ name: regex }, { email: regex }, { phone: regex }] }).limit(5),
      Class.find({ schoolId, name: regex }).limit(5),
      Notice.find({ schoolId, title: regex }).limit(5),
    ]);

    res.status(200).json({
      success: true,
      data: {
        students,
        teachers,
        parents,
        classes,
        notices,
      },
    });
  } catch (error) {
    next(error);
  }
};
