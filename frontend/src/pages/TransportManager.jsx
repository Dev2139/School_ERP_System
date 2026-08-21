import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Bus, MapPin, Phone } from 'lucide-react';

export default function TransportManager() {
  const [vehicles, setVehicles] = useState([]);
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    fetchTransport();
  }, []);

  const fetchTransport = async () => {
    try {
      const [vRes, rRes] = await Promise.all([api.get('/transport/vehicles'), api.get('/transport/routes')]);
      if (vRes.data.success) setVehicles(vRes.data.data);
      if (rRes.data.success) setRoutes(rRes.data.data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Transport & Bus Fleet Management</h1>
        <p className="text-sm text-slate-500">School buses, drivers, pickup stops, and student transport assignments</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-800 border-b pb-2">Bus Fleet Roster</h3>
          <div className="space-y-3">
            {vehicles.map((v) => (
              <div key={v._id} className="p-3 border rounded-xl bg-slate-50 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{v.vehicleNumber} ({v.vehicleModel})</h4>
                  <p className="text-xs text-slate-500">Driver: {v.driverName} | Phone: {v.driverPhone}</p>
                </div>
                <span className="px-2.5 py-1 bg-sky-50 text-sky-700 text-xs font-bold rounded-lg border border-sky-100">
                  Cap: {v.capacity} Seats
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-800 border-b pb-2">Active Transport Routes</h3>
          <div className="space-y-3">
            {routes.map((r) => (
              <div key={r._id} className="p-3 border rounded-xl bg-slate-50 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-indigo-700 text-sm">{r.routeName}</h4>
                  <span className="text-xs text-slate-400">{r.assignedStudents?.length || 1} Students</span>
                </div>
                <div className="text-xs text-slate-600">
                  {r.startPoint} ➔ {r.endPoint}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
