"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Book } from "@prisma/client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

interface DescriptionFormProps {
  initialData?: Book;
};

const formSchema = z.object({
    title: z.string().min(1, {
    message: "Se requiere descripción",
  }),
  decsription: z.string().min(1, {
    message: "Se requiere descripción",
  }),
  pointRedeem: z.string() ,
  author: z.string().min(1, {
    message: "Se requiere descripción",
  }),
});

export const PostBookForm = ({
  initialData
}: DescriptionFormProps) => {


  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        title: initialData?.title || "",
        author: initialData?.author || "",
        decsription: initialData?.description || "",
        pointRedeem: initialData?.pointRedeem || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
          console.log(values)
      await axios.post('/api/books', values);

      toast.success("Book Created");
    
      router.refresh();
    } catch {
      toast.error("Algo salió mal");
    }
  }

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4 p-4 "
          >

    <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                    <FormLabel>Titulo del libro</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isSubmitting}
                      placeholder="Por ejemplo... Necesitas leer mi libro sobre...'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

<FormField
              control={form.control}
              name="decsription"
              render={({ field }) => (
                <FormItem>
                    <FormLabel>Descripción del libro</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isSubmitting}
                      placeholder="Descripción del libro...'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


<FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                    <FormLabel>Autor del libro</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isSubmitting}
                      placeholder="Autor del libro '"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />



<FormField
              control={form.control}
              name="pointRedeem"
              render={({ field }) => (
                <FormItem>
                    <FormLabel>Valor de puntos</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      type="number"
                      placeholder="Valor de puntos'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


{/* <h1> Book Cover Image</h1>
     
            <FileUpload
                        endpoint="bookImage"
                        onChange={(url) => {
                        if (url) {
                          onSubmit(
                           { imageUrl: url}
                          )
                        }
                        }}
                    />


            <h1> Book PDF</h1>


<FileUpload
                        endpoint="resourceUrl"
                        onChange={(url) => {
                        if (url) {
                          
                        }
                        }}
                    /> */}


            <div className="flex items-center gap-x-2">
              <Button
                disabled={!isValid || isSubmitting}
                type="submit"
              >
                Ahorrar
              </Button>
            </div>
          </form>
        </Form>
    </div>
  )
}