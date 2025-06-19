  const FeatureCard = ({ icon, title, description }) => {
      return (
        <div className="flex flex-col items-center text-center p-6">
          <div className="w-16 h-16 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
            <span className="text-3xl">{icon}</span>
          </div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      );
    };

    export default FeatureCard;