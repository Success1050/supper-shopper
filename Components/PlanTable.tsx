export default function PricingTableSection() {
  const pricingData = [
    {
      package: "$10",
      tasks: "1 task",
      earning: "$0.50",
      daily: "$0.50",
      monthly: "$15",
    },
    {
      package: "$25",
      tasks: "3 tasks",
      earning: "$0.90",
      daily: "$2.70",
      monthly: "$81",
    },
    {
      package: "$50",
      tasks: "5 tasks",
      earning: "$1.20",
      daily: "$6.00",
      monthly: "$180",
    },
    {
      package: "$100",
      tasks: "8 tasks",
      earning: "$1.50",
      daily: "$12.00",
      monthly: "$360",
    },
    {
      package: "$250",
      tasks: "12 tasks",
      earning: "$2.00",
      daily: "$24.00",
      monthly: "$720",
    },
    {
      package: "$500",
      tasks: "17 tasks",
      earning: "$3.00",
      daily: "$51.00",
      monthly: "$1530",
    },
    {
      package: "$1000",
      tasks: "20 tasks",
      earning: "$5.00",
      daily: "$100.00",
      monthly: "$3000",
    },
    {
      package: "$2500",
      tasks: "30 tasks",
      earning: "$10.00",
      daily: "$300.00",
      monthly: "$9000",
    },
  ];

  return (
    <section
      className="py-16 px-4 md:px-8 w-full"
      style={{
        background: "linear-gradient(180deg, #2158D2 0%, #0E3488 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-center lg:justify-between items-start lg:items-center mb-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
              CHOOSE YOUR PLAN &<br />
              START EARNING DAILY
            </h2>
          </div>
          <div className="text-white lg:max-w-md">
            <p className="text-lg leading-relaxed text-center">
              <span className="font-semibold">Subheading:</span> Pick a
              subscription, complete simple tasks, and earn daily rewards. The
              higher the plan, the more you earn.
            </p>
          </div>
        </div>
        <h3 className="text-xl md:text-2xl font-semibold text-white mb-4 text-center lg:text-left">
          Pricing Table
        </h3>

        {/* Table Container with Horizontal Scroll */}
        <div className="overflow-x-auto">
          <div className="min-w-full">
            <table className="w-full border-collapse">
              {/* Table Header */}
              <thead>
                <tr className="border-b border-blue-400">
                  <th className="text-left py-4 px-4 text-white font-semibold text-lg min-w-[100px]">
                    Package
                  </th>
                  <th className="text-left py-4 px-4 text-white font-semibold text-lg min-w-[120px]">
                    Tasks / Day
                  </th>
                  <th className="text-left py-4 px-4 text-white font-semibold text-lg min-w-[140px]">
                    Earning Per Task
                  </th>
                  <th className="text-left py-4 px-4 text-white font-semibold text-lg min-w-[130px]">
                    Daily Earning
                  </th>
                  <th className="text-left py-4 px-4 text-white font-semibold text-lg min-w-[150px]">
                    Monthly Possible
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {pricingData.map((row, index) => (
                  <tr
                    key={index}
                    className="border-b border-blue-400 hover:bg-blue-500 hover:bg-opacity-30 transition-colors"
                  >
                    <td className="py-4 px-4 text-white font-medium">
                      {row.package}
                    </td>
                    <td className="py-4 px-4 text-white">{row.tasks}</td>
                    <td className="py-4 px-4 text-white">{row.earning}</td>
                    <td className="py-4 px-4 text-white">{row.daily}</td>
                    <td className="py-4 px-4 text-white">{row.monthly}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
            Subscribe Now
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors flex items-center justify-center gap-2">
            Compare All Plans
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
