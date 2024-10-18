"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader, PlusCircle } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { submitTutorRegistration } from "@/app/actions/user";
import { teacherformSchema } from "@/types";
import Link from "next/link";

type Inputs = z.infer<typeof teacherformSchema>;

export function ApplicationForm() {
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();

  const form = useForm<Inputs>({
    resolver: zodResolver(teacherformSchema),
    defaultValues: {
      name: "",
      profession: "",
      description: "",
      country: "",
      linkedin: "",
      countryCode: "",
      whatsappNumber: "",
    },
  });

  function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        const whatsappFull = `${data.countryCode}${data.whatsappNumber}`;
        await submitTutorRegistration({
          ...data,
          whatsappFull,
        });
        toast.success("Perfil creado con éxito.");
        form.reset();
        router.push("/valores");
      } catch (err) {
        toast.error("Error al crear el perfil. Por favor, inténtelo de nuevo.");
      }
    });
  }

  return (
    <Form {...form}>
      <form
        className="grid mb-4 w-full gap-5"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start space-x-3 space-y-2 rounded-md border-b-4 p-4 shadow">
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Agregar nombre completo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="profession"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start space-x-3 space-y-2 rounded-md border-b-4 p-4 shadow">
              <FormLabel>Profesión</FormLabel>
              <FormControl>
                <Input placeholder="Introduce tu profesión" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start space-x-3 space-y-2 rounded-md border-b-4 p-4 shadow">
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Input
                  placeholder="Breve descripción de tu experiencia"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start space-x-3 space-y-2 rounded-md border-b-4 p-4 shadow">
              <FormLabel>País</FormLabel>
              <FormControl>
                <Input
                  placeholder="Introduce tu país de residencia"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="linkedin"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start space-x-3 space-y-2 rounded-md border-b-4 p-4 shadow">
              <FormLabel>LinkedIn</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://www.linkedin.com/in/tu-perfil"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex space-x-4">
          <FormField
            control={form.control}
            name="countryCode"
            render={({ field }) => (
              <FormItem className="flex-1 flex flex-col items-start space-x-3 space-y-2 rounded-md border-b-4 p-4 shadow">
                <FormLabel>Código de País</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="+1">🇺🇸 +1 (Estados Unidos)</SelectItem>
                    <SelectItem value="+1">🇨🇦 +1 (Canadá)</SelectItem>
                    <SelectItem value="+52">🇲🇽 +52 (México)</SelectItem>
                    <SelectItem value="+1">🇺🇸 +1 (EE.UU.)</SelectItem>
                    <SelectItem value="+501">🇧🇿 +501 (Belice)</SelectItem>
                    <SelectItem value="+502">🇬🇹 +502 (Guatemala)</SelectItem>
                    <SelectItem value="+503">🇸🇻 +503 (El Salvador)</SelectItem>
                    <SelectItem value="+504">🇭🇳 +504 (Honduras)</SelectItem>
                    <SelectItem value="+505">🇳🇮 +505 (Nicaragua)</SelectItem>
                    <SelectItem value="+506">🇨🇷 +506 (Costa Rica)</SelectItem>
                    <SelectItem value="+507">🇵🇦 +507 (Panamá)</SelectItem>
                    <SelectItem value="+53">🇨🇺 +53 (Cuba)</SelectItem>
                    <SelectItem value="+1809">
                      🇩🇴 +1 809 (República Dominicana)
                    </SelectItem>
                    <SelectItem value="+509">🇭🇹 +509 (Haití)</SelectItem>
                    <SelectItem value="+1868">
                      🇹🇹 +1 868 (Trinidad y Tobago)
                    </SelectItem>
                    <SelectItem value="+54">🇦🇷 +54 (Argentina)</SelectItem>
                    <SelectItem value="+591">🇧🇴 +591 (Bolivia)</SelectItem>
                    <SelectItem value="+55">🇧🇷 +55 (Brasil)</SelectItem>
                    <SelectItem value="+56">🇨🇱 +56 (Chile)</SelectItem>
                    <SelectItem value="+57">🇨🇴 +57 (Colombia)</SelectItem>
                    <SelectItem value="+593">🇪🇨 +593 (Ecuador)</SelectItem>
                    <SelectItem value="+592">🇬🇾 +592 (Guyana)</SelectItem>
                    <SelectItem value="+595">🇵🇾 +595 (Paraguay)</SelectItem>
                    <SelectItem value="+51">🇵🇪 +51 (Perú)</SelectItem>
                    <SelectItem value="+597">🇸🇷 +597 (Surinam)</SelectItem>
                    <SelectItem value="+598">🇺🇾 +598 (Uruguay)</SelectItem>
                    <SelectItem value="+58">🇻🇪 +58 (Venezuela)</SelectItem>
                    <SelectItem value="+34">🇪🇸 +34 (España)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="whatsappNumber"
            render={({ field }) => (
              <FormItem className="flex-1 flex flex-col items-start space-x-3 space-y-2 rounded-md border-b-4 p-4 shadow">
                <FormLabel>Número de WhatsApp</FormLabel>
                <FormControl>
                  <Input placeholder="Número sin código de país" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-between p-2">
          <Button
            variant="outline"
            className="w-fit mr-4 border-b-4 flex border-blue-400"
            disabled={isPending}
            type="submit"
          >
            {isPending && (
              <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
            )}
            Enviar
            <PlusCircle className="ml-4 h-4 w-4" />
          </Button>
          <Link href={"/become-tutor"}>
            <Button>x Más tarde</Button>
          </Link>
        </div>
      </form>
    </Form>
  );
}
