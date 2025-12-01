import React, { useState } from 'react';

const AddMeal = ({ selectedDate, meals, setMeals, INDIAN_FOODS }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [mealType, setMealType] = useState('lunch');

  const search = () => {
    const q = query.toLowerCase();
    setResults(INDIAN_FOODS.filter(f => f.name.toLowerCase().includes(q)));
  };

  const addFood = (food) => {
    const newMeal = {
      id: Date.now(),
      date: selectedDate,
      name: food.name,
      mealType,
      ...food
    };
    setMeals([...meals, newMeal]);
    setQuery('');
    setResults([]);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-bold mb-4">Meal Type</h3>
        <div className="grid grid-cols-4 gap-2">
          {['breakfast', 'lunch', 'dinner', 'snacks'].map(t => (
            <button key={t} onClick={() => setMealType(t)}
              className={`py-3 rounded-lg capitalize ${mealType === t ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-bold mb-4">Search Food</h3>
        <div className="flex gap-2 mb-4">
          <input value={query} onChange={e => setQuery(e.target.value)} onKeyPress={e => e.key === 'Enter' && search()}
            placeholder="dal, roti, paneer..." className="flex-1 px-4 py-2 border rounded-lg" />
          <button onClick={search} className="px-6 py-2 bg-blue-600 text-white rounded-lg">Search</button>
        </div>

        <div className="space-y-2">
          {results.map((f, i) => (
            <div key={i} className="p-4 bg-gray-50 rounded-lg flex justify-between items-center">
              <div className="font-medium">{f.name} - {f.calories}cal</div>
              <button onClick={() => addFood(f)} className="px-4 py-2 bg-green-600 text-white rounded">Add</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddMeal;
