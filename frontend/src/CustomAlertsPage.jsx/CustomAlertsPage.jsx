import { useState } from 'react';
import AuthCheck from '../authCheckfunction/AuthCheck';

const CustomAlertsPage = () => {
  const [stock, setStock] = useState('INFY');
  const [price, setPrice] = useState('');
  const [goal, setGoal] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  return (
    <AuthCheck>
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Custom Alerts & Goals</h1>

        {/* Stock Alert */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Stock Alert</h2>
          <label className="block text-sm font-medium mb-1">Stock</label>
          <select
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="w-full border rounded-md p-2 mb-3"
          >
            <option>INFY</option>
            <option>TCS</option>
            <option>RELIANCE</option>
            <option>HDFC</option>
          </select>

          <label className="block text-sm font-medium mb-1">Alert me if</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="₹ 1,500"
            className="w-full border rounded-md p-2 mb-3"
          />

          <button className="w-full bg-emerald-600 text-white py-2 rounded hover:bg-emerald-700 transition">
            Set Alert
          </button>
        </div>

        {/* Investment Goal */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Investment Goal</h2>

          <label className="block text-sm font-medium mb-1">Goal</label>
          <input
            type="text"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="Save ₹50,000 in equity"
            className="w-full border rounded-md p-2 mb-3"
          />

          <div className="flex gap-2 mb-3">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Target Month</label>
              <input
                type="text"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                placeholder="October"
                className="w-full border rounded-md p-2"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Target Year</label>
              <input
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="2025"
                className="w-full border rounded-md p-2"
              />
            </div>
          </div>

          <button className="w-full bg-emerald-600 text-white py-2 rounded hover:bg-emerald-700 transition">
            Save Goal
          </button>
        </div>
      </div>
    </div>
    </AuthCheck>

  );
};

export default CustomAlertsPage;
