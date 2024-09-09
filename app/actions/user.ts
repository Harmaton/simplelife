"use server";

import { EmailTemplate } from "@/components/email-template";
import { auth } from "@/firebase";
import { db } from "@/lib/db";
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY);
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

export async function getTeacherDeatails(userid: string) {
  try {
    const teacherDetails = await db.user.findUnique({
      where: {
        clerkId: userid,
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

export async function getAllStudents(){
  try {
    const students = await db.user.findMany({where: {
      isStudent: true
    }})
    return students
  } catch (error) {
    console.log(error)
    return []
  }
}

export async function getAllTeachers(){
  try {
    const teachers = await db.user.findMany({where: {
      isTeacher: true
    }})
    return teachers
  } catch (error) {
    return []
  }
}

export async function getAllRegistredTeachers(){
  try {
    const teachers = await db.user.findMany({where: {
      isRegistered: true,
      isTeacher: false
    }})
    return teachers
  } catch (error) {
    return []
  }
}

export async function checkTeacherMode(userid: string): Promise<boolean> {
  try {
    const user = await db.user.findUnique({
      where: {
        id: userid
      }
    });

    if(!user){
      return false
    }
    
    return user.isTeacher // Returns true if user exists and is a teacher, false otherwise
  } catch (error) {
    console.error("Error checking teacher mode:", error);
    return false; // Return false in case of any error
  }
}

export async function submitTutorRegistration({ name, profession, description, whatsappFull, linkedin, userId, email }: {
  name: string;
  profession: string;
  description: string;
  whatsappFull: string;
  linkedin: string;
  userId: string;
  email: string

}) {
  try {
    // Upsert the user record based on the user schema
    await db.user.upsert({
      where: { clerkId: userId },
      update: {
        nickname: name,
        linkedIn: linkedin,
        whatsapp: whatsappFull,
        description: description,
        profession: profession, 
        isRegistered: true
      },
      create: {
        clerkId: userId,
        nickname: name,
        linkedIn: linkedin,
        whatsapp: whatsappFull,
        description: description,
        email: email,
        profession: profession,
        isRegistered: true
      },
    });

    return { success: true, message: "Tutor registration submitted successfully"};
  } catch (error) {
    console.error("Error submitting tutor registration:", error);
    throw new Error("Failed to submit tutor registration");
  }
}

export async function DisApproveTeacher(teacherId: string) {
  try {
    const approved = await db.user.update({
      where: {
        id: teacherId
      },
      data: {
        isTeacher: false,
        isRegistered: false
      }
    });

    return { success: true, approved };
  } catch (error) {
    console.error("Error approving teacher:", error); // Log the error for debugging
    return { success: false, message: "Failed to approve teacher" }; // Return a failure response
  }
}

export async function ApproveTeacher(teacherId: string) {
  try {
    const approved = await db.user.update({
      where: {
        id: teacherId
      },
      data: {
        isTeacher: true
      }
    });

    const to = approved.email
    const nickname = approved.nickname
    const subject = 'Approval for Teacher Status on Simplelife'
    const replyContent = `Estimado/a ${nickname}, ha sido añadido/a a la plataforma de enseñanza Simple Life. Por favor, acceda al siguiente enlace para actualizar su perfil y ser visible en nuestra plataforma. Asegúrese de publicar su información.`

    const {data, error } = await resend.emails.send({
      from: 'Simple Life Admin <simplelifeofficial.com>',
      to: [to],
      subject: subject,
      react: EmailTemplate({ to, subject, replyContent }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return { success: true, approved }; 
  } catch (error) {
    console.error("Error approving teacher:", error); // Log the error for debugging
    return { success: false, message: "Failed to approve teacher" }; // Return a failure response
  }
}