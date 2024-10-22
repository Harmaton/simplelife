"use client";

import React, { useState, useEffect } from "react";
import esLocale from "@fullcalendar/core/locales/es";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import Interaction from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { ChapterWithCountdown } from "@/app/actions/chapter";
import { Card, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Clock, Video } from "lucide-react";

const Calendar: React.FC = () => {
  const [currentEvents, setCurrentEvents] = useState<ChapterWithCountdown[]>(
    []
  );

  const formatDate = (date: Date | string | null): string => {
    if (!date) return "N/A";
    const d = new Date(date);
    return d.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (time: Date | string | null): string => {
    if (!time) return "N/A";
    const d = new Date(time);
    return d.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const [currentPage, setCurrentPage] = useState(1);
  const chaptersPerPage = 2;

  const indexOfLastChapter = currentPage * chaptersPerPage;
  const indexOfFirstChapter = indexOfLastChapter - chaptersPerPage;
  const currentChapters = currentEvents.slice(
    indexOfFirstChapter,
    indexOfLastChapter
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch(`/api/studentchapters`);
        if (!response.ok) throw new Error("Failed to fetch events");
        const data = await response.json();
        setCurrentEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    }

    fetchEvents();
  }, []);

  return (
    <div>
      <div className="flex w-full px-10 justify-start items-start gap-8">

      <div className="w-9/12 mt-8">
          <FullCalendar
            locale={esLocale}
            timeZone="America/Lima"
            plugins={[dayGridPlugin, Interaction, timeGridPlugin, listPlugin]}
            headerToolbar={{
              start: "SimpleLife Scheduler",
              left: "prev, next, today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay, listWeek",
            }}
            events={{
              url: "/api/studentchapters/calendar",
            }}
            nowIndicator={true}
            editable={true}
            droppable={true}
            selectable={true}
            // dateClick={handleDateClick}
            // drop={(data) => addEvent(data)}
            // eventClick={(data) => handleDeleteModal(data)}
          />
        </div>
        
        <div className="w-3/12">
          <div className="py-10 text-2xl font-extrabold px-7">
            Mis próximas lecciones
          </div>
          <ul className="space-y-4">
            {currentEvents.length <= 0 && (
              <div className="italic text-center text-gray-400">
                No hay lecciones próximas
              </div>
            )}

            {currentChapters.length > 0 &&
              currentChapters.map((chapter) => (
                <Card
                  key={chapter.id}
                  className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden"
                >
                  <div className="p-6 relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xl">🎓</span>
                        </div>
                        <span className="ml-4 text-gray-500">
                          Lección {chapter.position}
                        </span>
                      </div>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                      {chapter.title}
                    </h2>
                    <p className="text-gray-600 mb-4">
                      {chapter.description && chapter.description.length > 100
                        ? `${chapter.description.substring(0, 100)}...`
                        : chapter.description}
                    </p>
                    <div className="mt-2 text-sm">
                      <p className="flex">
                        {" "}
                        <CalendarIcon className="mr-2 h-4 w-4" />{" "}
                        {formatDate(chapter.LiveDay)}
                      </p>
                      <p className="flex">
                        {" "}
                        <Clock className="mr-2 h-4 w-4" />{" "}
                        {formatTime(chapter.liveTime)}
                      </p>
                    </div>

                    <div className="absolute bottom-6 right-6">
                      <div className="w-8 h-8 bg-yellow-400 rounded-full"></div>
                    </div>
                  </div>
                  <CardFooter className="bg-gray-50">
                    <Link href={`${chapter.videoUrl}`} className="w-full">
                      <Button className="w-full flex justify-between items-center bg-blue-500 hover:bg-blue-600 text-white">
                        <Video className="w-5 h-5" />
                        <span className="flex-grow text-center">
                          Únete ahora
                        </span>
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
          </ul>
          <div className="mt-4">
            {Array.from(
              { length: Math.ceil(currentEvents.length / chaptersPerPage) },
              (_, i) => (
                <button
                  key={i}
                  onClick={() => paginate(i + 1)}
                  className={`mx-1 px-3 py-1 ${
                    currentPage === i + 1
                      ? "bg-blue-500 m-2 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {i + 1}
                </button>
              )
            )}
          </div>
        </div>

       
      </div>
    </div>
  );
};

export default Calendar;
