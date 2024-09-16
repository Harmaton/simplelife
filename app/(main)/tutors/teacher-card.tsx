'use client'

import { User } from '@prisma/client';
import Image from 'next/image';
import React from 'react';

interface Teacher {
    teacher: User
}

function TeacherCard({teacher}: Teacher){
  return (
    <a href={`/tutors/${teacher.id}`} className="block no-underline">
      <div className="relative bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
        {/*  corner borders */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-blue-500"></div>
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-purple-500"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-violet-500"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-blue-500"></div>
        
     { teacher.image ?  <Image src={teacher.image} alt={'teacher name'} width={350} height={350}  className="w-full h-48 object-cover" /> : <Image src={'/logo-1.png'} alt={'teacher name'} width={350} height={350} className="w-full h-48 object-cover" />}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800">{teacher.nickname}</h3>
          <p className="text-gray-600">{teacher.profession}</p>
        </div>
      </div>
    </a>
  );
};

export default TeacherCard;