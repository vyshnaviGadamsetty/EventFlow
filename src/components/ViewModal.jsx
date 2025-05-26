import React, { useState, useRef } from 'react';
import { X, Calendar, Plus, Edit, Trash2 } from 'lucide-react';

const DayViewModal = ({
  isOpen,
  onClose,
  selectedDate,
  events,
  isDarkMode,
  onEventEdit,
  onEventDelete,
  onEventCreate,
  onEventMove
}) => {
  const [draggedEvent, setDraggedEvent] = useState(null);
  const [draggedOverSlot, setDraggedOverSlot] = useState(null);
  const scrollContainerRef = useRef(null);

  if (!isOpen || !selectedDate) return null;

  // Generate time slots (24 hours, 30-minute intervals)
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const displayTime = formatTimeDisplay(time);
        slots.push({ time, displayTime, hour, minute });
      }
    }
    return slots;
  };

  const formatTimeDisplay = (time) => {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    const hour24 = parseInt(hours);
    const hour12 = hour24 > 12 ? hour24 - 12 : hour24 === 0 ? 12 : hour24;
    const period = hour24 >= 12 ? 'PM' : 'AM';
    return `${hour12}:${minutes} ${period}`;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getEventsForTimeSlot = (slotTime) => {
    return events.filter(event => {
      if (!event.time || !event.endTime) return false;
      const eventStart = event.time;
      const eventEnd = event.endTime;
      return slotTime >= eventStart && slotTime < eventEnd;
    });
  };

  const getEventDuration = (event) => {
    if (!event.time || !event.endTime) return 1;
    const [startHour, startMin] = event.time.split(':').map(Number);
    const [endHour, endMin] = event.endTime.split(':').map(Number);
    const startMinutes = startHour * 60 + startMin;
    const endMinutes = endHour * 60 + endMin;
    return Math.max(1, Math.ceil((endMinutes - startMinutes) / 30));
  };

  const isEventStart = (event, slotTime) => {
    return event.time === slotTime;
  };

  const handleDragStart = (e, event) => {
    setDraggedEvent(event);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, slotTime) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDraggedOverSlot(slotTime);
  };

  const handleDragLeave = () => {
    setDraggedOverSlot(null);
  };

  const handleDrop = (e, newTime) => {
    e.preventDefault();
    if (draggedEvent && newTime !== draggedEvent.time) {
      // Calculate duration to maintain event length
      const duration = getEventDuration(draggedEvent);
      const [newHour, newMin] = newTime.split(':').map(Number);
      const newStartMinutes = newHour * 60 + newMin;
      const newEndMinutes = newStartMinutes + (duration * 30);
      const newEndHour = Math.floor(newEndMinutes / 60);
      const newEndMin = newEndMinutes % 60;
      const newEndTime = `${newEndHour.toString().padStart(2, '0')}:${newEndMin.toString().padStart(2, '0')}`;

      onEventMove(draggedEvent.id, newTime, newEndTime);
    }
    setDraggedEvent(null);
    setDraggedOverSlot(null);
  };

  const handleCreateEvent = (time) => {
    // Calculate end time (default 1 hour)
    const [hour, min] = time.split(':').map(Number);
    const endMinutes = (hour * 60 + min) + 60;
    const endHour = Math.floor(endMinutes / 60);
    const endMin = endMinutes % 60;
    const endTime = `${endHour.toString().padStart(2, '0')}:${endMin.toString().padStart(2, '0')}`;
    
    onEventCreate(selectedDate, time, endTime);
  };

  const timeSlots = generateTimeSlots();

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-lg flex items-center justify-center z-50 p-4">
      <div className={`${isDarkMode ? 'bg-black/90' : 'bg-white/90'} backdrop-blur-xl border-2 ${isDarkMode ? 'border-green-400/30' : 'border-green-500/40'} rounded-3xl p-6 max-w-4xl w-full max-h-[90vh] shadow-2xl transform transition-all duration-500 scale-100 opacity-100`}>
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 bg-gradient-to-r ${isDarkMode ? 'from-green-400 to-emerald-500' : 'from-green-500 to-emerald-600'} rounded-xl flex items-center justify-center`}>
              <Calendar className="w-6 h-6 text-black" />
            </div>
            <div>
              <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Day View
              </h2>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {formatDate(selectedDate)}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className={`p-3 ${isDarkMode ? 'text-gray-400 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-gray-900 hover:bg-black/10'} rounded-xl transition-all duration-300 hover:scale-110`}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Time Grid */}
        <div 
          ref={scrollContainerRef}
          className="h-[70vh] overflow-y-auto border-2 rounded-2xl"
          style={{
            borderColor: isDarkMode ? 'rgba(74, 222, 128, 0.3)' : 'rgba(34, 197, 94, 0.4)'
          }}
        >
          <div className="relative">
            {timeSlots.map((slot, index) => {
              const slotEvents = getEventsForTimeSlot(slot.time);
              const isHourMark = slot.minute === 0;
              const isDraggedOver = draggedOverSlot === slot.time;
              
              return (
                <div
                  key={slot.time}
                  className={`relative flex border-b ${
                    isHourMark 
                      ? isDarkMode ? 'border-green-400/30' : 'border-green-500/40'
                      : isDarkMode ? 'border-gray-700/30' : 'border-gray-300/30'
                  } ${isDraggedOver ? 'bg-green-400/20' : ''}`}
                  style={{ height: '60px' }}
                  onDragOver={(e) => handleDragOver(e, slot.time)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, slot.time)}
                >
                  {/* Time Label */}
                  <div className={`w-20 flex items-center justify-end pr-4 ${
                    isHourMark ? 'font-semibold' : 'font-normal'
                  } ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-sm border-r ${
                    isDarkMode ? 'border-green-400/30' : 'border-green-500/40'
                  }`}>
                    {isHourMark ? slot.displayTime : ''}
                  </div>

                  {/* Event Area */}
                  <div className="flex-1 relative group">
                    {/* Add Event Button (appears on hover) */}
                    <button
                      onClick={() => handleCreateEvent(slot.time)}
                      className={`absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${
                        isDarkMode ? 'hover:bg-green-400/10' : 'hover:bg-green-500/10'
                      } flex items-center justify-center`}
                    >
                      <Plus className={`w-4 h-4 ${isDarkMode ? 'text-green-400' : 'text-green-500'}`} />
                    </button>

                    {/* Events */}
                    {slotEvents.map(event => {
                      if (!isEventStart(event, slot.time)) return null;
                      
                      const duration = getEventDuration(event);
                      const eventHeight = duration * 60 - 4; // 60px per slot minus padding
                      
                      return (
                        <div
                          key={event.id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, event)}
                          className={`absolute left-2 right-2 rounded-lg p-2 cursor-move shadow-lg transition-all duration-200 hover:shadow-xl z-10 ${
                            event.color || 'bg-green-500'
                          }`}
                          style={{
                            height: `${eventHeight}px`,
                            top: '2px'
                          }}
                        >
                          <div className="flex items-center justify-between h-full">
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold text-white text-sm truncate">
                                {event.title}
                              </div>
                              <div className="text-white/80 text-xs">
                                {formatTimeDisplay(event.time)} - {formatTimeDisplay(event.endTime)}
                              </div>
                              {event.location && (
                                <div className="text-white/70 text-xs truncate">
                                  {event.location}
                                </div>
                              )}
                            </div>
                            <div className="flex space-x-1 ml-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onEventEdit(event);
                                }}
                                className="p-1 hover:bg-white/20 rounded transition-colors duration-200"
                              >
                                <Edit className="w-3 h-3 text-white" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (window.confirm('Delete this event?')) {
                                    onEventDelete(event.id);
                                  }
                                }}
                                className="p-1 hover:bg-red-500/30 rounded transition-colors duration-200"
                              >
                                <Trash2 className="w-3 h-3 text-white" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 flex justify-between items-center">
          <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Drag events to reschedule • Hover over time slots to add events
          </div>
          <button
            onClick={onClose}
            className={`px-6 py-3 ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'} rounded-xl font-medium transition-all duration-300 hover:scale-105`}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DayViewModal;