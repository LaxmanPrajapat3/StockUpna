import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../authCheckfunction/AuthProvider';
import { useNavigate } from 'react-router-dom';
import App from '../LoadingSpinner';
import axios from 'axios';

const CustomAlertsPage = () => {
  const [stock, setStock] = useState('INFY');
  const [price, setPrice] = useState('');
  const [goal, setGoal] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();
  const { isLoggedIn, loading, user } = useContext(AuthContext);

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate, loading]);

  if (loading) return <App />;

  const handleSetAlert = async () => {
    if (!price) return setMessage('⚠️ Price is required.');
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKENDURL}/user/custom-alert`, {
       
        stock,
        price: parseFloat(price)
      },{withCredentials:true});
      setMessage('✅ Alert set successfully!');
      setPrice('');
    } catch (error) {
      console.error(error);
      setMessage('❌ Failed to set alert.');
    }
  };

  const handleSaveGoal = async () => {
    if (!goal || !month || !year) return setMessage('⚠️ All fields are required.');
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKENDURL}/user/goals`, {
       
        goal,
        month,
        year
      },{withCredentials:true
      });
      setGoal('');
      setMonth('');
      setYear('');
     setMessage('✅ Goal saved successfully!');
    } catch (error) {
      console.error(error);
      setMessage('❌ Failed to save goal.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8 mt-20">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Custom Alerts & Goals</h1>

        {message && <p className="text-sm text-center mb-4 text-emerald-700">{message}</p>}

        {/* Stock Alert */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Stock Alert</h2>
          <label className="block text-sm font-medium mb-1">Stock</label>
          <select
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="w-full border rounded-md p-2 mb-3"
          >
          <option>AAPL</option>
<option>MSFT</option>
<option>GOOGL</option>
<option>GOOG</option>
<option>AMZN</option>
<option>META</option>
<option>TSLA</option>
<option>NVDA</option>
<option>NFLX</option>
<option>INTC</option>
<option>ORCL</option>
<option>IBM</option>
<option>PEP</option>
<option>KO</option>
<option>WMT</option>
<option>PFE</option>
<option>JNJ</option>
<option>XOM</option>
<option>CVX</option>
<option>DIS</option>
<option>CSCO</option>
<option>CRM</option>
<option>BMY</option>
<option>ABT</option>
<option>MRK</option>
<option>MCD</option>
<option>NKE</option>
<option>BA</option>
<option>VZ</option>
<option>T</option>
<option>WBA</option>
<option>C</option>
<option>BAC</option>
<option>JPM</option>
<option>GS</option>
<option>AXP</option>
<option>PYPL</option>
<option>ADBE</option>
<option>AMD</option>
<option>QCOM</option>
<option>SPGI</option>
<option>BLK</option>
<option>UPS</option>
<option>FDX</option>
<option>EBAY</option>
<option>LYFT</option>
<option>UBER</option>
<option>SHOP</option>
<option>SNOW</option>

          </select>

          <label className="block text-sm font-medium mb-1">Alert me if price crosses</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="₹ 1500"
            className="w-full border rounded-md p-2 mb-3"
          />

          <button
            onClick={handleSetAlert}
            className="w-full bg-emerald-600 text-white py-2 rounded hover:bg-emerald-700 transition"
          >
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
                type="number"
                min="1"
                max="12"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                placeholder="1"
                
                className="w-full border rounded-md p-2"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Target Year</label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="2025"
                className="w-full border rounded-md p-2"
              />
            </div>
          </div>

          <button
            onClick={handleSaveGoal}
            className="w-full bg-emerald-600 text-white py-2 rounded hover:bg-emerald-700 transition"
          >
            Save Goal
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomAlertsPage;
