 

import FeatureCard from './FeatureCard';
const FeatureSection = () => {
      const features = [
        {
          icon: "🛡️",
          title: "Check Risk Level",
          description: "Understand the overall riskiness of your investments.",
        },
        {
          icon: "🔄",
          title: "Diversification Score",
          description: "Identify if your portfolio is overly-reliant on a single sector or stock.",
        },
        {
          icon: "💡",
          title: "Suggestions",
          description: "Receive tailored recommendations to improve your portfolio allocation.",
        },
      ];

      return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto px-4 pb-50">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      );
    };

export default FeatureSection;