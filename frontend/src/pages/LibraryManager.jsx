import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { BookMarked, Plus, Search } from 'lucide-react';

export default function LibraryManager() {
  const [books, setBooks] = useState([]);
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    fetchLibraryData();
  }, []);

  const fetchLibraryData = async () => {
    try {
      const [bRes, iRes] = await Promise.all([api.get('/library/books'), api.get('/library/issues')]);
      if (bRes.data.success) setBooks(bRes.data.data);
      if (iRes.data.success) setIssues(iRes.data.data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Library Catalog & Book Circulation</h1>
        <p className="text-sm text-slate-500">Manage book inventory, author catalog, and issue/return logs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-800 border-b pb-2">Library Book Catalog</h3>
          <div className="space-y-3">
            {books.map((b) => (
              <div key={b._id} className="p-3 border rounded-xl bg-slate-50 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{b.title}</h4>
                  <p className="text-xs text-slate-500">Author: {b.author} | Rack: {b.rackNo}</p>
                </div>
                <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-lg border border-indigo-100">
                  {b.availableCopies} / {b.totalCopies} Available
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-800 border-b pb-2">Active Borrowed Books Log</h3>
          <div className="space-y-3">
            {issues.map((i) => (
              <div key={i._id} className="p-3 border rounded-xl bg-slate-50 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{i.bookId?.title || 'Book Title'}</h4>
                  <p className="text-xs text-slate-500">Borrower: {i.borrowerId?.username} ({i.borrowerType})</p>
                </div>
                <span className="px-2.5 py-1 bg-amber-50 text-amber-700 text-xs font-bold rounded-lg border border-amber-100">
                  Due: {new Date(i.dueDate).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
