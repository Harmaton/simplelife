"use client";

import React, { useState, useEffect } from "react";
import { formatDate } from "@fullcalendar/core";
import esLocale from "@fullcalendar/core/locales/es";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import Interaction from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { ChapterWithCountdown } from "@/app/actions/chapter";

const Calendar: React.FC = () => {
  const [currentEvents, setCurrentEvents] = useState<ChapterWithCountdown[]>(
    []
  );

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

            {currentEvents.length > 0 &&
              currentEvents.map((event) => (
                <li
                  className="border border-gray-200 shadow px-4 py-2 rounded-md text-blue-800"
                  key={event.id}
                >
                  <div key={event.id} className="flex items-center space-x-4">
                    <h3>{event.title}</h3>
                    <span className="text-sm text-gray-500">
                      {event.countdown} day{event.countdown !== 1 ? "s" : ""}{" "}
                      until live
                    </span>
                  </div>
                  <br />
                  <label className="text-slate-950">
                    {formatDate(event.LiveDay!, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}{" "}
                    {/* Format event start date */}
                  </label>
                </li>
              ))}
          </ul>
        </div>

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
              url: "/api/studentchapters",
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
      </div>
    </div>
  );
};

export default Calendar;
