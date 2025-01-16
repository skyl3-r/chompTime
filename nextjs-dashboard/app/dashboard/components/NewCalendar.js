"use client";

import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';
import styles from '@/app/ui/home.module.css'
import styled from "@emotion/styled"

export const StyleWrapper = styled.div`
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');

font-family: 'Inter', sans-serif;
.fc-event {
    white-space: inherit !important;
  }
.fc-daygrid-event  {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 5px;
    margin: 3px;
    font-family: 'Inter', sans-serif;
    background-color: #e1f2fd
  }
.fc-daygrid-event-dot {
    display: none;
}

`


const Calendar = (meetings) => {
    // console.log(meetings.meetings);
  return (
    <StyleWrapper>
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={meetings.meetings}
      displayEventEnd={true}
    />
    </StyleWrapper>
    
  );
};

export default Calendar;