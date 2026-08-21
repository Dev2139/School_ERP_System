const StudyMaterial = require('../models/StudyMaterial');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const Class = require('../models/Class');
const Section = require('../models/Section');
const Subject = require('../models/Subject');
const { logAudit } = require('../middleware/auditMiddleware');

exports.getStudyMaterials = async (req, res, next) => {
  try {
    const { classId, sectionId, subjectId } = req.query;
    const query = { schoolId: req.user.schoolId };

    // 1. STUDENT ROLE: Locked strictly to student's enrolled Class & Section
    if (req.user.role === 'student') {
      const studentDoc = await Student.findById(req.user.profileId);
      if (!studentDoc || !studentDoc.classId) {
        return res.status(404).json({ success: false, message: 'Student class not assigned' });
      }
      query.classId = studentDoc.classId;
      query.sectionId = studentDoc.sectionId;

      if (subjectId) {
        query.subjectId = subjectId;
      }
    } 
    // 2. TEACHER ROLE: Teacher can ONLY see study materials uploaded by themselves
    else if (req.user.role === 'teacher') {
      if (req.user.profileId) {
        query.teacherId = req.user.profileId;
      }
      if (classId) query.classId = classId;
      if (sectionId) query.sectionId = sectionId;
      if (subjectId) query.subjectId = subjectId;
    } 
    // 3. ADMIN / PRINCIPAL ROLE: Full access
    else {
      if (classId) query.classId = classId;
      if (sectionId) query.sectionId = sectionId;
      if (subjectId) query.subjectId = subjectId;
    }

    const materials = await StudyMaterial.find(query)
      .populate('classId', 'name')
      .populate('sectionId', 'name')
      .populate('subjectId', 'name code')
      .populate('teacherId', 'name employeeId qualification')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      userRole: req.user.role,
      count: materials.length,
      data: materials,
    });
  } catch (error) {
    next(error);
  }
};

exports.createStudyMaterial = async (req, res, next) => {
  try {
    const { classId, sectionId, subjectId, title, description, chapterTopic, pdfUrl, fileName, fileSize } = req.body;

    if (!classId || !sectionId || !subjectId || !title || !pdfUrl || !fileName) {
      return res.status(400).json({
        success: false,
        message: 'Class, Section, Subject, Title, and PDF File are required.',
      });
    }

    // STRICT PDF VALIDATION CHECK
    const isPdfFileName = fileName.toLowerCase().endsWith('.pdf');
    const isPdfDataUrl = typeof pdfUrl === 'string' && (pdfUrl.startsWith('data:application/pdf') || pdfUrl.toLowerCase().includes('.pdf'));

    if (!isPdfFileName && !isPdfDataUrl) {
      return res.status(400).json({
        success: false,
        message: 'Invalid file format. Only PDF documents (.pdf) are allowed for Study Materials.',
      });
    }

    // Resolve teacher ID and verify assigned subject
    let teacherId = req.user.profileId;

    if (req.user.role === 'teacher') {
      const teacherDoc = await Teacher.findById(req.user.profileId);
      const subjDoc = await Subject.findById(subjectId);
      if (teacherDoc && subjDoc) {
        const subjName = subjDoc.name ? subjDoc.name.toLowerCase() : '';
        const qualString = (teacherDoc.qualification || '').trim().toLowerCase();
        const sTeacherId = subjDoc.teacherId?._id ? subjDoc.teacherId._id.toString() : subjDoc.teacherId ? subjDoc.teacherId.toString() : '';

        const isDirectTeacher = sTeacherId === teacherDoc._id.toString();
        const inSubjectsArray =
          teacherDoc.subjects &&
          teacherDoc.subjects.some(
            (s) => (s._id || s).toString() === subjectId.toString() || (s.name && s.name.toLowerCase() === subjName)
          );
        const hasQualMatch = qualString.length > 0 && (subjName.includes(qualString) || qualString.includes(subjName));

        const isAssigned = isDirectTeacher || inSubjectsArray || hasQualMatch;

        if (!isAssigned) {
          return res.status(403).json({
            success: false,
            message: `You are not assigned to teach ${subjDoc.name}. Study materials can only be uploaded for your assigned subjects.`,
          });
        }
      }
    } else if (req.user.role === 'admin') {
      const subjDoc = await Subject.findById(subjectId);
      if (subjDoc && subjDoc.teacherId) {
        teacherId = subjDoc.teacherId;
      } else {
        const foundTeacher = await Teacher.findOne({ schoolId: req.user.schoolId, subjects: subjectId });
        teacherId = foundTeacher ? foundTeacher._id : req.user.profileId;
      }
    }

    // Lookup names to build Folder Name
    const classDoc = await Class.findById(classId);
    const sectionDoc = await Section.findById(sectionId);
    const subjectDoc = await Subject.findById(subjectId);

    const folderName = `${classDoc?.name || 'Class'} ${sectionDoc?.name || ''} - ${subjectDoc?.name || 'Subject'}`.trim();

    const material = await StudyMaterial.create({
      schoolId: req.user.schoolId,
      classId,
      sectionId,
      subjectId,
      teacherId: teacherId || req.user.profileId,
      folderName,
      title: title.trim(),
      description: description ? description.trim() : '',
      chapterTopic: chapterTopic ? chapterTopic.trim() : '',
      pdfUrl,
      fileName,
      fileSize: fileSize || '1.5 MB',
      uploadedBy: req.user._id,
    });

    const populatedMaterial = await StudyMaterial.findById(material._id)
      .populate('classId', 'name')
      .populate('sectionId', 'name')
      .populate('subjectId', 'name code')
      .populate('teacherId', 'name employeeId');

    await logAudit(req, 'STUDY_MATERIAL_CREATED', 'StudyMaterial', material._id.toString());

    res.status(201).json({
      success: true,
      message: 'PDF Study Material uploaded successfully',
      data: populatedMaterial,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteStudyMaterial = async (req, res, next) => {
  try {
    const { id } = req.params;
    const material = await StudyMaterial.findOne({ _id: id, schoolId: req.user.schoolId });

    if (!material) {
      return res.status(404).json({ success: false, message: 'Study material not found' });
    }

    // Auth check: Admin or Uploader Teacher
    if (req.user.role !== 'admin' && material.teacherId.toString() !== req.user.profileId?.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this study material' });
    }

    await StudyMaterial.findByIdAndDelete(id);
    await logAudit(req, 'STUDY_MATERIAL_DELETED', 'StudyMaterial', id);

    res.status(200).json({ success: true, message: 'Study material deleted successfully' });
  } catch (error) {
    next(error);
  }
};
