import React from 'react';
import CalendarDay from './Calendar';

const CalendarGrid = ({ 
  currentDate,
  getDaysInMonth,
  getEventsForDate,
  calendarEvents,
  filterCategory,
  searchQuery,
  selectedDate,
  setSelectedDate,
  setShowEventModal,
  isDarkMode,
  handleDragOver,
  handleDrop,
  handleDragStart,
  setEditingEvent,
  handleDeleteEvent,
  handleEventMove,
  shortDays
}) => {
  return (
    <>
      {/* Days of Week Header */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {shortDays.map((day) => (
          <div
            key={day}
            className={`p-4 text-center font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {getDaysInMonth(currentDate).map((day, index) => {
          const dayEvents = getEventsForDate(calendarEvents, day.date);
          const filteredDayEvents = dayEvents.filter(event => {
            if (filterCategory !== 'all' && event.category !== filterCategory) return false;
            if (searchQuery && !event.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
                !event.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
                !event.location.toLowerCase().includes(searchQuery.toLowerCase())) return false;
            return true;
          });
          
          const isToday = day.date.toDateString() === new Date().toDateString();
          const isSelected = day.date.toDateString() === selectedDate.toDateString();
          
          return (
            <CalendarDay
              key={index}
              day={day}
              events={filteredDayEvents}
              isToday={isToday}
              isSelected={isSelected}
              onClick={(date) => setSelectedDate(date)}
              setSelectedDate={setSelectedDate}
              setShowEventModal={setShowEventModal}
              isDarkMode={isDarkMode}
              handleDragOver={handleDragOver}
              handleDrop={handleDrop}
              handleDragStart={handleDragStart} 
              setEditingEvent={setEditingEvent}
              handleDeleteEvent={handleDeleteEvent} 
              onEventMove={handleEventMove}
            />
          );
        })}
      </div>
    </>
  );
};

export default CalendarGrid;