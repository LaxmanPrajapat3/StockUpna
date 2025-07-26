
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import LoginPage from './landingpage/Login/LoginPage.jsx';
import Signup from './landingpage/Signup/Signup.jsx';
import NavBar from './landingpage/NavBar.jsx';
import Footer from './landingpage/Footer.jsx';
import Chatbot from './landingpage/Chatbot.jsx';
import ProtfolioLandingPage from './ProtfolioAnalyzerPage/ProtfrolioLandingPage/ProtfolioLading.jsx';
 import PortfolioAnalyzer from '../src/ProtfolioAnalyzerPage/ProtfolioAnalyzerMainPage/ProtfolioAnalyzer.jsx'
 import Virtual_Investment from './Virual_Investment/Virtual_Investment.jsx';
 import LearningPage from './LearningPage/LearningPage.jsx';
 import CustomAlertsPage from './CustomAlertsPage.jsx/CustomAlertsPage.jsx';
 import PageNotFound from './PageNotFound.jsx';
import { AuthProvider } from './authCheckfunction/AuthProvider.jsx';
 
function Layout() {
  const location = useLocation();
  const hideNav = location.pathname === '/protfolio'; // condition to hide NavBar
  const hideNav2=location.pathname ==='/protfolio/protfolioAnlyze';  

  return (
    <>
      {!hideNav2&&!hideNav && <NavBar/>}
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/protfolio' element={<ProtfolioLandingPage />} />
      <Route path='/protfolio/protfolioAnlyze' element={<PortfolioAnalyzer/>}/>
      <Route path='/virtualInvestment' element={<Virtual_Investment/>}></Route>
      <Route path='/learnmode' element={<LearningPage/>}></Route>
      <Route path='/customAlerts' element={<CustomAlertsPage/>}></Route>
      <Route path='*' element={<PageNotFound/>}></Route>

      </Routes>


      <Chatbot />
      <Footer />
    </>
  );
}

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AuthProvider>
    <Layout />

  </AuthProvider>
  </BrowserRouter>
);
