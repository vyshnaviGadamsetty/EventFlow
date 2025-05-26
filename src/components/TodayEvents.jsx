import React from 'react';
import EventCard from './EventCard'; // Assuming relative path, adjust as needed

const TodaysEvents = ({
  calendarEvents,
  isDarkMode,
  setEditingEvent,
  setSelectedDate,
  setShowEventModal,
  handleDeleteEvent,
  getEventsForDate
}) => {
  const today = new Date();
  const todaysEvents = getEventsForDate(calendarEvents, today);

  return (
    <div className={`${isDarkMode ? 'bg-black/40' : 'bg-white/40'} backdrop-blur-xl border-2 ${isDarkMode ? 'border-green-400/30' : 'border-green-500/40'} rounded-3xl p-6`}>
      <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
        Today's Events
      </h3>
      {todaysEvents.length > 0 ? (
        <div className="space-y-3">
          {todaysEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onEdit={(event) => {
                setEditingEvent(event);
                setSelectedDate(new Date(event.date));
                setShowEventModal(true);
              }}
              onDelete={handleDeleteEvent}
              isDraggable={false}
            />
          ))}
        </div>
      ) : (
        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          No events today
        </p>
      )}
    </div>
  );
};

export default TodaysEvents;
