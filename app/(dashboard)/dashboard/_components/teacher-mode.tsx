'use client'

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
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
    return <div className='m-auto'> <svg
    className="animate-spin h-10 w-10 text-indigo-500"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
>
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v2a6 6 0 100 12v2a8 8 0 01-8-8z" />
</svg></div>
  }

  return (
    <Button className="bg-background font-mono border p-2 border-violet-500 tex-center transition-colors hover:violet-500" onClick={handleClick}>
      {isTeacher ? '👨‍🏫 Ir al Modo Profesor' : '📝 Convertirse en Profesor'}
    </Button>
  );
}
