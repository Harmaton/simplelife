"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { InHouseEvent } from "@prisma/client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { FileUpload } from "@/components/file-upload";
import { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";

interface DescriptionFormProps {
  initialData?: InHouseEvent;
};

const formSchema = z.object({
    title: z.string().min(1, {
    message: "Se requiere title",
  }),
  organizer: z.string().min(1, {
    message: "Se requiere organizer",
  }),
  pointRedeem: z.string().min(1) ,
  price: z.string().min(1) ,
  description: z.string().min(1, {
    message: "Se requiere descripción",
  }),
  showDay: z.date(),
  startTime: z.string()

});

export const PostEventForm = ({
  initialData
}: DescriptionFormProps) => {


  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        title: initialData?.title || "",
        organizer: initialData?.organizer || "",
        description: initialData?.description || "",
        showDay: initialData?.showDay instanceof Date
        ? initialData.showDay
        : initialData?.showDay
        ? new Date(initialData.showDay)
        : undefined ,
        startTime: initialData?.startTime || ""
        
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
       
      await axios.post('/api/in-person', values);

      toast.success("Evento Created");
    
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
                    <FormLabel>Nombre del evento</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isSubmitting}
                      placeholder="Nombre del evento...'"
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
                    <FormLabel>descripción del evento</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isSubmitting}
                      placeholder="descripción del evento"
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
                    <FormLabel>Organizador de eventos</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isSubmitting}
                      placeholder="Organizador de eventos'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

<FormField
              control={form.control}
              name="startTime"
              render={({ field }) => (
                <FormItem>
                    <FormLabel>Hora en que comenzará el evento</FormLabel>
                  <FormControl>
                  
                    <Input
                      disabled={isSubmitting}
                      type="number"
                      placeholder="Indicar claramente la hora, por ejemplo, 8:30 p. m. (GMT-3)"
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
                  <FormLabel>FECHA</FormLabel>
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
