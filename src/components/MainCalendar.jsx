import React from 'react';
import SearchAndFilter from './SearchandFilter';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';

const MainCalendarSection = ({ 
  isDarkMode,
  categories,
  filterCategory,
  setFilterCategory,
  searchQuery,
  setSearchQuery,
  setIsHovering,
  currentDate,
  setCurrentDate,
  navigateMonth,
  monthNames,
  getDaysInMonth,
  getEventsForDate,
  calendarEvents,
  selectedDate,
  setSelectedDate,
  setShowEventModal,
  handleDragOver,
  handleDrop,
  handleDragStart,
  setEditingEvent,
  handleDeleteEvent,
  handleEventMove,
  shortDays
}) => {
  return (
    <div className="lg:col-span-3">
      <div className={`${isDarkMode ? 'bg-black/40' : 'bg-white/40'} backdrop-blur-xl border-2 ${isDarkMode ? 'border-green-400/30' : 'border-green-500/40'} rounded-3xl p-6`}>
        
        {/* Search and Filter */}
        <SearchAndFilter
          categories={categories}
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setIsHovering={setIsHovering}
        />
        
        {/* Calendar Header */}
        <CalendarHeader
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          navigateMonth={navigateMonth}
          isDarkMode={isDarkMode}
          setIsHovering={setIsHovering}
          monthNames={monthNames}
        />
        
        {/* Calendar Grid */}
        <CalendarGrid
          currentDate={currentDate}
          getDaysInMonth={getDaysInMonth}
          getEventsForDate={getEventsForDate}
          calendarEvents={calendarEvents}
          filterCategory={filterCategory}
          searchQuery={searchQuery}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          setShowEventModal={setShowEventModal}
          isDarkMode={isDarkMode}
          handleDragOver={handleDragOver}
          handleDrop={handleDrop}
          handleDragStart={handleDragStart}
          setEditingEvent={setEditingEvent}
          handleDeleteEvent={handleDeleteEvent}
          handleEventMove={handleEventMove}
          shortDays={shortDays}
        />
      </div>
    </div>
  );
};

export default MainCalendarSection;