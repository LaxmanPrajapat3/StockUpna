// src/components/UserInfoCard.jsx
import React, { useEffect } from "react";

const UserInfoCard = ({ goalsAndAlertData }) => {
  // ✅ Destructure from props
  const { customAlertData = [], investmentGoalData = [] } = goalsAndAlertData || {};

  useEffect(() => {
    console.log("Investment Goals:", investmentGoalData);
    console.log("Custom Alerts:", customAlertData);
  }, [investmentGoalData, customAlertData]);

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md mx-auto mb-10">
      {/* Title */}
      <h2 className="text-2xl font-semibold text-teal-600 mb-4">
        Your Investment Overview
      </h2>

      {/* Investment Goals */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-700 mb-2">
          📈 Investment Goals
        </h3>
        {investmentGoalData.length > 0 ? (
          <ul className="space-y-2">
            {investmentGoalData.map((goal, index) => (
              <li
                key={index}
                className="p-3 bg-teal-50 rounded-lg flex justify-between items-center"
              >
                <span className="text-gray-800 font-medium">
                  {goal.goal} ({goal.month}/{goal.year})
                </span>
                {goal.amount && (
                  <span className="text-teal-600 font-bold">₹{goal.amount}</span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-sm">No goals set yet.</p>
        )}
      </div>

      {/* Stock Price Alerts */}
      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-2">
          🔔 Stock Price Alerts
        </h3>
        {customAlertData.length > 0 ? (
          <ul className="space-y-2">
            {customAlertData.map((alert, index) => (
              <li
                key={index}
                className="p-3 bg-yellow-50 rounded-lg flex justify-between items-center"
              >
                <span className="text-gray-800 font-medium">
                  {alert.stock}
                </span>
                <span className="text-yellow-600 font-bold">
                  ₹{alert.price}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-sm">No alerts set yet.</p>
        )}
      </div>
    </div>
  );
};

export default UserInfoCard;
