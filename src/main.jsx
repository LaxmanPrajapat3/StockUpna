import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import './index.css'
import App from './App.jsx'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import LoginPage from './landingpage/Login/LoginPage.jsx';
import Signup from './landingpage/Signup/Signup.jsx';
import NavBar from './landingpage/NavBar.jsx';
import Footer from './landingpage/Footer.jsx';
createRoot(document.getElementById('root')).render(
 
  <BrowserRouter>
  <NavBar/>
  <Routes>

<Route path='/' element={<App/>}/>
<Route path='/login' element={<LoginPage/>}/>
<Route path='/signup' element={<Signup/>}/>
  </Routes>

  <Footer/>
  </BrowserRouter>
)
