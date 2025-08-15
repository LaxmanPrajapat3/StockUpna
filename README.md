# 📈 StockUpNa — Learn Stock Trading Without Risk

StockUpNa is a **virtual investment learning platform** built with the **MERN stack** that helps beginners practice stock trading without losing real money.  
It combines **live market data**, **AI-powered guidance**, and **portfolio analysis** to bridge the gap between theory and real-world investing.

Live Demo: https://stockupna-056b.onrender.com
 
---

## 🚀 Features

### 🧩 Authentication & Onboarding
- Secure Login/Signup with validation
- Role-based dashboards: Beginner / Investor

### 📈 Live Stock Dashboard
- Real-time stock prices from [Twelve Data API](https://twelvedata.com/)
- Interactive charts & analytics
- Dummy Buy/Sell trades stored in MongoDB

### 💰 Virtual Trading Mode
- Start with ₹1,00,000 virtual balance
- Track profit/loss and holdings
- Leaderboard for friendly competition

### 📊 Portfolio Analyzer
- Diversification Score (e.g., “You hold 90% tech”)
- Sector-wise breakdown (Pie Chart)
- Risk level based on volatility
- Personalized suggestions for balance

### 🤖 Smart Investment Assistant
- AI chatbot powered by OpenAI API
- Answers finance & investment questions

### 🔔 Custom Stock Alerts & Goals
- Set alerts like “INFY > ₹1,500”
- Set investment goals & get notified

### 📚 Learning Mode
- Courses: Stock Market Basics, Mutual Funds 101
- Quizzes to reinforce learning

---

## 🛠 Tech Stack

**Frontend:**  
- React 19, Tailwind CSS, MUI  
- Framer Motion animations  
- React Router, React Hot Toast, Lucide React Icons  

**Backend:**  
- Node.js, Express 5  
- MongoDB with Mongoose ORM  
- JWT Authentication  

**APIs & Tools:**  
- Twelve Data API (Live prices)  
- OpenAI API (AI Assistant)  
- Axios for API requests  

---


---

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
     git clone https://github.com/LaxmanPrajapat3/StockUpna.git
     cd stockupna
2. **Install dependencies**
    cd frontend
    npm install

    cd Backend
    npm install
3.  Create .env in both frontend & backend folders
Add:   
Frontend env:
   VITE_FRONTENDURL=http://localhost:5173
   VITE_BACKENDURL=http://localhost:8000
Backend env:   
   FRONTENDURL=http://localhost:5173
   BACKENDURL=http://localhost:8000
   GOOGLE_API_KEY=your_api_key
   MONGO_ATLAS_URL=your_mongo_connection
   Secret_Key=you can add randm key
   TWELVE_DATA_API_KEY=your_api_key
    
4 .  Run the development servers
  Backend : 
             cd backend
             npm start
  Frontend : 
             cd frontend
             npm run dev


🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss your ideas.

