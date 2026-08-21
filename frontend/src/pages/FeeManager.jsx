import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useNotification } from '../context/NotificationContext';
import { DollarSign, Plus, Download, CreditCard, CheckCircle2 } from 'lucide-react';
import Modal from '../components/Modal';

export default function FeeManager() {
  const [studentFees, setStudentFees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFee, setSelectedFee] = useState(null);
  const [amountPaid, setAmountPaid] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('online');

  const { addToast } = useNotification();

  useEffect(() => {
    fetchStudentFees();
  }, []);

  const fetchStudentFees = async () => {
    setLoading(true);
    try {
      const res = await api.get('/fees/student-fees');
      if (res.data.success) {
        setStudentFees(res.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRecordPayment = async (e) => {
    e.preventDefault();
    if (!selectedFee) return;
    try {
      const res = await api.post('/fees/payments', {
        studentFeeId: selectedFee._id,
        amountPaid: Number(amountPaid),
        paymentMethod,
        remarks: 'Payment collected via counter',
      });
      if (res.data.success) {
        addToast('Payment recorded successfully!', 'success');
        setSelectedFee(null);
        setAmountPaid('');
        fetchStudentFees();
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to record payment', 'error');
    }
  };

  const downloadFeeReceipt = async (paymentId, receiptNo) => {
    try {
      const response = await api.get(`/fees/receipt/${paymentId}`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `FeeReceipt_${receiptNo}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      addToast('Official Fee Receipt PDF downloaded!', 'success');
    } catch (err) {
      addToast('Download receipt failed', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Fee Management & Invoicing</h1>
          <p className="text-sm text-slate-500">Class fee structures, payment tracking, balance summary, and PDF receipts</p>
        </div>
      </div>

      {/* Summary Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 bg-emerald-900 text-white rounded-2xl shadow-md">
          <p className="text-xs uppercase font-bold text-emerald-200">Total Collected</p>
          <h3 className="text-3xl font-extrabold mt-1">$3,200.00</h3>
        </div>
        <div className="p-5 bg-amber-900 text-white rounded-2xl shadow-md">
          <p className="text-xs uppercase font-bold text-amber-200">Outstanding Balance</p>
          <h3 className="text-3xl font-extrabold mt-1">$1,500.00</h3>
        </div>
        <div className="p-5 bg-slate-900 text-white rounded-2xl shadow-md">
          <p className="text-xs uppercase font-bold text-slate-400">Total Expected</p>
          <h3 className="text-3xl font-extrabold mt-1">$4,700.00</h3>
        </div>
      </div>

      {/* Student Fees Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5">
        <h3 className="font-bold text-slate-800 mb-4">Student Academic Fee Accounts</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-100 uppercase text-[11px] font-bold text-slate-700">
              <tr>
                <th className="p-3">Student Name</th>
                <th className="p-3">Fee Structure</th>
                <th className="p-3">Net Amount</th>
                <th className="p-3">Paid</th>
                <th className="p-3">Balance</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y text-xs font-semibold">
              {studentFees.length > 0 ? (
                studentFees.map((f) => (
                  <tr key={f._id} className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-900">
                      {f.studentId?.firstName} {f.studentId?.lastName}
                    </td>
                    <td className="p-3 text-slate-700">{f.feeStructureId?.title || 'Annual Academic Fee'}</td>
                    <td className="p-3">${f.netAmount}</td>
                    <td className="p-3 text-emerald-600">${f.paidAmount}</td>
                    <td className="p-3 text-amber-600">${f.balanceAmount}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-extrabold ${f.status === 'paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                        {f.status}
                      </span>
                    </td>
                    <td className="p-3">
                      {f.balanceAmount > 0 ? (
                        <button
                          onClick={() => {
                            setSelectedFee(f);
                            setAmountPaid(String(f.balanceAmount));
                          }}
                          className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-xs"
                        >
                          Record Payment
                        </button>
                      ) : (
                        <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Fully Paid
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-6 text-center text-slate-400">No student fee records found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Payment Modal */}
      <Modal isOpen={Boolean(selectedFee)} onClose={() => setSelectedFee(null)} title="Record Fee Payment">
        <form onSubmit={handleRecordPayment} className="space-y-4">
          <div className="p-3 rounded-xl bg-slate-50 border text-xs text-slate-600 space-y-1">
            <p><strong>Student:</strong> {selectedFee?.studentId?.firstName} {selectedFee?.studentId?.lastName}</p>
            <p><strong>Outstanding Balance:</strong> ${selectedFee?.balanceAmount}</p>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Amount to Pay ($)</label>
            <input
              type="number"
              required
              max={selectedFee?.balanceAmount}
              value={amountPaid}
              onChange={(e) => setAmountPaid(e.target.value)}
              className="w-full px-3 py-2 border rounded-xl text-sm font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Payment Method</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full px-3 py-2 border rounded-xl text-sm bg-white font-medium"
            >
              <option value="online">Online Payment</option>
              <option value="cash">Cash Counter</option>
              <option value="card">Credit / Debit Card</option>
              <option value="bank_transfer">Bank Transfer</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={() => setSelectedFee(null)} className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 rounded-xl">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-xl shadow-md">
              Submit & Issue Receipt
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
