"use server";

import { auth } from "@/firebase";
import { db } from "@/lib/db";


export async function checkIsStudent(email: string) {
  try {
    const user = await db.user.findUnique({
      where: {
        email: email,
      },
      select: {
        isStudent: true,
      },
    });

    if (user === undefined || user === null) {
      return false;
    }
    return user.isStudent;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function checkIsAdmin(email: string) {
  try {
    const user = await db.user.findUnique({
      where: {
        email: email,
      },
      select: {
        isadmin: true,
      },
    });

    if (user === undefined || user === null) {
      return false;
    }
    return user.isadmin;
  } catch (error) {
    console.log(error);
    return false;
  }
}


export async function checkIsTeacher(email: string) {
  try {
    const user = await db.user.findUnique({
      where: {
        email: email,
      },
      select: {
        isTeacher: true,
      },
    }); 

    if (user === undefined || user === null) {
      return false;
    }

    return user.isTeacher;
  } catch (error) {
    console.log(error);
    return false;
  }
}



export const fetchStudent = async (userId: string) => {

  try{
      const student = await db.user.findUnique({
          where: {
              clerkId: userId
          },
          select: {
              isStudent: true
          }    
      })
      if(student === null || student === undefined){
        return false
      }
      return student.isStudent
  } catch (error){
      console.log("[GET_STUDENT_ACTIONS]", error)
      return false
  }
}

export async function deleteTeacherProfile() {
  try {
    const user = auth.currentUser;
    if (user) {
      await db.user.delete({
        where: {
          clerkId: user.uid,
        },
      });
    }
   
  } catch (error) {
    console.log(error);
  }
}

export async function getTeacherDeatails() {
  try {
    const user = auth.currentUser
    if(!user || user === undefined){
      return null
    }

    const teacherDetails = await db.user.findUnique({
      where: {
        clerkId: user.uid,
        isTeacher: true
      }
    })

    if(!teacherDetails){
      return null
    }

    return teacherDetails
  } catch (error) {
    return null
  }
  
}