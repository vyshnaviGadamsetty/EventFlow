import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CalendarHeader = ({ 
  currentDate, 
  setCurrentDate, 
  navigateMonth, 
  isDarkMode, 
  setIsHovering,
  monthNames 
}) => {
  return (
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
  );
};

export default CalendarHeader;