"use client";

import { useEffect, useState } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

export default function Calendar() {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', startTime: '', endTime: '', participants: '', locationLink: '' });
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Fetch events from the database on component mount
  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch('/api/calendar'); // Your API endpoint
        const data = await response.json();
        setEvents(
          data.map((event) => ({
            id: event.id,
            title: event.title,
            start: new Date(event.startTime),
            end: new Date(event.endTime),
            locationLink: event.locationLink,
          }))
        );
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    }
    fetchEvents();
  }, []);

  // Handle new event creation
  const handleSaveEvent = async () => {
    try {
      const response = await fetch('/api/calendar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEvent),
      });

      if (response.ok) {
        const savedEvent = await response.json();
        setEvents((prev) => [
          ...prev,
          { ...savedEvent, start: new Date(savedEvent.startTime), end: new Date(savedEvent.endTime) },
        ]);
      }
    } catch (error) {
      console.error('Error saving event:', error);
    } finally {
      setIsModalOpen(false);
      setNewEvent({ title: '', startTime: '', endTime: '', participants: '', locationLink: '' });
    }
  };

  // Handle event deletion
  const handleDeleteEvent = async (event) => {
    try {
      await fetch(`/api/calendar/${event.id}`, { method: 'DELETE' });
      setEvents((prev) => prev.filter((e) => e.id !== event.id));
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  // Dynamically style events
  const eventPropGetter = (event) => ({
    style: { backgroundColor: 'red', color: 'white' },
  });

  return (
    <div style={{ height: 500 }}>
      <BigCalendar
        localizer={localizer}
        events={events}
        selectable
        onSelectSlot={({ start, end }) => {
          setNewEvent({ ...newEvent, startTime: start, endTime: end });
          setIsModalOpen(true);
        }}
        onSelectEvent={(event) => setSelectedEvent(event)}
        defaultView="week"
        views={['month', 'week', 'day']}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        eventPropGetter={eventPropGetter}
      />

      {/* Custom Modal for Adding Events */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Schedule a Meeting</h2>
            <input
              type="text"
              placeholder="Event Title"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="Participants (comma-separated)"
              value={newEvent.participants}
              onChange={(e) => setNewEvent({ ...newEvent, participants: e.target.value })}
            />
            <input
              type="text"
              placeholder="Location Link"
              value={newEvent.locationLink}
              onChange={(e) => setNewEvent({ ...newEvent, locationLink: e.target.value })}
            />
            <button onClick={handleSaveEvent}>Save</button>
            <button onClick={() => setIsModalOpen(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Custom Modal for Event Details */}
      {selectedEvent && (
        <div className="modal">
          <div className="modal-content">
            <h2>{selectedEvent.title}</h2>
            <p>
              <strong>Start:</strong> {moment(selectedEvent.start).format('LLLL')}
            </p>
            <p>
              <strong>End:</strong> {moment(selectedEvent.end).format('LLLL')}
            </p>
            <p>
              <strong>Location:</strong> {selectedEvent.locationLink || 'N/A'}
            </p>
            <button onClick={() => handleDeleteEvent(selectedEvent)}>Delete</button>
            <button onClick={() => setSelectedEvent(null)}>Close</button>
          </div>
        </div>
      )}

      <style jsx>{`
        .modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .modal-content {
          background: white;
          padding: 20px;
          border-radius: 8px;
          max-width: 500px;
          width: 100%;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
}