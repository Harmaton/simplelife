"use server";

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

