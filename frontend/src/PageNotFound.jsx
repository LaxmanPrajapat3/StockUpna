import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-7xl font-bold text-indigo-600">404</h1>
        <h2 className="text-2xl font-semibold mt-4 text-gray-800">Page Not Found</h2>
        <p className="text-gray-600 mt-2">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition duration-300"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
