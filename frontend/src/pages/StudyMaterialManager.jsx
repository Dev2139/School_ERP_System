import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import Modal from '../components/Modal';
import {
  BookOpen,
  FolderKanban,
  FileText,
  Upload,
  Download,
  Eye,
  Trash2,
  Search,
  ChevronRight,
  User,
  Calendar,
  AlertCircle,
  CheckCircle2,
  FileCheck,
  GraduationCap,
  Plus,
  ArrowLeft,
  X,
} from 'lucide-react';

export default function StudyMaterialManager() {
  const { user } = useAuth();
  const { addToast } = useNotification();

  const isPrincipal = user?.role === 'admin';
  const isTeacher = user?.role === 'teacher';
  const isStudent = user?.role === 'student';

  const [materials, setMaterials] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subjectsList, setSubjectsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Active view states
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClassFilter, setSelectedClassFilter] = useState('');

  // Upload PDF Modal state
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    classId: '',
    sectionId: '',
    subjectId: '',
    title: '',
    chapterTopic: '',
    description: '',
    file: null,
  });

  // PDF Preview Reader Modal state
  const [previewPdf, setPreviewPdf] = useState(null);

  useEffect(() => {
    fetchInitialData();
    fetchMaterials();
  }, []);

  const fetchInitialData = async () => {
    try {
      const classRes = await api.get('/academics/classes');
      if (classRes.data.success) {
        setClasses(classRes.data.data);
      }

      const subjRes = await api.get('/academics/subjects');
      if (subjRes.data.success) {
        setSubjectsList(subjRes.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch classes/subjects:', err);
    }
  };

  const fetchMaterials = async () => {
    setLoading(true);
    try {
      let url = '/study-materials';
      if (selectedClassFilter) {
        url += `?classId=${selectedClassFilter}`;
      }
      const res = await api.get(url);
      if (res.data.success) {
        setMaterials(res.data.data);
      }
    } catch (err) {
      console.error(err);
      addToast('Failed to load study materials', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, [selectedClassFilter]);

  // Group materials into Single Unique Subject Folder per Class + Section + Subject
  const folderMap = {};
  materials.forEach((m) => {
    const className = m.classId?.name || 'Class';
    const sectionName = m.sectionId?.name || '';
    const subjectName = m.subjectId?.name || 'General';
    const classIdStr = m.classId?._id || className;
    const sectionIdStr = m.sectionId?._id || sectionName;
    const subjectIdStr = m.subjectId?._id || subjectName;

    const folderKey = `${classIdStr}_${sectionIdStr}_${subjectIdStr}`;
    const displayFolderName = `${className} ${sectionName} - ${subjectName}`;

    if (!folderMap[folderKey]) {
      folderMap[folderKey] = {
        id: folderKey,
        folderName: displayFolderName,
        className: `${className} ${sectionName}`,
        classId: m.classId?._id || m.classId,
        sectionId: m.sectionId?._id || m.sectionId,
        subjectId: m.subjectId?._id || m.subjectId,
        subjectName,
        subjectCode: m.subjectId?.code || 'SUB',
        teacherName: m.teacherId?.name || 'Faculty',
        materials: [],
      };
    }
    folderMap[folderKey].materials.push(m);
  });

  const foldersList = Object.values(folderMap);

  // File Change Handler with STRICT PDF Validation
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    // Strict PDF check
    const isPdfType = selectedFile.type === 'application/pdf';
    const isPdfName = selectedFile.name.toLowerCase().endsWith('.pdf');

    if (!isPdfType && !isPdfName) {
      addToast('Strict PDF Policy: Only .pdf documents are allowed for Study Materials!', 'error');
      e.target.value = '';
      setUploadForm({ ...uploadForm, file: null });
      return;
    }

    setUploadForm({ ...uploadForm, file: selectedFile });
  };

  // Upload Submission Handler
  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (!uploadForm.classId || !uploadForm.sectionId || !uploadForm.subjectId || !uploadForm.title || !uploadForm.file) {
      addToast('Please fill out all required fields and attach a PDF document', 'error');
      return;
    }

    if (!uploadForm.file.name.toLowerCase().endsWith('.pdf')) {
      addToast('Only .pdf files are allowed!', 'error');
      return;
    }

    setUploading(true);
    try {
      // Convert PDF File to Base64 Data URL
      const reader = new FileReader();
      reader.readAsDataURL(uploadForm.file);
      reader.onload = async () => {
        const base64Url = reader.result;
        const fileSizeMB = (uploadForm.file.size / (1024 * 1024)).toFixed(2) + ' MB';

        const payload = {
          classId: uploadForm.classId,
          sectionId: uploadForm.sectionId,
          subjectId: uploadForm.subjectId,
          title: uploadForm.title,
          chapterTopic: uploadForm.chapterTopic,
          description: uploadForm.description,
          pdfUrl: base64Url,
          fileName: uploadForm.file.name,
          fileSize: fileSizeMB,
        };

        const res = await api.post('/study-materials', payload);
        if (res.data.success) {
          addToast('PDF Study Material uploaded successfully!', 'success');
          setIsUploadModalOpen(false);
          setUploadForm({
            classId: '',
            sectionId: '',
            subjectId: '',
            title: '',
            chapterTopic: '',
            description: '',
            file: null,
          });
          fetchMaterials();
        }
      };
    } catch (err) {
      console.error(err);
      addToast(err.response?.data?.message || 'Failed to upload study material', 'error');
    } finally {
      setUploading(false);
    }
  };

  // Delete Material Handler
  const handleDeleteMaterial = async (id) => {
    if (!window.confirm('Are you sure you want to delete this study material PDF?')) return;
    try {
      const res = await api.delete(`/study-materials/${id}`);
      if (res.data.success) {
        addToast('Study material deleted', 'success');
        fetchMaterials();
        if (selectedFolder) {
          setSelectedFolder((prev) => ({
            ...prev,
            materials: prev.materials.filter((m) => m._id !== id),
          }));
        }
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to delete material', 'error');
    }
  };

  const handleOpenUploadForFolder = (folder) => {
    setUploadForm({
      classId: folder.classId || '',
      sectionId: folder.sectionId || '',
      subjectId: folder.subjectId || '',
      title: '',
      chapterTopic: '',
      description: '',
      file: null,
      isLockedFromFolder: true,
    });
    setIsUploadModalOpen(true);
  };

  const handleOpenGeneralUpload = () => {
    const defaultClass = classes[0];
    const defaultSection = defaultClass?.sections?.[0];
    const defaultSubject = subjectsList[0];

    setUploadForm({
      classId: defaultClass?._id || '',
      sectionId: defaultSection?._id || '',
      subjectId: defaultSubject?._id || '',
      title: '',
      chapterTopic: '',
      description: '',
      file: null,
      isLockedFromFolder: false,
    });
    setIsUploadModalOpen(true);
  };

  const activeClassObj = classes.find((c) => c._id === uploadForm.classId);

  return (
    <div className="space-y-6">
      {/* Top Header Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl border border-indigo-100 shadow-xs">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black text-slate-900 uppercase tracking-tight">
                  {isStudent ? 'MY STUDY MATERIALS' : 'STUDY MATERIAL LIBRARY'}
                </h1>
                <span className="px-2.5 py-0.5 bg-rose-50 text-rose-600 text-[10px] font-bold rounded-md border border-rose-200 uppercase tracking-wider">
                  PDF Documents Only
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {isStudent && 'Access curriculum PDF notes, solved question banks, and chapter modules for your class'}
                {isTeacher && 'Manage and publish subject PDF study materials for your assigned teaching classes'}
                {isPrincipal && 'School-wide repository of PDF notes, chapter guides, and curriculum resources'}
              </p>
            </div>
          </div>

          {/* Action Buttons & Filters */}
          <div className="flex flex-wrap items-center gap-3">
            {isPrincipal && (
              <select
                value={selectedClassFilter}
                onChange={(e) => setSelectedClassFilter(e.target.value)}
                className="px-3.5 py-2 border rounded-xl text-xs font-bold bg-white text-slate-800 focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                <option value="">All School Classes</option>
                {classes.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            )}

            {!isStudent && (
              <button
                onClick={handleOpenGeneralUpload}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl text-xs shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Upload PDF Material</span>
              </button>
            )}
          </div>
        </div>

        {/* Search Bar & Breadcrumbs */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {selectedFolder ? (
            <button
              onClick={() => setSelectedFolder(null)}
              className="flex items-center gap-1.5 text-xs font-black text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Subject Folders</span>
            </button>
          ) : (
            <div className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
              <FolderKanban className="w-4 h-4 text-indigo-500" />
              <span>Subject Folders Directory ({foldersList.length} Active Folders)</span>
            </div>
          )}

          {/* Search Bar Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search PDF study notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 border rounded-xl text-xs font-semibold bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {loading ? (
        <div className="bg-white rounded-3xl border p-12 text-center text-slate-400 font-extrabold text-sm">
          Loading PDF study materials...
        </div>
      ) : selectedFolder ? (
        /* FOLDER CONTENTS VIEW */
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white rounded-3xl p-6 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/10 rounded-2xl border border-white/20">
                <BookOpen className="w-6 h-6 text-indigo-300" />
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-300">SUBJECT FOLDER</div>
                <h2 className="text-lg font-black">{selectedFolder.folderName}</h2>
                <div className="text-xs text-indigo-200 font-semibold mt-0.5">
                  Assigned Faculty: {selectedFolder.teacherName} • {selectedFolder.materials.length} PDF Material(s)
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {!isStudent && (
                <button
                  onClick={() => handleOpenUploadForFolder(selectedFolder)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-xs font-bold shadow-md shadow-indigo-600/30 transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add PDF to this Folder</span>
                </button>
              )}
              <span className="px-3 py-2 bg-rose-500 text-white rounded-xl text-xs font-black shadow-xs">
                PDF Documents Only
              </span>
            </div>
          </div>

          {/* PDF Materials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {selectedFolder.materials
              .filter(
                (m) =>
                  m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  m.chapterTopic.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <span className="px-2.5 py-1 bg-rose-50 text-rose-600 border border-rose-200 text-[10px] font-black rounded-lg uppercase tracking-wider flex items-center gap-1">
                        <FileText className="w-3.0 h-3.0" /> PDF Note
                      </span>
                      <span className="text-[10px] font-mono font-bold text-slate-400">{item.fileSize}</span>
                    </div>

                    <div>
                      <h3 className="font-extrabold text-sm text-slate-900 leading-snug line-clamp-2">{item.title}</h3>
                      {item.chapterTopic && (
                        <span className="inline-block px-2 py-0.5 bg-slate-100 text-slate-600 font-bold text-[10px] rounded-md mt-1">
                          Topic: {item.chapterTopic}
                        </span>
                      )}
                    </div>

                    {item.description && (
                      <p className="text-xs text-slate-500 line-clamp-2 font-medium leading-relaxed">{item.description}</p>
                    )}
                  </div>

                  <div className="space-y-3 pt-3 border-t border-slate-100">
                    <div className="flex items-center justify-between text-[10px] text-slate-500 font-medium">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3 text-slate-400" />
                        <span>{item.teacherId?.name || 'Faculty'}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setPreviewPdf(item)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded-xl text-xs transition-all"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Read PDF</span>
                      </button>

                      <a
                        href={item.pdfUrl}
                        download={item.fileName}
                        className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-all"
                        title="Download PDF File"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </a>

                      {(isPrincipal || item.teacherId?._id === user?.profileId) && (
                        <button
                          onClick={() => handleDeleteMaterial(item._id)}
                          className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold rounded-xl text-xs transition-all"
                          title="Delete PDF Material"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ) : (
        /* SUBJECT FOLDERS DIRECTORY VIEW */
        <div className="space-y-4">
          {foldersList.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
              <FolderKanban className="w-12 h-12 text-slate-300 mx-auto" />
              <div className="font-extrabold text-slate-700 text-base">No Study Material Folders Found</div>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                {isStudent
                  ? 'No PDF study materials have been uploaded for your class subjects yet.'
                  : 'Click "Upload PDF Material" above to create subject folders and publish PDF notes for students.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {foldersList
                .filter(
                  (f) =>
                    f.folderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    f.subjectName.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((folder) => (
                  <div
                    key={folder.id}
                    onClick={() => setSelectedFolder(folder)}
                    className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:shadow-lg hover:border-indigo-300 transition-all cursor-pointer group space-y-4 relative overflow-hidden"
                  >
                    {/* Top Accent Strip */}
                    <div className="h-1.5 w-full bg-gradient-to-r from-indigo-500 to-sky-400 absolute top-0 left-0" />

                    <div className="flex items-start justify-between gap-3 pt-1">
                      <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl border border-indigo-100 group-hover:scale-105 transition-transform">
                        <FolderKanban className="w-6 h-6" />
                      </div>
                      <span className="px-2.5 py-1 bg-slate-100 group-hover:bg-indigo-50 group-hover:text-indigo-700 text-slate-700 font-extrabold text-xs rounded-xl transition-colors">
                        {folder.materials.length} PDF Note(s)
                      </span>
                    </div>

                    <div>
                      <div className="text-[10px] font-black uppercase text-indigo-500 tracking-wider">
                        {folder.className}
                      </div>
                      <h3 className="text-base font-black text-slate-900 group-hover:text-indigo-600 transition-colors mt-0.5">
                        {folder.subjectName}
                      </h3>
                      <div className="text-xs font-medium text-slate-500 mt-1 flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        <span>Faculty: {folder.teacherName}</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600">
                      <span>Open Subject Folder</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}

      {/* UPLOAD PDF STUDY MATERIAL MODAL */}
      {isUploadModalOpen && (
        <Modal
          isOpen={isUploadModalOpen}
          onClose={() => setIsUploadModalOpen(false)}
          title="Upload PDF Study Material"
        >
          <form onSubmit={handleUploadSubmit} className="space-y-4">
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl text-xs font-semibold text-rose-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>Strict Policy: Only PDF documents (.pdf) can be uploaded as study materials.</span>
            </div>

            {uploadForm.isLockedFromFolder ? (
              <div className="p-3.5 bg-indigo-50 border-2 border-indigo-200 rounded-2xl flex items-center justify-between shadow-xs">
                <div>
                  <div className="text-[10px] font-extrabold uppercase text-indigo-500 tracking-wider">
                    Target Subject Folder
                  </div>
                  <div className="text-sm font-black text-indigo-900 mt-0.5">
                    {selectedFolder?.folderName || 'Selected Subject Folder'}
                  </div>
                  <div className="text-[11px] font-semibold text-slate-500 mt-0.5">
                    Class & Subject are pre-selected for this folder.
                  </div>
                </div>
                <span className="px-2.5 py-1 bg-indigo-600 text-white rounded-lg text-[10px] font-extrabold uppercase tracking-tight shadow-xs">
                  Pre-Selected
                </span>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Target Class</label>
                    <select
                      required
                      value={uploadForm.classId}
                      onChange={(e) => {
                        const cls = classes.find((c) => c._id === e.target.value);
                        setUploadForm({
                          ...uploadForm,
                          classId: e.target.value,
                          sectionId: cls?.sections?.[0]?._id || '',
                        });
                      }}
                      className="w-full px-3 py-2 border rounded-xl text-sm font-semibold bg-white focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                    >
                      <option value="">Select Class</option>
                      {classes.map((c) => (
                        <option key={c._id} value={c._id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Target Section</label>
                    <select
                      required
                      value={uploadForm.sectionId}
                      onChange={(e) => setUploadForm({ ...uploadForm, sectionId: e.target.value })}
                      className="w-full px-3 py-2 border rounded-xl text-sm font-semibold bg-white focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                    >
                      <option value="">Select Section</option>
                      {activeClassObj?.sections?.map((s) => (
                        <option key={s._id} value={s._id}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                    Subject {isTeacher && '(Only Your Assigned Subjects)'}
                  </label>
                  <select
                    required
                    value={uploadForm.subjectId}
                    onChange={(e) => setUploadForm({ ...uploadForm, subjectId: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl text-sm font-semibold bg-white focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                  >
                    <option value="">Select Subject</option>
                    {subjectsList.map((s) => (
                      <option key={s._id} value={s._id}>
                        {s.name} ({s.code || 'SUB'})
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Material Title</label>
              <input
                type="text"
                required
                value={uploadForm.title}
                onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                placeholder="e.g. Chapter 4: Quadratic Equations Lecture Notes"
                className="w-full px-3 py-2 border rounded-xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Chapter / Topic</label>
                <input
                  type="text"
                  value={uploadForm.chapterTopic}
                  onChange={(e) => setUploadForm({ ...uploadForm, chapterTopic: e.target.value })}
                  placeholder="e.g. Algebra & Polynomials"
                  className="w-full px-3 py-2 border rounded-xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Select PDF File (.pdf)</label>
                <input
                  type="file"
                  required
                  accept="application/pdf,.pdf"
                  onChange={handleFileChange}
                  className="w-full text-xs text-slate-600 file:mr-2 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Description / Notes</label>
              <textarea
                rows={3}
                value={uploadForm.description}
                onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })}
                placeholder="Add brief details about what this PDF study material covers..."
                className="w-full px-3 py-2 border rounded-xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t">
              <button
                type="button"
                onClick={() => setIsUploadModalOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={uploading}
                className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shadow-md shadow-indigo-600/20 transition-all disabled:opacity-50"
              >
                <Upload className="w-4 h-4" />
                <span>{uploading ? 'Uploading PDF...' : 'Publish PDF Material'}</span>
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* PDF READER PREVIEW MODAL */}
      {previewPdf && (
        <Modal
          isOpen={!!previewPdf}
          onClose={() => setPreviewPdf(null)}
          title={`PDF Reader: ${previewPdf.title}`}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-slate-100 p-3 rounded-2xl text-xs font-bold text-slate-700">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-rose-600" />
                <span>{previewPdf.fileName}</span>
                <span className="text-[10px] text-slate-400">({previewPdf.fileSize})</span>
              </div>
              <a
                href={previewPdf.pdfUrl}
                download={previewPdf.fileName}
                className="px-3 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-xs hover:bg-indigo-700"
              >
                <Download className="w-3.5 h-3.5" /> Download PDF
              </a>
            </div>

            {/* Embedded PDF Viewer Frame */}
            <div className="w-full h-[450px] bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center">
              <object
                data={previewPdf.pdfUrl}
                type="application/pdf"
                className="w-full h-full"
              >
                <div className="p-8 text-center text-white space-y-3">
                  <FileText className="w-12 h-12 text-rose-400 mx-auto" />
                  <div className="font-extrabold text-base">PDF Document Ready</div>
                  <p className="text-xs text-slate-300">Your browser does not support embedded PDF previewing.</p>
                  <a
                    href={previewPdf.pdfUrl}
                    download={previewPdf.fileName}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white font-bold rounded-xl text-xs"
                  >
                    <Download className="w-4 h-4" /> Download PDF File
                  </a>
                </div>
              </object>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
