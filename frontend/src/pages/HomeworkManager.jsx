import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import {
  BookOpen,
  Plus,
  Calendar,
  FileText,
  Upload,
  CheckCircle2,
  Clock,
  Send,
  Lock,
  Layers,
  UserCheck,
  CheckSquare,
  AlertCircle,
} from 'lucide-react';
import Modal from '../components/Modal';

export default function HomeworkManager() {
  const { user } = useAuth();
  const { addToast } = useNotification();

  const isStudent = user?.role === 'student';
  const isTeacher = user?.role === 'teacher';
  const isPrincipal = ['admin', 'super_admin'].includes(user?.role);
  const canPostHomework = isTeacher || isPrincipal;

  const [homeworkList, setHomeworkList] = useState([]);
  const [classes, setClasses] = useState([]);
  const [teacherSubjects, setTeacherSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modals state
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isViewSubmissionsModalOpen, setIsViewSubmissionsModalOpen] = useState(false);

  const [selectedHomeworkForSubmit, setSelectedHomeworkForSubmit] = useState(null);
  const [selectedHomeworkForSubmissions, setSelectedHomeworkForSubmissions] = useState(null);

  // Post Homework Form State
  const [postForm, setPostForm] = useState({
    title: '',
    description: '',
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    classId: '',
    sectionId: '',
    subjectId: '',
    allowOnlineSubmission: false,
  });

  // Student Submission Form State
  const [submitForm, setSubmitForm] = useState({
    content: '',
    fileUrl: '',
  });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchHomework();
    if (canPostHomework) {
      fetchClassesAndSubjects();
    }
  }, []);

  const fetchClassesAndSubjects = async () => {
    try {
      const classRes = await api.get('/academics/classes');
      if (classRes.data.success && classRes.data.data.length > 0) {
        setClasses(classRes.data.data);
      }

      if (isTeacher) {
        const subjRes = await api.get('/academics/subjects');
        if (subjRes.data.success) {
          setTeacherSubjects(subjRes.data.data);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchHomework = async () => {
    setLoading(true);
    try {
      const res = await api.get('/homework');
      if (res.data.success) {
        setHomeworkList(res.data.data);
      }
    } catch (err) {
      console.error(err);
      addToast('Failed to load homework assignments', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleClassChange = (cId) => {
    const cls = classes.find((c) => c._id === cId);
    setPostForm((prev) => ({
      ...prev,
      classId: cId,
      sectionId: cls?.sections?.[0]?._id || '',
      subjectId: '',
    }));
  };

  // Derive available subjects for post form
  const teacherProfileId = user?.profileId?._id || user?.profileId;
  const selectedClassObj = classes.find((c) => c._id === postForm.classId) || classes[0];

  const allClassSubjects = selectedClassObj?.subjects || [];
  let availableSubjects = allClassSubjects;

  if (isTeacher) {
    const matched = allClassSubjects.filter((sub) => {
      const subTeacherId = sub.teacherId?._id || sub.teacherId;
      const isDirectMatch = subTeacherId && subTeacherId.toString() === teacherProfileId?.toString();
      const isInTeacherList = teacherSubjects.some((ts) => (ts._id || ts).toString() === (sub._id || sub).toString());
      return isDirectMatch || isInTeacherList;
    });
    availableSubjects = matched.length > 0 ? matched : (teacherSubjects.length > 0 ? teacherSubjects : allClassSubjects);
  }

  // Auto-set initial classId, sectionId, subjectId when modal opens or class changes
  useEffect(() => {
    if (classes.length > 0 && !postForm.classId) {
      const firstCls = classes[0];
      setPostForm((prev) => ({
        ...prev,
        classId: firstCls._id,
        sectionId: firstCls.sections?.[0]?._id || '',
      }));
    }
  }, [classes]);

  useEffect(() => {
    if (availableSubjects.length > 0) {
      if (!postForm.subjectId || !availableSubjects.some((s) => s._id === postForm.subjectId)) {
        setPostForm((prev) => ({
          ...prev,
          subjectId: availableSubjects[0]._id,
        }));
      }
    }
  }, [postForm.classId, availableSubjects]);

  const handlePostHomework = async (e) => {
    e.preventDefault();
    const finalSubjectId = postForm.subjectId || (availableSubjects[0]?._id || '');

    if (!postForm.title || !postForm.description || !postForm.classId || !finalSubjectId) {
      addToast('Please fill all required fields and select a valid subject', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const res = await api.post('/homework', {
        ...postForm,
        subjectId: finalSubjectId,
      });

      if (res.data.success) {
        addToast('Homework assignment published successfully!', 'success');
        setIsPostModalOpen(false);
        setPostForm({
          title: '',
          description: '',
          dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          classId: classes[0]?._id || '',
          sectionId: classes[0]?.sections?.[0]?._id || '',
          subjectId: '',
          allowOnlineSubmission: false,
        });
        fetchHomework();
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to publish homework', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleStudentSubmitHomework = async (e) => {
    e.preventDefault();
    if (!selectedHomeworkForSubmit) return;

    setSubmitting(true);
    try {
      const res = await api.post('/homework/submit', {
        homeworkId: selectedHomeworkForSubmit._id,
        content: submitForm.content,
        fileUrl: submitForm.fileUrl,
      });

      if (res.data.success) {
        addToast('Homework submitted successfully to subject teacher!', 'success');
        setIsSubmitModalOpen(false);
        setSelectedHomeworkForSubmit(null);
        setSubmitForm({ content: '', fileUrl: '' });
        fetchHomework();
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to submit homework', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const openStudentSubmitModal = (hw) => {
    setSelectedHomeworkForSubmit(hw);
    const myProfileId = user?.profileId?._id || user?.profileId || user?._id;
    const mySub = hw.submissions?.find((s) => s.studentId === myProfileId || s.studentId?._id === myProfileId);
    setSubmitForm({
      content: mySub?.content || '',
      fileUrl: mySub?.fileUrl || '',
    });
    setIsSubmitModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl border border-indigo-100 shadow-xs">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black text-slate-900 uppercase tracking-tight">
                  {isStudent ? 'MY CLASS HOMEWORK' : 'HOMEWORK & ASSIGNMENT MANAGEMENT'}
                </h1>
                <span className="px-2.5 py-0.5 bg-indigo-50 text-indigo-700 text-[10px] font-bold rounded-md border border-indigo-200 uppercase tracking-wider">
                  {isStudent ? 'Student View' : isTeacher ? 'Faculty Workspace' : 'School Management'}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {isStudent
                  ? 'Track assigned subject tasks, deadlines, and submission requirements for your class'
                  : 'Assign homework for your subjects, control online vs in-class submission options, and review student work'}
              </p>
            </div>
          </div>

          {/* Teacher / Admin Action Button ONLY */}
          {canPostHomework && (
            <button
              onClick={() => setIsPostModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl text-xs shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Post New Homework</span>
            </button>
          )}
        </div>
      </div>

      {/* Homework List Grid */}
      {loading ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center text-slate-400 font-bold text-xs">
          Loading homework assignments...
        </div>
      ) : homeworkList.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
          <CheckSquare className="w-12 h-12 text-slate-300 mx-auto" />
          <div className="font-extrabold text-slate-700 text-base">No Homework Assignments Found</div>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            {isStudent
              ? 'Great job! You have no active homework tasks assigned at this moment.'
              : 'Click "+ Post New Homework" above to create an assignment for your class.'}
          </p>
          {canPostHomework && (
            <button
              onClick={() => setIsPostModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white font-bold rounded-xl text-xs"
            >
              <Plus className="w-4 h-4" /> Assign First Task
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {homeworkList.map((hw) => {
            const myProfileId = user?.profileId?._id || user?.profileId || user?._id;
            const mySub = hw.submissions?.find((s) => s.studentId === myProfileId || s.studentId?._id === myProfileId);
            const isSubmittedByMe = Boolean(mySub);

            return (
              <div
                key={hw._id}
                className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 relative overflow-hidden"
              >
                {/* Accent line based on submission mode */}
                <div
                  className={`h-1.5 w-full absolute top-0 left-0 ${
                    hw.allowOnlineSubmission
                      ? 'bg-gradient-to-r from-emerald-400 to-indigo-600'
                      : 'bg-gradient-to-r from-slate-300 to-slate-400'
                  }`}
                />

                <div className="space-y-3 pt-1">
                  {/* Header info */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 border border-indigo-100 text-[10px] font-black rounded-lg uppercase tracking-wider">
                        {hw.subjectId?.name || 'Subject Task'}
                      </span>
                      {hw.classId?.name && (
                        <span className="px-2.5 py-1 bg-slate-100 text-slate-700 text-[10px] font-bold rounded-lg border border-slate-200">
                          {hw.classId.name} {hw.sectionId?.name ? `- ${hw.sectionId.name}` : ''}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 text-rose-600 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-100 text-[11px] font-bold">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Due: {new Date(hw.dueDate).toLocaleDateString('en-GB')}</span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="font-black text-lg text-slate-900 leading-snug">{hw.title}</h3>
                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed line-clamp-3">{hw.description}</p>
                  </div>

                  {/* Submission Mode Info Badge */}
                  <div className="p-3 rounded-2xl border text-xs flex items-center justify-between gap-2 bg-slate-50 border-slate-200">
                    <div className="flex items-center gap-2">
                      {hw.allowOnlineSubmission ? (
                        <Upload className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <Lock className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                      <div>
                        <div className="text-[10px] font-extrabold uppercase text-slate-400">Submission Mode</div>
                        <div className="font-extrabold text-slate-800">
                          {hw.allowOnlineSubmission ? 'Online Portal Submission Allowed' : 'In-Class Physical Submission Only'}
                        </div>
                      </div>
                    </div>

                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-tight border ${
                        hw.allowOnlineSubmission
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-slate-100 text-slate-600 border-slate-200'
                      }`}
                    >
                      {hw.allowOnlineSubmission ? 'Online Enabled' : 'Physical HW'}
                    </span>
                  </div>
                </div>

                {/* Footer Controls & Student Rights */}
                <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-1.5 text-slate-500 font-semibold text-[11px]">
                    <UserCheck className="w-4 h-4 text-indigo-500" />
                    <span>Faculty: {hw.teacherId?.name || 'Subject Teacher'}</span>
                  </div>

                  {/* STUDENT ACTIONS */}
                  {isStudent && (
                    <div>
                      {hw.allowOnlineSubmission ? (
                        isSubmittedByMe ? (
                          <div className="flex items-center gap-2">
                            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-xl text-xs font-black flex items-center gap-1 border border-emerald-200">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Submitted
                            </span>
                            <button
                              onClick={() => openStudentSubmitModal(hw)}
                              className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors"
                            >
                              Update
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => openStudentSubmitModal(hw)}
                            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-md shadow-emerald-600/20 transition-all flex items-center gap-1.5 cursor-pointer"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>Submit Homework</span>
                          </button>
                        )
                      ) : (
                        <div className="text-[11px] font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-xl border border-slate-200 flex items-center gap-1.5">
                          <Lock className="w-3.5 h-3.5 text-slate-400" />
                          <span>Submit copy in class</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* TEACHER / ADMIN ACTIONS */}
                  {canPostHomework && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedHomeworkForSubmissions(hw);
                          setIsViewSubmissionsModalOpen(true);
                        }}
                        className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded-xl text-xs border border-indigo-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Submissions ({hw.submissions?.length || 0})</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* POST NEW HOMEWORK MODAL (TEACHERS & ADMINS ONLY) */}
      {isPostModalOpen && canPostHomework && (
        <Modal isOpen={isPostModalOpen} onClose={() => setIsPostModalOpen(false)} title="Assign New Homework">
          <form onSubmit={handlePostHomework} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Homework Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. Chapter 4 Trigonometry & Linear Algebra Worksheet"
                value={postForm.title}
                onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
                className="w-full px-3 py-2 border rounded-xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Target Class *</label>
                <select
                  required
                  value={postForm.classId}
                  onChange={(e) => handleClassChange(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl text-xs font-bold bg-white focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                >
                  {classes.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Section *</label>
                <select
                  required
                  value={postForm.sectionId}
                  onChange={(e) => setPostForm({ ...postForm, sectionId: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl text-xs font-bold bg-white focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                >
                  {selectedClassObj?.sections?.map((s) => (
                    <option key={s._id} value={s._id}>
                      {s.name} ({s.roomNo || 'Room'})
                    </option>
                  ))}
                </select>
              </div>

              {/* SUBJECT SELECTION: LOCKED IF 1 ASSIGNED SUBJECT, DROPDOWN IF MULTIPLE */}
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Subject *</label>
                {availableSubjects.length > 1 ? (
                  <select
                    required
                    value={postForm.subjectId}
                    onChange={(e) => setPostForm({ ...postForm, subjectId: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl text-xs font-bold bg-white focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                  >
                    {availableSubjects.map((sub) => (
                      <option key={sub._id} value={sub._id}>
                        {sub.name}
                      </option>
                    ))}
                  </select>
                ) : availableSubjects.length === 1 ? (
                  <div className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs h-[38px]">
                    <span className="font-extrabold text-slate-800 truncate">
                      {availableSubjects[0].name}
                    </span>
                    <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-[10px] font-black rounded-md uppercase border border-indigo-100 shrink-0">
                      Assigned
                    </span>
                  </div>
                ) : (
                  <div className="px-3 py-2 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold rounded-xl h-[38px] flex items-center">
                    No assigned subject
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Instructions / Homework Details *</label>
              <textarea
                rows={3}
                required
                placeholder="Provide detailed instructions for students..."
                value={postForm.description}
                onChange={(e) => setPostForm({ ...postForm, description: e.target.value })}
                className="w-full px-3 py-2 border rounded-xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Submission Due Date *</label>
              <input
                type="date"
                required
                value={postForm.dueDate}
                onChange={(e) => setPostForm({ ...postForm, dueDate: e.target.value })}
                className="w-full px-3 py-2 border rounded-xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* TEACHER TOGGLE FOR ONLINE SUBMISSION */}
            <div className="p-4 bg-indigo-50/60 border border-indigo-200 rounded-2xl space-y-1.5">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={postForm.allowOnlineSubmission}
                  onChange={(e) => setPostForm({ ...postForm, allowOnlineSubmission: e.target.checked })}
                  className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500 cursor-pointer"
                />
                <span className="text-xs font-black text-indigo-950 uppercase tracking-tight">
                  Allow Online Homework Submission
                </span>
              </label>
              <p className="text-[11px] text-indigo-700 font-medium pl-7">
                If enabled, students will see an online submission button on their portal. If disabled, students must submit physical copies in class.
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t">
              <button
                type="button"
                onClick={() => setIsPostModalOpen(false)}
                className="px-4 py-2 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting || availableSubjects.length === 0}
                className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md shadow-indigo-600/20 transition-all disabled:opacity-50 cursor-pointer"
              >
                {submitting ? 'Publishing...' : 'Publish Homework'}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* STUDENT SUBMIT HOMEWORK MODAL */}
      {isSubmitModalOpen && selectedHomeworkForSubmit && (
        <Modal
          isOpen={isSubmitModalOpen}
          onClose={() => setIsSubmitModalOpen(false)}
          title={`Submit Homework: ${selectedHomeworkForSubmit.title}`}
        >
          <form onSubmit={handleStudentSubmitHomework} className="space-y-4">
            <div className="bg-sky-50 border border-sky-200 p-3.5 rounded-2xl text-xs text-sky-800 space-y-1">
              <div className="font-bold uppercase tracking-wider text-sky-900">
                Subject: {selectedHomeworkForSubmit.subjectId?.name || 'Subject'}
              </div>
              <p>Due Date: {new Date(selectedHomeworkForSubmit.dueDate).toLocaleDateString('en-GB')}</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Answer Summary / Submission Notes</label>
              <textarea
                rows={4}
                required
                placeholder="Type your answer, notes, or submission details for the teacher..."
                value={submitForm.content}
                onChange={(e) => setSubmitForm({ ...submitForm, content: e.target.value })}
                className="w-full px-3 py-2 border rounded-xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Attachment File URL (Optional)</label>
              <input
                type="url"
                placeholder="https://drive.google.com/... or file link"
                value={submitForm.fileUrl}
                onChange={(e) => setSubmitForm({ ...submitForm, fileUrl: e.target.value })}
                className="w-full px-3 py-2 border rounded-xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t">
              <button
                type="button"
                onClick={() => setIsSubmitModalOpen(false)}
                className="px-4 py-2 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md shadow-emerald-600/20 transition-all disabled:opacity-50 cursor-pointer"
              >
                {submitting ? 'Submitting...' : 'Submit Work'}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* VIEW SUBMISSIONS MODAL (TEACHERS & ADMINS) */}
      {isViewSubmissionsModalOpen && selectedHomeworkForSubmissions && (
        <Modal
          isOpen={isViewSubmissionsModalOpen}
          onClose={() => setIsViewSubmissionsModalOpen(false)}
          title={`Submissions for ${selectedHomeworkForSubmissions.title}`}
        >
          <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
            <div className="text-xs text-slate-500 font-medium">
              Subject: <strong>{selectedHomeworkForSubmissions.subjectId?.name}</strong> • Total Submissions:{' '}
              {selectedHomeworkForSubmissions.submissions?.length || 0}
            </div>

            {selectedHomeworkForSubmissions.submissions?.length === 0 ? (
              <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 text-slate-400 font-bold text-xs">
                No student submissions received yet for this homework.
              </div>
            ) : (
              <div className="space-y-3">
                {selectedHomeworkForSubmissions.submissions.map((sub, idx) => (
                  <div key={sub._id || idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-slate-800">
                        Student ID: {sub.studentId?.firstName ? `${sub.studentId.firstName} ${sub.studentId.lastName}` : sub.studentId}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 uppercase">
                        {sub.status || 'submitted'}
                      </span>
                    </div>

                    <p className="text-slate-700 font-medium bg-white p-2.5 rounded-xl border border-slate-100">
                      {sub.content || 'No text notes provided'}
                    </p>

                    {sub.fileUrl && (
                      <a
                        href={sub.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-indigo-600 font-bold hover:underline"
                      >
                        View Attached File / Link
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-end pt-2 border-t">
              <button
                type="button"
                onClick={() => setIsViewSubmissionsModalOpen(false)}
                className="px-4 py-2 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
