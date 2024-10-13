import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";

const CircularProgress = ({
  percentage,
  size = 100,
}: {
  percentage: number;
  size: number;
}) => {
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle
        className="text-gray-200"
        strokeWidth={strokeWidth}
        stroke="currentColor"
        fill="transparent"
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      <circle
        className="text-blue-600"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        stroke="currentColor"
        fill="transparent"
        r={radius}
        cx={size / 2}
        cy={size / 2}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text
        x="50%"
        y="50%"
        dy=".3em"
        textAnchor="middle"
        className="text-xl font-bold"
      >
        {`${percentage}%`}
      </text>
    </svg>
  );
};

const Trophy = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
    <path d="M4 22h16"></path>
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
  </svg>
);

const ProgressCircle = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center">
    <CircularProgress percentage={value} size={100} />
    <p className="text-center mt-2 text-sm font-medium">{label}</p>
  </div>
);

export default function Page() {
  const totalProgress = 0;
  const coursesFinished = 0;
  const totalCourses = 0;
  const packsInProgress = 0;

  return (
    <div className="p-6 w-full m-4 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6">
        Panel de Progreso de Certificaciones
      </h1>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <ProgressCircle value={totalProgress} label="Progreso General" />
        <ProgressCircle
          value={totalCourses > 0 ? Math.round((coursesFinished / totalCourses) * 100) : 0}
          label="Cursos Completados"
        />
        <ProgressCircle
          value={totalCourses > 0 ? Math.round((packsInProgress / totalCourses) * 100) : 0}
          label="Paquetes en Progreso"
        />
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-row items-center justify-between pb-2 space-y-0">
            <h2 className="text-lg font-bold">Mis Certificaciones</h2>
            <Trophy />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-500 py-4">
            No hay certificaciones disponibles en este momento.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}