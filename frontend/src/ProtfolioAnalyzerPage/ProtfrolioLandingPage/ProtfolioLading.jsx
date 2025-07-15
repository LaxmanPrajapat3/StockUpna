 import NavBar from "./NavBar";
 import Hero from "./Hero";
 import FeatureSection from './FeatureSection'
import AuthCheck from "../../authCheckfunction/AuthCheck";

    
    const ProtfolioPage = () => {
      
      return (
        <AuthCheck>
        <div className="min-h-screen bg-gray-50">
          <NavBar></NavBar>
          <Hero></Hero>
          <FeatureSection></FeatureSection>
        </div> </AuthCheck>
      );
    };

  export default ProtfolioPage;