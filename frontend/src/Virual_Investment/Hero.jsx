import BalanceCard from "./BalanceCard";
import StockCard from "./StockCard";
import { useState } from "react";

export default function Hero(){
      const [balance, setBalance] = useState(100000);
      const [holdings, setHoldings] = useState(85750);
      const [profitLoss, setProfitLoss] = useState(5250);
      const [investment, setInvestment] = useState(80500);
      const [leaderboardRank] = useState(7);
      const [searchTerm, setSearchTerm] = useState('');
      const [selectedStock, setSelectedStock] = useState(null);
      const [quantity, setQuantity] = useState(1);
    
      const stockList = [
        { symbol: 'MSFT', name: 'Microsoft', price: 345.23, change: 2.16 },
        { symbol: 'AAPL', name: 'Apple Inc.', price: 190.12, change: 1.78 },
        { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 2725.67, change: -1.22 },
        { symbol: 'TSLA', name: 'Tesla', price: 687.20, change: 0.85 },
        { symbol: 'AMZN', name: 'Amazon', price: 3500.45, change: 1.15 }
      ];
    
      const filteredStocks = stockList.filter(
        stock => stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                 stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
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
    <div className="p-6 max-w-4xl mx-auto grid gap-6">
      <h1 className="text-3xl font-bold text-center">Virtual Trading</h1>
      <p className="text-center text-gray-600 text-lg">Available Balance</p>
      <p className="text-center text-4xl font-semibold text-black">${balance.toLocaleString()}</p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <BalanceCard label="Current Holdings" value={`₹${holdings.toLocaleString()}`} />
        <BalanceCard label="Profit/Loss" value={`₹${profitLoss.toFixed(0)}`} positive={profitLoss >= 0} />
        <BalanceCard label="Total Investment" value={`₹${investment.toLocaleString()}`} />
        <BalanceCard label="Leaderboard" value={`#${leaderboardRank}`} />
      </div>

      <div className="border rounded-lg p-4 shadow-sm">
<div className="grid grid-cols-3 gap-2  items-center">
        <input
          type="text"
          placeholder="Search stocks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full mb-4 p-2 border rounded-md col-span-2"
          />
          <button className=" mb-4"><i class="fa-solid fa-magnifying-glass text-2xl"></i></button>
          </div>
        <div className="grid gap-2">
          {filteredStocks.map(stock => (
            <div
              key={stock.symbol}
              className={`p-2 border rounded cursor-pointer ${selectedStock?.symbol === stock.symbol ? 'bg-green-100' : ''}`}
              onClick={() => setSelectedStock(stock)}
            >
              {stock.symbol} - {stock.name}
            </div>
          ))}
        </div>
      </div>

      {selectedStock && (
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