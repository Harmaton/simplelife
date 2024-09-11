import { EmailTemplate } from "@/components/email-template";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    const { teacherId } = await req.json();
    try {
        const approved = await db.user.update({
            where: {
                id: teacherId
            },
            data: {
                isTeacher: true,
                isRegistered: false
            }
        });

        if (!approved) {
            return NextResponse.json({ message: 'not approved' });
        }

        const to = approved.email;
        const nickname = approved.nickname;
        const subject = 'Aprobación del Estado de Profesor en Simplelife';
        const replyContent = `Estimado/a ${nickname}, ha sido añadido/a a la plataforma de enseñanza Simple Life. Por favor, acceda al siguiente enlace para actualizar su perfil y ser visible en nuestra plataforma. Asegúrese de publicar su información.`;
        const name = approved.nickname;

        const { data, error } = await resend.emails.send({
            from: 'Simple Life Official <@simplelifeofficial.com>',
            to: [to],
            subject: subject,
            react: EmailTemplate({ to, subject, replyContent, name }),
        });

        if (error) {
            return NextResponse.json({ error });
        }

        return NextResponse.json({ success: true, data });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, error });
    }
}