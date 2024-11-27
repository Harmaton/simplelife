import React from 'react';
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  iconColor: string;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, iconColor, title, description }) => {
  return (
    <Card
      className="w-[350px] bg-white m-auto p-6 justify-center items-center text-center shadow-md rounded-lg relative overflow-hidden"
      data-aos="fade-up"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-blue-50 opacity-50" />
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle, #4f46e5 1px, transparent 1px), radial-gradient(circle, #3b82f6 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 10px 10px',
          opacity: 0.1,
        }} />
      </div>
      <div className="relative z-10">
        <CardHeader className="flex items-center space-x-3 mb-4">
          <div className={`h-12 w-12 ${iconColor} mb-2 flex items-center justify-center rounded-lg mr-4`}>
            <Icon className="text-white p-2 rounded-lg h-8 w-8 text-3xl" />
          </div>
          <h1 className="font-bold">{title}</h1>
        </CardHeader>
        <CardContent>{description}</CardContent>
      </div>
    </Card>
  );
};

export default FeatureCard;