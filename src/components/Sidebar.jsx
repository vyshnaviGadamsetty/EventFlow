import React from 'react';
import TodaysEvents from './TodayEvents';
import QuickStats from './QuickStats';
import UsageInstructions from './UsageInstruction';

const Sidebar = ({
  calendarEvents,
  isDarkMode,
  setEditingEvent,
  setSelectedDate,
  setShowEventModal,
  handleDeleteEvent,
  getEventsForDate,
  currentDate,
  requestCalendarAccess
}) => {
  return (
    <div className="lg:col-span-1 space-y-6">
      <TodaysEvents
        calendarEvents={calendarEvents}
        isDarkMode={isDarkMode}
        setEditingEvent={setEditingEvent}
        setSelectedDate={setSelectedDate}
        setShowEventModal={setShowEventModal}
        handleDeleteEvent={handleDeleteEvent}
        getEventsForDate={getEventsForDate}
      />

      <QuickStats
        isDarkMode={isDarkMode}
        calendarEvents={calendarEvents}
        currentDate={currentDate}
        requestCalendarAccess={requestCalendarAccess}
      />

      <UsageInstructions
        isDarkMode={isDarkMode}
      />
    </div>
  );
};

export default Sidebar;