import React, { useState } from 'react';
import {
  ShieldCheck,
  Plus,
  Search,
  Edit2,
  Trash2,
  Car,
  Bike,
  Zap,
  CheckCircle2,
  XCircle,
  Eye,
  Lock,
  LogOut
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import AdminVehicleModal from './AdminVehicleModal';

export default function AdminDashboard() {
  const { vehicles, setVehicles, currentUser, setCurrentUser, evaluateVehicle } = useApp();
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => currentUser?.role === 'admin');
  const [adminEmail, setAdminEmail] = useState('admin@autodezire.com');
  const [adminPassword, setAdminPassword] = useState('admin123');
  const [authError, setAuthError] = useState('');

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);

  // Metrics
  const totalVehicles = vehicles.length;
  const carsCount = vehicles.filter(v => v.category === 'Car').length;
  const bikesCount = vehicles.filter(v => v.category === 'Motorcycle').length;
  const scootersCount = vehicles.filter(v => v.category === 'Scooter').length;

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminEmail === 'admin@autodezire.com' && (adminPassword === 'admin123' || adminPassword === 'admin')) {
      setIsAdminLoggedIn(true);
      setAuthError('');
      const adminUser = { name: 'AutoDezire Admin', email: 'admin@autodezire.com', role: 'admin' };
      setCurrentUser(adminUser);
      localStorage.setItem('autodezire_user', JSON.stringify(adminUser));
    } else {
      setAuthError('Invalid credentials. (Hint: admin@autodezire.com / admin123)');
    }
  };

  const handleSaveVehicle = (vehicleData) => {
    if (vehicleData.id || vehicleData._id) {
      // Update
      setVehicles(prev =>
        prev.map(v => (v.id === vehicleData.id || v._id === vehicleData._id ? vehicleData : v))
      );
    } else {
      // Add
      const newV = {
        ...vehicleData,
        id: `veh_${Date.now()}`,
        _id: `veh_${Date.now()}`,
      };
      setVehicles(prev => [newV, ...prev]);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this vehicle from the database?')) {
      setVehicles(prev => prev.filter(v => v.id !== id && v._id !== id));
    }
  };

  const handleToggleActive = (id) => {
    setVehicles(prev =>
      prev.map(v => (v.id === id || v._id === id ? { ...v, isActive: !v.isActive } : v))
    );
  };

  // Filtered vehicles
  const filtered = vehicles.filter(v => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = !term || v.brand.toLowerCase().includes(term) || v.model.toLowerCase().includes(term);
    const matchesCat = categoryFilter === 'All' || v.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  if (!isAdminLoggedIn) {
    return (
      <div className="max-w-md mx-auto my-12 bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-3xl p-8 shadow-xl animate-fadeIn">
        <div className="w-12 h-12 rounded-2xl bg-purple-600/15 text-purple-500 flex items-center justify-center mx-auto mb-4">
          <Lock className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-black text-center text-gray-900 dark:text-white">
          Admin Portal Access
        </h2>
        <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-1 mb-6">
          Authorized administrators only. Manage automobile database & taxonomy.
        </p>

        {authError && (
          <div className="p-3 mb-4 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-400 text-xs font-semibold">
            {authError}
          </div>
        )}

        <form onSubmit={handleAdminLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
              Admin Email
            </label>
            <input
              type="email"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs text-gray-900 dark:text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition-all"
          >
            Authenticate as Admin
          </button>
        </form>

        <p className="text-[11px] text-gray-400 text-center mt-4">
          Default Demo: <span className="text-purple-400 font-mono">admin@autodezire.com / admin123</span>
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16 max-w-[1400px] mx-auto animate-fadeIn">
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
              Automobile Management
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-purple-600 text-white uppercase tracking-wider">
              Admin
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Add, update, or deactivate automobile records in the AutoDezire catalog.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => {
              setEditingVehicle(null);
              setIsModalOpen(true);
            }}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold shadow-md transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Automobile</span>
          </button>

          <button
            onClick={() => setIsAdminLoggedIn(false)}
            className="p-2.5 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-500 hover:text-rose-500 transition-colors"
            title="Log out of Admin"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-sm">
          <span className="text-xs text-gray-500 font-semibold">Total Automobiles</span>
          <div className="text-2xl font-black text-gray-900 dark:text-white mt-1">
            {totalVehicles}
          </div>
        </div>

        <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-sm">
          <span className="text-xs text-gray-500 font-semibold">Cars</span>
          <div className="text-2xl font-black text-blue-500 mt-1">
            {carsCount}
          </div>
        </div>

        <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-sm">
          <span className="text-xs text-gray-500 font-semibold">Motorcycles</span>
          <div className="text-2xl font-black text-orange-500 mt-1">
            {bikesCount}
          </div>
        </div>

        <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-sm">
          <span className="text-xs text-gray-500 font-semibold">Scooters</span>
          <div className="text-2xl font-black text-emerald-500 mt-1">
            {scootersCount}
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search brand, model..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#111827] text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div className="flex items-center space-x-2">
          {['All', 'Car', 'Motorcycle', 'Scooter'].map(c => (
            <button
              key={c}
              onClick={() => setCategoryFilter(c)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                categoryFilter === c
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-white'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 dark:bg-gray-800/60 text-gray-500 uppercase tracking-wider text-[10px] font-bold border-b border-gray-200 dark:border-gray-800">
              <tr>
                <th className="px-6 py-4">Automobile</th>
                <th className="px-4 py-4">Category / Body</th>
                <th className="px-4 py-4">Price Range</th>
                <th className="px-4 py-4">Engine / Mileage</th>
                <th className="px-4 py-4">Safety</th>
                <th className="px-4 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-gray-700 dark:text-gray-300">
              {filtered.map((v) => (
                <tr key={v.id || v._id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                  <td className="px-6 py-4 flex items-center space-x-3">
                    <div className="w-12 h-10 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center p-1 flex-shrink-0">
                      <img src={v.image} alt={v.model} className="max-h-full max-w-full object-contain" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 dark:text-white">
                        {v.brand} {v.model}
                      </div>
                      <div className="text-[10px] text-gray-400">{v.variantSummary}</div>
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300">
                      {v.bodyType || v.category}
                    </span>
                  </td>

                  <td className="px-4 py-4 font-bold text-emerald-500 dark:text-emerald-400">
                    {v.priceDisplay}
                  </td>

                  <td className="px-4 py-4">
                    <div>{v.engine}</div>
                    <div className="text-[10px] text-gray-400">{v.mileage}</div>
                  </td>

                  <td className="px-4 py-4">
                    <span className="font-bold text-amber-400">{v.safetyRating} ★</span>
                  </td>

                  <td className="px-4 py-4">
                    <button
                      onClick={() => handleToggleActive(v.id || v._id)}
                      className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        v.isActive !== false
                          ? 'bg-emerald-500/15 text-emerald-400'
                          : 'bg-gray-500/15 text-gray-400'
                      }`}
                    >
                      {v.isActive !== false ? (
                        <>
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Active</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3 h-3" />
                          <span>Inactive</span>
                        </>
                      )}
                    </button>
                  </td>

                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => evaluateVehicle(v)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-orange-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      title="View Evaluation"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => {
                        setEditingVehicle(v);
                        setIsModalOpen(true);
                      }}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleDelete(v.id || v._id)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-rose-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      <AdminVehicleModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingVehicle(null);
        }}
        onSave={handleSaveVehicle}
        vehicle={editingVehicle}
      />
    </div>
  );
}
