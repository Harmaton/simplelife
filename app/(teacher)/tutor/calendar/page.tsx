"use client";

import React, { useState, Fragment } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import Interaction, { DropArg } from "@fullcalendar/interaction";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon, ExclamationTriangleIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { isAdmin } from "@/lib/admin";

import listPlugin from "@fullcalendar/list";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import esLocale from "@fullcalendar/core/locales/es";
import { auth } from "@/firebase";

interface Event {
  title: string;
  start: string;
  allDay: boolean;
  hostName?: string;
  eventlink?: string;
  daysOfWeek?: string;
}

export default function Calendar() {
  const user = auth.currentUser

  const [showmodal, setShowmodal] = useState(false);
  const [showdeletemodal, setShowDeleteModal] = useState(false);

  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: "",
    start: "",
    allDay: true,
    eventlink: "",
    hostName: "",
    daysOfWeek: "",
  });

  const handleDateClick = (arg: { dateStr: any }) => {
    setShowmodal(true);

    // Create a Date object from the date string
    const selectedDate = new Date(arg.dateStr);

    // Get the timezone offset in minutes
    const timezoneOffset = selectedDate.getTimezoneOffset();

    // Adjust the selected date with the timezone offset
    selectedDate.setMinutes(selectedDate.getMinutes() - timezoneOffset);

    const isoDate = selectedDate.toISOString();

    setNewEvent({ ...newEvent, start: isoDate });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !newEvent.title ||
      !newEvent.eventlink ||
      !newEvent.hostName ||
      !newEvent.start
    ) {
      // Display an error message or handle the error as needed
      toast.error("Todos los campos son obligatorios");
      return;
    }
    try {
      const response = await axios.post("/api/calendar-events", newEvent);

      if (response.status >= 200 && response.status < 300) {
        setShowmodal(false);
        setNewEvent({
          title: "",
          start: "",
          allDay: false,
          eventlink: "",
          hostName: "",
          daysOfWeek: "",
        });
      } else {
        console.error("Error occurred while adding the event");
      }
    } catch (error) {
      console.error("Error occurred while adding the event", error);
    }
  };

  const handleCloseModal = () => {
    setShowmodal(false);
    setNewEvent({
      title: "",
      start: "",
      allDay: false,
      eventlink: "",
      hostName: "",
      daysOfWeek: "",
    });

    console.log(newEvent);
  };

  const [eventIdToDelete, setEventIdToDelete] = useState<string | null>(null);

  const addEvent = (data: DropArg) => {};

  const handleDeleteModal = (data: { event: { id: string } }) => {
    // Extract the event ID from the data parameter
    const eventId = data.event.id;

    // Set the event ID to the state for later use
    setEventIdToDelete(eventId);

    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      const response = await axios.post("/api/delete-calendar-event", {
        eventId: eventIdToDelete,
      });

      if (response.status === 200) {
        setShowDeleteModal(false);
        toast.success("eliminada");
      } else {
        console.error("Error occurred while deleting the event");
        toast.error("not deleted");
      }
    } catch (error) {
      console.error("Error occurred while deleting the event", error);
    }
  };

  const handleDayToggle = (selectedDay: number) => {
    const updatedDays = newEvent.daysOfWeek?.includes(selectedDay.toString())
      ? (newEvent.daysOfWeek || '').split(',').filter((day) => day !== selectedDay.toString()).join(',')
      : `${newEvent.daysOfWeek || ''},${selectedDay}`;

    setNewEvent({ ...newEvent, daysOfWeek: updatedDays });
  };

  const router = useRouter();

  const deleteSessions = async () => {
    try {
      await axios.delete("/api/delete-calendar-event");
      router.refresh();
      toast.success("Eventos eliminados exitosamente");
    } catch (error) {
      console.error("Error deleting sessions:", error);
      toast.error("Algo salió mal");
    }
  };

  return (
    <div>
      {isAdmin(user?.uid) && (
        <div className=" p-4 m-2">
          <AlertDialog>
            <AlertDialogTrigger>
              <Button className="bg-red-500">
                <Trash className="h-4 w-4" />
                Eliminar todas las sesiones
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  ¿Estás absolutamente seguro?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Esta acción no se puede deshacer. Esto eliminará
                  permanentemente todos tus eventos. y eliminar sus datos de
                  nuestros servidores.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Ahora no</AlertDialogCancel>
                <AlertDialogAction>
                  <Button onClick={deleteSessions} className="">
                    <Trash className="h-4 w-4  mr-2" />
                  </Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
      <div className="grid grid-cols-10">
        <div className="col-span-8 p-4 m-4">
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
              url: "/api/calendar-events",
            }}
            nowIndicator={true}
            editable={true}
            droppable={true}
            selectable={true}
            dateClick={handleDateClick}
            drop={(data) => addEvent(data)}
            eventClick={(data) => handleDeleteModal(data)}
          />
        </div>
      </div>

      <Transition.Root show={showdeletemodal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setShowDeleteModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                      <ExclamationTriangleIcon
                        className="h-6 w-6 text-red-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Eliminar evento
                      </Dialog.Title>
                      <p className="text-sm text-gray-500">
                        ¿Estás seguro de que deseas eliminar este evento?
                      </p>
                      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button
                          type="button"
                          className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                          onClick={handleDelete}
                        >
                          Borrar
                        </button>
                        <button
                          type="button"
                          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                          onClick={() => setShowDeleteModal(false)}
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      <Transition.Root show={showmodal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setShowmodal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                      <CheckIcon
                        className="h-6 w-6 text-green-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Añadir evento
                      </Dialog.Title>
                      <form onSubmit={handleSubmit}>
                        <div>
                          <div className="mt-5">
                            <label
                              htmlFor="title"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Título
                            </label>
                            
                            <Input
                              type="text"
                              id="title"
                              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                              placeholder="por ejemplo, capacitación para entrevistas"
                              value={newEvent.title}
                              onChange={(e) =>
                                setNewEvent({
                                  ...newEvent,
                                  title: e.target.value,
                                })
                              }
                              required
                            />

                          </div>
                          <div className="mt-5">
                            <label
                              htmlFor="eventlink"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Enlace de reunión
                            </label>
                            <Input
                              type="text"
                              id="eventlink"
                              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                              placeholder=" enlance de Zoom"
                              value={newEvent.eventlink}
                              onChange={(e) =>
                                setNewEvent({
                                  ...newEvent,
                                  eventlink: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="mt-5">
                            <label
                              htmlFor="hostname"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Nombre del anfitrión
                            </label>
                            <Input
                              type="text"
                              id="hostname"
                              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                              placeholder="Nombre de la coordinadora"
                              value={newEvent.hostName}
                              onChange={(e) =>
                                setNewEvent({
                                  ...newEvent,
                                  hostName: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="mt-5">
                            <label
                              htmlFor="hostname"
                              className="block text-sm font-medium text-gray-700"
                            >
                            ¿Qué días se repetirá el evento? 
                            </label>
                            <p className = "m-2 font-extralight">Déjelo en blanco si no tiene un día en el que desee repetir el evento cada semana.</p>
                            <div>
        {[1, 2, 3, 4, 5, 6, 7].map((day) => (
          <label key={day} className="mr-4">
            <input
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              type="checkbox"
              value={day}
              checked={(newEvent.daysOfWeek || '').split(',').includes(day.toString())}
              onChange={() => handleDayToggle(day)}
            />
            {day === 1 ? 'Lunes' : day === 2 ? 'Martes' : day === 3 ? 'Miércoles' : day === 4 ? 'Jueves' : day === 5 ? 'Viernes' : day === 6 ? ' Sábado' : 'Domingo'}
          </label>
        ))}
         <p className="m-2">{newEvent.daysOfWeek}</p>
      </div>
                          </div>
                          <div className="mt-5">
                            <label
                              htmlFor="start"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Hora programada
                            </label>
                            <Input
                              type="text"
                              id="start"
                              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                              placeholder=""
                              value={newEvent.start}
                              onChange={(e) =>
                                setNewEvent({
                                  ...newEvent,
                                  start: e.target.value,
                                })
                              }
                              disabled
                            />
                          </div>
                          {/* Add more input fields for other event properties if needed */}
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                          <button
                            type="submit"
                            className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                          >
                            Añadir evento
                          </button>
                          <button
                            type="button"
                            onClick={handleCloseModal}
                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
