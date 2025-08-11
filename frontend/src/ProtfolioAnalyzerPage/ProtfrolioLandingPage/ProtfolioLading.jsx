
 import Hero from "./Hero";
 import FeatureSection from './FeatureSection'
import {AuthProvider} from "../../authCheckfunction/AuthProvider";
import { useEffect ,useContext} from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../authCheckfunction/AuthProvider";
import App from "../../LoadingSpinner";
const ProtfolioPage = () => {
      const navigate=useNavigate();
     const {isLoggedIn,loading}=useContext(AuthContext);
useEffect(()=>{
  if(!loading&&!isLoggedIn){
    navigate('/login');
  }
},[isLoggedIn,navigate,loading])
 if (loading) {
  return <App/>
}
      
      return (
        <AuthProvider>
        <div className="min-h-screen bg-gray-50 mt-40 mb-20">
       
          <Hero ></Hero>
          <FeatureSection></FeatureSection>
        </div> 
        
        </AuthProvider>
      );
    };

  export default ProtfolioPage;