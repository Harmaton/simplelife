"use client";

import { useState } from "react";
import Calendar from "./Cak";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function Home() {
  const [activeTab, setActiveTab] = useState("packs");
  const user = useUser();

  if (!user.user) {
    redirect("/");
  }

  return (
    <main className="p-6">
      <h1 className="font-bold text-2xl">Gestionar lecciones y sesiones de tutoría</h1>
      <p className="mb-2 text-sm">Gestiona y realiza un seguimiento de tus tareas</p>
      <Tabs defaultValue="packs" className="mb-10 rounded-lg">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger
            value="packs"
            className={activeTab === "packs" ? "bg-background" : ""}
            onClick={() => setActiveTab("packs")}
          >
            <div className="flex items-center space-x-2">
              <span>Mis lecciones/capítulos</span>
              
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="certifications"
            className={activeTab === "certifications" ? "bg-background" : ""}
            onClick={() => setActiveTab("certifications")}
          >
            <div className="flex items-center space-x-2">
              <span>Mentoring Sessions</span>
              <span className="bg-red-500 text-white text-xs px-2 rounded-full ">
                Nueva !
              </span>
            </div>
          </TabsTrigger>
        
        </TabsList>
        <TabsContent value="packs">
          <div className="">
            <Calendar />
          </div>
        </TabsContent>
        <TabsContent value="certifications">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>
        </TabsContent>

      </Tabs>
    </main>
  );
}
