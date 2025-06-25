import React from 'react';

export default function About() {
  const data = [
    {
      feature: '🧑‍🏫 Beginner-focused Design',
      StockUpna: '✅ Yes',
      others: '❌ Mostly pro-oriented',
    },
    {
      feature: '💰 ₹1,00,000 Virtual Trading Money',
      StockUpna: '✅ Included',
      others: '✅ But often limited',
    },
    {
      feature: '📚 Learning + Trading Combo',
      StockUpna: '✅ Integrated',
      others: '❌ Usually separate tools',
    },
    {
      feature: '📊 Smart Portfolio Analytics',
      StockUpna: '✅ Built-in',
      others: '❌ Rare for free users',
    },
    {
      feature: '🧠 AI Chat for Financial Queries',
      StockUpna: '✅ Yes (ChatGPT API)',
      others: '❌ Not available',
    },
    {
      feature: '🔔 Alerts & Goal Tracking',
      StockUpna: '✅ Interactive & gamified',
      others: '❌ Usually not included',
    },
    {
      feature: '🏆 Live Leaderboards',
      StockUpna: '✅ Learn with competition',
      others: '❌ Mostly solo experience',
    },
  ];

  return (
    <div className="px-4 sm:px-6 md:px-20 py-10  space-y-16">
      {/* About Intro */}
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        <div className="md:w-1/2 animate-slide-in-left">
          <h2 className="text-2xl font-bold mb-4">🔍 About StockUpna</h2>
          <p className="text-gray-700">
            StockUpna is your entry point into the world of stock markets — no real money, no risk, just pure learning and hands-on experience. Perfect for beginners and college students, it offers:
          </p>
          <ul className="list-disc ml-4 mt-4 space-y-1 text-gray-700">
            <li>📊 Virtual trading with live stock prices</li>
            <li>📘 Interactive lessons and quizzes on market basics</li>
            <li>🏆 Leaderboards to compete and learn with peers</li>
            <li>🎯 Goal-setting to build financial discipline</li>
            <li>📰 News & sentiment dashboard to stay market-aware</li>
          </ul>
        </div>
      </div>

      {/* Learn by Doing */}
      <div className="flex flex-col md:flex-row-reverse md:items-center gap-6">
        <div className="md:w-1/2 animate-slide-in-right">
          <h2 className="text-2xl font-bold mb-4">🎓 StockUpna – Learn by Doing</h2>
          <p className="text-gray-700">
            Tired of just reading about stocks? StockUpna gives you the tools to learn by doing.
          </p>
          <ul className="list-disc ml-4 mt-4 space-y-1 text-gray-700">
            <li>🚀 Simulate real trades with ₹1,00,000 demo cash</li>
            <li>🧩 Understand technical indicators, charts, and strategies</li>
            <li>📚 Build your portfolio with learning-backed decisions</li>
            <li>🤖 Get instant answers from our AI investment assistant</li>
            <li>📅 Track goals like “Save ₹50k in equity by December”</li>
          </ul>
        </div>
      </div>

      {/* Learn. Trade. Grow. */}
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        <div className="md:w-1/2 animate-slide-in-left">
          <h2 className="text-2xl font-bold mb-4">📈 Learn. Trade. Grow.</h2>
          <ul className="list-disc ml-4 mt-2 space-y-1 text-gray-700">
            <li>🧠 Learn concepts like SIPs, IPOs, market cap & more</li>
            <li>📱 Explore an interactive dashboard built for learners</li>
            <li>🔔 Create alerts and trading goals that keep you on track</li>
            <li>🛠 Analyze your portfolio like a pro with zero risk</li>
            <li>🏁 Compete in a gamified leaderboard environment</li>
          </ul>
        </div>
      </div>

      {/* Why Use StockUpna */}
      <div className="flex flex-col md:flex-row-reverse md:items-center gap-6">
        <div className="md:w-1/2 animate-slide-in-right">
          <h2 className="text-2xl font-bold mb-4">✅ Why Use StockUpna?</h2>
          <ol className="list-decimal ml-4 space-y-2 text-gray-700">
            <li><strong>Learn by Doing — Not Just Reading:</strong> StockUpna lets users experience trading in real time — with ₹1,00,000 virtual money.</li>
            <li><strong>No Risk, Real Experience:</strong> Trade with real stock data but fake money.</li>
            <li><strong>Built for Beginners:</strong> Clean, focused, and jargon-free design.</li>
            <li><strong>Full Learning Ecosystem:</strong> Structured lessons, quizzes, AI Q&A, and leaderboards.</li>
            <li><strong>Custom Alerts & Goals:</strong> Set price alerts and savings targets — a habit-building feature.</li>
          </ol>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="animate-slide-in-up">
        <h2 className="text-2xl font-bold text-center mb-6">💎 What Makes StockUpna Unique?</h2>
        <div className="overflow-x-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 min-w-[700px] sm:min-w-full">
            <div className="font-semibold text-gray-700">Feature</div>
            <div className="font-semibold text-green-700">StockUpna</div>
            <div className="font-semibold text-red-700">Other Platforms</div>

            {data.map((item, index) => (
              <React.Fragment key={index}>
                <div className="bg-white p-3 rounded shadow border">{item.feature}</div>
                <div className="bg-green-50 p-3 rounded shadow border">{item.StockUpna}</div>
                <div className="bg-red-50 p-3 rounded shadow border">{item.others}</div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
