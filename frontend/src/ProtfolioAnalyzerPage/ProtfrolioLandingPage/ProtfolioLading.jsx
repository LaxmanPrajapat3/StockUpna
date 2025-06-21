 import NavBar from "./NavBar";
 import Hero from "./Hero";
 import FeatureSection from './FeatureSection'

    
    const ProtfolioPage = () => {
      return (
        <div className="min-h-screen bg-gray-50">
          <NavBar></NavBar>
          <Hero></Hero>
          <FeatureSection></FeatureSection>
        </div>
      );
    };

  export default ProtfolioPage;