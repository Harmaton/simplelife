import { EmailTemplate } from "@/components/email-template";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Teacher ID is required" },
        { status: 400 }
      );
    }
    const teacher = await db.user.update({
      where: {
        id: id,
      },
      data: {
        isTeacher: true,
        isRegistered: false,
      },
    });

    if (!teacher) {
      return NextResponse.json(
        { success: false, error: "Teacher not found" },
        { status: 404 }
      );
    }

    if (!teacher.email) {
      return NextResponse.json(
        { success: false, error: "Teacher email not found" },
        { status: 400 }
      );
    }

    const to = teacher.email;
    const subject = "Aprobación del Estado de Profesor en Simplelife";
    const replyContent = `Estimado/a ${teacher.email}, ha sido añadido/a a la plataforma de enseñanza Simple Life. Por favor, acceda al siguiente enlace para actualizar su perfil y ser visible en nuestra plataforma. Asegúrese de publicar su información.`;

    const { data, error } = await resend.emails.send({
      from: "Simple Life Official <no-reply@simplelifeofficial.com>",
      to: [to],
      subject: subject,
      react: EmailTemplate({ to, subject, replyContent }),
    });

    if (error) {
      console.error("RESEND_ERROR", error);
      return NextResponse.json(
        { success: false, error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
