import React, { useState } from 'react';
import { Save } from 'lucide-react';

const Profile = ({ profile, setProfile, engine, targets }) => {
  const [editing, setEditing] = useState(false);
  const [temp, setTemp] = useState(profile);

  const handleSave = () => {
    setProfile(temp);
    setEditing(false);
  };

  const bmr = engine.calculateBMR();
  const tdee = engine.calculateTDEE();

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Profile Information</h3>
          <button onClick={() => setEditing(!editing)} className={`px-4 py-2 rounded-lg ${editing ? 'bg-gray-600 text-white' : 'bg-blue-600 text-white'}}`}>
            {editing ? 'Cancel' : 'Edit'}
          </button>
        </div>

        {!editing ? (
          <div className="space-y-3">
            <div><span className="font-medium">Age:</span> {profile.age} years</div>
            <div><span className="font-medium">Sex:</span> {profile.sex}</div>
            <div><span className="font-medium">Weight:</span> {profile.weight} kg</div>
            <div><span className="font-medium">Height:</span> {profile.height} cm</div>
            <div><span className="font-medium">Activity:</span> {profile.activity}</div>
            <div><span className="font-medium">Goal:</span> {profile.goal}</div>
          </div>
        ) : (
          <div className="space-y-3">
            <input type="number" value={temp.age} onChange={e => setTemp({...temp, age: parseInt(e.target.value)})} placeholder="Age" className="w-full px-4 py-2 border rounded-lg" />
            <select value={temp.sex} onChange={e => setTemp({...temp, sex: e.target.value})} className="w-full px-4 py-2 border rounded-lg">
              <option>male</option>
              <option>female</option>
            </select>
            <input type="number" value={temp.weight} onChange={e => setTemp({...temp, weight: parseFloat(e.target.value)})} placeholder="Weight (kg)" className="w-full px-4 py-2 border rounded-lg" />
            <input type="number" value={temp.height} onChange={e => setTemp({...temp, height: parseFloat(e.target.value)})} placeholder="Height (cm)" className="w-full px-4 py-2 border rounded-lg" />
            <select value={temp.activity} onChange={e => setTemp({...temp, activity: e.target.value})} className="w-full px-4 py-2 border rounded-lg">
              <option value="sedentary">Sedentary</option>
              <option value="light">Light Activity</option>
              <option value="moderate">Moderate Activity</option>
              <option value="very_active">Very Active</option>
            </select>
            <select value={temp.goal} onChange={e => setTemp({...temp, goal: e.target.value})} className="w-full px-4 py-2 border rounded-lg">
              <option value="fat_loss">Fat Loss</option>
              <option value="maintenance">Maintenance</option>
              <option value="muscle_gain">Muscle Gain</option>
              <option value="general_health">General Health</option>
            </select>
            <button onClick={handleSave} className="w-full px-4 py-2 bg-green-600 text-white rounded-lg flex items-center justify-center gap-2">
              <Save size={18} /> Save Profile
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-sm text-gray-600">Basal Metabolic Rate</div>
          <div className="text-3xl font-bold text-blue-600">{Math.round(bmr)}</div>
          <div className="text-sm text-gray-600 mt-1">calories/day at rest</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-sm text-gray-600">Total Daily Energy Expenditure</div>
          <div className="text-3xl font-bold text-green-600">{Math.round(tdee)}</div>
          <div className="text-sm text-gray-600 mt-1">calories/day (activity included)</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {['calories', 'protein', 'carbs', 'fat'].map(nutrient => (
          <div key={nutrient} className="bg-white p-4 rounded-lg shadow text-center">
            <div className="text-sm text-gray-600 capitalize">{nutrient}</div>
            <div className="text-2xl font-bold text-blue-600 mt-2">{Math.round(targets[nutrient])}</div>
            <div className="text-xs text-gray-500 mt-1">{nutrient === 'calories' ? 'kcal' : 'g'}/day</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
