
import { motion } from "framer-motion";

// ✅ Import images so Vite can process them
import FeaturesLogo1 from "../../assets/Features_Logo_1.png";
import LearningModeLogo from "../../assets/Learning_Mode_Logo.png";
import PortfolioAnalyzerLogo from "../../assets/Protfolio_Analyzer_Logo.png";
import CustomAlertsLogo from "../../assets/Custom_Aletrs_Logo.png";
import VirtualInvestmentLogo from "../../assets/virtual_investment.png";

import Chatbot from "../Chatbot";

export default function Features() {
  const features = [
    {
      title: "Smart Investment Assistant",
      desc: "Get answer and guidance through an interactive chat-based assistant",
      src: FeaturesLogo1,
    },
    {
      title: "Learning Mode",
      desc: "Explore educational courses and tutorial’s at your own pace",
      src: LearningModeLogo,
      href: "/learnmode",
    },
    {
      title: "Portfolio Analyzer",
      desc: "View insights into your portfolio’s performance and allocation",
      src: PortfolioAnalyzerLogo,
      href: "/protfolio",
    },
    {
      title: "Custom Alerts & Goals",
      desc: "Set investment goals and get notified of key changes in the market",
      src: CustomAlertsLogo,
      href: "/customAlerts",
    },
    {
      title: "Virtual Trading",
      desc: "Learn Investment Virtually",
      src: VirtualInvestmentLogo,
      href: "/virtualInvestment",
    }
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.2,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section className="w-full py-16 px-4 bg-gray-50">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {features.map((item, index) => (
          <motion.a
            key={index}
            href={item.href}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={index}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)",
            }}
            className="bg-white rounded-xl text-center p-6 cursor-pointer transition duration-300 transform hover:-translate-y-1"
          >
            <div className="mb-4">
              <img alt={item.title} src={item.src} className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="font-semibold text-lg">{item.title}</h3>
            <p className="text-gray-600 text-sm mt-2">{item.desc}</p>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
