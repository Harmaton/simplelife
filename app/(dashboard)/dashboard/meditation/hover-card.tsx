import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { CalendarIcon } from "lucide-react";

interface HoverCardDemoProps {
  backgroundColor: string;
  buttonName: string;
  avatarSrc: string;
  avatarFallback: string;
  smallexplanation: string
  monthyr: string
}

export function HoverCardMeditation({
  backgroundColor,
  buttonName,
  avatarSrc,
  avatarFallback,
  smallexplanation,
  monthyr
}: HoverCardDemoProps) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button className={` ${backgroundColor} h-[80px] text-2xl`} variant="outline">{buttonName}</Button>
      </HoverCardTrigger>
      <HoverCardContent className={`w-80`}>
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src={avatarSrc} />
            <AvatarFallback>{avatarFallback}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{buttonName}</h4>
            <p className="text-sm">
              {smallexplanation}
            </p>
            <div className="flex items-center pt-2">
              <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
              Comenzó {monthyr}
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
