"use server";

import { db } from "@/lib/db";
import { teacherformSchema } from "@/types";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Resend } from "resend";
import { z } from "zod";

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
    if (user) {
      return user.isTeacher;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

export const fetchStudent = async (userId: string) => {
  try {
    const student = await db.user.findUnique({
      where: {
        clerkId: userId,
      },
      select: {
        isStudent: true,
      },
    });
    if (student === null || student === undefined) {
      return false;
    }
    return student.isStudent;
  } catch (error) {
    console.log("[GET_STUDENT_ACTIONS]", error);
    return false;
  }
};

export async function deleteTeacherProfile(id: string) {
  try {
    const user = await db.user.update({
      where: {
        id: id,
      },
      data: {
        isTeacher: false,
        isRegistered: false,
        isadmin: false,
      },
    });

    return { mesage: `${user.nickname} ha sido cancelado` };
  } catch (error) {
    console.log(error);
    return { message: "No se pudo eliminar" };
  }
}

export async function getTeacherDeatails(email: string) {
  try {
    const teacherDetails = await db.user.findUnique({
      where: {
        email: email,
        isTeacher: true,
      },
    });
    return teacherDetails;
  } catch (error) {
    return null;
  }
}

export async function getAllStudents() {
  try {
    const students = await db.user.findMany({
      where: {
        isStudent: true,
      },
    });
    return students;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getAllTeachers() {
  try {
    const teachers = await db.user.findMany({
      where: {
        isTeacher: true,
      },
    });
    return teachers;
  } catch (error) {
    return [];
  }
}

export async function getAllUsers() {
  try {
    const users = await db.user.findMany({});
    return users;
  } catch (error) {
    return [];
  }
}

export async function getUserByUID(id: string) {
  try {
    const user = await db.user.findUnique({
      where: {
        clerkId: id,
      },
    });

    return user;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllRegistredTeachers() {
  try {
    const teachers = await db.user.findMany({
      where: {
        isRegistered: true,
        isTeacher: false,
      },
    });
    return teachers;
  } catch (error) {
    return [];
  }
}

export async function checkTeacherMode(userid: string): Promise<boolean> {
  try {
    const user = await db.user.findUnique({
      where: {
        id: userid,
      },
    });

    if (!user) {
      return false;
    }

    return user.isTeacher; // Returns true if user exists and is a teacher, false otherwise
  } catch (error) {
    console.error("Error checking teacher mode:", error);
    return false; // Return false in case of any error
  }
}

export async function submitTutorRegistration( input: z.infer<typeof teacherformSchema> & {
  whatsappFull: string;
} ) {
  try {
    const clerkuser = await currentUser();

    if (!clerkuser) {
      return { success: false, message: "Failed to Request Approval" };
    }

    const email = clerkuser.emailAddresses[0].emailAddress

    const user = await db.user.upsert({
      where: { email: email },
      update: {
        nickname: input.name,
        linkedIn: input.linkedin,
        whatsapp: input.whatsappFull,
        description: input.description,
        profession: input.profession,
        isRegistered: true,
      },
      create: {
        clerkId: clerkuser.id,
        email: email,
        nickname: input.name,
        linkedIn: input.linkedin,
        whatsapp: input.whatsappFull,
        description: input.description,
        profession: input.profession,
        isRegistered: true,
      },
    });
    redirect('/become-tutor')
  } catch (error) {
    console.error("Error submitting tutor registration:", error);
    return { success: false, message: "Failed to Request Approval" };
  }
}

export async function DisApproveTeacher(teacherId: string) {
  try {
    const approved = await db.user.update({
      where: {
        id: teacherId,
      },
      data: {
        isTeacher: false,
        isRegistered: false,
      },
    });

    return { success: true, approved };
  } catch (error) {
    console.error("Error approving teacher:", error); // Log the error for debugging
    return { success: false, message: "Failed to approve teacher" }; // Return a failure response
  }
}

// export async function ApproveTeacher(teacherId: string) {
//   try {
//     const approved = await db.user.update({
//       where: {
//         id: teacherId
//       },
//       data: {
//         isTeacher: true,
//         isRegistered: false
//       }
//     });

//     const to = approved.email
//     const nickname = approved.nickname
//     const subject = 'Approval for Teacher Status on Simplelife'
//     const replyContent = `Estimado/a ${nickname}, ha sido añadido/a a la plataforma de enseñanza Simple Life. Por favor, acceda al siguiente enlace para actualizar su perfil y ser visible en nuestra plataforma. Asegúrese de publicar su información.`

//     const {data, error } = await resend.emails.send({
//       from: 'Simple Life Admin <simplelifeofficial.com>',
//       to: [to],
//       subject: subject,
//       react: EmailTemplate({ to, subject, replyContent }),
//     });

//     if (error) {
//       return Response.json({ error }, { status: 500 });
//     }

//     return { success: true, approved };
//   } catch (error) {
//     console.error("Error approving teacher:", error); // Log the error for debugging
//     return { success: false, message: "Failed to approve teacher" }; // Return a failure response
//   }
// }

export async function updateUser(email: string, values: any) {
  try {
    const user = await db.user.update({
      where: {
        email: email,
      },
      data: {
        ...values,
      },
    });
    return { success: true, user };
  } catch (error) {
    console.log("[Update User Image]", error);
  }
}

export async function checkRegistration(email: string) {
  try {
    const user = await db.user.findUnique({
      where: {
        email: email,
      },
    });
    if (user) {
      const registred = user.isRegistered;
      return registred;
    }
    return false;
  } catch (error) {
    return false;
  }
}

export async function GetAllTutors() {
  try {
    const tutors = await db.user.findMany({
      where: {
        isTeacher: true,
        nickname: {not: null},
        image: {not: null}
      },
    });

    return tutors;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getOneUser(userid: string) {
  try {
    const userdb = await db.user.findUnique({
      where: {
        email: userid,
      },
    });

    return userdb;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getTeacher(id: string) {
  try {
    const teacher = await db.user.findUnique({
      where: {
        id: id,
      },
    });
    return teacher;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getUserID(id: string) {
  try {
    const user = await db.user.findUnique({
      where: {
        clerkId: id,
      },
    });
    return user?.id;
  } catch (error) {
    console.log(error);
    return null;
  }
}


export async function confirmIsTeacher(){
  try {

    const {userId} = auth()
    if(!userId){
      return false
    }

    const user = await db.user.findUnique({
      where: {
        clerkId: userId
      }
    })

    if(user){
      return user.isTeacher
    }

    return false

  } catch (error) {
    console.log(error)
    return false
  }
}

export async function confirmIsRegistred(){
  try {

    const {userId} = auth()
    if(!userId){
      return false
    }

    const user = await db.user.findUnique({
      where: {
        clerkId: userId
      }
    })

    if(user){
      return user.isRegistered
    }

    return false

  } catch (error) {
    console.log(error)
    return false
  }
}