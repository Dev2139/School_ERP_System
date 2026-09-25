import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import Modal from '../components/Modal';
import {
  DollarSign,
  Search,
  User,
  CreditCard,
  CheckCircle2,
  Download,
  Receipt,
  GraduationCap,
  Calendar,
  AlertCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building,
} from 'lucide-react';

export default function FeeManager() {
  const { user } = useAuth();
  const { addToast } = useNotification();

  const isAccountant = ['accountant', 'admin', 'super_admin'].includes(user?.role);
  const isStudent = user?.role === 'student';

  const [studentFees, setStudentFees] = useState([]);
  const [loading, setLoading] = useState(true);

  // Counter Lookup State
  const [searchQuery, setSearchQuery] = useState('');
  const [lookupLoading, setLookupLoading] = useState(false);
  const [activeStudentPortal, setActiveStudentPortal] = useState(null); // { student, fees, payments }

  // Payment Recording Form State
  const [selectedFee, setSelectedFee] = useState(null);
  const [amountPaid, setAmountPaid] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash'); // cash, upi, bank_transfer, cheque, card
  const [remarks, setRemarks] = useState('');
  const [submittingPayment, setSubmittingPayment] = useState(false);

  useEffect(() => {
    fetchStudentFees();
  }, []);

  const fetchStudentFees = async () => {
    setLoading(true);
    try {
      const res = await api.get('/fees/student-fees');
      if (res.data.success) {
        setStudentFees(res.data.data || []);
      }
    } catch (err) {
      console.error(err);
      addToast('Failed to fetch fee accounts', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleStudentLookup = async (queryToSearch) => {
    const q = queryToSearch || searchQuery;
    if (!q || !q.trim()) {
      addToast('Please enter student Email ID or Admission Number', 'error');
      return;
    }

    setLookupLoading(true);
    try {
      const res = await api.get(`/fees/lookup?query=${encodeURIComponent(q.trim())}`);
      if (res.data.success) {
        setActiveStudentPortal(res.data.data);
        if (res.data.data.fees && res.data.data.fees.length > 0) {
          const firstUnpaid = res.data.data.fees.find((f) => f.balanceAmount > 0) || res.data.data.fees[0];
          setSelectedFee(firstUnpaid);
          setAmountPaid(String(firstUnpaid.balanceAmount || ''));
        }
        addToast(`Loaded Fee Account Portal for ${res.data.data.student.firstName} ${res.data.data.student.lastName}`, 'success');
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Student fee account not found', 'error');
    } finally {
      setLookupLoading(false);
    }
  };

  const handleRecordPayment = async (e) => {
    e.preventDefault();
    if (!selectedFee) {
      addToast('Please select a fee head item to record payment against', 'error');
      return;
    }
    if (!amountPaid || Number(amountPaid) <= 0) {
      addToast('Please enter a valid payment amount', 'error');
      return;
    }

    setSubmittingPayment(true);
    try {
      const res = await api.post('/fees/payments', {
        studentFeeId: selectedFee._id,
        amountPaid: Number(amountPaid),
        paymentMethod,
        remarks: remarks || `Counter payment received via ${paymentMethod.toUpperCase()}`,
      });

      if (res.data.success) {
        addToast(`Payment of ₹${Number(amountPaid).toLocaleString()} recorded successfully!`, 'success');
        setAmountPaid('');
        setRemarks('');

        // Refresh Master Fees List & Active Student Portal
        fetchStudentFees();
        if (activeStudentPortal?.student?.email) {
          handleStudentLookup(activeStudentPortal.student.email);
        } else {
          setActiveStudentPortal(null);
        }
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to record payment', 'error');
    } finally {
      setSubmittingPayment(false);
    }
  };

  const downloadFeeReceipt = async (paymentId, receiptNo) => {
    try {
      addToast('Generating official PDF receipt...', 'info');
      const response = await api.get(`/fees/receipt/${paymentId}`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Official_Fee_Receipt_${receiptNo}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      addToast(`Receipt #${receiptNo} downloaded successfully!`, 'success');
    } catch (err) {
      console.error(err);
      addToast('Failed to download official PDF receipt', 'error');
    }
  };

  // Calculations
  const totalCollected = studentFees.reduce((acc, f) => acc + (f.paidAmount || 0), 0);
  const totalOutstanding = studentFees.reduce((acc, f) => acc + (f.balanceAmount || 0), 0);
  const totalExpected = studentFees.reduce((acc, f) => acc + (f.netAmount || 0), 0);

  return (
    <div className="space-y-6">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 rounded-3xl p-6 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-500/20 text-emerald-300 rounded-2xl border border-emerald-400/30">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-black uppercase tracking-tight">
              {isAccountant ? 'Accounts Counter Fee Collection & Invoicing Portal' : 'My Academic Fee Accounts & Invoices'}
            </h1>
            <p className="text-xs text-emerald-200 font-medium">
              {isAccountant
                ? 'Lookup student fee portals by Email/ID, record cash/UPI counter payments, issue receipts, and manage class balances.'
                : 'Track your term fee breakdowns, view payment history, and check outstanding balances.'}
            </p>
          </div>
        </div>

        {isAccountant && (
          <div className="px-4 py-2 bg-emerald-500/20 border border-emerald-400/30 rounded-2xl text-xs font-extrabold text-emerald-300 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> Authorized Accounts Officer
          </div>
        )}
      </div>

      {/* ACCOUNTANT STUDENT LOOKUP BAR */}
      {isAccountant && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-800 font-extrabold text-sm uppercase tracking-wider">
              <Search className="w-4 h-4 text-emerald-600" /> Student Counter Fee Portal Lookup
            </div>
            <span className="text-xs text-slate-400 font-semibold">Enter Student Email ID or Admission No</span>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleStudentLookup();
            }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <div className="relative flex-1">
              <User className="w-5 h-5 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter Student Email (e.g. alex@school.com, student@school.com) or Admission No..."
                className="w-full pl-11 pr-4 py-2.5 border border-slate-300 rounded-2xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50"
              />
            </div>
            <button
              type="submit"
              disabled={lookupLoading}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-2xl text-xs shadow-md shadow-emerald-600/20 transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2 shrink-0"
            >
              <Search className="w-4 h-4" />
              <span>{lookupLoading ? 'Opening Portal...' : 'Open Student Fee Account'}</span>
            </button>
          </form>
        </div>
      )}

      {/* METRIC OVERVIEW CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Total Collected Revenue</span>
            <span className="text-2xl font-black text-emerald-600 mt-1 block">₹{totalCollected.toLocaleString()}</span>
            <span className="text-[10px] font-semibold text-emerald-600 flex items-center gap-0.5 mt-1">
              <CheckCircle2 className="w-3 h-3" /> Credited Counter Payments
            </span>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Total Outstanding Dues</span>
            <span className="text-2xl font-black text-rose-600 mt-1 block">₹{totalOutstanding.toLocaleString()}</span>
            <span className="text-[10px] font-semibold text-amber-600 mt-1 block">Pending Student Receivables</span>
          </div>
          <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
            <AlertCircle className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Total Expected Fee Budget</span>
            <span className="text-2xl font-black text-slate-900 mt-1 block">₹{totalExpected.toLocaleString()}</span>
            <span className="text-[10px] font-semibold text-indigo-600 mt-1 block">Annual Academic Fee Pool</span>
          </div>
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
            <CreditCard className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* MASTER STUDENT FEES TABLE */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">
            {isAccountant ? 'Student Academic Fee Ledgers' : 'My Fee Payment History'}
          </h2>
          <span className="text-xs text-slate-400 font-semibold">{studentFees.length} Total Student Records</span>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-400 font-bold text-xs">Loading fee accounts...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-black uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="py-3 px-4">Student Name</th>
                  <th className="py-3 px-4">Fee Head / Structure</th>
                  <th className="py-3 px-4 text-right">Net Fee</th>
                  <th className="py-3 px-4 text-right">Amount Paid</th>
                  <th className="py-3 px-4 text-right">Balance Due</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Counter Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                {studentFees.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-400">
                      No student fee accounts found.
                    </td>
                  </tr>
                ) : (
                  studentFees.map((f) => (
                    <tr key={f._id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3.5 px-4 font-black text-slate-900">
                        {f.studentId?.firstName} {f.studentId?.lastName}
                        <span className="block text-[10px] text-slate-400 font-mono">
                          Adm: {f.studentId?.admissionNumber || 'ADM-2026'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-indigo-700 font-bold">
                        {f.feeStructureId?.title || 'Annual Academic Fee'}
                      </td>
                      <td className="py-3.5 px-4 text-right text-slate-700 font-mono">₹{(f.netAmount || 0).toLocaleString()}</td>
                      <td className="py-3.5 px-4 text-right text-emerald-600 font-mono font-bold">₹{(f.paidAmount || 0).toLocaleString()}</td>
                      <td className={`py-3.5 px-4 text-right font-mono font-black ${f.balanceAmount > 0 ? 'text-rose-600' : 'text-slate-400'}`}>
                        ₹{(f.balanceAmount || 0).toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                            f.status === 'paid'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                              : f.status === 'partial'
                              ? 'bg-amber-100 text-amber-800 border border-amber-200'
                              : 'bg-rose-100 text-rose-800 border border-rose-200'
                          }`}
                        >
                          {f.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        {isAccountant ? (
                          <button
                            onClick={() => {
                              if (f.studentId?.email) {
                                handleStudentLookup(f.studentId.email);
                              } else {
                                setSelectedFee(f);
                                setAmountPaid(String(f.balanceAmount || ''));
                              }
                            }}
                            className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-all shadow-xs cursor-pointer flex items-center gap-1 ml-auto"
                          >
                            <DollarSign className="w-3.5 h-3.5" />
                            <span>Collect Fee</span>
                          </button>
                        ) : (
                          <span className="text-[10px] font-bold text-slate-400 italic">
                            {f.balanceAmount > 0 ? 'Pay at Accounts Counter' : 'Receipt Issued by Counter'}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* DEDICATED SPECIFIC STUDENT FEE ACCOUNT PORTAL MODAL (FOR ACCOUNTANT) */}
      {activeStudentPortal && (
        <Modal
          isOpen={Boolean(activeStudentPortal)}
          onClose={() => setActiveStudentPortal(null)}
          title={`Student Fee Account Portal - ${activeStudentPortal.student.firstName} ${activeStudentPortal.student.lastName}`}
        >
          <div className="space-y-6">
            {/* Student Badge Profile Header */}
            <div className="p-4 bg-slate-900 text-white rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 font-extrabold text-lg">
                  {activeStudentPortal.student.firstName[0]}
                </div>
                <div>
                  <h3 className="font-extrabold text-base">
                    {activeStudentPortal.student.firstName} {activeStudentPortal.student.lastName}
                  </h3>
                  <p className="text-xs text-slate-300 font-mono">
                    Email: {activeStudentPortal.student.email} | Adm: {activeStudentPortal.student.admissionNumber}
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-black rounded-full border border-emerald-400/30">
                {activeStudentPortal.student.classId?.name || 'Enrolled Class'}
              </span>
            </div>

            {/* Counter Payment Form */}
            <form onSubmit={handleRecordPayment} className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-2xl space-y-4">
              <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-xs uppercase tracking-wider">
                <DollarSign className="w-4 h-4 text-emerald-600" /> Record Counter Payment Entry
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Select Fee Item</label>
                <select
                  value={selectedFee?._id || ''}
                  onChange={(e) => {
                    const found = activeStudentPortal.fees.find((x) => x._id === e.target.value);
                    setSelectedFee(found);
                    if (found) setAmountPaid(String(found.balanceAmount || ''));
                  }}
                  className="w-full px-3 py-2 border rounded-xl text-xs font-semibold bg-white focus:ring-2 focus:ring-emerald-500"
                >
                  {activeStudentPortal.fees.map((f) => (
                    <option key={f._id} value={f._id}>
                      {f.feeStructureId?.title || 'Academic Fee'} - Due: ₹{(f.balanceAmount || 0).toLocaleString()} (Net: ₹{(f.netAmount || 0).toLocaleString()})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Amount to Collect (₹)</label>
                  <input
                    type="number"
                    required
                    min="1"
                    max={selectedFee?.balanceAmount || 999999}
                    value={amountPaid}
                    onChange={(e) => setAmountPaid(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl text-sm font-bold font-mono focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Payment Method</label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl text-xs font-bold bg-white focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="cash">Cash Counter</option>
                    <option value="upi">UPI Payment</option>
                    <option value="bank_transfer">Bank Transfer</option>
                    <option value="cheque">Cheque</option>
                    <option value="card">Credit / Debit Card</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Transaction Ref / Counter Remarks</label>
                <input
                  type="text"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="Optional transaction reference code or receipt note"
                  className="w-full px-3 py-2 border rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <button
                type="submit"
                disabled={submittingPayment}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl text-xs shadow-md shadow-emerald-600/20 transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Receipt className="w-4 h-4" />
                <span>{submittingPayment ? 'Processing Entry...' : 'Save Payment & Generate Official Receipt'}</span>
              </button>
            </form>

            {/* Official Receipts & Payments History Stream */}
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b pb-2">
                <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                  Payment History & Official PDF Receipts
                </h4>
                <span className="text-[11px] font-bold text-slate-400">
                  {activeStudentPortal.payments.length} Recorded Transactions
                </span>
              </div>

              {activeStudentPortal.payments.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-4">No previous payment transactions recorded for this student.</p>
              ) : (
                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {activeStudentPortal.payments.map((p) => (
                    <div
                      key={p._id}
                      className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="font-extrabold text-slate-900 font-mono">Receipt #{p.receiptNo}</div>
                        <div className="text-[10px] text-slate-500">
                          {new Date(p.paymentDate || p.createdAt).toLocaleDateString('en-GB')} • Method: {p.paymentMethod.toUpperCase()}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-black text-emerald-600 text-sm font-mono">₹{p.amountPaid.toLocaleString()}</span>
                        {/* ONLY ACCOUNTANT/ADMIN CAN PROVIDE AND DOWNLOAD THIS RECEIPT */}
                        {isAccountant ? (
                          <button
                            onClick={() => downloadFeeReceipt(p._id, p.receiptNo)}
                            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg text-[10px] flex items-center gap-1 shadow-xs transition-all cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5" /> PDF Receipt
                          </button>
                        ) : (
                          <span className="text-[10px] text-slate-400 italic">Provided by Accounts</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
