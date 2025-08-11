import React, { useState, useEffect ,useContext} from 'react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { Gauge } from '@mui/x-charts/Gauge';

import { AuthContext } from '../../authCheckfunction/AuthProvider';
import { useNavigate } from 'react-router-dom';

import App from '../../LoadingSpinner';
const PortfolioAnalyzer = () => {
  const getData=async()=>{
try{

const response=await  fetch('http://localhost:8000/user/getInvestmentdata',{credentials:'include'});
const data =await response.json();
if(!data)return null;
console.log(data.balance);

return data;
}catch(error){
  console.error('There was a problem with the fetch operation:',error);
  return null;
}
  }
const [balance,setbalance]=useState(200000);
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [currentValue, setCurrentValue] = useState(0);
  const [profitLoss, setProfitLoss] = useState(0);
  const [riskLevel, setRiskLevel] = useState(10);

  
  useEffect(()=>{
    const  fetchData=async()=>{
      const data= await getData();
      if(data){
        setbalance(data.balance ||0);
        setCurrentValue(data.holdings || 200000);
        setProfitLoss(data.profitLoss || 0);
        setTotalInvestment(data.investment || 0);
      }
  
    }
    fetchData();
  },[])  // this empty array ensures this effect runs only once after the initial render

  const sectorData = [
    { id: 0, value: 10, label: 'Technology', color: '#10B981' },
    { id: 1, value: 20, label: 'Finance', color: '#34D399' },
    { id: 2, value: 15, label: 'Healthcare', color: '#6EE7B7' },
    { id: 3, value: 15, label: 'Other', color: '#A7F3D0' },
  ];

  const assetData = [
    { id: 0, value: 50, label: 'Stocks', color: '#10B981' },
    { id: 1, value: 30, label: 'Mutual Funds', color: '#34D399' },
    { id: 2, value: 20, label: 'Bonds', color: '#6EE7B7' },
  ];

  

//   useEffect(() => {
//   const interval = setInterval(() => {
//     // Change only currentValue by ±0.5%
//     setCurrentValue(prev => {
//       const change = prev * (Math.random() * 0.01 - 0.005); // -0.5% to +0.5%
//       return +(prev + change).toFixed(2);
//     });

//     // Keep totalInvestment stable unless needed
//     setTotalInvestment(prev => +(prev).toFixed(2));

//     // Calculate profit/loss from latest values
//     setProfitLoss(cv => +(cv - totalInvestment).toFixed(2));

//     // Smooth risk changes
//     setRiskLevel(prev =>
//       Math.min(100, Math.max(0, prev + (Math.random() * 4 - 2))) // -2 to +2 risk change
//     );
//   }, 1000); // update every second

//   return () => clearInterval(interval);
// }, [totalInvestment]);
useEffect(() => {
  let startingValue = currentValue; // from API once
  let investmentValue = totalInvestment; // from API once

  const interval = setInterval(() => {
    // Simulate ±0.5% change from current value
    startingValue = +(startingValue * (1 + (Math.random() - 0.5) / 100)).toFixed(2);

    // Update state with new simulated value
    setCurrentValue(startingValue);

    // Recalculate profit/loss using fixed investment
    setProfitLoss(+(startingValue - investmentValue).toFixed(2));

    // Smooth risk change
    setRiskLevel(prev =>
      Math.min(100, Math.max(0, prev + (Math.random() * 4 - 2)))
    );
  }, 1000);

  return () => clearInterval(interval);
}, [currentValue, totalInvestment]); // currentValue & totalInvestment set from API once


  const getColorByRisk = (level) => {
    if (level < 33) return '#10B981';   // Green
    if (level < 66) return '#FACC15';   // Yellow
    return '#EF4444';                   // Red
  };
 const [gaugeColor, setGaugeColor] = useState(getColorByRisk(riskLevel));


useEffect(() => {
  setGaugeColor(getColorByRisk(riskLevel));
}, [riskLevel]);

const navigate=useNavigate();

  const {isLoggedIn,loading}=useContext(AuthContext);
useEffect(()=>{
  if(!loading&&!isLoggedIn){
    navigate('/login');
  }
},[isLoggedIn,navigate,loading])

 if (loading) {
  return <App/>
}

  return (
  <>
 

  
   
    <div className="container mx-auto  bg-white rounded-lg shadow-lg mt-50 mb-20 ">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Portfolio Analyzer</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-lg font-semibold text-gray-700">Total Balance</p>
           
           <p className="text-2xl text-teal-600">{balance.toLocaleString()}</p>
          <p className="text-lg font-semibold text-gray-700">Total Investment</p>

          <p className="text-2xl text-teal-600">{totalInvestment.toLocaleString()}</p>
          <p className="text-lg font-semibold text-gray-700">Current Value</p>
          <p className="text-2xl text-teal-600">{currentValue.toLocaleString()}</p>
          <p className="text-lg font-semibold text-gray-700">Net Profit/Loss</p>
          <p className={`text-2xl {profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {profitLoss.toLocaleString()}
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-lg font-semibold text-gray-700">Asset Sector Allocation</p>
          <PieChart
            series={[
              {
                data: sectorData,
                arcLabel: (item) => `${item.label} (${item.value}%)`,
                arcLabelMinAngle: 45,
              },
            ]}
            width={500}
            height={300}
            slotProps={{
              legend: { hidden: true },
            }}
            sx={{
              [`& .${pieArcLabelClasses.root}`]: {
                fill: 'white',
                fontWeight: 'bold',
              },
            }}
           className='text-sm'/>
          <ul className="mt-2 text-sm text-gray-600">
            {sectorData.map((item) => (
              <li key={item.id} className="flex items-center">
                <span className="w-3 h-3 mr-2" style={{ backgroundColor: item.color }}></span>
                {item.label}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-lg font-semibold text-gray-700">Asset Type Allocation</p>
          <PieChart
            series={[
              {
                data: assetData,
                arcLabel: (item) => `${item.label} (${item.value}%)`,
                arcLabelMinAngle: 45,
              },
            ]}
            width={450}
            height={250}
            slotProps={{
              legend: { hidden: true },
            }}
            sx={{
              [`& .${pieArcLabelClasses.root}`]: {
                fill: 'white',
                fontWeight: 'bold',
              },
            }}
         className='text-sm'  />
          <ul className="mt-2 text-sm text-gray-600">
            {assetData.map((item) => (
              <li key={item.id} className="flex items-center">
                <span className="w-3 h-3 mr-2" style={{ backgroundColor: item.color }}></span>
                {item.label}
              </li>
            ))}
          </ul>
        </div>
    <div className="bg-gray-50 p-4 rounded-lg transition-all duration-700 ease-in-out">
  <p className="text-lg font-semibold text-gray-700">Risk Analysis</p>

  <Gauge
    key={gaugeColor} // force re-render when color changes
    value={riskLevel}
    startAngle={-110}
    endAngle={110}
    width={200}
    height={200}
    cornerRadius={10}
    color={gaugeColor}
  />

  <p
    className="text-center text-sm font-semibold mt-2 transition-colors duration-700"
    style={{ color: gaugeColor }}
  >
    {riskLevel < 33 ? 'Low' : riskLevel < 66 ? 'Medium' : 'High'}
  </p>
</div>


        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-lg font-semibold text-gray-700">Suggestions</p>
          <div className="flex items-center justify-center h-32">
            <div className="text-teal-600">
              <svg className="w-16 h-16 mb-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12zm1-7h-2v5h2V9zm0-2h-2V5h2v2z"/>
              </svg>
              <p className="text-center">Reduce tech sector exposure</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    </>

  );
};

export default PortfolioAnalyzer;