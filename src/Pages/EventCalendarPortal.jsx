          
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Briefcase,
  User,
  Heart,
  Coffee,
  Star,
} from 'lucide-react';

// Component imports
import EventModal from '../components/EventModal';
import CustomCursor from '../components/CustomCursor';
import FloatingParticles from '../components/FloatingParticles';
import NavigationHeader from '../components/NavigationHeader';
import Sidebar from '../components/Sidebar';
import MainCalendarSection from '../components/MainCalendar';

const Index = () => {
  const navigate = useNavigate();

  // State management
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

  // Event form state
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

  // Constants
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

  // Drag and Drop handlers
  const handleDragStart = (eventId) => {
    setDraggedEventId(eventId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
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

  // Utility functions
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

  const timeToMinutes = (time) => {
    if (!time) return 0;
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
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

  // Event management functions
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

      setCalendarEvents(prev => mergeAndDeduplicateEvents(prev, eventsToAdd));
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

  const handleDeleteEvent = (eventId) => {
    setCalendarEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
  };

  const handleEventMove = (eventId, newStartTime, newEndTime) => {
    setCalendarEvents(prev => prev.map(event => 
      event.id === eventId 
        ? { ...event, time: newStartTime, endTime: newEndTime }
        : event
    ));
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + direction);
      return newDate;
    });
  };

  const handleAddEventToDate = (date) => {
    setSelectedDate(date);
    setShowEventModal(true);
    setEditingEvent(null);
    resetEventForm();
    
    setAddButtonClicked(true);
    setTimeout(() => {
      setAddButtonClicked(false);
    }, 4000);
  };

  const handleNewEventClick = () => {
    setSelectedDate(new Date());
    setShowEventModal(true);
    setEditingEvent(null);
    resetEventForm();
    
    setAddButtonClicked(true);
    setTimeout(() => {
      setAddButtonClicked(false);
    }, 4000);
  };

  // Google Calendar integration
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
            id: `${item.id}_${date}`,
            title,
            date,
            category: 'google',
            color: 'bg-gradient-to-r from-blue-400 to-blue-600',
            isImported: true
          });
        }
      }

      setCalendarEvents(prev => mergeAndDeduplicateEvents(prev, importedEvents));

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
          fetchGoogleEvents(response.access_token);
        } else {
          console.error("No access token received");
        }
      },
    });

    client.requestAccessToken();
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

  // Fetch public holidays
  useEffect(() => {
    const fetchPublicHolidays = async () => {
      try {
        const res = await fetch(
          (`https://www.googleapis.com/calendar/v3/calendars/en.indian%23holiday%40group.v.calendar.google.com/events?key=${import.meta.env.VITE_GOOGLE_API_KEY}`)
        );
        const data = await res.json();

        const seen = new Set();
        const holidays = [];

        for (const item of data.items) {
          const title = item.summary;
          const date = new Date(item.start.date).toDateString();
          const key = `${title}-${date}`;

          if (!seen.has(key)) {
            seen.add(key);
            holidays.push({
              id: `${item.id}_${date}`,
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
      <NavigationHeader
        navigate={navigate}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        setIsHovering={setIsHovering}
        handleNewEventClick={handleNewEventClick}
        addButtonClicked={addButtonClicked}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <Sidebar
            calendarEvents={calendarEvents}
            isDarkMode={isDarkMode}
            setEditingEvent={setEditingEvent}
            setSelectedDate={setSelectedDate}
            setShowEventModal={setShowEventModal}
            handleDeleteEvent={handleDeleteEvent}
            getEventsForDate={getEventsForDate}
            requestCalendarAccess={requestCalendarAccess}
            currentDate={currentDate}
          />

          {/* Main Calendar Section */}
          <MainCalendarSection
            isDarkMode={isDarkMode}
            categories={categories}
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setIsHovering={setIsHovering}
            currentDate={currentDate}
            navigateMonth={navigateMonth}
            monthNames={monthNames}
            shortDays={shortDays}
            getDaysInMonth={getDaysInMonth}
            getEventsForDate={getEventsForDate}
            calendarEvents={calendarEvents}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            setShowEventModal={setShowEventModal}
            handleDragOver={handleDragOver}
            handleDrop={handleDrop}
            handleDragStart={handleDragStart}
            setEditingEvent={setEditingEvent}
            handleDeleteEvent={handleDeleteEvent}
            handleEventMove={handleEventMove}
          />
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
