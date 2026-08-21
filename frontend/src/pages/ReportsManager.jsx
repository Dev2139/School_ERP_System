import React, { useState } from 'react';
import { BarChart3, Download, Printer } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';
import api from '../services/api';

export default function ReportsManager() {
  const { addToast } = useNotification();
  const [downloading, setDownloading] = useState(null);

  const reportModules = [
    { id: 'students', title: 'Student Master Roster Report', desc: 'Complete list of all enrolled students with contact and demographic details.', category: 'Students', endpoint: '/students' },
    { id: 'teachers', title: 'Faculty & Teacher Allocation Report', desc: 'Staff directory with assigned subjects, classes, and weekly workload.', category: 'Teachers', endpoint: '/teachers' },
    { id: 'fees', title: 'Fee Collection & Pending Dues Report', desc: 'Financial audit report showing collected fees vs pending student balances.', category: 'Fees', endpoint: '/fees/student-fees' },
    { id: 'exams', title: 'Examination Results & GPA Report', desc: 'Subject-wise performance matrix, pass rates, and student ranks.', category: 'Exams', endpoint: '/exams/results' },
    { id: 'library', title: 'Library Book Circulation Report', desc: 'Inventory status, active issued books, and overdue fines summary.', category: 'Library', endpoint: '/library/books' },
    { id: 'logs', title: 'System Security & Audit Trail Report', desc: 'Security log of user authentication, marks entry, and payment records.', category: 'Audit', endpoint: '/settings/audit-logs' },
  ];

  const handleExportCSV = async (module) => {
    setDownloading(module.id);
    try {
      const res = await api.get(module.endpoint);
      if (res.data.success && res.data.data) {
        const dataArr = Array.isArray(res.data.data) ? res.data.data : [res.data.data];
        if (dataArr.length === 0) {
          addToast(`No data found for ${module.title}`, 'info');
          return;
        }

        const keys = Object.keys(dataArr[0]).filter((k) => typeof dataArr[0][k] !== 'object');
        const headers = keys.join(',');
        const rows = dataArr.map((row) =>
          keys.map((k) => `"${String(row[k] ?? '').replace(/"/g, '""')}"`).join(',')
        );

        const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', `${module.id}_report_${Date.now()}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        addToast(`Exported ${module.title} from MongoDB database!`, 'success');
      }
    } catch (err) {
      addToast(`Failed to export ${module.title}`, 'error');
    } finally {
      setDownloading(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Comprehensive Reports Suite</h1>
        <p className="text-sm text-slate-500">Generate, view, and export live school administrative and financial analytics reports directly from database</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reportModules.map((rep) => (
          <div key={rep.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">
                {rep.category}
              </span>
              <h3 className="font-extrabold text-slate-800 text-base">{rep.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{rep.desc}</p>
            </div>
            <div className="pt-4 mt-4 border-t flex items-center justify-between">
              <button
                disabled={downloading === rep.id}
                onClick={() => handleExportCSV(rep)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-semibold transition-all border border-indigo-100 disabled:opacity-50"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{downloading === rep.id ? 'Generating...' : 'Export DB CSV'}</span>
              </button>
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold transition-all border border-slate-200"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print PDF</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
