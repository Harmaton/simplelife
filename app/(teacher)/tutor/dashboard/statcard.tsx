interface StatCardProps {
    icon: React.ReactNode; // to allow any valid React element as the icon
    value: string | number; // to allow both string or number types for value
    label: string; // the label text
    bgColor: string; // background color as a string
  }
  
  const StatCard: React.FC<StatCardProps> = ({ icon, value, label, bgColor }) => (
    <div className={`${bgColor} p-4 rounded-lg flex items-center`}>
      {icon}
      <div className="ml-4">
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-sm text-gray-600">{label}</div>
      </div>
    </div>
  );
  
  export default StatCard;
  