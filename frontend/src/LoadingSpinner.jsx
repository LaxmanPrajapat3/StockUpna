import React, { useState, useEffect } from 'react';

// A reusable Loading Spinner component
const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center space-x-3">
      <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
      <span className="text-lg font-medium text-gray-700">Loading...</span>
    </div>
  );
};


// Main App component to demonstrate the spinner
export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate a data fetch or a long-running process
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000*60); // Hide spinner after 3 seconds

    // Cleanup the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-gray-100 font-sans">
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800">Content Loaded!</h1>
            <p className="mt-2 text-gray-600">The loading spinner has disappeared.</p>
          </div>
        )}
      </div>
    </div>
  );
}


