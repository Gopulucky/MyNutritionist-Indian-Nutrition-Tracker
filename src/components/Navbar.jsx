import React from 'react';
import { Plus, TrendingUp, Settings } from 'lucide-react';

const Navbar = ({ view, setView }) => (
  <nav className="bg-white rounded-xl shadow-lg mb-6 p-2 flex gap-2 overflow-x-auto">
    <button onClick={() => setView('dashboard')} className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${view === 'dashboard' ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-gray-100'}`}>
      Dashboard
    </button>
    <button onClick={() => setView('add')} className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${view === 'add' ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-gray-100'}`}>
      <Plus size={20} /> Add Meal
    </button>
    <button onClick={() => setView('analytics')} className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${view === 'analytics' ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-gray-100'}`}>
      <TrendingUp size={20} /> Analytics
    </button>
    <button onClick={() => setView('profile')} className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${view === 'profile' ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-gray-100'}`}>
      <Settings size={20} /> Profile
    </button>
  </nav>
);

export default Navbar;
