 function BalanceCard  ({ label, value, positive }){
 return  (
  <div className="border p-4 rounded-lg shadow-sm text-center">
    <p className="text-gray-600 text-sm">{label}</p>
    <p className={`text-xl font-semibold ${positive ? 'text-green-600' : 'text-black'}`}>{value}</p>
  </div>
);}
export default BalanceCard;