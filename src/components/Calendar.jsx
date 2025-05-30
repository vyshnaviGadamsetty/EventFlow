
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import EventCard from './EventCard';
import EventActionDialog from './EventActionDialog';
import DayViewModal from './ViewModal';

const CalendarDay = ({
  day,
  events,
  isToday,
  isSelected,
  onClick,
  handleDragOver,
  handleDrop,
  handleDragStart,
  isDarkMode,
  setSelectedDate,
  setShowEventModal,
  setEditingEvent,
  handleDeleteEvent,
  calendarEvents,
  getEventsForDate,
  onEventMove
}) => {
  const [showPlusButton, setShowPlusButton] = useState(false);
  const [showActionDialog, setShowActionDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showDayView, setShowDayView] = useState(false);

  const handleTouch = (e) => {
    e.preventDefault();
    setShowPlusButton(true);
    onClick(day.date);
  };

  const handleEventClick = (event, e) => {
    e.stopPropagation();
    setSelectedEvent(event);
    setShowActionDialog(true);
  };

  const handleViewEvent = (event) => {
    setShowDayView(true);
  };

  const handleEditEvent = () => {
    setEditingEvent(selectedEvent);
    setSelectedDate(new Date(selectedEvent.date));
    setShowEventModal(true);
  };

  const handleDeleteEventAction = () => {
    handleDeleteEvent(selectedEvent.id);
  };

  const handleCreateEventInDayView = (date, startTime, endTime) => {
    setSelectedDate(date);
    // You can pre-fill the time here if needed
    setShowEventModal(true);
    setShowDayView(false);
  };

  const handleEventMoveInDayView = (eventId, newStartTime, newEndTime) => {
    if (onEventMove) {
      onEventMove(eventId, newStartTime, newEndTime);
    }
  };

  return (
    <>
      <div
        onClick={handleTouch}
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, day.date)}
        className={`min-h-[120px] p-2 border-2 transition-all duration-300 cursor-pointer relative group overflow-hidden ${
          day.isCurrentMonth
            ? isDarkMode
              ? 'border-green-400/20 hover:border-green-400/40 bg-black/30 hover:bg-black/50'
              : 'border-green-500/30 hover:border-green-500/50 bg-white/50 hover:bg-white/70'
            : isDarkMode
              ? 'border-gray-700/30 bg-gray-900/50 text-gray-600'
              : 'border-gray-300/30 bg-gray-100/50 text-gray-400'
        } ${
          isToday
            ? 'ring-2 ring-green-400 ring-opacity-50'
            : ''
        } ${
          isSelected
            ? isDarkMode
              ? 'bg-green-400/20 border-green-400'
              : 'bg-green-500/20 border-green-500'
            : ''
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative z-10 h-full flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <span className={`text-lg font-semibold ${
              isToday
                ? 'text-green-400'
                : day.isCurrentMonth
                  ? isDarkMode ? 'text-white' : 'text-gray-900'
                  : isDarkMode ? 'text-gray-600' : 'text-gray-400'
            }`}>
              {day.date.getDate()}
            </span>
          </div>
                        
          {/* Events container */}
          <div className="flex-1 space-y-1">
            {events.slice(0, 3).map((event) => (
              <div
                key={event.id}
                onClick={(e) => handleEventClick(event, e)}
                className="cursor-pointer"
              >
                <EventCard
                  event={event}
                  onEdit={() => handleEditEvent()}
                  onDelete={() => handleDeleteEventAction()}
                  isDraggable={true}
                  handleDragStart={(e) => handleDragStart(event.id)}
                />
              </div>
            ))}
            {events.length > 3 && (
              <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} px-2 py-1 rounded`}>
                +{events.length - 3} more
              </div>
            )}
          </div>
                  
          {/* Add Button - Only shows when touched/clicked */}
          {day.isCurrentMonth && showPlusButton && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedDate(day.date);
                setShowEventModal(true);
              }}
              className="
                absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                p-2 bg-green-400 hover:bg-green-500 rounded-full text-black
                transition-all duration-300 hover:scale-110
              "
            >
              <Plus className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Day View Modal */}
      <DayViewModal
        isOpen={showDayView}
        onClose={() => setShowDayView(false)}
        selectedDate={day.date}
        events={getEventsForDate ? getEventsForDate(calendarEvents, day.date) : events}
        isDarkMode={isDarkMode}
        onEventEdit={(event) => {
          setEditingEvent(event);
          setSelectedDate(new Date(event.date));
          setShowEventModal(true);
          setShowDayView(false);
        }}
        onEventDelete={handleDeleteEvent}
        onEventCreate={handleCreateEventInDayView}
        onEventMove={handleEventMoveInDayView}
      />

      {/* Event Action Dialog */}
      <EventActionDialog
        isOpen={showActionDialog}
        onClose={() => {
          setShowActionDialog(false);
          setSelectedEvent(null);
        }}
        event={selectedEvent}
        onView={handleViewEvent}
        onEdit={handleEditEvent}
        onDelete={handleDeleteEventAction}
        isDarkMode={isDarkMode}
      />
    </>
  );
};

export default CalendarDay;