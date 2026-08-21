import React, { useState } from 'react';
import { Search, ChevronLeft, ChevronRight, Download, Filter, Plus } from 'lucide-react';

export default function DataTable({
  columns,
  data,
  totalItems,
  page,
  limit,
  onPageChange,
  onSearchChange,
  onAddClick,
  addLabel = 'Add Record',
  loading = false,
}) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    if (onSearchChange) onSearchChange(e.target.value);
  };

  const exportCSV = () => {
    if (!data || data.length === 0) return;
    const headers = columns.map((c) => c.header).join(',');
    const rows = data.map((row) =>
      columns
        .map((col) => {
          const val = col.accessor ? row[col.accessor] : col.render ? col.render(row) : '';
          return `"${String(val).replace(/"/g, '""')}"`;
        })
        .join(',')
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'export_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalPages = Math.ceil((totalItems || data.length) / limit) || 1;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Table Toolbar */}
      <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50/50">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search records..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={exportCSV}
            className="flex items-center gap-2 px-3 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold shadow-xs transition-all"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Export CSV</span>
          </button>

          {onAddClick && (
            <button
              onClick={onAddClick}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>{addLabel}</span>
            </button>
          )}
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-100/70 text-slate-700 uppercase font-semibold text-[11px] tracking-wider border-b border-slate-200">
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} className="px-5 py-3.5">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                  {columns.map((_, colIdx) => (
                    <td key={colIdx} className="px-5 py-4">
                      <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                    </td>
                  ))}
                </tr>
              ))
            ) : data && data.length > 0 ? (
              data.map((row, rowIdx) => (
                <tr key={row._id || rowIdx} className="hover:bg-slate-50/80 transition-colors">
                  {columns.map((col, colIdx) => (
                    <td key={colIdx} className="px-5 py-3.5">
                      {col.render ? col.render(row) : row[col.accessor]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-5 py-12 text-center text-slate-400 font-medium">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-4 border-t border-slate-200 flex items-center justify-between bg-slate-50/50 text-xs text-slate-500 font-medium">
        <span>
          Showing page <strong className="text-slate-700">{page}</strong> of <strong className="text-slate-700">{totalPages}</strong>
        </span>
        <div className="flex items-center gap-1">
          <button
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
            className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            disabled={page >= totalPages}
            onClick={() => onPageChange(page + 1)}
            className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
