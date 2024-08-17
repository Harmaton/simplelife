"use client";

import { Button } from "@/components/ui/button";
import Title from "@/components/ui/title";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { ReplaceIcon } from "lucide-react";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

type Inputs = {
  fullName: string;
  email: string;
  description: string;
  number: number;
};

function ContactFormNew() {
 
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);

    try{
         await fetch("/api/send", {
            method: 'POST',
            body: JSON.stringify(data)
          }).then(res => res.json())
          toast.success("¡Entregado! Gracias por contactar con Vida Simple")
          reset();
          setLoading(false);
    } catch(error){
        console.log(error)
        toast.error("Algo Salio Mal")
    }
   
  };

  return (
    <div
      className="flex flex-col md:text-center md:max-w-xl md:m-auto justify-center gap-10 py-12"
      id="contact"
    >
      <div>
        <Title title={"Utilice este formulario para contactar con Simple Life"} />
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-6 flex-col md:flex-row md:justify-between">
            <div className="md:w-full">
              <input
                type="text"
                className={`border border-slate-300 w-full p-3 rounded ${
                  errors.fullName && "border-red-500 bg-red-100"
                }`}
                placeholder="Nombre completo"
                {...register("fullName", { required: true })}
              />
              {errors.fullName && (
                <span className="text-sm mt-1 text-red-500">
                  Este campo es obligatorio
                </span>
              )}
            </div>
            <div className="md:w-full">
              <input
                type="text"
                className={`border border-slate-300 w-full p-3 rounded ${
                  errors.email && "border-red-500 bg-red-100"
                }`}
                placeholder="Tu correo electrónico"
                {...register("email", {
                  required: true,
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Entered value does not match email format",
                  },
                })}
              />
              {errors.email && (
                <span className="text-sm mt-1 text-red-500">
                  {errors.email.message && errors.email ? errors.email.message : 'Este campo es obligatorio'}
                </span>
              )}
            </div>
          </div>
          <div className="flex gap-6 flex-col mt-6  md:flex-row md:justify-between">
            <div className="md:w-full">
              <input
                type="text"
                className="border border-slate-300 w-full p-3 rounded"
                placeholder="Número de teléfono"
                {...register("number")}
              />
            </div>
            </div>
          <div className="mt-6">
            <textarea
              rows={6}
              className={`border border-slate-300 w-full p-3 rounded ${
                errors.description && "border-red-500 bg-red-100"
              }`}
              placeholder="Mensaje ...."
              {...register("description", { required: true })}
            />
            {errors.description && (
              <span className="text-sm mt-1 text-red-500">
                Este campo es obligatorio
              </span>
            )}
          </div>
          <div className="mt-6">
            <Button className="bg-violet-500">
              {
                loading ? (
                  <ReplaceIcon className="mr-2 h-4 w-4 animate-spin" />
                ): (
                  <PaperAirplaneIcon className="mr-2 h-4 w-4"/>
                )
              }
              <span className="ml-1">{loading ? 'Enviando...' : 'Enviar mensaje'}</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactFormNew;