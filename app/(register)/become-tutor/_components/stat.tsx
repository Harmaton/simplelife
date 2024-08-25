'use client'

import React from 'react'
import { Users, BookOpen, Globe, Award } from 'lucide-react';
import CountUp from 'react-countup'

export default function Stat() {
  const stats = [
    { icon: Users, number: 2000, title: 'Tutores' },
    { icon: BookOpen, number: 10000, title: 'Estudiantes' },
    { icon: Globe, number: 50, title: 'Países' },
    { icon: Award, number: 500, title: 'Cursos' },
  ];

  return (
    <div className="bg-background p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="flex flex-col items-center justify-center p-4 rounded-lg ">
            <stat.icon className="w-12 h-12 mb-4 text-blue-500" />
            <CountUp
              end={stat.number}
              duration={2.5}
              className="text-3xl font-bold mb-2"
            />
            <h3 className="text-lg font-medium font-serif">{stat.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
