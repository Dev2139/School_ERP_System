import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import Modal from '../components/Modal';
import {
  DollarSign,
  CreditCard,
  Plus,
  CheckCircle2,
  Calendar,
  UserCheck,
  FileText,
  Printer,
  Download,
  Building,
  ArrowUpRight,
  TrendingUp,
  Receipt,
  User,
} from 'lucide-react';

export default function SalaryManager() {
  const { user } = useAuth();
  const { addToast } = useNotification();

  const isPrincipal = ['super_admin', 'admin'].includes(user?.role);
  const isTeacher = user?.role === 'teacher';

  const [salaries, setSalaries] = useState([]);
  const [teachersList, setTeachersList] = useState([]);
  const [totalDisbursed, setTotalDisbursed] = useState(0);
  const [totalReceived, setTotalReceived] = useState(0);
  const [loading, setLoading] = useState(true);

  // Disbursement Modal State
  const [isDisburseModalOpen, setIsDisburseModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Payslip Modal State
  const [selectedPayslip, setSelectedPayslip] = useState(null);
  const [isPayslipModalOpen, setIsPayslipModalOpen] = useState(false);

  // Form State for Principal
  const [form, setForm] = useState({
    teacherId: '',
    month: 'August 2026',
    basicSalary: 45000,
    allowances: 5000,
    deductions: 2000,
    paymentMethod: 'Bank Transfer',
    transactionRef: '',
    remarks: '',
  });

  useEffect(() => {
    fetchSalaries();
  }, [user]);

  const fetchSalaries = async () => {
    setLoading(true);
    try {
      const res = await api.get('/salary');
      if (res.data.success) {
        setSalaries(res.data.data || []);
        if (isPrincipal) {
          setTotalDisbursed(res.data.totalDisbursed || 0);
          setTeachersList(res.data.teachersList || []);
          if (res.data.teachersList && res.data.teachersList.length > 0) {
            const firstT = res.data.teachersList[0];
            setForm((prev) => ({
              ...prev,
              teacherId: firstT._id,
              basicSalary: firstT.baseSalary || 45000,
            }));
          }
        } else {
          setTotalReceived(res.data.totalReceived || 0);
        }
      }
    } catch (err) {
      console.error(err);
      addToast('Failed to load salary records', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleTeacherSelect = (tId) => {
    const t = teachersList.find((x) => x._id === tId);
    setForm((prev) => ({
      ...prev,
      teacherId: tId,
      basicSalary: t?.baseSalary || 45000,
    }));
  };

  const handleDisburseSubmit = async (e) => {
    e.preventDefault();
    if (!form.teacherId) {
      addToast('Please select a teacher', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const res = await api.post('/salary/disburse', form);
      if (res.data.success) {
        addToast(res.data.message || 'Salary disbursed successfully!', 'success');
        setIsDisburseModalOpen(false);
        fetchSalaries();
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to disburse salary', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const netSalaryCalculated = Number(form.basicSalary || 0) + Number(form.allowances || 0) - Number(form.deductions || 0);

  return (
    <div className="space-y-6">
      {/* Top Banner Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100 shadow-xs">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900 uppercase tracking-tight">
              {isPrincipal ? 'Faculty Payroll & Salary Disbursement Portal' : 'My Salary & Monthly Payslips'}
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              {isPrincipal
                ? 'Disburse monthly salaries to teachers, track payment history, and issue digital payslips.'
                : 'View your monthly salary disbursements, breakdown of net pay, and download official payslips.'}
            </p>
          </div>
        </div>

        {/* Principal Disburse Action Button */}
        {isPrincipal && (
          <button
            onClick={() => setIsDisburseModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-2xl text-xs shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Disburse Teacher Salary</span>
          </button>
        )}
      </div>

      {/* METRIC OVERVIEW CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {isPrincipal ? (
          <>
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Total Disbursed</span>
                <span className="text-2xl font-black text-slate-900 mt-1 block">₹{totalDisbursed.toLocaleString()}</span>
                <span className="text-[10px] font-semibold text-emerald-600 flex items-center gap-0.5 mt-1">
                  <TrendingUp className="w-3 h-3" /> Processed Payroll
                </span>
              </div>
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
                <CreditCard className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Total Disbursements</span>
                <span className="text-2xl font-black text-slate-900 mt-1 block">{salaries.length} Payments</span>
                <span className="text-[10px] font-semibold text-indigo-600 mt-1 block">Active Faculty Members</span>
              </div>
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
                <UserCheck className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Faculty Count</span>
                <span className="text-2xl font-black text-slate-900 mt-1 block">{teachersList.length} Teachers</span>
                <span className="text-[10px] font-semibold text-sky-600 mt-1 block">Greenwood School Staff</span>
              </div>
              <div className="p-3 bg-sky-50 text-sky-600 rounded-2xl">
                <Building className="w-6 h-6" />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Total Net Salary Received</span>
                <span className="text-2xl font-black text-slate-900 mt-1 block">₹{totalReceived.toLocaleString()}</span>
                <span className="text-[10px] font-semibold text-emerald-600 flex items-center gap-0.5 mt-1">
                  <CheckCircle2 className="w-3 h-3" /> Credited to Account
                </span>
              </div>
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Total Payslips Issued</span>
                <span className="text-2xl font-black text-slate-900 mt-1 block">{salaries.length} Payslips</span>
                <span className="text-[10px] font-semibold text-indigo-600 mt-1 block">Digital Salary Records</span>
              </div>
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
                <Receipt className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Latest Credit Status</span>
                <span className="text-xl font-extrabold text-emerald-600 mt-1 block">
                  {salaries.length > 0 ? salaries[0].month : 'No Record'}
                </span>
                <span className="text-[10px] font-semibold text-slate-400 mt-1 block">Verified Disbursement</span>
              </div>
              <div className="p-3 bg-sky-50 text-sky-600 rounded-2xl">
                <CheckCircle2 className="w-6 h-6" />
              </div>
            </div>
          </>
        )}
      </div>

      {/* SALARY RECORDS TABLE */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">
            {isPrincipal ? 'Teacher Disbursement History Ledger' : 'My Received Salary Payslips'}
          </h2>
          <span className="text-xs text-slate-400 font-semibold">{salaries.length} Total Records</span>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-400 font-bold text-xs">
            Loading payroll records...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-black uppercase tracking-wider text-slate-400">
                <tr>
                  {isPrincipal && <th className="py-3 px-4">Teacher Name</th>}
                  <th className="py-3 px-4">Month</th>
                  <th className="py-3 px-4 text-right">Basic Pay</th>
                  <th className="py-3 px-4 text-right">Allowances</th>
                  <th className="py-3 px-4 text-right">Deductions</th>
                  <th className="py-3 px-4 text-right">Net Salary</th>
                  <th className="py-3 px-4">Payment Method</th>
                  <th className="py-3 px-4">Txn Reference</th>
                  <th className="py-3 px-4">Payment Date</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                {salaries.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="py-12 text-center text-slate-400">
                      No salary records found.
                    </td>
                  </tr>
                ) : (
                  salaries.map((s) => (
                    <tr key={s._id} className="hover:bg-slate-50/50 transition-colors">
                      {isPrincipal && (
                        <td className="py-3.5 px-4 font-black text-slate-900">
                          {s.teacherId?.name || s.teacherName}
                          <span className="block text-[10px] text-slate-400 font-mono">
                            {s.teacherId?.employeeId || 'FACULTY'}
                          </span>
                        </td>
                      )}
                      <td className="py-3.5 px-4 font-bold text-indigo-700">{s.month}</td>
                      <td className="py-3.5 px-4 text-right text-slate-500 font-mono">₹{(s.basicSalary || 0).toLocaleString()}</td>
                      <td className="py-3.5 px-4 text-right text-emerald-600 font-mono">+₹{(s.allowances || 0).toLocaleString()}</td>
                      <td className="py-3.5 px-4 text-right text-rose-500 font-mono">-₹{(s.deductions || 0).toLocaleString()}</td>
                      <td className="py-3.5 px-4 text-right font-black text-slate-900 font-mono text-sm">
                        ₹{(s.netSalary || 0).toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-[10px] font-bold">
                          {s.paymentMethod}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500">{s.transactionRef}</td>
                      <td className="py-3.5 px-4 text-slate-500 font-mono">
                        {new Date(s.paymentDate).toLocaleDateString('en-GB')}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => {
                            setSelectedPayslip(s);
                            setIsPayslipModalOpen(true);
                          }}
                          className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded-xl text-xs transition-all cursor-pointer flex items-center gap-1 ml-auto"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>Payslip</span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* DISBURSE SALARY MODAL (PRINCIPAL ROLE) */}
      {isPrincipal && (
        <Modal isOpen={isDisburseModalOpen} onClose={() => setIsDisburseModalOpen(false)} title="Disburse Teacher Salary">
          <form onSubmit={handleDisburseSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Select Faculty Member</label>
              <select
                required
                value={form.teacherId}
                onChange={(e) => handleTeacherSelect(e.target.value)}
                className="w-full px-3 py-2 border rounded-xl text-sm font-semibold bg-white focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">-- Select Teacher --</option>
                {teachersList.map((t) => (
                  <option key={t._id} value={t._id}>
                    {t.name} ({t.designation || 'Faculty'} - Base Pay: ₹{(t.baseSalary || 45000).toLocaleString()})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Salary Month</label>
                <input
                  type="text"
                  required
                  value={form.month}
                  onChange={(e) => setForm({ ...form, month: e.target.value })}
                  placeholder="e.g. August 2026"
                  className="w-full px-3 py-2 border rounded-xl text-sm font-semibold focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Payment Method</label>
                <select
                  value={form.paymentMethod}
                  onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl text-sm font-semibold bg-white focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="UPI">UPI Payment</option>
                  <option value="Cash">Cash</option>
                  <option value="Cheque">Cheque</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Basic Salary (₹)</label>
                <input
                  type="number"
                  required
                  min="0"
                  value={form.basicSalary}
                  onChange={(e) => setForm({ ...form, basicSalary: Number(e.target.value) })}
                  className="w-full px-3 py-2 border rounded-xl text-sm font-bold font-mono focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-emerald-600 uppercase mb-1">+ Allowances (₹)</label>
                <input
                  type="number"
                  min="0"
                  value={form.allowances}
                  onChange={(e) => setForm({ ...form, allowances: Number(e.target.value) })}
                  className="w-full px-3 py-2 border rounded-xl text-sm font-bold font-mono text-emerald-700 focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-rose-600 uppercase mb-1">- Deductions (₹)</label>
                <input
                  type="number"
                  min="0"
                  value={form.deductions}
                  onChange={(e) => setForm({ ...form, deductions: Number(e.target.value) })}
                  className="w-full px-3 py-2 border rounded-xl text-sm font-bold font-mono text-rose-600 focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* NET SALARY LIVE CALCULATION BADGE */}
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-[10px] font-extrabold text-emerald-700 uppercase tracking-wider block">
                  Net Salary Payable
                </span>
                <span className="text-xl font-black text-slate-900 font-mono">
                  ₹{netSalaryCalculated.toLocaleString()}
                </span>
              </div>
              <span className="px-3 py-1 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-wider">
                Calculated Pay
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Transaction Ref / Cheque No.</label>
              <input
                type="text"
                value={form.transactionRef}
                onChange={(e) => setForm({ ...form, transactionRef: e.target.value })}
                placeholder="Leave empty for auto-generated reference ID"
                className="w-full px-3 py-2 border rounded-xl text-sm font-mono focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t">
              <button
                type="button"
                onClick={() => setIsDisburseModalOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-md shadow-emerald-600/20 transition-all disabled:opacity-50 cursor-pointer"
              >
                {submitting ? 'Processing Disbursement...' : 'Disburse Salary Now'}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* OFFICIAL SALARY PAYSLIP MODAL */}
      {isPayslipModalOpen && selectedPayslip && (
        <Modal isOpen={isPayslipModalOpen} onClose={() => setIsPayslipModalOpen(false)} title="Salary Payslip Advice">
          <div className="space-y-6 p-2 printable-payslip">
            {/* Header */}
            <div className="flex justify-between items-start border-b-2 border-slate-900 pb-4">
              <div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight">GREENWOOD ACADEMIC SCHOOL</h2>
                <p className="text-xs text-slate-500 font-medium">Official Monthly Faculty Payslip</p>
              </div>
              <div className="text-right">
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-black rounded-full uppercase">
                  {selectedPayslip.status}
                </span>
                <p className="text-[11px] font-mono text-slate-400 mt-1">{selectedPayslip.transactionRef}</p>
              </div>
            </div>

            {/* Faculty Info Grid */}
            <div className="grid grid-cols-2 gap-4 text-xs font-medium bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div>
                <span className="text-slate-400 block font-bold uppercase text-[10px]">Faculty Member</span>
                <span className="font-extrabold text-slate-900 text-sm">
                  {selectedPayslip.teacherId?.name || selectedPayslip.teacherName}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block font-bold uppercase text-[10px]">Salary Month</span>
                <span className="font-extrabold text-indigo-700 text-sm">{selectedPayslip.month}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-bold uppercase text-[10px]">Payment Method</span>
                <span className="font-bold text-slate-800">{selectedPayslip.paymentMethod}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-bold uppercase text-[10px]">Payment Date</span>
                <span className="font-bold text-slate-800 font-mono">
                  {new Date(selectedPayslip.paymentDate).toLocaleDateString('en-GB')}
                </span>
              </div>
            </div>

            {/* Salary Components Breakdown Table */}
            <div className="border border-slate-200 rounded-2xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-100 font-black uppercase text-[10px] text-slate-600 border-b border-slate-200">
                  <tr>
                    <th className="p-3">Salary Component</th>
                    <th className="p-3 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                  <tr>
                    <td className="p-3">Basic Base Pay</td>
                    <td className="p-3 text-right font-mono">₹{(selectedPayslip.basicSalary || 0).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-emerald-700">Allowances / HRA / DA</td>
                    <td className="p-3 text-right font-mono text-emerald-700">+₹{(selectedPayslip.allowances || 0).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-rose-600">Deductions / Tax / PF</td>
                    <td className="p-3 text-right font-mono text-rose-600">-₹{(selectedPayslip.deductions || 0).toLocaleString()}</td>
                  </tr>
                  <tr className="bg-slate-900 text-white font-black">
                    <td className="p-3.5 uppercase tracking-wider text-xs">Net Salary Paid</td>
                    <td className="p-3.5 text-right font-mono text-base text-emerald-400">
                      ₹{(selectedPayslip.netSalary || 0).toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-[10px] text-slate-400 font-medium">Computer Generated Payslip • Greenwood ERP</span>
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-md shadow-indigo-600/20 cursor-pointer"
              >
                <Printer className="w-4 h-4" /> Print / Save PDF
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
