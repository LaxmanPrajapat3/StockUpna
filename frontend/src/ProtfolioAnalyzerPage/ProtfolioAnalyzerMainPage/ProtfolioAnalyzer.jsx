import React, { useState, useEffect } from 'react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { Gauge } from '@mui/x-charts/Gauge';
import NavBar from '../ProtfrolioLandingPage/NavBar';
import AuthCheck from '../../authCheckfunction/AuthCheck';

const PortfolioAnalyzer = () => {
  const [totalInvestment, setTotalInvestment] = useState(15000);
  const [currentValue, setCurrentValue] = useState(17200);
  const [profitLoss, setProfitLoss] = useState(2200);
  const [riskLevel, setRiskLevel] = useState(50);

  const sectorData = [
    { id: 0, value: 40, label: 'Technology', color: '#10B981' },
    { id: 1, value: 20, label: 'Finance', color: '#34D399' },
    { id: 2, value: 15, label: 'Healthcare', color: '#6EE7B7' },
    { id: 3, value: 15, label: 'Other', color: '#A7F3D0' },
  ];

  const assetData = [
    { id: 0, value: 50, label: 'Stocks', color: '#10B981' },
    { id: 1, value: 30, label: 'Mutual Funds', color: '#34D399' },
    { id: 2, value: 20, label: 'Bonds', color: '#6EE7B7' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTotalInvestment(prev => prev + Math.floor(Math.random() * 100) - 50);
      setCurrentValue(prev => prev + Math.floor(Math.random() * 200) - 100);
      setProfitLoss(currentValue - totalInvestment);
      setRiskLevel(prev => Math.min(100, Math.max(0, prev + Math.floor(Math.random() * 10) - 5)));
    }, 2000);
    return () => clearInterval(interval);
  }, [currentValue, totalInvestment]);

  const getColorByRisk = (level) => {
    if (level < 33) return '#10B981';   // Green
    if (level < 66) return '#FACC15';   // Yellow
    return '#EF4444';                   // Red
  };
 const [gaugeColor, setGaugeColor] = useState(getColorByRisk(riskLevel));


useEffect(() => {
  setGaugeColor(getColorByRisk(riskLevel));
}, [riskLevel]);




  return (
  <>
  <AuthCheck>

  
   <NavBar/>
    <div className="container mx-auto  bg-white rounded-lg shadow-lg mt-25 mb-20 ">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Portfolio Analyzer</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-lg font-semibold text-gray-700">Total Investment</p>
          <p className="text-2xl text-teal-600">${totalInvestment.toLocaleString()}</p>
          <p className="text-lg font-semibold text-gray-700">Current Value</p>
          <p className="text-2xl text-teal-600">${currentValue.toLocaleString()}</p>
          <p className="text-lg font-semibold text-gray-700">Net Profit/Loss</p>
          <p className={`text-2xl ${profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ${profitLoss.toLocaleString()}
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
    
    </AuthCheck>
    </> 
  );
};

export default PortfolioAnalyzer;