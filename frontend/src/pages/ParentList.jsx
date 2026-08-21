import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ParentList() {
  return <Navigate to="/dashboard" replace />;
}

  const [formData, setFormData] = useState({
    parentId: `PRN-${Math.floor(100 + Math.random() * 900)}`,
    name: '',
    relationship: 'father',
    dob: '1985-06-15',
    phone: '',
    email: '',
    address: '742 Evergreen Terrace',
    occupation: 'Engineer',
  });

  useEffect(() => {
    fetchParents();
    fetchStudents();
  }, []);

  const fetchParents = async () => {
    setLoading(true);
    try {
      const res = await api.get('/parents');
      if (res.data.success) {
        setParents(res.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStudents = async () => {
    try {
      const res = await api.get('/students?limit=100');
      if (res.data.success) {
        setStudents(res.data.data || []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const toggleChildSelection = (studentId) => {
    setSelectedChildren((prev) =>
      prev.includes(studentId) ? prev.filter((id) => id !== studentId) : [...prev, studentId]
    );
  };

  const handleCreateParent = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/parents', {
        ...formData,
        children: selectedChildren,
      });
      if (res.data.success) {
        addToast(`Parent account created and linked to ${selectedChildren.length} student(s)! Login: ${formData.email}`, 'success');
        setIsAddModalOpen(false);
        setSelectedChildren([]);
        fetchParents();
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to create parent', 'error');
    }
  };

  const columns = [
    {
      header: 'Parent Name',
      render: (row) => (
        <div>
          <div className="font-semibold text-slate-800">{row.name}</div>
          <div className="text-xs text-slate-400 capitalize">{row.relationship}</div>
        </div>
      ),
    },
    {
      header: 'Contact Info',
      render: (row) => (
        <div className="text-xs text-slate-600 space-y-0.5">
          <p className="flex items-center gap-1"><Phone className="w-3 h-3 text-slate-400" /> {row.phone}</p>
          <p className="flex items-center gap-1"><Mail className="w-3 h-3 text-slate-400" /> {row.email}</p>
        </div>
      ),
    },
    {
      header: 'Occupation',
      render: (row) => <span className="text-xs font-medium text-slate-700">{row.occupation}</span>,
    },
    {
      header: 'Connected Children',
      render: (row) => (
        <div className="flex flex-wrap gap-1">
          {row.children && row.children.length > 0 ? (
            row.children.map((c) => (
              <span key={c._id || c} className="px-2.5 py-1 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-lg text-xs font-bold flex items-center gap-1">
                <GraduationCap className="w-3 h-3 text-indigo-500" />
                {c.firstName} {c.lastName} ({c.admissionNumber})
              </span>
            ))
          ) : (
            <span className="text-xs text-slate-400">No children linked</span>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Parent & Guardian Management</h1>
        <p className="text-sm text-slate-500">Directory of parent accounts linked to enrolled students</p>
      </div>

      <DataTable
        columns={columns}
        data={parents}
        totalItems={parents.length}
        page={1}
        limit={10}
        onPageChange={() => {}}
        onAddClick={() => setIsAddModalOpen(true)}
        addLabel="Create Parent Account"
        loading={loading}
      />

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Create Parent Account & Link Student">
        <form onSubmit={handleCreateParent} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Full Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border rounded-xl text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Email (Login ID)</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Date of Birth (DOB for Pass)</label>
              <input
                type="date"
                required
                value={formData.dob}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                className="w-full px-3 py-2 border rounded-xl text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Phone</label>
              <input
                type="text"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 border rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Relationship</label>
              <select
                value={formData.relationship}
                onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                className="w-full px-3 py-2 border rounded-xl text-sm bg-white"
              >
                <option value="father">Father</option>
                <option value="mother">Mother</option>
                <option value="guardian">Guardian</option>
              </select>
            </div>
          </div>

          {/* Connected Children Selection Box */}
          <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/50 space-y-2">
            <label className="block text-xs font-bold text-slate-700 uppercase">
              Link Students to this Parent Account ({selectedChildren.length} Selected)
            </label>
            <p className="text-xs text-slate-500">
              Selected students will be connected to this parent's portal dashboard.
            </p>
            <div className="max-h-40 overflow-y-auto space-y-1.5 pt-1">
              {students.map((s) => {
                const isSelected = selectedChildren.includes(s._id);
                return (
                  <div
                    key={s._id}
                    onClick={() => toggleChildSelection(s._id)}
                    className={`flex items-center justify-between p-2 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                      isSelected ? 'bg-indigo-50 border-indigo-300 text-indigo-900 shadow-xs' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-indigo-500" />
                      <span>{s.firstName} {s.lastName}</span>
                      <span className="text-[10px] text-slate-400 font-mono">Adm: {s.admissionNumber}</span>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-indigo-600 font-bold" />}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 rounded-xl">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-xl shadow-md">
              Save Parent & Link Children
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
