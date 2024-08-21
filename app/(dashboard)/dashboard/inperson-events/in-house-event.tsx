'use client'

import {InHouseEvent as InHouseEventModel} from "@prisma/client"
import Image from "next/image";
import { Clock3, DollarSign, Map, Timer } from "lucide-react";
import { ArrowTrendingUpIcon, BuildingStorefrontIcon } from "@heroicons/react/24/outline";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface Emodal {
    inevent: InHouseEventModel
}

export default function InHouseEvent({inevent}: Emodal){

    function handleClick(){

    }

    return (

        <Card className="cursor-pointer transition-shadow hover:shadow-lg"
        onClick={handleClick}
        >
            <CardHeader>
                {inevent.logoimg && (
                    <Image
                    src={inevent.logoimg}
                    width={50}
                    height={50}
                    alt=''
                    className="rounded-md m-auto"
                    />
                )}
                <CardTitle className="text-center uppercase p-2">{inevent.title}</CardTitle>
            </CardHeader>
            <CardDescription className="pl-6 flex flex-row mb-2">
                <Timer className="h-4 w-4 mr-2" />
                {inevent.showDay?.toString()}
            </CardDescription>
            <CardContent>

                <div className="flex items-center mb-2">
                <BuildingStorefrontIcon className="h-4 w-4 mr-2" />
                <p className="text-center"> {inevent.organizer}</p>
                </div>

                <div className="flex items-center mb-2">
                <DollarSign className="h-4 w-4 mr-2" />
                <p className="text-center">{inevent.price}</p>
                </div>

                <div className="flex items-center mb-3">
                <Map className="h-4 w-4 mr-2" />
                <p className="text-center">{inevent.location}</p>
                </div>

                <div className="flex items-center">
                <Clock3 className="h-4 w-4 mr-2" />
                <p className="text-center">{inevent.startTime}</p>
                </div>

            </CardContent>
            <CardFooter className="items-center">

            <div className="flex">
                <span className="font-light mr-2 text-blue-500">Aprende más</span>
                    <ArrowTrendingUpIcon className="w-4 h-4 ml-2  mt-1" />
                  </div>

            </CardFooter>
        </Card>
       
    )
}
