import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useNotification } from '../context/NotificationContext';
import { Award, Plus, FileText, CheckCircle2, Download } from 'lucide-react';
import Modal from '../components/Modal';

export default function ExamManager() {
  const [exams, setExams] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToast } = useNotification();

  const [examName, setExamName] = useState('');
  const [term, setTerm] = useState('Term 1');

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    setLoading(true);
    try {
      const res = await api.get('/exams');
      if (res.data.success) {
        setExams(res.data.data);
        if (res.data.data.length > 0) {
          fetchResults(res.data.data[0]._id);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchResults = async (examId) => {
    try {
      const res = await api.get(`/exams/results?examinationId=${examId}`);
      if (res.data.success) {
        setResults(res.data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateExam = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/exams', {
        name: examName,
        term,
        startDate: new Date('2026-09-10'),
        endDate: new Date('2026-09-20'),
        academicYearId: '60d0fe4f5311236168a109ca',
      });
      if (res.data.success) {
        addToast('Examination scheduled!', 'success');
        setIsModalOpen(false);
        setExamName('');
        fetchExams();
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to create exam', 'error');
    }
  };

  const downloadReportCard = async (resId, studentName) => {
    try {
      const response = await api.get(`/exams/report-card/${resId}`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `ReportCard_${studentName}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      addToast('Report Card PDF downloaded!', 'success');
    } catch (err) {
      addToast('Failed to download PDF', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Examinations & Gradebook</h1>
          <p className="text-sm text-slate-500">Manage exam terms, marks entry, auto-rank calculation, and report cards</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-xs shadow-md shadow-indigo-600/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Create Examination</span>
        </button>
      </div>

      {/* Exam Term Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {exams.map((ex) => (
          <div
            key={ex._id}
            onClick={() => fetchResults(ex._id)}
            className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-indigo-500 cursor-pointer transition-all flex items-center justify-between"
          >
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">
                {ex.term}
              </span>
              <h3 className="font-extrabold text-slate-800 mt-1">{ex.name}</h3>
              <p className="text-xs text-slate-400 mt-0.5">Status: {ex.status}</p>
            </div>
            <Award className="w-8 h-8 text-indigo-500/40" />
          </div>
        ))}
      </div>

      {/* Results Matrix Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5">
        <h3 className="font-bold text-slate-800 mb-4">Recorded Student Results & Ranks</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-100 uppercase text-[11px] font-bold text-slate-700">
              <tr>
                <th className="p-3">Rank</th>
                <th className="p-3">Student Name</th>
                <th className="p-3">Total Marks</th>
                <th className="p-3">Percentage</th>
                <th className="p-3">GPA</th>
                <th className="p-3">Status</th>
                <th className="p-3">Report Card</th>
              </tr>
            </thead>
            <tbody className="divide-y text-xs font-semibold">
              {results.length > 0 ? (
                results.map((r) => (
                  <tr key={r._id} className="hover:bg-slate-50">
                    <td className="p-3 text-indigo-700 font-extrabold">#{r.rank}</td>
                    <td className="p-3 text-slate-900 font-bold">
                      {r.studentId?.firstName} {r.studentId?.lastName}
                    </td>
                    <td className="p-3">{r.totalMarks} / {r.maxTotalMarks}</td>
                    <td className="p-3">{r.percentage}%</td>
                    <td className="p-3">{r.gpa} / 4.0</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-extrabold ${r.status === 'pass' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => downloadReportCard(r._id, `${r.studentId?.firstName}_${r.studentId?.lastName}`)}
                        className="flex items-center gap-1 px-3 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-xs font-semibold transition-all border border-indigo-100"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>PDF Report Card</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-6 text-center text-slate-400">Select an exam to view calculated grades.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Schedule Examination">
        <form onSubmit={handleCreateExam} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Exam Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Mid-Term Examination 2026"
              value={examName}
              onChange={(e) => setExamName(e.target.value)}
              className="w-full px-3 py-2 border rounded-xl text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Term</label>
            <select value={term} onChange={(e) => setTerm(e.target.value)} className="w-full px-3 py-2 border rounded-xl text-sm bg-white">
              <option value="Term 1">Term 1</option>
              <option value="Term 2">Term 2</option>
              <option value="Final">Final</option>
            </select>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 rounded-xl">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-xl shadow-md">
              Save Exam
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
