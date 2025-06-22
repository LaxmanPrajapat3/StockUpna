const topics = [ 
  'Introduction to Stock Market',
  'How to Buy Your First Stock',
  'Stock Market Terms You Should Know',
  'Types of Stock Market Orders',
  
    // ✅ New topics
  'Understanding Stock Indices (Sensex, Nifty)',
  'What are IPOs and How to Invest in Them',
  'Difference Between Trading and Investing',
  'What is Market Capitalization',
  'How to Read Stock Charts',
  'Risk Management in Stock Market',
  'Basics of Fundamental vs Technical Analysis',
  'Understanding Dividends and Earnings Reports',
  'How to Analyze a Company Before Investing',
  'What Are Bull and Bear Markets',
  'Introduction to Technical Indicators (RSI, MACD)',
  'How to Build a Stock Watchlist',
  'Common Mistakes New Investors Make',
  'What Influences Stock Prices Daily',
  'Swing Trading vs Long-Term Investing',
  'Using Financial News in Investment Decisions',
  'How to Track Your Investment Portfolio',
  'Introduction to Mutual Funds and ETFs'
];// ✅ added closing bracket

const Sidebar = ({ selectedTopic, onSelect }) => (
  <aside className="bg-gray-100 w-full md:w-64 p-4 overflow-y-auto h-190">
    <h2 className="text-lg font-semibold mb-4">Stock Market Lessons</h2>
    <div className="space-y-2">
      {topics.map(topic => (
        <button
          key={topic}
          onClick={() => onSelect(topic)}
          className={`block w-full text-left px-3 py-2 rounded-md ${
            selectedTopic === topic
              ? 'bg-green-100 text-green-700 font-semibold'
              : 'hover:bg-gray-200'
          }`}
        >
          {topic}
        </button>
      ))}
    </div>
  </aside>
);

export default Sidebar;
