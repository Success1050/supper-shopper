interface StatCardProps {
  title: string;
  value?: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export const StatCard = ({
  title,
  value,
  subtitle,
  children,
}: StatCardProps) => (
  <div className="bg-[#2c2954] rounded-lg p-4 w-full">
    <h4 className="text-white font-semibold mb-2 text-2xl">{title}</h4>
    {children ? (
      children
    ) : (
      <>
        <div className="text-white text-lg font-bold mb-1">{value}</div>
        {subtitle && <div className="text-blue-200 text-xs">{subtitle}</div>}
      </>
    )}
  </div>
);
