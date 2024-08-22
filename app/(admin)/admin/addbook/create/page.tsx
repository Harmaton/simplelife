"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Se requiere título",
  }),
  description: z.string().min(1, {
    message: "Se requiere título",
  }),
  author: z.string().min(1, {
    message: "Se requiere título",
  }),

});

const CreatePage = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      author: ""
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/books", values);
      router.push(`/admin/addbook/${response.data.id}`);
      toast.success("Libro creado");
    } catch {
      toast.error("Algo salió mal");
    }
  }

  return ( 
    <div className="max-full mx-auto flex md:items-center md:justify-center h-full p-4">
      <div>
        <h1 className="text-2xl">
         Libro
        </h1>
        <p className="text-sm text-slate-600">

        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-8"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                  Título del Libro
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="p.ej. a good title"
                      {...field}
                    />

                    
                  </FormControl>
                  <FormMessage />
                </FormItem>     
              )}
            />
            
              <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                  Description Libro
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isSubmitting}
                      placeholder="p.ej. a good description"
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
                  <FormLabel>
                  Author
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="p.ej author"
                      {...field}
                    />

                    
                  </FormControl>
                  <FormMessage />
                </FormItem>

                
                
              )}
            />

            <div className="flex items-center gap-x-2">
              <Link href="/">
                <Button
                  type="button"
                  variant="ghost"
                >
                 Cancelar
                </Button>
              </Link>
              <Button
                type="submit"
                disabled={!isValid || isSubmitting}
              >
                Continuar
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
   );
}
 
export default CreatePage;