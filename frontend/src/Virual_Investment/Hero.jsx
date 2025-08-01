

import BalanceCard from "./BalanceCard";
import StockCard from "./StockCard";
import { useState } from "react";

export default function Hero() {
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

const stockList = [
  // 🔷 Indian Companies (NSE Symbols)
  { symbol: 'RELIANCE.NS', name: 'Reliance Industries' },
  { symbol: 'TCS.NS', name: 'Tata Consultancy Services' },
  { symbol: 'INFY.NS', name: 'Infosys Ltd' },
  { symbol: 'HDFCBANK.NS', name: 'HDFC Bank' },
  { symbol: 'ICICIBANK.NS', name: 'ICICI Bank' },
  { symbol: 'SBIN.NS', name: 'State Bank of India' },
  { symbol: 'WIPRO.NS', name: 'Wipro Ltd' },
  { symbol: 'HINDUNILVR.NS', name: 'Hindustan Unilever' },
  { symbol: 'ITC.NS', name: 'ITC Ltd' },
  { symbol: 'LT.NS', name: 'Larsen & Toubro' },
  { symbol: 'AXISBANK.NS', name: 'Axis Bank' },
  { symbol: 'KOTAKBANK.NS', name: 'Kotak Mahindra Bank' },
  { symbol: 'MARUTI.NS', name: 'Maruti Suzuki' },
  { symbol: 'BAJFINANCE.NS', name: 'Bajaj Finance' },
  { symbol: 'ADANIENT.NS', name: 'Adani Enterprises' },
  { symbol: 'ADANIGREEN.NS', name: 'Adani Green Energy' },
  { symbol: 'ADANIPORTS.NS', name: 'Adani Ports' },
  { symbol: 'HCLTECH.NS', name: 'HCL Technologies' },
  { symbol: 'POWERGRID.NS', name: 'Power Grid Corp' },
  { symbol: 'NTPC.NS', name: 'NTPC Ltd' },
  { symbol: 'TITAN.NS', name: 'Titan Company' },
  { symbol: 'ASIANPAINT.NS', name: 'Asian Paints' },
  { symbol: 'BHARTIARTL.NS', name: 'Bharti Airtel' },
  { symbol: 'DMART.NS', name: 'Avenue Supermarts (DMart)' },
  { symbol: 'ULTRACEMCO.NS', name: 'UltraTech Cement' },
  { symbol: 'JSWSTEEL.NS', name: 'JSW Steel' },
  { symbol: 'ONGC.NS', name: 'ONGC Ltd' },
  { symbol: 'COALINDIA.NS', name: 'Coal India' },
  { symbol: 'SUNPHARMA.NS', name: 'Sun Pharma' },
  { symbol: 'BAJAJ_AUTO.NS', name: 'Bajaj Auto' },

  // 🌐 International Companies
  { symbol: 'AAPL', name: 'Apple Inc.' },
  { symbol: 'MSFT', name: 'Microsoft Corporation' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.' },
  { symbol: 'TSLA', name: 'Tesla Inc.' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.' },
  { symbol: 'META', name: 'Meta Platforms Inc.' },
  { symbol: 'NVDA', name: 'NVIDIA Corporation' },
  { symbol: 'NFLX', name: 'Netflix Inc.' },
  { symbol: 'BABA', name: 'Alibaba Group' },
  { symbol: 'ORCL', name: 'Oracle Corporation' },
  { symbol: 'INTC', name: 'Intel Corporation' },
  { symbol: 'IBM', name: 'IBM Corporation' },
  { symbol: 'PEP', name: 'PepsiCo Inc.' },
  { symbol: 'KO', name: 'Coca-Cola Co' },
  { symbol: 'WMT', name: 'Walmart Inc.' },
  { symbol: 'PFE', name: 'Pfizer Inc.' },
  { symbol: 'JNJ', name: 'Johnson & Johnson' },
  { symbol: 'XOM', name: 'Exxon Mobil Corp.' },
  { symbol: 'CVX', name: 'Chevron Corporation' },
  { symbol: 'DIS', name: 'Walt Disney Co' }
];


  const filteredStocks = stockList.filter(
    stock => stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
             stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStockClick = async (stock) => {
    // prompt("Hello");
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`http://localhost:8000/api/price/${stock.symbol}`);
      const data = await res.json();
      console.log(data);
      setSelectedStock({
        ...stock,
        price: data.price,
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
          {filteredStocks.map(stock => (
            <div
              key={stock.symbol}
              className={`p-2 border rounded cursor-pointer ${selectedStock?.symbol === stock.symbol ? 'bg-green-100' : ''}`}
              onClick={() => handleStockClick(stock)}
            >
              {stock.symbol} - {stock.name}
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
