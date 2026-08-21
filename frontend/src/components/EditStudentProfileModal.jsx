import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import api from '../services/api';
import { useNotification } from '../context/NotificationContext';
import { User, Phone, Mail, MapPin, Calendar, BookOpen, ShieldCheck, Heart } from 'lucide-react';

export default function EditStudentProfileModal({ isOpen, onClose, student, onProfileUpdated }) {
  const { addToast } = useNotification();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dob: '2006-10-06',
    address: '',
    city: '',
    state: '',
    pincode: '',
    fatherName: '',
    fatherPhone: '',
    motherName: '',
    motherPhone: '',
    program: '',
    registrationNo: '',
    category: 'Non-Sponsored',
    bloodGroup: 'O+',
    profilePhoto: '',
  });

  useEffect(() => {
    if (student) {
      setFormData({
        firstName: student.firstName || '',
        lastName: student.lastName || '',
        email: student.email || '',
        phone: student.phone || '',
        dob: student.dob ? new Date(student.dob).toISOString().split('T')[0] : '2006-10-06',
        address: student.address || '',
        city: student.city || '',
        state: student.state || '',
        pincode: student.pincode || '',
        fatherName: student.fatherName || (student.parentId?.name || ''),
        fatherPhone: student.fatherPhone || (student.parentId?.phone || ''),
        motherName: student.motherName || '',
        motherPhone: student.motherPhone || '',
        program: student.program || (student.classId?.name ? `RSE - B.Tech. - CSE (${student.classId.name})` : 'B.Tech - CSE - 5'),
        registrationNo: student.registrationNo || student.admissionNumber || '24BTCSE049',
        category: student.category || 'Non-Sponsored',
        bloodGroup: student.bloodGroup || 'O+',
        profilePhoto: student.profilePhoto || '',
      });
    }
  }, [student]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!student?._id) return;
    setLoading(true);
    try {
      const payload = {
        ...formData,
        isProfileComplete: true,
      };

      const res = await api.put(`/students/${student._id}`, payload);
      if (res.data.success) {
        addToast('Profile updated & confirmed successfully!', 'success');
        onProfileUpdated(res.data.data);
        onClose();
      } else {
        addToast(res.data.message || 'Failed to update profile', 'error');
      }
    } catch (err) {
      console.error(err);
      addToast(err.response?.data?.message || 'Error updating student profile', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Complete & Confirm Student Profile">
      <form onSubmit={handleSubmit} className="space-y-4 max-h-[75vh] overflow-y-auto pr-1">
        <div className="bg-sky-50 border border-sky-200 rounded-2xl p-3.5 text-xs text-sky-800 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-sky-600 shrink-0" />
          <span>Please fill and verify your personal and guardian information to confirm your admission form profile.</span>
        </div>

        {/* Basic Info */}
        <div className="text-xs font-extrabold uppercase tracking-wider text-slate-400 pt-2 border-t border-slate-100 flex items-center gap-1.5">
          <User className="w-3.5 h-3.5 text-indigo-600" /> Personal Details
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">First Name</label>
            <input
              type="text"
              required
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 font-medium"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Last Name</label>
            <input
              type="text"
              required
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 font-medium"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Date of Birth</label>
            <input
              type="date"
              required
              value={formData.dob}
              onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 font-medium"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Student Phone</label>
            <input
              type="text"
              required
              placeholder="e.g. 6354236105"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 font-medium"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Blood Group</label>
            <select
              value={formData.bloodGroup}
              onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 font-medium"
            >
              {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map((bg) => (
                <option key={bg} value={bg}>{bg}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Email Address</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 font-medium"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Profile Photo URL</label>
            <input
              type="url"
              placeholder="https://..."
              value={formData.profilePhoto}
              onChange={(e) => setFormData({ ...formData, profilePhoto: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 font-medium"
            />
          </div>
        </div>

        {/* Academic Program Info */}
        <div className="text-xs font-extrabold uppercase tracking-wider text-slate-400 pt-2 border-t border-slate-100 flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-indigo-600" /> Course & Academic Info
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Program / Stream</label>
            <input
              type="text"
              placeholder="RSE - B.Tech. - CSE (Semester - 5)"
              value={formData.program}
              onChange={(e) => setFormData({ ...formData, program: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 font-medium"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Reg / Enroll No.</label>
            <input
              type="text"
              placeholder="24BTCSE049"
              value={formData.registrationNo}
              onChange={(e) => setFormData({ ...formData, registrationNo: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 font-medium"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 font-medium"
            >
              <option value="Non-Sponsored">Non-Sponsored</option>
              <option value="Sponsored">Sponsored</option>
              <option value="Management Quote">Management Quota</option>
              <option value="Scholarship">Scholarship</option>
            </select>
          </div>
        </div>

        {/* Parent / Guardian Details */}
        <div className="text-xs font-extrabold uppercase tracking-wider text-slate-400 pt-2 border-t border-slate-100 flex items-center gap-1.5">
          <Heart className="w-3.5 h-3.5 text-rose-500" /> Parent & Guardian Information
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Father's Full Name</label>
            <input
              type="text"
              placeholder="e.g. Dharmendrabhai"
              value={formData.fatherName}
              onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 font-medium"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Father's Phone Number</label>
            <input
              type="text"
              placeholder="e.g. 9898062750"
              value={formData.fatherPhone}
              onChange={(e) => setFormData({ ...formData, fatherPhone: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 font-medium"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Mother's Full Name</label>
            <input
              type="text"
              placeholder="e.g. Niruben"
              value={formData.motherName}
              onChange={(e) => setFormData({ ...formData, motherName: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 font-medium"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Mother's Phone Number</label>
            <input
              type="text"
              placeholder="e.g. 9157962750"
              value={formData.motherPhone}
              onChange={(e) => setFormData({ ...formData, motherPhone: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 font-medium"
            />
          </div>
        </div>

        {/* Address */}
        <div className="text-xs font-extrabold uppercase tracking-wider text-slate-400 pt-2 border-t border-slate-100 flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-emerald-600" /> Residential Address
        </div>
        <div>
          <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Street Address</label>
          <input
            type="text"
            placeholder="123 Academic Way"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 font-medium"
          />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">City</label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 font-medium"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">State</label>
            <input
              type="text"
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 font-medium"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Pincode</label>
            <input
              type="text"
              value={formData.pincode}
              onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 font-medium"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2 text-xs font-extrabold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md transition-all flex items-center gap-1.5 disabled:opacity-50"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{loading ? 'Saving Profile...' : 'Save & Confirm Profile'}</span>
          </button>
        </div>
      </form>
    </Modal>
  );
}
