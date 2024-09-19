import { z } from "zod";

export const teacherSchema = z.object({
    nickname: z.string().min(2).max(50),
    country: z.string().min(2).max(50),
    description: z.string().min(2),
    linkedIn: z.string(),
    youtube: z.string(),
    whatsapp: z.string(),
    facebook: z.string(),
    mail: z.string(),
    instagram: z.string(),
    profession: z.string()
  });

export type TeacherSchema = z.infer<typeof teacherSchema>;

export const updateTeacherSchema = teacherSchema.extend({
  id: z.string().min(1),
});

