
import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar,
  Clock,
  MapPin,
  Plus,
  Edit3,
  Trash2,
  Check,
  X,
  Star,
  Circle,
  Eye,
  ArrowLeft
} from 'lucide-react';

// AddEventModal Component
const AddEventModal = ({
  isDarkMode,
  newEvent,
  setNewEvent,
  editingEvent,
  handleAddEvent,
  handleUpdateEvent,
  setShowEventModal,
  setEditingEvent,
  events
}) => {
  const closeModal = () => {
    setShowEventModal(false);
    setEditingEvent(null);
    setNewEvent({
      title: '',
      time: '12:00',
      endTime: '13:00',
      description: '',
      location: '',
      color: 'bg-green-500',
      category: 'work',
      date: new Date().toDateString()
    });
  };

  const timeToMinutes = (time) => {
    if (!time) return 0;
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
  };

  const isConflicting = () => {
    if (!newEvent.time || !newEvent.date) return false;

    const newStart = timeToMinutes(newEvent.time);
    const newEnd = newEvent.endTime ? timeToMinutes(newEvent.endTime) : newStart + 60;

    return events.some(event => {
      if (editingEvent && event.id === editingEvent.id) return false;
      if (event.date !== newEvent.date) return false;

      const eventStart = timeToMinutes(event.time);
      const eventEnd = event.endTime ? timeToMinutes(event.endTime) : eventStart + 60;

      return (newStart < eventEnd) && (newEnd > eventStart);
    });
  };

  const handleTimeChange = (e, field) => {
    const value = e.target.value;
    setNewEvent(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = () => {
    if (!newEvent.time || !newEvent.endTime) return false;
    const start = timeToMinutes(newEvent.time);
    const end = timeToMinutes(newEvent.endTime);
    return (
      newEvent.title.trim() !== '' &&
      newEvent.time !== '' &&
      newEvent.endTime !== '' &&
      end > start &&
      !isConflicting()
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`${isDarkMode ? 'bg-black/90' : 'bg-white/90'} backdrop-blur-md border ${isDarkMode ? 'border-green-500/30' : 'border-green-500/40'} rounded-2xl p-8 max-w-md w-full`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {editingEvent ? 'Edit Event' : 'Add New Event'}
          </h2>
          <button onClick={closeModal} className={`p-2 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Event title"
            value={newEvent.title}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            className={`w-full px-4 py-3 ${isDarkMode ? 'bg-black/30 border-green-500/30 text-white placeholder-gray-400' : 'bg-white/30 border-green-500/40 text-gray-900 placeholder-gray-500'} border rounded-xl focus:outline-none focus:border-green-400`}
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Start Time</label>
              <input
                type="time"
                value={newEvent.time}
                onChange={(e) => handleTimeChange(e, 'time')}
                className={`w-full px-4 py-3 ${isDarkMode ? 'bg-black/30 border-green-500/30 text-white' : 'bg-white/30 border-green-500/40 text-gray-900'} border rounded-xl focus:outline-none focus:border-green-400`}
                required
              />
            </div>
            <div>
              <label className={`block text-sm mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>End Time</label>
              <input
                type="time"
                value={newEvent.endTime}
                onChange={(e) => handleTimeChange(e, 'endTime')}
                min={newEvent.time}
                className={`w-full px-4 py-3 ${isDarkMode ? 'bg-black/30 border-green-500/30 text-white' : 'bg-white/30 border-green-500/40 text-gray-900'} border rounded-xl focus:outline-none focus:border-green-400`}
                required
              />
            </div>
          </div>

          {isConflicting() && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-500">
              <p className="font-medium">⚠️ Time Conflict Detected!</p>
              <p className="text-sm mt-1">Another event already exists during this time period.</p>
            </div>
          )}

          <div>
            <label className={`block text-sm mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Location</label>
            <input
              type="text"
              placeholder="Where is the event?"
              value={newEvent.location}
              onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
              className={`w-full px-4 py-3 ${isDarkMode ? 'bg-black/30 border-green-500/30 text-white placeholder-gray-400' : 'bg-white/30 border-green-500/40 text-gray-900 placeholder-gray-500'} border rounded-xl focus:outline-none focus:border-green-400`}
            />
          </div>

          <div>
            <label className={`block text-sm mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Description</label>
            <textarea
              rows="3"
              placeholder="Event details..."
              value={newEvent.description}
              onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              className={`w-full px-4 py-3 ${isDarkMode ? 'bg-black/30 border-green-500/30 text-white placeholder-gray-400' : 'bg-white/30 border-green-500/40 text-gray-900 placeholder-gray-500'} border rounded-xl resize-none focus:outline-none focus:border-green-400`}
            />
          </div>

          <div className="flex justify-between items-center pt-4">
            <div className="flex space-x-2">
              {['bg-green-500', 'bg-blue-500', 'bg-orange-500', 'bg-pink-500', 'bg-purple-500'].map((color) => (
                <button
                  key={color}
                  onClick={() => setNewEvent({ ...newEvent, color })}
                  className={`w-8 h-8 ${color} rounded-full border-2 ${newEvent.color === color ? 'border-white scale-110' : 'border-transparent'} transition-all duration-300 hover:scale-105`}
                />
              ))}
            </div>
            <button
              onClick={editingEvent ? handleUpdateEvent : handleAddEvent}
              disabled={!isFormValid()}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                !isFormValid()
                  ? 'bg-gray-400 text-gray-700 cursor-not-allowed opacity-50'
                  : 'bg-gradient-to-r from-green-400 to-emerald-500 text-black hover:shadow-lg hover:scale-105'
              }`}
            >
              {editingEvent ? 'Update Event' : 'Add Event'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Day View Component
const DayView = ({ 
  isDarkMode, 
  selectedDate, 
  events, 
  onBack, 
  onEditEvent, 
  onDeleteEvent, 
  onAddEvent 
}) => {
  const sortedEvents = events.sort((a, b) => {
    const timeA = a.time.split(':').map(Number);
    const timeB = b.time.split(':').map(Number);
    return (timeA[0] * 60 + timeA[1]) - (timeB[0] * 60 + timeB[1]);
  });

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 0; hour < 24; hour++) {
      const time = `${hour.toString().padStart(2, '0')}:00`;
      const displayTime = formatTime(time);
      slots.push({ time, displayTime, events: [] });
    }
    
    // Assign events to time slots
    sortedEvents.forEach(event => {
      const eventHour = parseInt(event.time.split(':')[0]);
      if (slots[eventHour]) {
        slots[eventHour].events.push(event);
      }
    });
    
    return slots;
  };

  const timeSlots = generateTimeSlots();

  return (
    <div className={`${isDarkMode ? 'bg-black/30' : 'bg-white/40'} backdrop-blur-md border ${isDarkMode ? 'border-green-500/20' : 'border-green-500/30'} rounded-2xl p-6`}>
      {/* Day View Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className={`p-2 ${isDarkMode ? 'text-green-400 hover:bg-green-400/20' : 'text-green-600 hover:bg-green-600/20'} rounded-lg transition-colors`}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {selectedDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </h2>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {events.length} event{events.length !== 1 ? 's' : ''} scheduled
            </p>
          </div>
        </div>
        
        <button
          onClick={onAddEvent}
          className={`flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-400 to-emerald-500 text-black rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105`}
        >
          <Plus className="w-4 h-4" />
          <span>Add Event</span>
        </button>
      </div>

      {/* Timeline View */}
      <div className="space-y-1 max-h-96 overflow-y-auto">
        {timeSlots.map((slot, index) => (
          <div key={index} className={`flex items-start space-x-4 py-2 border-b ${isDarkMode ? 'border-green-500/10' : 'border-green-500/20'}`}>
            <div className={`w-20 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} flex-shrink-0`}>
              {slot.displayTime}
            </div>
            <div className="flex-1">
              {slot.events.length > 0 ? (
                <div className="space-y-2">
                  {slot.events.map((event) => (
                    <div
                      key={event.id}
                      className={`${isDarkMode ? 'bg-black/40' : 'bg-white/40'} backdrop-blur-sm border ${isDarkMode ? 'border-green-500/20' : 'border-green-500/30'} rounded-lg p-4 hover:shadow-lg transition-all cursor-pointer group`}
                      onClick={() => onEditEvent(event)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className={`w-3 h-3 ${event.color} rounded-full`}></div>
                            <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                              {event.title}
                            </h4>
                          </div>
                          <div className="flex items-center space-x-4 text-sm mb-2">
                            <div className={`flex items-center space-x-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              <Clock className="w-4 h-4" />
                              <span>{formatTime(event.time)} - {formatTime(event.endTime)}</span>
                            </div>
                            {event.location && (
                              <div className={`flex items-center space-x-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                <MapPin className="w-4 h-4" />
                                <span>{event.location}</span>
                              </div>
                            )}
                          </div>
                          {event.description && (
                            <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                              {event.description}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onEditEvent(event);
                            }}
                            className={`p-1 ${isDarkMode ? 'text-green-400 hover:bg-green-400/20' : 'text-green-600 hover:bg-green-600/20'} rounded transition-colors`}
                            title="Edit event"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteEvent(event.id);
                            }}
                            className={`p-1 ${isDarkMode ? 'text-red-400 hover:bg-red-400/20' : 'text-red-600 hover:bg-red-600/20'} rounded transition-colors`}
                            title="Delete event"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'} italic`}>
                  No events
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [animatingCells, setAnimatingCells] = useState(new Set());
  const [showDayActions, setShowDayActions] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showDayView, setShowDayView] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: '',
    time: '12:00',
    endTime: '13:00',
    description: '',
    location: '',
    color: 'bg-green-500',
    category: 'work',
    date: new Date().toDateString()
  });
  const isDarkMode = true;

  // Sample events for demo
  const [calendarEvents, setCalendarEvents] = useState([])
  

  // Floating particles for background
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = [...Array(15)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      speed: Math.random() * 3 + 2,
      opacity: Math.random() * 0.3 + 0.1
    }));
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const CustomCursor = () => (
    <>
      <div 
        className="fixed pointer-events-none z-[100] mix-blend-difference"
        style={{
          left: cursorPos.x - 6,
          top: cursorPos.y - 6,
          transform: `scale(${isHovering ? 2 : 1})`,
          transition: 'transform 0.2s ease'
        }}
      >
        <div className={`w-3 h-3 rounded-full ${isDarkMode ? 'bg-green-400' : 'bg-green-600'} animate-pulse`} />
      </div>
      <div 
        className="fixed pointer-events-none z-[99]"
        style={{
          left: cursorPos.x - 15,
          top: cursorPos.y - 15,
          transform: `scale(${isHovering ? 1.5 : 1})`,
          transition: 'transform 0.3s ease'
        }}
      >
        <div className={`w-8 h-8 rounded-full border-2 ${isDarkMode ? 'border-green-400/30' : 'border-green-600/30'}`} />
      </div>
    </>
  );

  const FloatingParticles = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute animate-pulse"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.id * 0.2}s`,
            animationDuration: `${particle.speed}s`
          }}
        >
          <div 
            className={`rounded-full ${isDarkMode ? 'bg-green-400/20' : 'bg-green-600/20'}`}
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
            }}
          />
        </div>
      ))}
    </div>
  );

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
    setShowDayActions(null);
    setAnimatingCells(new Set(Array.from({length: 42}, (_, i) => i)));
    setTimeout(() => setAnimatingCells(new Set()), 300);
  };

  const getEventsForDate = (date) => {
    if (!date) return [];
    return calendarEvents.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  const getEventsForCurrentMonth = () => {
    return calendarEvents.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getMonth() === currentDate.getMonth() && 
             eventDate.getFullYear() === currentDate.getFullYear();
    });
  };

  const isToday = (date) => {
    if (!date) return false;
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date) => {
    if (!date) return false;
    return date.toDateString() === selectedDate.toDateString();
  };

  const isPastDate = (date) => {
    if (!date) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0);
    return compareDate < today;
  };

  const handleDateClick = (date, e) => {
    if (!date) return;
    
    if (e.target.closest('.event-item')) {
      return;
    }
    
    setSelectedDate(date);
    setShowDayActions(date.toDateString());
  };

  const handleViewDay = () => {
    setShowDayActions(null);
    setShowDayView(true);
  };

  const handleBackToCalendar = () => {
    setShowDayView(false);
  };

  const handleAddEvent = () => {
    const nextId = Math.max(...calendarEvents.map(e => e.id), 0) + 1;
    const eventToAdd = {
      ...newEvent,
      id: nextId,
      date: selectedDate.toDateString()
    };
    
    setCalendarEvents(prev => [...prev, eventToAdd]);
    setShowEventModal(false);
    setShowDayActions(null);
    
    setNewEvent({
      title: '',
      time: '12:00',
      endTime: '13:00',
      description: '',
      location: '',
      color: 'bg-green-500',
      category: 'work',
      date: new Date().toDateString()
    });
  };

  const handleUpdateEvent = () => {
    setCalendarEvents(prev => 
      prev.map(event => 
        event.id === editingEvent.id ? { ...newEvent, id: editingEvent.id } : event
      )
    );
    setShowEventModal(false);
    setEditingEvent(null);
    setShowDayActions(null);
    
    setNewEvent({
      title: '',
      time: '12:00',
      endTime: '13:00',
      description: '',
      location: '',
      color: 'bg-green-500',
      category: 'work',
      date: new Date().toDateString()
    });
  };

  const openAddEventModal = () => {
    setShowDayActions(null);
    setNewEvent({
      title: '',
      time: '12:00',
      endTime: '13:00',
      description: '',
      location: '',
      color: 'bg-green-500',
      category: 'work',
      date: selectedDate.toDateString()
    });
    setShowEventModal(true);
  };

  const handleEventClick = (event, e) => {
    e.stopPropagation();
    setSelectedDate(new Date(event.date));
    setShowDayActions(null);
    setEditingEvent(event);
    setNewEvent({
      title: event.title,
      time: event.time,
      endTime: event.endTime,
      description: event.description || '',
      location: event.location || '',
      color: event.color,
      category: event.category || 'work',
      date: event.date
    });
    setShowEventModal(true);
  };

  const handleDeleteEvent = (eventId, e) => {
    if (e) e.stopPropagation();
    setCalendarEvents(prev => prev.filter(event => event.id !== eventId));
  };

  const getDayActionPosition = (date, index) => {
    const row = Math.floor(index / 7);
    const col = index % 7;
    const isLastRow = row >= 4;
    const isRightSide = col >= 5;
    
    let position = 'top-full left-0 mt-2';
    
    if (isLastRow) {
      position = 'bottom-full left-0 mb-2';
    }
    
    if (isRightSide) {
      position = position.replace('left-0', 'right-0');
    }
    
    return position;
  };

  const selectedDateEvents = getEventsForDate(selectedDate);
  const currentMonthEvents = getEventsForCurrentMonth();

  return (
    <div className={`relative min-h-screen ${isDarkMode ? 'bg-black' : 'bg-gray-50'} cursor-none overflow-hidden`}>
      <CustomCursor />
      <FloatingParticles />
      
      <div className="relative z-10 p-6">
        {/* Show Day View or Calendar */}
        {showDayView ? (
          <DayView
            isDarkMode={isDarkMode}
            selectedDate={selectedDate}
            events={selectedDateEvents}
            onBack={handleBackToCalendar}
            onEditEvent={(event) => handleEventClick(event, { stopPropagation: () => {} })}
            onDeleteEvent={handleDeleteEvent}
            onAddEvent={openAddEventModal}
          />
        ) : (
          <>
            {/* Calendar Header */}
            <div className={`${isDarkMode ? 'bg-black/30' : 'bg-white/40'} backdrop-blur-md border ${isDarkMode ? 'border-green-500/20' : 'border-green-500/30'} rounded-2xl p-6 mb-6`}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${isDarkMode ? 'from-green-400 to-emerald-500' : 'from-green-500 to-emerald-600'} rounded-xl flex items-center justify-center`}>
                    <Calendar className="w-6 h-6 text-black font-bold" />
                  </div>
                  <div>
                    <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </h1>
                    <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {currentMonthEvents.length} event{currentMonthEvents.length !== 1 ? 's' : ''} this month
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => navigateMonth(-1)}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    className={`p-3 ${isDarkMode ? 'bg-green-400/10 hover:bg-green-400/20 text-green-400' : 'bg-green-600/10 hover:bg-green-600/20 text-green-600'} rounded-xl transition-all duration-300 hover:scale-105`}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  
                  <button
                    onClick={() => {
                      setCurrentDate(new Date());
                      setSelectedDate(new Date());
                    }}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    className={`px-4 py-2 text-sm font-medium ${isDarkMode ? 'bg-green-400/10 hover:bg-green-400/20 text-green-400' : 'bg-green-600/10 hover:bg-green-600/20 text-green-600'} rounded-xl transition-all duration-300 hover:scale-105`}
                  >
                    Today
                  </button>
                  
                  <button
                    onClick={() => navigateMonth(1)}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    className={`p-3 ${isDarkMode ? 'bg-green-400/10 hover:bg-green-400/20 text-green-400' : 'bg-green-600/10 hover:bg-green-600/20 text-green-600'} rounded-xl transition-all duration-300 hover:scale-105`}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Days of Week Header */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {daysOfWeek.map((day) => (
                  <div key={day} className={`p-3 text-center text-sm font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {day}
                  </div>
                ))}
              </div>
            </div>

            {/* Calendar Grid */}
            <div className={`${isDarkMode ? 'bg-black/30' : 'bg-white/40'} backdrop-blur-md border ${isDarkMode ? 'border-green-500/20' : 'border-green-500/30'} rounded-2xl p-6`}>
              <div className="grid grid-cols-7 gap-1">
                {getDaysInMonth(currentDate).map((date, index) => {
                  const dayEvents = getEventsForDate(date);
                  const isAnimating = animatingCells.has(index);
                  
                  return (
                    <div
                      key={index}
                      className={`relative aspect-square p-2 rounded-xl transition-all duration-300 cursor-pointer group ${
                        isAnimating ? 'animate-pulse' : ''
                      } ${
                        date
                          ? `${isDarkMode ? 'hover:bg-green-400/10' : 'hover:bg-green-600/10'} ${
                              isToday(date)
                                ? `${isDarkMode ? 'bg-green-400/20 border-green-400/50' : 'bg-green-600/20 border-green-600/50'} border`
                                : isSelected(date)
                                ? `${isDarkMode ? 'bg-green-400/15 border-green-400/30' : 'bg-green-600/15 border-green-600/30'} border`
                                : `${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-black/5'}`
                            } ${isPastDate(date) ? 'opacity-60' : ''}`
                          : ''
                      }`}
                      onClick={(e) => handleDateClick(date, e)}
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                    >
                      {date && (
                        <>
                          <div className="flex flex-col h-full">
                            <div className={`text-sm font-semibold mb-1 ${
                              isToday(date)
                                ? `${isDarkMode ? 'text-green-400' : 'text-green-600'}`
                                : `${isDarkMode ? 'text-white' : 'text-gray-900'}`
                            } ${isPastDate(date) ? 'opacity-70' : ''}`}>
                              {date.getDate()}
                            </div>
                            
                            {/* Events */}
                            <div className="flex-1 space-y-1">
                              {dayEvents.slice(0, 3).map((event, eventIndex) => (
                                <div
                                  key={event.id}
                                  className={`event-item text-xs px-2 py-1 ${event.color} rounded-md text-white font-medium truncate opacity-90 hover:opacity-100 transition-opacity cursor-pointer`}
                                  onClick={(e) => handleEventClick(event, e)}
                                  title={event.title}
                                >
                                  {event.title}
                                </div>
                              ))}
                              
                              {dayEvents.length > 3 && (
                                <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} px-2`}>
                                  +{dayEvents.length - 3} more
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Day Actions Popup */}
                          {showDayActions === date.toDateString() && (
                            <div className={`absolute ${getDayActionPosition(date, index)} z-20 ${isDarkMode ? 'bg-black/90' : 'bg-white/90'} backdrop-blur-md border ${isDarkMode ? 'border-green-500/30' : 'border-green-500/40'} rounded-xl p-4 shadow-xl min-w-48`}>
                              <div className="space-y-3">
                                <div>
                                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-1`}>
                                    {date.toLocaleDateString('en-US', { 
                                      weekday: 'long', 
                                      month: 'short', 
                                      day: 'numeric' 
                                    })}
                                  </h3>
                                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                    {dayEvents.length} event{dayEvents.length !== 1 ? 's' : ''}
                                  </p>
                                </div>
                                
                                <div className="flex space-x-2">
                                  <button
                                    onClick={openAddEventModal}
                                    className={`flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-green-400 to-emerald-500 text-black rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300 hover:scale-105`}
                                  >
                                    <Plus className="w-4 h-4" />
                                    <span>Add</span>
                                  </button>
                                  
                                  {dayEvents.length > 0 && (
                                    <button
                                      onClick={handleViewDay}
                                      className={`flex items-center space-x-2 px-3 py-2 ${isDarkMode ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-black/10 hover:bg-black/20 text-gray-900'} rounded-lg text-sm font-medium transition-all duration-300`}
                                    >
                                      <Eye className="w-4 h-4" />
                                      <span>View</span>
                                    </button>
                                  )}
                                </div>
                              </div>
                              
                              {/* Close button */}
                              <button
                                onClick={() => setShowDayActions(null)}
                                className={`absolute -top-2 -right-2 w-6 h-6 ${isDarkMode ? 'bg-gray-800 text-gray-400 hover:text-white' : 'bg-gray-200 text-gray-600 hover:text-gray-900'} rounded-full flex items-center justify-center text-xs hover:scale-110 transition-all`}
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {/* Event Modal */}
        {showEventModal && (
          <AddEventModal
            isDarkMode={isDarkMode}
            newEvent={newEvent}
            setNewEvent={setNewEvent}
            editingEvent={editingEvent}
            handleAddEvent={handleAddEvent}
            handleUpdateEvent={handleUpdateEvent}
            setShowEventModal={setShowEventModal}
            setEditingEvent={setEditingEvent}
            events={calendarEvents}
          />
        )}
      </div>
    </div>
  );
};

export default CalendarPage;