//one Dollar = rs  87.454

import BalanceCard from "./BalanceCard";
import StockCard from "./StockCard";
import { useState,useEffect } from "react";
import axios from "axios";


export default function Hero() {
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


  const [balance, setBalance] = useState(100000);
  const [holdings, setHoldings] = useState(0);
  const [profitLoss, setProfitLoss] = useState(0);
  const [investment, setInvestment] = useState(0);
  const [leaderboardRank] = useState(50000);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStock, setSelectedStock] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message,setMessage]=useState();

useEffect(()=>{
  const  fetchData=async()=>{
    const data= await getData();
    if(data){
      setBalance(data.balance || 100000);
      setHoldings(data.holdings ||0);
      setProfitLoss(data.profitLoss || 0);
      setInvestment(data.investment || 0);
    }

  }
  fetchData();
},[])  // this empty array ensures this effect runs only once after the initial render
 

  const stockList = [
  { symbol: 'AAPL', name: 'Apple Inc.' },
  { symbol: 'MSFT', name: 'Microsoft Corporation' },
  { symbol: 'GOOGL', name: 'Alphabet Inc. (Class A)' },
  { symbol: 'GOOG', name: 'Alphabet Inc. (Class C)' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.' },
  { symbol: 'META', name: 'Meta Platforms Inc.' },
  { symbol: 'TSLA', name: 'Tesla Inc.' },
  { symbol: 'NVDA', name: 'NVIDIA Corporation' },
  { symbol: 'NFLX', name: 'Netflix Inc.' },
  { symbol: 'INTC', name: 'Intel Corporation' },
  { symbol: 'ORCL', name: 'Oracle Corporation' },
  { symbol: 'IBM', name: 'International Business Machines' },
  { symbol: 'PEP', name: 'PepsiCo Inc.' },
  { symbol: 'KO', name: 'The Coca-Cola Company' },
  { symbol: 'WMT', name: 'Walmart Inc.' },
  { symbol: 'PFE', name: 'Pfizer Inc.' },
  { symbol: 'JNJ', name: 'Johnson & Johnson' },
  { symbol: 'XOM', name: 'Exxon Mobil Corporation' },
  { symbol: 'CVX', name: 'Chevron Corporation' },
  { symbol: 'DIS', name: 'The Walt Disney Company' },
  { symbol: 'CSCO', name: 'Cisco Systems Inc.' },
  { symbol: 'CRM', name: 'Salesforce Inc.' },
  { symbol: 'BMY', name: 'Bristol-Myers Squibb Company' },
  { symbol: 'ABT', name: 'Abbott Laboratories' },
  { symbol: 'MRK', name: 'Merck & Co., Inc.' },
  { symbol: 'MCD', name: 'McDonald’s Corporation' },
  { symbol: 'NKE', name: 'Nike Inc.' },
  { symbol: 'BA', name: 'The Boeing Company' },
  { symbol: 'VZ', name: 'Verizon Communications Inc.' },
  { symbol: 'T', name: 'AT&T Inc.' },
  { symbol: 'WBA', name: 'Walgreens Boots Alliance Inc.' },
  { symbol: 'C', name: 'Citigroup Inc.' },
  { symbol: 'BAC', name: 'Bank of America Corporation' },
  { symbol: 'JPM', name: 'JPMorgan Chase & Co.' },
  { symbol: 'GS', name: 'The Goldman Sachs Group Inc.' },
  { symbol: 'AXP', name: 'American Express Company' },
  { symbol: 'PYPL', name: 'PayPal Holdings Inc.' },
  { symbol: 'ADBE', name: 'Adobe Inc.' },
  { symbol: 'AMD', name: 'Advanced Micro Devices Inc.' },
  { symbol: 'QCOM', name: 'QUALCOMM Inc.' },
  { symbol: 'SPGI', name: 'S&P Global Inc.' },
  { symbol: 'BLK', name: 'BlackRock Inc.' },
  { symbol: 'UPS', name: 'United Parcel Service Inc.' },
  { symbol: 'FDX', name: 'FedEx Corporation' },
  { symbol: 'EBAY', name: 'eBay Inc.' },
  { symbol: 'LYFT', name: 'Lyft Inc.' },
  { symbol: 'UBER', name: 'Uber Technologies Inc.' },
  { symbol: 'SHOP', name: 'Shopify Inc.' },
  { symbol: 'SNOW', name: 'Snowflake Inc.' }
];




  const filteredStocks = stockList.filter(
    stock => stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
             stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStockClick = async (stock) => {
    
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`http://localhost:8000/api/price/${stock.symbol}`);
      const data = await res.json();
      console.log(data);
      setSelectedStock({
        ...stock,
        // converted price  in rs
        price: data.price*87.454,
        change: data.percentChange,
      });
    } catch (err) {
      setError("Failed to fetch live price");
      console.error(err);
      
    }
    setLoading(false);
  };



const handleBuy = () => {
    if (selectedStock) {
        const totalCost = selectedStock.price * quantity;
        if (balance >= totalCost) {
            setBalance(prev => prev - totalCost);
            setInvestment(prev => prev + totalCost);
            setHoldings(prev => prev + totalCost);
            setProfitLoss(prev => prev + (totalCost * selectedStock.change / 100));
        }
    }
};

// Use useEffect to watch for changes in the relevant state variables
useEffect(() => {
    // This code will run whenever balance, investment, holdings, or profitLoss change
    const sendInvestmentData=async()=>{
      try{
const response=   axios.post('http://localhost:8000/user/investmentInfo', {
        balance: balance,
        investment: investment,
        holdings: holdings,
        profitLoss: profitLoss,
    },{withCredentials:true});
  
    console.log(response.data.message);
      } catch(error){
        console.error("Error sending investemnet data: ");
      }
    }
    sendInvestmentData();
 
}, [balance, investment, holdings, profitLoss]); // The dependency array

  const handleSell = () => {
    if (selectedStock) {
      const totalValue = selectedStock.price * quantity;
      if (holdings >= totalValue) {
        setBalance(prev => prev + totalValue);
        setInvestment(prev => prev - totalValue);
        setHoldings(prev => prev - totalValue);
        setProfitLoss(prev => prev - (totalValue * selectedStock.change / 100));
      }
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto grid gap-6 mt-25 mb-10">
{<p>message</p>&&message}
      <h1 className="text-3xl font-bold text-center">Virtual Trading</h1>
      
      <p className="text-center text-gray-600 text-lg">Available Balance</p>
      <p className="text-center text-4xl font-semibold text-black">{balance.toLocaleString()}</p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <BalanceCard label="Current Holdings" value={`₹${holdings.toLocaleString()}`} />
        <BalanceCard label="Profit/Loss" value={`₹${profitLoss.toFixed(0)}`} positive={profitLoss >= 0} />
        <BalanceCard label="Total Investment" value={`₹${investment.toLocaleString()}`} />
        <BalanceCard label="Leaderboard" value={`#${leaderboardRank}`} />
      </div>

      <div className="border rounded-lg p-4 shadow-sm ">
        <div className="grid grid-cols-3 gap-2 items-center">
          <input
            type="text"
            placeholder="Search stocks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full mb-4 p-2 border rounded-md col-span-2"
          />
          <button className="mb-4">
            <i className="fa-solid fa-magnifying-glass text-2xl"></i>
          </button>
        </div>

        <div className="grid gap-2">
          {/* {filteredStocks.map(stock => (
            <div
              key={stock.symbol}
              className={`p-2 border rounded cursor-pointer ${selectedStock?.symbol === stock.symbol ? 'bg-green-100' : ''}`}
              onClick={() => handleStockClick(stock)}
            >
              {stock.symbol} - {stock.name}
            </div>
          ))} */}
          {searchTerm ?filteredStocks.map(stock => (
            <div
              key={stock.symbol}
              className={`p-2 border rounded cursor-pointer ${selectedStock?.symbol === stock.symbol ? 'bg-green-100' : ''}`}
              onClick={() => handleStockClick(stock)}
            >
              {stock.symbol} - {stock.name}
            </div>)):filteredStocks.slice(0,7).map(stock =>(
          <div key={stock.symbol}
          className={`p-2 border rounded cursor-pointer ${selectedStock?.symbol === stock.symbol ? 'bg-green-100' : ''}`}
          onClick={() => handleStockClick(stock)}
          > 
          {stock.symbol}  -{stock.name}
          
          </div>
          ))}

        </div>
      </div>

      {loading && <p className="text-center text-blue-600">Fetching live price...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      {selectedStock && !loading && (
        <div className="border rounded-lg p-4 shadow-sm">
          <StockCard
            symbol={selectedStock.symbol}
            name={selectedStock.name}
            price={selectedStock.price}
            change={selectedStock.change}
            quantity={quantity}
            onQuantityChange={(e) => setQuantity(Number(e.target.value))}
            onBuy={handleBuy}
            onSell={handleSell}
          />
        </div>
      )}
    </div>
  );
  
}
