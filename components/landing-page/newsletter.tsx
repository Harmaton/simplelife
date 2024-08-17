import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BellDotIcon } from "lucide-react";
import { BackgroundBeams } from "../ui/background-beams";
import Title from "../ui/title";
import Paragraph from "../ui/pararaph";


export default function NewsletterBackground() {
  return (
    <div className="w-full rounded-md   relative flex flex-col  justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4">
     <Title title="Suscríbete a nuestro boletín" />
     <Paragraph content={"Suscríbase a nuestro boletín para recibir las últimas actualizaciones, ofertas, nuestros nuevos productos y más sobre terapia."} />
        {/* Form placed in the center */}
        <form className="flex flex-row items-center justify-center relative z-10 mt-4">
          <Input className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500 w-full mb-2 mr-4 placeholder:text-neutral-700" placeholder="Ingresa tu e-mail" required type="email" />
          <div className="flex items-center justify-center">
            <BellDotIcon className="mr-2 h-8 w-8 text-violet-500 hover:animate-bounce" />
            <Button type="submit" className="bg-violet-500 hover:bg-violet-500">Suscribir</Button>
          </div>
        </form>
        {/* Privacy policy and terms */}
        <p className="text-xs mt-4 text-center relative z-10">
        Al hacer clic en Suscribir, aceptas nuestra
          <Link className="underline" href="/new">
          Términos
          </Link>
          {" "}  y
          <Link className="underline" href="/new">
          política de privacidad
          </Link>
        </p>
      </div>
      <BackgroundBeams /> {/* Assuming BackgroundBeams is some custom component */}
    </div>
  );
}
