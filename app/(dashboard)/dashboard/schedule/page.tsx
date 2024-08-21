'use client'

import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import Interaction from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import listPlugin from '@fullcalendar/list'

export default  function Page() {
  
  return (
  <div>
      <div className="grid grid-cols-10">
        <div className="col-span-8 p-4 m-4">
          <FullCalendar
          locale={esLocale}
          timeZone="America/Lima"
            plugins={[dayGridPlugin, Interaction, timeGridPlugin, listPlugin]}
            headerToolbar={{
              start: 'SimpleLife Scheduler',
              left: 'prev, next, today',
              center: 'title',
              right: 'listWeek, dayGridMonth,timeGridWeek,timeGridDay',
            }}
            events={{
              url: '/api/calendar-events',
            }}
            nowIndicator={true}
            editable={true}
            eventClick={() => console.log("date clicked")}     
          />
        </div>
      </div>
    </div>
  );
}

