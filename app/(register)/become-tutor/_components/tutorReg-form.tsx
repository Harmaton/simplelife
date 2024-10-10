"use client";

import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUpRightFromSquare, CircleArrowRight } from "lucide-react";
import { Select } from "@headlessui/react";
import {
  checkIsTeacher,
  checkRegistration,
  submitTutorRegistration,
} from "@/app/actions/user";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  profession: z.string().min(2, { message: "Profession is required." }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters." }),
  country: z.string().min(2, { message: "Country is required." }),
  linkedin: z.string().url({ message: "Please enter a valid URL." }),
  countryCode: z.string().min(1, { message: "Country code is required." }),
  whatsappNumber: z
    .string()
    .regex(/^\d+$/, { message: "Please enter a valid phone number." }),
});

type FormValues = z.infer<typeof formSchema>;

export default function TutorRegForm() {
  const [dialogOpen, setDialogOpen] = useState(true);
  const [registered, setRegistered] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const userFib = useUser();
  const email = userFib.user?.emailAddresses[0].emailAddress;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
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

  useEffect(() => {
    const checkRegistrationStatus = async () => {
      if (email) {
        const isRegistered = await checkRegistration(email);
        setRegistered(isRegistered);
      }
    };

    const checkTeacherStatus = async () => {
      if (email) {
        const isTeacher = await checkIsTeacher(email);
        setIsTeacher(isTeacher);
      }
    };

    checkRegistrationStatus();
    checkTeacherStatus();
  }, [email]);
  console.log(email);
  console.log("teacher", isTeacher);
  console.log("registred", registered);

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    try {
      if (!email) {
        throw new Error("No email captured");
      }

      const whatsappFull = `${data.countryCode}${data.whatsappNumber}`;
      const result = await submitTutorRegistration({
        name: data.name,
        profession: data.profession,
        description: data.description,
        whatsappFull,
        linkedin: data.linkedin,
        email,
      });

      if (result.success) {
        toast.success(
          "Registration submitted. You will receive an email after verification."
        );
        setDialogOpen(false);
      }
      router.refresh();
    } catch (error) {
      toast.error("Registration not submitted");
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-violet-500 text-white px-6 py-3 rounded-lg transition duration-300 flex items-center space-x-2 hover:bg-blue-500">
          <span>Aplicar</span>
          <ArrowUpRightFromSquare className="ml-2 h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>SimpleLife Tutor Registration</DialogTitle>
        </DialogHeader>
        {!registered || !isTeacher ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="linkedin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LinkedIn or Resume Website</FormLabel>
                    <FormControl className="flex">
                      <div className="mr-2 border ">
                        <p>https://</p>
                      </div>
                      <Input placeholder="https://..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input placeholder="Your country" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="profession"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profession</FormLabel>
                    <FormControl>
                      <Input placeholder="Your profession" {...field} />
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
                    <FormLabel>Career Introduction/Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us about your career..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex space-x-2">
                <FormField
                  control={form.control}
                  name="countryCode"
                  render={({ field }) => (
                    <FormItem className="w-1/3">
                      <FormLabel>Country Code</FormLabel>
                      <Select
                        value={field.value}
                        onChange={field.onChange}
                        className="border rounded-md p-2 w-full"
                      >
                        <option value="">Seleccionar Código de País</option>
                        <option value="+1">🇺🇸 +1 (EE.UU.)</option>
                        <option value="+54">🇦🇷 +54 (Argentina)</option>
                        <option value="+55">🇧🇷 +55 (Brasil)</option>
                        <option value="+56">🇨🇱 +56 (Chile)</option>
                        <option value="+57">🇨🇴 +57 (Colombia)</option>
                        <option value="+52">🇲🇽 +52 (México)</option>
                        <option value="+51">🇵🇪 +51 (Perú)</option>
                        <option value="+598">🇺🇾 +598 (Uruguay)</option>
                        <option value="+58">🇻🇪 +58 (Venezuela)</option>
                        <option value="+34">🇪🇸 +34 (España)</option>
                        <option value="+502">🇬🇹 +502 (Guatemala)</option>
                        <option value="+503">🇸🇻 +503 (El Salvador)</option>
                        <option value="+504">🇭🇳 +504 (Honduras)</option>
                        <option value="+505">🇳🇮 +505 (Nicaragua)</option>
                        <option value="+506">🇨🇷 +506 (Costa Rica)</option>
                        <option value="+507">🇵🇦 +507 (Panamá)</option>
                        <option value="+591">🇧🇴 +591 (Bolivia)</option>
                        <option value="+593">🇪🇨 +593 (Ecuador)</option>
                        <option value="+595">🇵🇾 +595 (Paraguay)</option>
                        <option value="+809">
                          🇩🇴 +809 (República Dominicana)
                        </option>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="whatsappNumber"
                  render={({ field }) => (
                    <FormItem className="w-2/3">
                      <FormLabel>WhatsApp Number</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="WhatsApp number"
                          {...field}
                          onChange={(e) => {
                            const numericValue = e.target.value.replace(
                              /\D/g,
                              ""
                            );
                            field.onChange(numericValue);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "📤 Submitting..." : "✅ Submit"}
              </Button>
            </form>
          </Form>
        ) : (
          <div className="border p-4 text-center text-red-500">
            We are processing your registration. Our team is working to approve
            your status.
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
