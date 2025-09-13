import React from "react";
import HeaderDashboard from "./HeaderDashboard";

const PackageSelection: React.FC = () => {
  const packages = [
    {
      price: "$10",
      tasksPerDay: 4,
      rewardPerTask: "$0.10",
      dailyIncome: "$0.40",
    },
    {
      price: "$35",
      tasksPerDay: 6,
      rewardPerTask: "$0.15",
      dailyIncome: "$0.90",
    },
    {
      price: "$100",
      tasksPerDay: 8,
      rewardPerTask: "$0.25",
      dailyIncome: "$2.00",
    },
    {
      price: "$200",
      tasksPerDay: 10,
      rewardPerTask: "$0.50",
      dailyIncome: "$5.00",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 p-6">
      <div>
        <div className="mb-8">
          <h1 className="text-white text-3xl font-bold mb-2">Buy A Package</h1>
          <p className="text-gray-300 text-sm">
            Choose the package that fits your goals and start earning by
            completing tasks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className="bg-gray-800/60 backdrop-blur-sm rounded-lg p-6 border border-gray-700/50"
            >
              <div className="text-center mb-6">
                <div className="text-white text-3xl font-bold mb-2">
                  {pkg.price}
                </div>
                <div className="text-gray-400 text-sm">One-time payment</div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 text-sm">Tasks Per Day</span>
                  <span className="text-white font-medium">
                    {pkg.tasksPerDay}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 text-sm">Reward Per Task</span>
                  <span className="text-green-400 font-medium">
                    {pkg.rewardPerTask}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 text-sm">Daily Income</span>
                  <span className="text-green-400 font-bold">
                    {pkg.dailyIncome}
                  </span>
                </div>
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200">
                Buy Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PackageSelection;
