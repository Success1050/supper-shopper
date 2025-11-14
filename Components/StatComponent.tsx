interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
}

export const StatCard = ({
  icon,
  title,
  value,
  change,
  isPositive,
}: StatCardProps) => (
  <div className="bg-[#2b2a54] p-6">
    <div className="flex items-start justify-between mb-4">
      <span className="text-indigo-300 text-xs font-medium">{title}</span>
      <div className="bg-indigo-800/50 p-2 rounded-lg">{icon}</div>
    </div>
    <div className="flex items-end justify-between">
      <h3 className="text-white text-3xl font-bold">{value}</h3>
      <span
        className={`text-sm font-medium ${
          isPositive ? "text-green-400" : "text-red-400"
        }`}
      >
        {change}
      </span>
    </div>
  </div>
);
