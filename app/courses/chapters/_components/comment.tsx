'use client'
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod";
import { Comment } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

type CommentProps = {
    courseId: string
}

const formSchema = z.object({
    content: z.string().min(1),
  });

export const CommentTextarea = ({courseId}: CommentProps) => {
    
  const router = useRouter();
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
          await axios.post(`/api/courses/${courseId}/comments`, values);
          toast.success("Comentario actualizado");
          router.refresh()
    
        } catch (error) {
          toast.error("Algo salió mal");
        }
      };
    

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          content:  "",
        
        },
      });

      const { isSubmitting, isValid } = form.formState;
    
  return (
    <div className="grid w-full gap-2">

<Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                  <Textarea
                   disabled={isSubmitting}
                  placeholder="Escribe tu comentario aquí." 
                  {...field}
                  />
      
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            

            <Button disabled={!isValid || isSubmitting} type="submit">
            Comentario
            </Button>

           
          </form>
        </Form>

    </div>
  )
}


