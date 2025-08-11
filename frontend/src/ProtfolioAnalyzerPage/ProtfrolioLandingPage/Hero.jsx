import { useNavigate } from "react-router-dom";

// Hero Section Component
const Hero = () => {
      const navigater=useNavigate();
      const handleonclick=()=>{
console.log("button is click on 1");
navigater('/protfolio/protfolioAnlyze');
      }
      return (
        <div className="text-center py-16 pb-65 pt-45">
          <h1 className="text-5xl font-bold mb-4">Portfolio Analyzer</h1>
          <p className="text-lg mb-8">
            Gain valuable insights into the health and performance of your investment portfolio.
          </p>
          <button className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600" onClick={handleonclick}>
            Analyze Portfolio
          </button>
        </div>
      );
    };

export default Hero;