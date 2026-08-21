import React from 'react';
import Modal from './Modal';
import { Printer, Shield } from 'lucide-react';

export default function StudentIdCardModal({ isOpen, onClose, student }) {
  if (!student) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Student Official Identity Card" maxWidth="max-w-md">
      <div className="flex flex-col items-center space-y-4">
        {/* Printable Card */}
        <div className="printable-area w-full bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 shadow-2xl border-4 border-amber-400 relative overflow-hidden">
          {/* Top Decorative Arc */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl"></div>

          <div className="flex items-center gap-3 border-b border-indigo-700/60 pb-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-900 flex items-center justify-center font-black text-xl shadow-md">
              G
            </div>
            <div>
              <h3 className="font-extrabold text-sm uppercase tracking-wider text-amber-300">Greenwood International</h3>
              <p className="text-[10px] text-indigo-200">Official Student Pass</p>
            </div>
          </div>

          <div className="flex gap-4 items-center">
            <img
              src={student.profilePhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop'}
              alt={student.firstName}
              className="w-20 h-24 object-cover rounded-2xl border-2 border-amber-400 shadow-md shrink-0"
            />
            <div className="space-y-1 text-xs">
              <h4 className="font-extrabold text-base text-white">
                {student.firstName} {student.lastName}
              </h4>
              <p className="text-indigo-200 font-semibold">Class {student.classId?.name || '7'} - {student.sectionId?.name || 'A'}</p>
              <div className="pt-1 space-y-0.5 text-[11px] text-slate-300">
                <p><strong className="text-indigo-300">ID:</strong> {student.studentId}</p>
                <p><strong className="text-indigo-300">Adm #:</strong> {student.admissionNumber}</p>
                <p><strong className="text-indigo-300">Emergency:</strong> {student.emergencyContact}</p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-indigo-700/60 flex items-center justify-between text-[9px] text-indigo-300">
            <span>Valid Academic Year 2026-27</span>
            <span className="font-mono bg-indigo-950 px-2 py-0.5 rounded border border-indigo-800">GIS-OFFICIAL</span>
          </div>
        </div>

        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-600/30 transition-all"
        >
          <Printer className="w-4 h-4" />
          <span>Print ID Card</span>
        </button>
      </div>
    </Modal>
  );
}
