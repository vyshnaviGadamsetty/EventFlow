
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar,
  Home,
  PlusCircle,
  Sun,
  Moon,
  
  User,
 
  
  Star,
  Heart,
  Coffee,
  Briefcase,
  MousePointer
} from 'lucide-react';
import EventModal from '../components/EventModal';
import CustomCursor from '../components/CustomCursor';
import FloatingParticles from '../components/FloatingParticles';
import TodaysEvents from "../components/TodayEvents"

import SearchAndFilter from '../components/SearchandFilter';
import CalendarDay from '../components/Calendar';
const Index = () => {
  const navigate = useNavigate();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showEventModal, setShowEventModal] = useState(false);
  const [showDayView, setShowDayView] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState('calendar');
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [draggedEvent, setDraggedEvent] = useState(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [particles, setParticles] = useState([]);
  const [addButtonClicked, setAddButtonClicked] = useState(false);



  // Separate state for form inputs to fix typing issues
  const [eventTitle, setEventTitle] = useState('');
  const [eventTime, setEventTime] = useState('12:00');
  const [eventEndTime, setEventEndTime] = useState('13:00');
  const [eventDescription, setEventDescription] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventColor, setEventColor] = useState('bg-gradient-to-r from-green-400 to-emerald-500');
  const [eventCategory, setEventCategory] = useState('work');
  const [recurrenceType, setRecurrenceType] = useState('none');
  const [recurrenceInterval, setRecurrenceInterval] = useState(1);
  const [recurrenceDaysOfWeek, setRecurrenceDaysOfWeek] = useState([]);
  const [recurrenceEndDate, setRecurrenceEndDate] = useState('');
  const [recurrenceCustomPattern, setRecurrenceCustomPattern] = useState('days');
  const [draggedEventId, setDraggedEventId] = useState(null);

const handleDragStart = (eventId) => {
  setDraggedEventId(eventId);
};

const handleDragOver = (e) => {
  e.preventDefault();  // This is necessary to allow dropping
};

const handleDrop = (e, droppedOnDate) => {
  e.preventDefault();
  if (!draggedEventId) return;

  setCalendarEvents(prevEvents =>
    prevEvents.map(event =>
      event.id === draggedEventId
        ? { ...event, date: droppedOnDate.toDateString() }
        : event
    )
  );

  setDraggedEventId(null);
};

  const getDaysInMonth = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  const days = [];

  // Previous month's trailing days
  for (let i = 0; i < startingDayOfWeek; i++) {
    const prevDate = new Date(year, month, -startingDayOfWeek + i + 1);
    days.push({ date: prevDate, isCurrentMonth: false });
  }

  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    days.push({ date: new Date(year, month, day), isCurrentMonth: true });
  }

  // Next month's leading days to fill calendar grid (usually 42 cells)
  const remainingDays = 42 - days.length;
  for (let day = 1; day <= remainingDays; day++) {
    const nextDate = new Date(year, month + 1, day);
    days.push({ date: nextDate, isCurrentMonth: false });
  }

  return days;
};


  // Initialize particles for floating animation
  useEffect(() => {
    const newParticles = [...Array(30)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      speed: Math.random() * 3 + 1,
      opacity: Math.random() * 0.6 + 0.2,
      drift: Math.random() * 2 - 1
    }));
    setParticles(newParticles);
  }, []);

  // Mouse tracking for custom cursor
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);
useEffect(() => {
  const fetchPublicHolidays = async () => {
    try {
      const res = await fetch(
        'https://www.googleapis.com/calendar/v3/calendars/en.indian%23holiday%40group.v.calendar.google.com/events?key=${import.meta.env.VITE_GOOGLE_API_KEY}`'
      );
      const data = await res.json();

      const seen = new Set(); // To track duplicates
      const holidays = [];

      for (const item of data.items) {
        const title = item.summary;
        const date = new Date(item.start.date).toDateString();
        const key = `${title}-${date}`;

        if (!seen.has(key)) {
          seen.add(key);
          holidays.push({
            id: `${item.id}_${date}`, // 👈 safer key
            title,
            date,
            category: 'holiday',
            color: 'bg-gradient-to-r from-yellow-400 to-yellow-600',
            isHoliday: true
          });
        }
      }

      setCalendarEvents(prev => mergeAndDeduplicateEvents(prev, holidays));

    } catch (e) {
      console.error('Holiday API error', e);
    }
  };

  fetchPublicHolidays();
}, []);



  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const shortDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const categories = [
    { id: 'work', label: 'Work', icon: Briefcase, color: 'from-blue-400 to-blue-600' },
    { id: 'personal', label: 'Personal', icon: User, color: 'from-green-400 to-green-600' },
    { id: 'health', label: 'Health', icon: Heart, color: 'from-red-400 to-red-600' },
    { id: 'social', label: 'Social', icon: Coffee, color: 'from-purple-400 to-purple-600' },
    { id: 'important', label: 'Important', icon: Star, color: 'from-yellow-400 to-yellow-600' }
  ];

  const eventColors = [
    'bg-gradient-to-r from-green-400 to-emerald-500',
    'bg-gradient-to-r from-blue-400 to-blue-600',
    'bg-gradient-to-r from-purple-400 to-purple-600',
    'bg-gradient-to-r from-pink-400 to-pink-600',
    'bg-gradient-to-r from-yellow-400 to-yellow-600',
    'bg-gradient-to-r from-red-400 to-red-600',
    'bg-gradient-to-r from-indigo-400 to-indigo-600',
    'bg-gradient-to-r from-orange-400 to-orange-600'
  ];

  const resetEventForm = () => {
    setEventTitle('');
    setEventTime('12:00');
    setEventEndTime('13:00');
    setEventDescription('');
    setEventLocation('');
    setEventColor('bg-gradient-to-r from-green-400 to-emerald-500');
    setEventCategory('work');
    setRecurrenceType('none');
    setRecurrenceInterval(1);
    setRecurrenceDaysOfWeek([]);
    setRecurrenceEndDate('');
    setRecurrenceCustomPattern('days');
  };

  const handleCloseModal = () => {
    setShowEventModal(false);
    setEditingEvent(null);
    resetEventForm();
  };

  const handleSaveEvent = () => {
    if (!eventTitle.trim()) return;

    if (editingEvent) {
      const updatedEvent = { 
        title: eventTitle,
        time: eventTime,
        endTime: eventEndTime,
        description: eventDescription,
        location: eventLocation,
        color: eventColor,
        category: eventCategory,
        id: editingEvent.id,
        date: selectedDate.toDateString(),
        updatedAt: new Date().toISOString(),
        recurrence: {
          type: recurrenceType,
          interval: recurrenceInterval,
          daysOfWeek: recurrenceDaysOfWeek,
          endDate: recurrenceEndDate,
          customPattern: recurrenceCustomPattern
        }
      };

      setCalendarEvents(prev => 
        prev.map(event => 
          event.id === editingEvent.id ? updatedEvent : event
        )
      );
    } else {
      const baseEvent = {
        title: eventTitle,
        time: eventTime,
        endTime: eventEndTime,
        description: eventDescription,
        location: eventLocation,
        color: eventColor,
        category: eventCategory,
        id: Date.now().toString(),
        date: selectedDate.toDateString(),
        createdAt: new Date().toISOString(),
        recurrence: {
          type: recurrenceType,
          interval: recurrenceInterval,
          daysOfWeek: recurrenceDaysOfWeek,
          endDate: recurrenceEndDate,
          customPattern: recurrenceCustomPattern
        }
      };

      let eventsToAdd = [baseEvent];
      
      if (recurrenceType !== 'none') {
        eventsToAdd = generateRecurringEvents(baseEvent);
      }

      setCalendarEvents(prev => mergeAndDeduplicateEvents(prev, importedEvents));

    }
    
    handleCloseModal();
  };

  const generateRecurringEvents = (baseEvent) => {
    const events = [baseEvent];
    const recurrence = baseEvent.recurrence;
    
    if (recurrence.type === 'none') return events;

    const startDate = new Date(baseEvent.date);
    const endDate = recurrence.endDate ? new Date(recurrence.endDate) : new Date(startDate.getTime() + 365 * 24 * 60 * 60 * 1000);
    
    let currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
      let nextDate = new Date(currentDate);
      
      switch (recurrence.type) {
        case 'daily':
          nextDate.setDate(currentDate.getDate() + recurrence.interval);
          break;
        case 'weekly':
          if (recurrence.daysOfWeek.length > 0) {
            let found = false;
            for (let i = 1; i <= 7; i++) {
              const testDate = new Date(currentDate);
              testDate.setDate(currentDate.getDate() + i);
              if (recurrence.daysOfWeek.includes(testDate.getDay())) {
                nextDate = testDate;
                found = true;
                break;
              }
            }
            if (!found) {
              nextDate.setDate(currentDate.getDate() + (7 * recurrence.interval));
            }
          } else {
            nextDate.setDate(currentDate.getDate() + (7 * recurrence.interval));
          }
          break;
        case 'monthly':
          nextDate.setMonth(currentDate.getMonth() + recurrence.interval);
          break;
        case 'custom':
          if (recurrence.customPattern === 'days') {
            nextDate.setDate(currentDate.getDate() + recurrence.interval);
          } else if (recurrence.customPattern === 'weeks') {
            nextDate.setDate(currentDate.getDate() + (7 * recurrence.interval));
          }
          break;
      }
      
      if (nextDate > endDate) break;
      
      const newEvent = {
        ...baseEvent,
        id: `${baseEvent.id}_${nextDate.getTime()}`,
        date: nextDate.toDateString(),
        isRecurring: true,
        parentId: baseEvent.id
      };
      
      events.push(newEvent);
      currentDate = nextDate;
    }
    
    return events;
  };

const getEventsForDate = (calendarEvents, date) => {
  if (!date) return [];
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const dateString = dateObj.toDateString();

  return calendarEvents.filter(event => event.date === dateString);
};


  const getFilteredEvents = () => {
    let filtered = calendarEvents;
    
    if (filterCategory !== 'all') {
      filtered = filtered.filter(event => event.category === filterCategory);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  };

  const isConflicting = () => {
    if (!eventTime || !selectedDate) return false;

    const newStart = timeToMinutes(eventTime);
    const newEnd = eventEndTime ? timeToMinutes(eventEndTime) : newStart + 60;

    return calendarEvents.some(event => {
      if (editingEvent && event.id === editingEvent.id) return false;
      if (event.date !== selectedDate.toDateString()) return false;

      const eventStart = timeToMinutes(event.time);
      const eventEnd = event.endTime ? timeToMinutes(event.endTime) : eventStart + 60;

      return (newStart < eventEnd) && (newEnd > eventStart);
    });
  };

  const isFormValid = () => {
    if (!eventTime || !eventEndTime) return false;
    const start = timeToMinutes(eventTime);
    const end = timeToMinutes(eventEndTime);
    return (
      eventTitle.trim() !== '' &&
      eventTime !== '' &&
      eventEndTime !== '' &&
      end > start &&
      !isConflicting()
    );
  };

  const timeToMinutes = (time) => {
    if (!time) return 0;
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
  };
const handleEventMove = (eventId, newStartTime, newEndTime) => {
  setCalendarEvents(prev => prev.map(event => 
    event.id === eventId 
      ? { ...event, time: newStartTime, endTime: newEndTime }
      : event
  ));
};
  // Load event data when editing
  useEffect(() => {
    if (editingEvent) {
      setEventTitle(editingEvent.title || '');
      setEventTime(editingEvent.time || '12:00');
      setEventEndTime(editingEvent.endTime || '13:00');
      setEventDescription(editingEvent.description || '');
      setEventLocation(editingEvent.location || '');
      setEventColor(editingEvent.color || 'bg-gradient-to-r from-green-400 to-emerald-500');
      setEventCategory(editingEvent.category || 'work');
      setRecurrenceType(editingEvent.recurrence?.type || 'none');
      setRecurrenceInterval(editingEvent.recurrence?.interval || 1);
      setRecurrenceDaysOfWeek(editingEvent.recurrence?.daysOfWeek || []);
      setRecurrenceEndDate(editingEvent.recurrence?.endDate || '');
      setRecurrenceCustomPattern(editingEvent.recurrence?.customPattern || 'days');
    }
  }, [editingEvent]);
const handleDeleteEvent = (eventId) => {
  setCalendarEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
};
const navigateMonth = (direction) => {
  setCurrentDate(prevDate => {
    const newDate = new Date(prevDate);
    newDate.setMonth(newDate.getMonth() + direction);
    return newDate;
  });
};

// Handle adding event to a specific date with smooth interaction
const handleAddEventToDate = (date) => {
  setSelectedDate(date);
  setShowEventModal(true);
  setEditingEvent(null);
  resetEventForm();
  
  // Set add button clicked state and auto-hide after 4 seconds
  setAddButtonClicked(true);
  setTimeout(() => {
    setAddButtonClicked(false);
  }, 4000);
};

// Handle new event button click with timer
const handleNewEventClick = () => {
  setSelectedDate(new Date());
  setShowEventModal(true);
  setEditingEvent(null);
  resetEventForm();
  
  // Set add button clicked state and auto-hide after 4 seconds
  setAddButtonClicked(true);
  setTimeout(() => {
    setAddButtonClicked(false);
  }, 4000);
};
const fetchGoogleEvents = async (accessToken) => {
  try {
    const res = await fetch(
      'https://www.googleapis.com/calendar/v3/calendars/primary/events?maxResults=10&orderBy=startTime&singleEvents=true&timeMin=' + new Date().toISOString(),
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const data = await res.json();
    const seen = new Set();
    const importedEvents = [];

    for (const item of data.items || []) {
      const title = item.summary;
      const date = new Date(item.start.date || item.start.dateTime).toDateString();
      const key = `${title}-${date}`;
      if (!seen.has(key)) {
        seen.add(key);
        importedEvents.push({
          id: `${item.id}_${date}`, // safer unique id
          title,
          date,
          category: 'google',
          color: 'bg-gradient-to-r from-blue-400 to-blue-600',
          isImported: true
        });
      }
    }

    setCalendarEvents(prev => [...prev, ...importedEvents]);

  } catch (err) {
    console.error("Error fetching Google Calendar events:", err);
  }
};
const mergeAndDeduplicateEvents = (existingEvents, newEvents) => {
  const uniqueKeys = new Set(existingEvents.map(e => `${e.title}-${e.date}`));
  const filteredNewEvents = newEvents.filter(
    e => !uniqueKeys.has(`${e.title}-${e.date}`)
  );
  return [...existingEvents, ...filteredNewEvents];
};

const requestCalendarAccess = () => {
  if (!window.google || !window.google.accounts) {
    console.error("Google API not loaded.");
    return;
  }

  const client = window.google.accounts.oauth2.initTokenClient({
    client_id: '169374321400-i8015ua55f7a5iiniiq67ovkmrg6rota.apps.googleusercontent.com',
    scope: 'https://www.googleapis.com/auth/calendar.readonly',
    callback: (response) => {
      if (response.access_token) {
        fetchGoogleEvents(response.access_token); // ✅ Already in your code
      } else {
        console.error("No access token received");
      }
    },
  });

  client.requestAccessToken();
};

  return (
    <div className={`min-h-screen transition-all duration-500 ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-black to-gray-900' : 'bg-gradient-to-br from-green-50 via-white to-emerald-50'} relative overflow-hidden`}>
      {/* Custom Cursor */}
      <CustomCursor
  cursorPos={cursorPos}
  isHovering={isHovering}
  isDarkMode={isDarkMode}
/>

      
      {/* Floating Particles */}
      <FloatingParticles />
      
      {/* Navigation Header */}
      
      <div className={`${isDarkMode ? 'bg-black/60' : 'bg-white/60'} backdrop-blur-xl border-b-2 ${isDarkMode ? 'border-green-400/30' : 'border-green-500/40'} sticky top-0 z-40`}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
           <div className="flex items-center space-x-4">
             <button
    onClick={() => navigate('/')}
    className={`ml-4 p-2 rounded-lg transition duration-300 hover:scale-110 ${isDarkMode ? 'bg-white/10 hover:bg-white/20 text-green-400' : 'bg-black/10 hover:bg-black/20 text-green-600'}`}
    title="Go to Home"
  >
    <Home className="w-5 h-5" />
  </button>
  <div className={`w-12 h-12 bg-gradient-to-r ${isDarkMode ? 'from-green-400 to-emerald-500' : 'from-green-500 to-emerald-600'} rounded-xl flex items-center justify-center transform hover:scale-110 transition-transform duration-300`}>
    <Calendar className="w-6 h-6 text-black" />
  </div>
  
  <div>
    <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
      EventFlow
    </h1>
    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
      Manage your events with style
    </p>
  </div>

  {/* 🔙 Home Button */}
 
</div>

            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-3 ${isDarkMode ? 'bg-white/10 hover:bg-white/20 text-yellow-400' : 'bg-black/10 hover:bg-black/20 text-gray-600'} rounded-xl transition-all duration-300 hover:scale-110`}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
              </button>
              
              <button
                onClick={handleNewEventClick}
                className={`${addButtonClicked 
                  ? 'bg-gradient-to-r from-emerald-500 to-green-600 scale-105 shadow-xl' 
                  : 'bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600'
                } text-black px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl`}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <PlusCircle className="w-5 h-5 inline mr-2" />
                {addButtonClicked ? 'Added!' : 'New Event'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
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

            {/* Quick Stats */}
            <div className={`${isDarkMode ? 'bg-black/40' : 'bg-white/40'} backdrop-blur-xl border-2 ${isDarkMode ? 'border-green-400/30' : 'border-green-500/40'} rounded-3xl p-6`}>
              <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
                Quick Stats
              </h3>
              <div className="mb-4">
 <button
  onClick={requestCalendarAccess}
  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl flex items-center gap-2"
>
  <span className="bg-white rounded-full p-1">
    <svg
      className="w-5 h-5"
      viewBox="0 0 533.5 544.3"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="#4285F4"
        d="M533.5 278.4c0-17.8-1.4-35.6-4.2-52.8H272v99.7h146.9c-6.4 34.8-25.4 64.2-54.1 84.2v69h87.1c50.9-46.9 81.6-116 81.6-200.1z"
      />
      <path
        fill="#34A853"
        d="M272 544.3c73.5 0 135-24.3 180-66.1l-87.1-69c-24.2 16.2-55 25.6-92.9 25.6-71 0-131.1-47.9-152.6-112.3h-89.5v70.7c45.2 89.5 137.2 151.1 242.1 151.1z"
      />
      <path
        fill="#FBBC04"
        d="M119.4 322.5c-10.1-30.1-10.1-62.4 0-92.5v-70.7h-89.5C3.6 226.1 0 251.6 0 278.2s3.6 52.1 29.9 118.9l89.5-70.7z"
      />
      <path
        fill="#EA4335"
        d="M272 107.7c39.9 0 75.8 13.8 104.1 40.8l77.8-77.8C407 24.3 345.5 0 272 0 167.1 0 75.1 61.6 29.9 151.1l89.5 70.7C140.9 155.6 201 107.7 272 107.7z"
      />
    </svg>
  </span>
  <span>Import Google Calendar Events</span>
</button>


</div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Events</span>
                  <span className={`font-bold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                    {calendarEvents.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>This Month</span>
                  <span className={`font-bold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                    {calendarEvents.filter(event => {
                      const eventDate = new Date(event.date);
                      return eventDate.getMonth() === currentDate.getMonth() && 
                             eventDate.getFullYear() === currentDate.getFullYear();
                    }).length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Recurring</span>
                  <span className={`font-bold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                    {calendarEvents.filter(event => event.isRecurring).length}
                  </span>
                </div>
              </div>
            </div>

            {/* New Instructions Box */}
            <div className={`${isDarkMode ? 'bg-black/40' : 'bg-white/40'} backdrop-blur-xl border-2 ${isDarkMode ? 'border-green-400/30' : 'border-green-500/40'} rounded-3xl p-6`}>
              <div className="flex items-center space-x-2 mb-4">
                <MousePointer className={`w-5 h-5 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
                <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  How to Use
                </h3>
              </div>
              
              <div className="space-y-3">
                <div className={`p-3 ${isDarkMode ? 'bg-green-400/10 border border-green-400/20' : 'bg-green-500/10 border border-green-500/20'} rounded-xl`}>
                  <ul className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} space-y-2`}>
                    <li className="flex items-start space-x-2">
                      <span className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-green-400' : 'bg-green-600'} mt-2 flex-shrink-0`}></span>
                      <span><strong>Click</strong> any event to view, edit, or delete</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-green-400' : 'bg-green-600'} mt-2 flex-shrink-0`}></span>
                      <span><strong>Drag & Drop</strong> events to reschedule</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-green-400' : 'bg-green-600'} mt-2 flex-shrink-0`}></span>
                      <span><strong>Click +</strong> on any day to add new events</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-green-400' : 'bg-green-600'} mt-2 flex-shrink-0`}></span>
                      <span><strong>Double-click</strong> empty space to quick-add</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
         
          {/* Main Calendar */}
          <div className="lg:col-span-3">
            <div className={`${isDarkMode ? 'bg-black/40' : 'bg-white/40'} backdrop-blur-xl border-2 ${isDarkMode ? 'border-green-400/30' : 'border-green-500/40'} rounded-3xl p-6`}>
              
              {/* Search and Filter */}
 <SearchAndFilter
  categories={categories}
  filterCategory={filterCategory}
  setFilterCategory={setFilterCategory}
  searchQuery={searchQuery}
  setSearchQuery={setSearchQuery}
  setIsHovering={setIsHovering}  // Add this line
/>


              
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => navigateMonth(-1)}
                    className={`p-3 ${isDarkMode ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-black/10 hover:bg-black/20 text-gray-900'} rounded-xl transition-all duration-300 hover:scale-110`}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  
                  <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </h2>
                  
                  <button
                    onClick={() => navigateMonth(1)}
                    className={`p-3 ${isDarkMode ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-black/10 hover:bg-black/20 text-gray-900'} rounded-xl transition-all duration-300 hover:scale-110`}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
                
                <button
                  onClick={() => setCurrentDate(new Date())}
                  className={`px-4 py-2 ${isDarkMode ? 'bg-green-400/20 hover:bg-green-400/30 text-green-400' : 'bg-green-500/20 hover:bg-green-500/30 text-green-600'} rounded-xl font-medium transition-all duration-300 hover:scale-105`}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  Today
                </button>
              </div>

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
  handleDragOver={handleDragOver}    // Pass dragOver handler
  handleDrop={handleDrop}            // Pass drop handler
  handleDragStart={handleDragStart} 
   setEditingEvent={setEditingEvent}
  handleDeleteEvent={handleDeleteEvent} 
   onEventMove={handleEventMove} /// Pass dragStart handler
/>


                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Event Modal */}
      <EventModal
        isOpen={showEventModal}
        onClose={handleCloseModal}
        editingEvent={editingEvent}
        selectedDate={selectedDate}
        isDarkMode={isDarkMode}
        eventTitle={eventTitle}
        setEventTitle={setEventTitle}
        eventTime={eventTime}
        setEventTime={setEventTime}
        eventEndTime={eventEndTime}
        setEventEndTime={setEventEndTime}
        eventDescription={eventDescription}
        setEventDescription={setEventDescription}
        eventLocation={eventLocation}
        setEventLocation={setEventLocation}
        eventCategory={eventCategory}
        setEventCategory={setEventCategory}
        eventColor={eventColor}
        setEventColor={setEventColor}
        recurrenceType={recurrenceType}
        setRecurrenceType={setRecurrenceType}
        recurrenceInterval={recurrenceInterval}
        setRecurrenceInterval={setRecurrenceInterval}
        recurrenceEndDate={recurrenceEndDate}
        setRecurrenceEndDate={setRecurrenceEndDate}
        recurrenceCustomPattern={recurrenceCustomPattern}
        setRecurrenceCustomPattern={setRecurrenceCustomPattern}
        recurrenceDaysOfWeek={recurrenceDaysOfWeek}
        setRecurrenceDaysOfWeek={setRecurrenceDaysOfWeek}
        onSave={handleSaveEvent}
        isFormValid={isFormValid}
        isConflicting={isConflicting}
        categories={categories}
        eventColors={eventColors}
        daysOfWeek={daysOfWeek}
        shortDays={shortDays}
        setIsHovering={setIsHovering}
      />
    </div>
  );
};

export default Index;
              
              