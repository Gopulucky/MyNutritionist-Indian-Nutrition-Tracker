import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingDown, Calendar } from 'lucide-react';

const Analytics = ({ meals, engine, targets }) => {
  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      days.push(d.toISOString().split('T')[0]);
    }
    return days;
  };

  const dailyData = getLast7Days().map(date => {
    const dayMeals = meals.filter(m => m.date === date);
    const totals = { calories: 0, protein: 0 };
    dayMeals.forEach(m => {
      totals.calories += m.calories || 0;
      totals.protein += m.protein || 0;
    });
    return {
      date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      calories: totals.calories,
      protein: totals.protein,
      target: targets.calories
    };
  });

  const tdee = engine.calculateTDEE();
  const prediction = dailyData.length > 0
    ? ((dailyData[dailyData.length - 1].calories - tdee) * 7) / 7700
    : 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="text-blue-600" size={24} />
            <h3 className="text-lg font-bold">TDEE</h3>
          </div>
          <div className="text-3xl font-bold text-blue-600">{Math.round(tdee)}</div>
          <div className="text-sm text-gray-600 mt-2">calories/day for maintenance</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center gap-2 mb-4">
            <TrendingDown className="text-green-600" size={24} />
            <h3 className="text-lg font-bold">Weight Prediction</h3>
          </div>
          <div className="text-3xl font-bold text-green-600">{prediction.toFixed(1)}</div>
          <div className="text-sm text-gray-600 mt-2">kg/week change estimate</div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-bold mb-4">Last 7 Days - Calories</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dailyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="calories" fill="#3b82f6" name="Consumed" />
            <Bar dataKey="target" fill="#10b981" name="Target" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-bold mb-4">Protein Intake Trend</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={dailyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="protein" stroke="#8b5cf6" strokeWidth={2} name="Protein (g)" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Analytics;
