import React from 'react';
import { PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts';
import { Brain, AlertCircle, Award, Trash2 } from 'lucide-react';

const Dashboard = ({ selectedDate, meals, setMeals, engine, targets, profile }) => {
  const todaysMeals = meals.filter(m => m.date === selectedDate);

  const calculateTotals = () => {
    const totals = { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, calcium: 0, iron: 0 };
    todaysMeals.forEach(m => {
      totals.calories += m.calories || 0;
      totals.protein += m.protein || 0;
      totals.carbs += m.carbs || 0;
      totals.fat += m.fat || 0;
      totals.fiber += m.fiber || 0;
      totals.calcium += m.calcium || 0;
      totals.iron += m.iron || 0;
    });
    return totals;
  };

  const totals = calculateTotals();
  const deficiencies = engine.analyzeDeficiencies(totals, targets);
  const recommendations = engine.generateRecommendations(deficiencies, meals);

  const macroData = [
    { name: 'Protein', value: totals.protein * 4, fill: '#3b82f6' },
    { name: 'Carbs', value: totals.carbs * 4, fill: '#10b981' },
    { name: 'Fat', value: totals.fat * 9, fill: '#f59e0b' }
  ];

  const radarData = [
    { nutrient: 'Protein', actual: Math.min((totals.protein / targets.protein) * 100, 120), target: 100 },
    { nutrient: 'Carbs', actual: Math.min((totals.carbs / targets.carbs) * 100, 120), target: 100 },
    { nutrient: 'Fat', actual: Math.min((totals.fat / targets.fat) * 100, 120), target: 100 },
    { nutrient: 'Fiber', actual: Math.min((totals.fiber / 38) * 100, 120), target: 100 },
    { nutrient: 'Iron', actual: Math.min((totals.iron / targets.iron) * 100, 120), target: 100 },
  ];

  const deleteMeal = (id) => setMeals(meals.filter(m => m.id !== id));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {['Calories', 'Protein', 'Carbs', 'Fat'].map((label, i) => {
          const value = totals[label.toLowerCase()];
          const target = targets[label.toLowerCase()] || 1;
          const colors = ['bg-blue-600', 'bg-green-600', 'bg-yellow-600', 'bg-purple-600'];
          return (
            <div key={label} className="bg-white p-4 rounded-lg shadow">
              <div className="text-sm text-gray-600">{label}</div>
              <div className="text-2xl font-bold">{Math.round(value)}<span className="text-sm">g</span></div>
              <div className="text-xs text-gray-500">/ {Math.round(target)}g</div>
              <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
                <div className={`${colors[i]} h-2 rounded-full`} style={{ width: `${Math.min((value / target) * 100, 100)}%` }} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-bold mb-4">Macro Split</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={macroData} dataKey="value" cx="50%" cy="50%" outerRadius={80} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {macroData.map((e, i) => <Cell key={i} fill={e.fill} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-bold mb-4">Nutrient Balance</h3>
          <ResponsiveContainer width="100%" height={250}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="nutrient" />
              <PolarRadiusAxis domain={[0, 120]} />
              <Radar name="You" dataKey="actual" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
              <Radar name="Target" dataKey="target" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {recommendations.length > 0 && (
        <div className="bg-purple-50 border border-purple-200 p-6 rounded-lg">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="text-purple-600" />
            <h3 className="font-bold">Smart Suggestions</h3>
          </div>
          {recommendations.map((r, i) => (
            <div key={i} className="bg-white p-4 rounded mb-2 flex items-center gap-3">
              {r.priority === 'urgent' ? <AlertCircle className="text-red-600" /> : <Award className="text-green-600" />}
              <div>
                <div className="font-medium">{r.action}</div>
                <div className="text-sm text-gray-600">{r.benefit}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-bold mb-4">Today's Meals</h3>
        {todaysMeals.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No meals added yet!</p>
        ) : (
          todaysMeals.map(meal => (
            <div key={meal.id} className="flex justify-between items-center p-3 bg-gray-50 rounded mb-2">
              <div>
                <div className="font-medium">{meal.name}</div>
                <div className="text-sm text-gray-600">
                  {Math.round(meal.calories)}cal | P:{Math.round(meal.protein)}g | C:{Math.round(meal.carbs)}g | F:{Math.round(meal.fat)}g
                </div>
              </div>
              <button onClick={() => deleteMeal(meal.id)} className="text-red-600">
                <Trash2 size={18} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
