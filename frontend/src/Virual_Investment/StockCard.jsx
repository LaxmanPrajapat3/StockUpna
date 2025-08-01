function StockCard  ({ symbol, name, price, change, quantity, onQuantityChange, onBuy, onSell }) { 
  return (
  <div className="flex flex-col gap-4 ">
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div className="flex flex-col md:flex-row md:items-center gap-2">
        <p className="font-bold text-lg">{symbol}</p>
        <p className="text-gray-700">{name}</p>
        <p className="text-black">₹{price.toFixed(2)}</p>
        <p className={`font-medium ${change >= 0 ? 'text-green-600' : 'text-red-500'}`}>{change >= 0 ? `+${change}%` : `${change}%`}</p>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={onQuantityChange}
          className="w-20 border rounded px-2 py-1 text-sm"
        />
        <button onClick={onBuy} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition">Buy</button>
        <button onClick={onSell} className="border border-gray-400 hover:bg-gray-100 text-black px-4 py-2 rounded-lg transition">Sell</button>
      </div>
    </div>
  </div>
);
}
export default StockCard;