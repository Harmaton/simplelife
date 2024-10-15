'use server'

import { db } from "@/lib/db";



  export async function createApplication(formData: FormData) { 
    
    const rawFormData = {
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),
    }
 
    // mutate data
    // revalidate cache
  }
 



export async function calculateProfileCompletion(userId: string) {
    const user = await db.user.findUnique({
      where: { id: userId },
    });
  
    if (!user) return { percentage: 0, steps: 0 };
  
    const requiredFields = [
      'nickname',
      'description',
      'profession',
      'country',
      'image',
    ];
  
    const completedFields = requiredFields.filter(field => 
      user[field as keyof typeof user] !== null && 
      user[field as keyof typeof user] !== ''
    );
  
    const percentage = (completedFields.length / requiredFields.length) * 100;
    
    return {
      percentage: Math.round(percentage),
      steps: completedFields.length,
      totalSteps: requiredFields.length,
    };
  }

export async function getTeacherStats(userId: string) {
    const enrolledCourses = await db.course.count({
      where: {
        teacherId: userId,
      },
    });
  
    const activeCourses = await db.course.count({
      where: {
        teacherId: userId,
        Chapter: {
          some: {
            userProgress: {
              some: {
                isCompleted: false,
              },
            },
          },
        },
      },
    });
  
    const completedCourses = await db.course.count({
      where: {
        teacherId: userId,
        Chapter: {
          every: {
            userProgress: {
              some: {
                isCompleted: true,
              },
            },
          },
        },
      },
    });
  
    return {
      enrolledCourses,
      activeCourses,
      completedCourses,
    };
  }