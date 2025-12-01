import React, { useState, useEffect } from 'react';
import { Plus, TrendingUp, Calendar, Target, Settings } from 'lucide-react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import AddMeal from './components/AddMeal';
import Analytics from './components/Analytics';
import Profile from './components/Profile';
import { NutritionEngine } from './engine/NutritionEngine';
import { INDIAN_FOODS } from './data/indianFoods';

const App = () => {
  const [view, setView] = useState('dashboard');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [profile, setProfile] = useState({ age: 19, sex: 'male', weight: 65, height: 173.7, activity: 'sedentary', goal: 'fat_loss' });
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const profileData = localStorage.getItem('nutrition-profile-v2');
    if (profileData) setProfile(JSON.parse(profileData));
    const mealsData = localStorage.getItem('nutrition-meals-v2');
    if (mealsData) setMeals(JSON.parse(mealsData));
  }, []);

  useEffect(() => {
    localStorage.setItem('nutrition-profile-v2', JSON.stringify(profile));
    localStorage.setItem('nutrition-meals-v2', JSON.stringify(meals));
  }, [profile, meals]);

  const engine = new NutritionEngine(profile);
  const targets = engine.calculateTargets();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto">
        <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white p-8 rounded-xl shadow-2xl mb-6 text-center">
          <h1 className="text-4xl font-bold mb-2">My Nutritionist</h1>
          <p className="text-blue-100">AI-Powered • Indian Foods • Made for Students</p>
        </header>

        <Navbar view={view} setView={setView} />

        <div className="bg-white rounded-xl shadow-lg p-4 mb-6 flex items-center gap-3">
          <Calendar size={24} className="text-blue-600" />
          <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="px-4 py-2 border rounded-lg font-medium flex-1" />
          <span className="text-sm text-gray-600 hidden md:block">{new Date(selectedDate).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>

        {view === 'dashboard' && <Dashboard selectedDate={selectedDate} meals={meals} setMeals={setMeals} engine={engine} targets={targets} profile={profile} />}
        {view === 'add' && <AddMeal selectedDate={selectedDate} meals={meals} setMeals={setMeals} profile={profile} INDIAN_FOODS={INDIAN_FOODS} />}
        {view === 'analytics' && <Analytics selectedDate={selectedDate} meals={meals} engine={engine} targets={targets} profile={profile} />}
        {view === 'profile' && <Profile profile={profile} setProfile={setProfile} engine={engine} />}
      </div>
    </div>
  );
};

export default App;
