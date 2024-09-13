import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface CardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  change: number;
  lastMonthTotal: string;
  isIncrease: boolean;
}

export const GridCard: React.FC<CardProps> = ({ icon, title, value, change, lastMonthTotal, isIncrease }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <div className="p-2 rounded-full bg-blue-100">{icon}</div>
        <ArrowUpRight className="text-gray-400" size={20} />
      </div>
      <h3 className="text-gray-500 font-medium mb-2">{title}</h3>
      <p className="text-3xl font-bold mb-2">{value}</p>
      <div className="flex items-center text-sm">
        <span className={`mr-2 ${isIncrease ? 'text-green-500' : 'text-red-500'}`}>
          {isIncrease ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
          {change}%
        </span>
        <span className="text-gray-500">last month total {lastMonthTotal}</span>
      </div>
    </div>
  );
};
