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
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

const formSchema = z.object({
    title: z.string().min(1, {
        message: "Se requiere title",
    }),
    organizer: z.string().min(1, {
        message: "Se requiere organizer",
    }),
    hotmartLink: z.string().min(1) ,
    price: z.string().min(1) ,
    description: z.string().min(1, {
        message: "Se requiere descripción",
    }),
    requirements: z.string().min(1, {
        message: "Se requiere descripción",
    }),
    showDay: z.date(),
});

const CreatePage = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      organizer: "",
      requirements: "",
      price: "",
      hotmartLink: "",
      showDay: undefined
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/in-person", values);
      router.push(`/admin/inperson/${response.data.id}`);
      toast.success("Evento creado");
    } catch {
      toast.error("Algo salió mal");
    }
  }

  return ( 
    <div className=" w-full flex md:items-center md:justify-center h-full p-4">
      <div>
  
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2 mt-8"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                  Título del Evento
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Un buen título para tu evento."
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
                  Description Evento
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isSubmitting}
                      placeholder="Una buena descripción para tu evento."
                      {...field}
                    />
                      </FormControl>
                  <FormMessage />
                </FormItem>     
              )}
            />
  
          
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                  Precio
                  </FormLabel>
                  <FormControl>
                    <Input
                     type="number"
                      disabled={isSubmitting}
                      placeholder="¿Cuál es el precio para asistir al evento?"
                      {...field}
                    />
                      </FormControl>
                  <FormMessage />
                </FormItem>     
              )}
            />


            <FormField
              control={form.control}
              name="hotmartLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                  Enlace hotmart del evento
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Hot mart Link que atiende utiliza para pagar"
                      {...field}
                    />
                      </FormControl>
                  <FormMessage />
                </FormItem>     
              )}
            />


            <FormField
              control={form.control}
              name="organizer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                  Organizador
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="El nombre detrás de la organización del evento."
                      {...field}
                    />    
                  </FormControl>
                  <FormMessage />
                </FormItem>
                
              )}
            />

<FormField
              control={form.control}
              name="requirements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                  Requisitos
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isSubmitting}
                      placeholder="Requisitos"
                      {...field}
                    />    
                  </FormControl>
                  <FormMessage />
                </FormItem>
                
              )}
            />

        <FormField
              control={form.control}
              name="showDay"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mr-2">FECHA</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Elija una fecha</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
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