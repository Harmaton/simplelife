
import { redirect } from "next/navigation";
import {  LifeBuoy, Link2Icon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "@/firebase";
import { getSession } from "@/app/actions/sessions";


const MeditationIdPage = async ({
  params
}: {
  params: { id: string; }
}) => {
  const user = auth.currentUser
  const userId = user?.uid

  if (!userId) {
    return redirect("/");
  }
   
  const { session } = await getSession({ id: params.id });

  if (!session) {
    return redirect("/");
  }

  return (
    <>
    <div className="mb-4">
      <div className="flex flex-col md:flex-row">
        {/* Second Column (Description) */}
        <div className="md:w-1/2 p-4 md:order-2 mt-5">
          <Card className="w-full">
            <CardContent>
              <h2  className="mt-4 font-semibold text-center mb-4">Una rápida introducción a la sesión </h2>
              {session.note}
            </CardContent>

          </Card>
          <Card className="mt-2">
             <h1 className="p-2 m-2 text-center"> Únase usando el siguiente enlace</h1> 
             <div className="bg-blue-200 flex p-2 rounded-md m-2">
                    
                     <Link href={`https://${session.sessionLink}`}>
                      <Button>
                      <Link2Icon className="mr-2 w-4 h-4" />
                      Unirse a la sesión</Button>
                     </Link>
                </div>
          </Card>

          <Card className="mt-2">
             <h1 className="p-2 m-2 text-center">Duración estimada para cada sesión</h1> 
           <h1 className="font-serif text-4xl text-center mb-1"> {session.duration} </h1> 
          </Card>

          <Card className="mt-2">
             <h1 className="p-2 m-2 text-center">La hora de inicio</h1> 
           <h1 className="font-serif text-4xl text-center mb-1"> {session.from} </h1> 

          </Card>

          <Card className="mt-2">
             <h1 className="p-2 m-2 text-center">Hora de finalización</h1> 
           <h1 className="font-serif text-4xl text-center mb-1"> {session.to} </h1> 


          </Card>
        </div>

        {/* First Column (Image) */}
        <div className="md:w-1/2 p-4 md:order-1">
            
          <div className="m-5 space-y-4">
            <Alert className="justify-center ">
              <LifeBuoy className="h-5 w-5 animate-accordion-down" color=" #964B00" />
              <AlertTitle>Bienvenida y prepárate,  <span className="text-blue-500 uppercase mr-2 ml-2">{session.moderator}</span> te guiará a través de esto en el {session.startTime?.toDateString()} </AlertTitle>
              <AlertDescription>
              La sesión estará disponible durante todo el {session.endTime?.toString()}

              </AlertDescription>
            </Alert>
            <Separator className="mb-2" />
            <div className="m-auto h-16  rounded-md">
              <Card className="w-full m-auto overflow-hidden">
                {session?.imageUrl && (
                  <Image
                    src={session.imageUrl}
                    width={250}
                    height={300}
                    alt="my image"
                    unoptimized
                    className={cn(
                      "h-auto w-auto object-cover transition-all hover:scale-105",
                    )}
                  />
                )}

              </Card>
              <Separator className="mt-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default MeditationIdPage;
