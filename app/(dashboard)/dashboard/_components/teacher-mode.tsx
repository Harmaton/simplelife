'use client'

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/db';
import { checkTeacherMode } from '@/app/actions/user';


interface TeacherModeProps {
  userId: string;
}

export default function TeacherMode({ userId }: TeacherModeProps) {
  const [isTeacher, setIsTeacher] = useState<boolean | null>(null);
  const router = useRouter();
  useEffect(() => {
    const checkTeacherStatus = async () => {
      try {
        const isTeacherStatus = await checkTeacherMode(userId);
        console.log('user -->', isTeacherStatus);
        setIsTeacher(isTeacherStatus);
      } catch (error) {
        console.error('Error checking teacher status:', error);
        setIsTeacher(false);
      }
    };

    checkTeacherStatus();
  }, [userId]);

  const handleClick = () => {
    if (isTeacher) {
      router.push('/tutor/profile');
    } else {
      router.push('/become-tutor');
    }
  };

  if (isTeacher === null) {
    return <div>Loading...</div>;
  }

  return (
    <Button className="bg-background border p-2 border-violet-500 tex-center transition-colors hover:violet-500" onClick={handleClick}>
      {isTeacher ? '👨‍🏫 Ir al Modo Profesor' : '📝 Convertirse en Profesor'}
    </Button>
  );
}
