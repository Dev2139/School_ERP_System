import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useNotification } from '../context/NotificationContext';
import {
  BookOpen,
  Plus,
  Trash2,
  Layers,
  User,
  X,
  Check,
  School,
  ArrowLeft,
  ChevronRight,
  UserCheck,
  Sparkles,
  Edit3,
  ShieldCheck,
} from 'lucide-react';
import Modal from '../components/Modal';

export default function AcademicList() {
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useNotification();

  // Navigation Drilldown state:
  // selectedClassId: null -> Level 1 (All Classes Grid)
  // selectedClassId: '...' & selectedSectionId: null -> Level 2 (Class Sections Grid)
  // selectedClassId: '...' & selectedSectionId: '...' -> Level 3 (Section Details: Class Teacher & Subjects)
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [selectedSectionId, setSelectedSectionId] = useState(null);

  // Modals state
  const [isClassModalOpen, setIsClassModalOpen] = useState(false);
  const [isSectionModalOpen, setIsSectionModalOpen] = useState(false);
  const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false);

  // Form states
  const [newClassName, setNewClassName] = useState('');
  const [newClassCode, setNewClassCode] = useState('');

  const [sectionName, setSectionName] = useState('');
  const [sectionRoomNo, setSectionRoomNo] = useState('');
  const [sectionClassTeacher, setSectionClassTeacher] = useState('');

  const [subjectName, setSubjectName] = useState('');
  const [subjectCode, setSubjectCode] = useState('');
  const [subjectTeacherId, setSubjectTeacherId] = useState('');

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const classRes = await api.get('/academics/classes');
      if (classRes.data.success) {
        setClasses(classRes.data.data);
      }

      const teacherRes = await api.get('/teachers');
      if (teacherRes.data.success) {
        setTeachers(teacherRes.data.data);
      }
    } catch (err) {
      console.error(err);
      addToast('Failed to load academic setup data', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Active object references
  const selectedClass = classes.find((c) => c._id === selectedClassId);
  const selectedSection = selectedClass?.sections?.find((s) => s._id === selectedSectionId);

  // Create New Class Handler
  const handleCreateClass = async (e) => {
    e.preventDefault();
    if (!newClassName.trim()) return;

    setSubmitting(true);
    try {
      const res = await api.post('/academics/classes', {
        name: newClassName.trim(),
        code: newClassCode.trim() || `C${classes.length + 1}`,
      });
      if (res.data.success) {
        addToast(`Class ${newClassName} created successfully!`, 'success');
        setIsClassModalOpen(false);
        setNewClassName('');
        setNewClassCode('');
        fetchData();
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to create class', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  // Delete Class Handler
  const handleDeleteClass = async (classId, className, e) => {
    if (e) e.stopPropagation();
    if (!window.confirm(`Are you sure you want to delete ${className}? This will remove associated sections and subjects.`)) return;
    try {
      const res = await api.delete(`/academics/classes/${classId}`);
      if (res.data.success) {
        addToast(`${className} deleted`, 'success');
        if (selectedClassId === classId) {
          setSelectedClassId(null);
          setSelectedSectionId(null);
        }
        fetchData();
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to delete class', 'error');
    }
  };

  // Open Section Modal
  const handleOpenSectionModal = () => {
    if (!selectedClass) return;
    setSectionName(`Section ${String.fromCharCode(65 + (selectedClass.sections?.length || 0))}`);
    setSectionRoomNo(`Room ${101 + (selectedClass.sections?.length || 0)}`);
    setSectionClassTeacher(teachers[0]?._id || '');
    setIsSectionModalOpen(true);
  };

  // Create Section Handler
  const handleCreateSection = async (e) => {
    e.preventDefault();
    if (!selectedClass || !sectionName.trim()) return;

    setSubmitting(true);
    try {
      const res = await api.post('/academics/sections', {
        classId: selectedClass._id,
        name: sectionName.trim(),
        roomNo: sectionRoomNo.trim() || 'Room 101',
        classTeacher: sectionClassTeacher || undefined,
      });
      if (res.data.success) {
        addToast(`${sectionName} added to ${selectedClass.name}!`, 'success');
        setIsSectionModalOpen(false);
        setSectionName('');
        setSectionRoomNo('');
        setSectionClassTeacher('');
        fetchData();
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to add section', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  // Delete Section Handler
  const handleDeleteSection = async (sectionId, secName, e) => {
    if (e) e.stopPropagation();
    if (!window.confirm(`Remove ${secName}?`)) return;
    try {
      const res = await api.delete(`/academics/sections/${sectionId}`);
      if (res.data.success) {
        addToast(`${secName} removed`, 'success');
        if (selectedSectionId === sectionId) {
          setSelectedSectionId(null);
        }
        fetchData();
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to delete section', 'error');
    }
  };

  // Update Section Class Teacher Handler
  const handleUpdateSectionClassTeacher = async (sectionId, teacherId) => {
    try {
      const res = await api.put(`/academics/sections/${sectionId}`, {
        classTeacher: teacherId || null,
      });
      if (res.data.success) {
        addToast('Class Teacher assigned to Section!', 'success');
        fetchData();
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to update Class Teacher', 'error');
    }
  };

  // Open Subject Modal
  const handleOpenSubjectModal = () => {
    if (!selectedClass) return;
    setSubjectName('');
    setSubjectCode('');
    setSubjectTeacherId(teachers[0]?._id || '');
    setIsSubjectModalOpen(true);
  };

  // Create Subject Handler
  const handleCreateSubject = async (e) => {
    e.preventDefault();
    if (!selectedClass || !subjectName.trim()) return;

    setSubmitting(true);
    try {
      const res = await api.post('/academics/subjects', {
        classId: selectedClass._id,
        name: subjectName.trim(),
        code: subjectCode.trim() || subjectName.substring(0, 4).toUpperCase(),
        teacherId: subjectTeacherId || undefined,
      });
      if (res.data.success) {
        addToast(`Subject ${subjectName} added to ${selectedClass.name}!`, 'success');
        setIsSubjectModalOpen(false);
        setSubjectName('');
        setSubjectCode('');
        setSubjectTeacherId('');
        fetchData();
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to add subject', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  // Update Subject Teacher Handler
  const handleUpdateSubjectTeacher = async (subjectId, teacherId) => {
    try {
      const res = await api.put(`/academics/subjects/${subjectId}`, {
        teacherId: teacherId || null,
      });
      if (res.data.success) {
        addToast('Subject Teacher assigned!', 'success');
        fetchData();
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to update Subject Teacher', 'error');
    }
  };

  // Delete Subject Handler
  const handleDeleteSubject = async (subjectId, subName) => {
    if (!window.confirm(`Remove subject ${subName}?`)) return;
    try {
      const res = await api.delete(`/academics/subjects/${subjectId}`);
      if (res.data.success) {
        addToast(`Subject ${subName} removed`, 'success');
        fetchData();
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to delete subject', 'error');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Breadcrumbs & Action Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl border border-indigo-100 shadow-xs">
              <School className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-900 uppercase tracking-tight">Academic Structure Setup</h1>
              <p className="text-xs text-slate-500 font-medium">
                Organize Classes → Sections → Class Teachers → Curriculum Subjects
              </p>
            </div>
          </div>

          {/* Action Button depending on level */}
          {!selectedClass ? (
            <button
              onClick={() => setIsClassModalOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl text-xs shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Class</span>
            </button>
          ) : !selectedSection ? (
            <button
              onClick={handleOpenSectionModal}
              className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl text-xs shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Section to {selectedClass.name}</span>
            </button>
          ) : (
            <button
              onClick={handleOpenSubjectModal}
              className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl text-xs shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Subject to {selectedSection.name}</span>
            </button>
          )}
        </div>

        {/* Dynamic Breadcrumbs Bar */}
        <div className="flex items-center gap-2 text-xs font-bold">
          <button
            onClick={() => {
              setSelectedClassId(null);
              setSelectedSectionId(null);
            }}
            className={`flex items-center gap-1 transition-colors ${
              selectedClass ? 'text-indigo-600 hover:underline' : 'text-slate-900 font-black'
            }`}
          >
            <span>All School Classes</span>
          </button>

          {selectedClass && (
            <>
              <ChevronRight className="w-4 h-4 text-slate-400" />
              <button
                onClick={() => setSelectedSectionId(null)}
                className={`transition-colors ${
                  selectedSection ? 'text-indigo-600 hover:underline' : 'text-slate-900 font-black'
                }`}
              >
                <span>{selectedClass.name}</span>
              </button>
            </>
          )}

          {selectedSection && (
            <>
              <ChevronRight className="w-4 h-4 text-slate-400" />
              <span className="text-slate-900 font-black">{selectedSection.name}</span>
            </>
          )}
        </div>
      </div>

      {/* MAIN CONTENT DRILLDOWN AREA */}
      {loading ? (
        <div className="bg-white rounded-3xl border p-12 text-center text-slate-400 font-extrabold text-sm">
          Loading academic directory...
        </div>
      ) : !selectedClass ? (
        /* LEVEL 1: ALL CLASSES GRID */
        <div className="space-y-4">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Select a Class to manage its Sections, Class Teachers, and Subjects ({classes.length} Active Classes)
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.map((cls) => (
              <div
                key={cls._id}
                onClick={() => setSelectedClassId(cls._id)}
                className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:shadow-xl hover:border-indigo-300 transition-all cursor-pointer group space-y-4 relative overflow-hidden"
              >
                <div className="h-1.5 w-full bg-gradient-to-r from-indigo-500 to-sky-400 absolute top-0 left-0" />

                <div className="flex items-start justify-between gap-3 pt-1">
                  <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl border border-indigo-100 group-hover:scale-105 transition-transform">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <button
                    onClick={(e) => handleDeleteClass(cls._id, cls.name, e)}
                    className="p-2 bg-slate-50 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-xl transition-colors cursor-pointer"
                    title="Delete Class"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div>
                  <h3 className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {cls.name}
                  </h3>
                  <div className="text-xs font-mono font-bold text-slate-400 mt-0.5">Code: {cls.code}</div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                  <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-100 text-center">
                    <div className="text-xs font-bold text-slate-400 uppercase text-[10px]">Sections</div>
                    <div className="text-base font-black text-slate-900 mt-0.5">{cls.sections?.length || 0}</div>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-100 text-center">
                    <div className="text-xs font-bold text-slate-400 uppercase text-[10px]">Subjects</div>
                    <div className="text-base font-black text-slate-900 mt-0.5">{cls.subjects?.length || 0}</div>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs font-bold text-indigo-600">
                  <span>Manage Class Sections</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : !selectedSection ? (
        /* LEVEL 2: INSIDE CLASS - SECTIONS GRID */
        <div className="space-y-6">
          {/* Class Header Banner */}
          <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-3xl p-6 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSelectedClassId(null)}
                className="p-2.5 bg-white/10 hover:bg-white/20 rounded-2xl transition-colors cursor-pointer"
                title="Back to All Classes"
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-300">Selected Class</div>
                <h2 className="text-2xl font-black">{selectedClass.name}</h2>
                <div className="text-xs text-slate-300 font-medium mt-0.5">
                  Code: {selectedClass.code} • {selectedClass.sections?.length || 0} Active Section(s) •{' '}
                  {selectedClass.subjects?.length || 0} Subject(s)
                </div>
              </div>
            </div>

            <button
              onClick={handleOpenSectionModal}
              className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl text-xs shadow-md transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Section</span>
            </button>
          </div>

          {/* Sections List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-indigo-500" />
                Sections List for {selectedClass.name}
              </span>
            </div>

            {selectedClass.sections?.length === 0 ? (
              <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
                <Layers className="w-12 h-12 text-slate-300 mx-auto" />
                <div className="font-extrabold text-slate-700 text-base">No Sections Created Yet</div>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Click "+ Add New Section" above to create Section A, Section B, etc. for {selectedClass.name}.
                </p>
                <button
                  onClick={handleOpenSectionModal}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white font-bold rounded-xl text-xs"
                >
                  <Plus className="w-4 h-4" /> Add First Section
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {selectedClass.sections.map((sec) => (
                  <div
                    key={sec._id}
                    onClick={() => setSelectedSectionId(sec._id)}
                    className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:shadow-lg hover:border-indigo-300 transition-all cursor-pointer group space-y-4 relative overflow-hidden"
                  >
                    <div className="h-1.5 w-full bg-gradient-to-r from-sky-400 to-indigo-500 absolute top-0 left-0" />

                    <div className="flex items-start justify-between gap-3 pt-1">
                      <div className="p-3 bg-sky-50 text-sky-600 rounded-2xl border border-sky-100 group-hover:scale-105 transition-transform">
                        <Layers className="w-6 h-6" />
                      </div>
                      <button
                        onClick={(e) => handleDeleteSection(sec._id, sec.name, e)}
                        className="p-2 bg-slate-50 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-xl transition-colors cursor-pointer"
                        title="Delete Section"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div>
                      <h3 className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {sec.name}
                      </h3>
                      <div className="text-xs font-semibold text-slate-400 mt-0.5">{sec.roomNo}</div>
                    </div>

                    {/* Class Teacher Badge */}
                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <UserCheck className="w-4 h-4 text-indigo-600 shrink-0" />
                        <div className="truncate">
                          <div className="text-[10px] font-extrabold uppercase text-slate-400">Class Teacher</div>
                          <div className="font-extrabold text-slate-800 truncate">
                            {sec.classTeacher?.name || 'Unassigned'}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between text-xs font-bold text-indigo-600">
                      <span>Open Section & Subjects</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* LEVEL 3: INSIDE SECTION - CLASS TEACHER & SUBJECTS DETAILS */
        <div className="space-y-6">
          {/* Section Header Card */}
          <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-slate-900 text-white rounded-3xl p-6 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSelectedSectionId(null)}
                className="p-2.5 bg-white/10 hover:bg-white/20 rounded-2xl transition-colors cursor-pointer"
                title="Back to Sections"
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-300">
                  {selectedClass.name} Details
                </div>
                <h2 className="text-2xl font-black">{selectedSection.name}</h2>
                <div className="text-xs text-slate-300 font-medium mt-0.5">
                  Location: {selectedSection.roomNo} • Capacity: {selectedSection.capacity || 40} Students
                </div>
              </div>
            </div>

            {/* CLASS TEACHER ASSIGNMENT SELECTOR */}
            <div className="bg-white/10 p-3.5 rounded-2xl border border-white/20 w-full md:w-80 space-y-1.5">
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-indigo-300 flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5" /> Class Teacher for {selectedSection.name}
              </label>
              <select
                value={selectedSection.classTeacher?._id || selectedSection.classTeacher || ''}
                onChange={(e) => handleUpdateSectionClassTeacher(selectedSection._id, e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-900/90 text-white border border-indigo-400/30 rounded-xl text-xs font-bold focus:ring-2 focus:ring-indigo-400 cursor-pointer"
              >
                <option value="">Select Class Teacher</option>
                {teachers.map((t) => (
                  <option key={t._id} value={t._id}>
                    {t.name} ({t.qualification || 'Faculty'})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* CURRICULUM SUBJECTS SECTION */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
              <div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-indigo-600" />
                  <h3 className="text-base font-black text-slate-900">Curriculum Subjects for {selectedSection.name}</h3>
                </div>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Assign subjects and dedicated subject teachers for this section
                </p>
              </div>

              <button
                onClick={handleOpenSubjectModal}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl text-xs shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Subject to {selectedSection.name}</span>
              </button>
            </div>

            {selectedClass.subjects?.length === 0 ? (
              <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
                <Sparkles className="w-12 h-12 text-slate-300 mx-auto" />
                <div className="font-extrabold text-slate-700 text-base">No Subjects Assigned Yet</div>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Click "+ Add Subject" to configure curriculum subjects and assign teaching faculty.
                </p>
                <button
                  onClick={handleOpenSubjectModal}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white font-bold rounded-xl text-xs"
                >
                  <Plus className="w-4 h-4" /> Add First Subject
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {selectedClass.subjects.map((sub) => (
                  <div
                    key={sub._id}
                    className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 border border-indigo-100 text-[10px] font-black rounded-lg uppercase tracking-wider">
                          Code: {sub.code || 'SUB'}
                        </span>
                        <button
                          onClick={() => handleDeleteSubject(sub._id, sub.name)}
                          className="p-1.5 bg-slate-50 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-xl transition-colors cursor-pointer"
                          title="Remove Subject"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <h4 className="font-black text-base text-slate-900">{sub.name}</h4>
                    </div>

                    {/* Subject Teacher Rendering: Auto-Assigned Badge if teacher exists, Manual Dropdown ONLY if unassigned */}
                    <div className="pt-3 border-t border-slate-100">
                      {sub.teacherId ? (
                        <div className="p-3 bg-indigo-50/80 border border-indigo-100 rounded-2xl flex items-center justify-between shadow-xs">
                          <div className="flex items-center gap-2">
                            <UserCheck className="w-4 h-4 text-indigo-600 shrink-0" />
                            <div>
                              <div className="text-[10px] font-extrabold uppercase text-indigo-400">Assigned Faculty</div>
                              <div className="text-xs font-black text-indigo-950">
                                {sub.teacherId?.name || sub.teacherId}
                              </div>
                            </div>
                          </div>
                          <span className="px-2 py-0.5 bg-indigo-600 text-white rounded-md text-[9px] font-extrabold uppercase tracking-tight">
                            Auto-Assigned
                          </span>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-[10px] font-extrabold uppercase text-amber-600">
                            <span>No Faculty Assigned</span>
                            <span className="text-[9px] bg-amber-100 px-1.5 py-0.5 rounded text-amber-800 font-bold">Manual Assign</span>
                          </div>
                          <select
                            value={sub.teacherId?._id || sub.teacherId || ''}
                            onChange={(e) => handleUpdateSubjectTeacher(sub._id, e.target.value)}
                            className="w-full px-3 py-1.5 border border-amber-200 rounded-xl text-xs font-bold bg-amber-50/50 text-slate-800 focus:ring-2 focus:ring-amber-500 cursor-pointer"
                          >
                            <option value="">Select Teacher to Assign</option>
                            {teachers.map((t) => (
                              <option key={t._id} value={t._id}>
                                {t.name} ({t.qualification || 'Faculty'})
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* CREATE NEW CLASS MODAL */}
      {isClassModalOpen && (
        <Modal isOpen={isClassModalOpen} onClose={() => setIsClassModalOpen(false)} title="Create New Class">
          <form onSubmit={handleCreateClass} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Class Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Class 10"
                value={newClassName}
                onChange={(e) => setNewClassName(e.target.value)}
                className="w-full px-3 py-2 border rounded-xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Class Code</label>
              <input
                type="text"
                required
                placeholder="e.g. C10"
                value={newClassCode}
                onChange={(e) => setNewClassCode(e.target.value)}
                className="w-full px-3 py-2 border rounded-xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t">
              <button
                type="button"
                onClick={() => setIsClassModalOpen(false)}
                className="px-4 py-2 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md shadow-indigo-600/20 transition-all disabled:opacity-50"
              >
                {submitting ? 'Creating Class...' : 'Create Class'}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* ADD SECTION MODAL */}
      {isSectionModalOpen && selectedClass && (
        <Modal
          isOpen={isSectionModalOpen}
          onClose={() => setIsSectionModalOpen(false)}
          title={`Add Section to ${selectedClass.name}`}
        >
          <form onSubmit={handleCreateSection} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Section Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Section A, Section B, Section C"
                value={sectionName}
                onChange={(e) => setSectionName(e.target.value)}
                className="w-full px-3 py-2 border rounded-xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Room Number / Location</label>
              <input
                type="text"
                required
                placeholder="e.g. Room 301"
                value={sectionRoomNo}
                onChange={(e) => setSectionRoomNo(e.target.value)}
                className="w-full px-3 py-2 border rounded-xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Assign Class Teacher</label>
              <select
                value={sectionClassTeacher}
                onChange={(e) => setSectionClassTeacher(e.target.value)}
                className="w-full px-3 py-2 border rounded-xl text-sm font-semibold bg-white focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                <option value="">Unassigned</option>
                {teachers.map((t) => (
                  <option key={t._id} value={t._id}>
                    {t.name} ({t.qualification || 'Faculty'})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t">
              <button
                type="button"
                onClick={() => setIsSectionModalOpen(false)}
                className="px-4 py-2 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md shadow-indigo-600/20 transition-all disabled:opacity-50"
              >
                {submitting ? 'Adding Section...' : 'Add Section'}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* ADD SUBJECT MODAL */}
      {isSubjectModalOpen && selectedClass && (
        <Modal
          isOpen={isSubjectModalOpen}
          onClose={() => setIsSubjectModalOpen(false)}
          title={`Add Subject to ${selectedClass.name}`}
        >
          <form onSubmit={handleCreateSubject} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Subject Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Mathematics, Physics, Chemistry"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
                className="w-full px-3 py-2 border rounded-xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Subject Code</label>
                <input
                  type="text"
                  placeholder="e.g. MATH-8"
                  value={subjectCode}
                  onChange={(e) => setSubjectCode(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Assign Subject Teacher</label>
                <select
                  value={subjectTeacherId}
                  onChange={(e) => setSubjectTeacherId(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl text-sm font-semibold bg-white focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                >
                  <option value="">Unassigned</option>
                  {teachers.map((t) => (
                    <option key={t._id} value={t._id}>
                      {t.name} ({t.qualification || 'Faculty'})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t">
              <button
                type="button"
                onClick={() => setIsSubjectModalOpen(false)}
                className="px-4 py-2 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md shadow-indigo-600/20 transition-all disabled:opacity-50"
              >
                {submitting ? 'Adding Subject...' : 'Add Subject'}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
