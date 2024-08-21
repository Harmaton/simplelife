import { redirect } from "next/navigation";
import {
  FacebookIcon,
  HandIcon,
  InstagramIcon,
  LifeBuoy,
  Link2Icon,
  Sun,
  WholeWordIcon,
} from "lucide-react";
import Image from "next/image";

import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";
import { getEvent } from "@/app/actions/events";

const EventIdPage = async ({ params }: { params: { eventid: string } }) => {
  const { event } = await getEvent({ id: params.eventid });

  if (!event) {
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
                <h2 className="mt-4 font-semibold text-center mb-4">
                  {" "}
                  Acerca de {event.title}
                </h2>
                {event.description}
              </CardContent>
            </Card>
            <Card className="mt-2">
              <h1 className="p-2 m-2 text-center">
                {" "}
                Únase usando el siguiente enlace
              </h1>
              <div className="bg-blue-200 flex p-2 rounded-md m-2">
                <Link href={`https://${event.hotmartLink}`}>
                  <Button>
                    <Link2Icon className="mr-2 w-4 h-4" />
                    Consigue un billete
                  </Button>
                </Link>
              </div>
            </Card>

            <Card className="mt-2">
              <h1 className="p-2 m-2 text-center">Los organizadores</h1>
              <h1 className="font-serif text-4xl text-center mb-1">
                {" "}
                {event.organizer}{" "}
              </h1>
            </Card>

            <Card className="mt-2">
              <h1 className="p-2 m-2 text-center">Lugar del evento</h1>
              <h1 className="font-serif text-3xl text-center mb-1">
                {" "}
                {event.location}{" "}
              </h1>
            </Card>

            <Card className="mt-2">
              <h1 className="p-2 m-2 text-center">El evento comenzará en</h1>
              <h1 className="font-serif text-3xl text-center mb-1">
                {" "}
                {event.startTime}{" "}
              </h1>
            </Card>

            <Card className="mt-4 p-4 flex flex-row space-x-8">
              {event.instagramLink && (
                <Link href={`https://${event.instagramLink}`}>
                  <InstagramIcon className="w-8 h-8 mr-2" />
                </Link>
              )}

              {event.WhatsappLink && (
                <Link href={`https://${event.WhatsappLink}`}>
                  <ChatBubbleBottomCenterTextIcon className="w-8 h-8 mr-2 text-green-600" />
                </Link>
              )}

              {event.facebookLink && (
                <Link href={`https://${event.facebookLink}`}>
                  <FacebookIcon className="w-8 h-8 mr-2 text-blue-900" />
                </Link>
              )}

              {event.sociaLink && (
                <Link href={`https://${event.sociaLink}`}>
                  <WholeWordIcon className="w-8 h-8 mr-2 text-blue-900" />
                </Link>
              )}
            </Card>
          </div>

          {/* First Column (Image) */}
          <div className="md:w-1/2 p-4 md:order-1">
            <div className=" m-5 space-y-4">
              <Alert className="justify-center flex ">
                <Sun
                  className="h-5 w-5 animate-accordion-down"
                  color=" #964B00"
                />
                <AlertTitle>
                  {" "}
                  Bienvenida a
                  <span className="text-blue-500 uppercase text-2xl mr-2 ml-2">
                    {event.title}
                  </span>{" "}
                  sucediendo en {event.showDay?.toString()}{" "}
                </AlertTitle>
              </Alert>
              <Separator className="mb-2" />
              <div className="m-auto h-16  rounded-md">
                <Card className="w-full m-auto overflow-hidden">
                  {event?.imageUrl && (
                    <Image
                      src={event.imageUrl}
                      width={250}
                      height={300}
                      alt="my image"
                      unoptimized
                      className={cn(
                        "h-auto w-auto object-cover transition-all hover:scale-105"
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
};

export default EventIdPage;
