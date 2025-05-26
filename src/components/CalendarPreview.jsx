// ✅ CalendarPreview.jsx
// (In src/components/CalendarPreview.jsx)
import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const CalendarPreview = ({ isDarkMode, isHovering, setIsHovering }) => {
  const [clickedDates, setClickedDates] = useState(new Set());
  const [showEventCreated, setShowEventCreated] = useState(null);

  const handleDateClick = (dateIndex) => {
    setClickedDates((prev) => new Set([...prev, dateIndex]));
    setShowEventCreated(dateIndex);
    setTimeout(() => setShowEventCreated(null), 2000);
  };

  return (
    <div className="relative mx-auto max-w-4xl">
      <div
        className={`${
          isDarkMode ? 'bg-black/40' : 'bg-white/60'
        } backdrop-blur-md rounded-2xl border ${
          isDarkMode ? 'border-green-500/20' : 'border-green-500/30'
        } p-6 transform hover:scale-[1.02] transition-all duration-500 ${
          isDarkMode ? 'hover:shadow-2xl hover:shadow-green-400/10' : 'hover:shadow-2xl hover:shadow-green-500/10'
        }`}
      >
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div
              key={day}
              className={`text-center py-2 ${
                isDarkMode ? 'text-green-400' : 'text-green-600'
              } font-semibold tracking-wider`}
            >
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2 relative">
          {[...Array(35)].map((_, i) => {
            const dateNum = i + 1;
            const isClicked = clickedDates.has(i);
            const isToday = i === 15;

            return (
              <div key={i} className="relative">
                <div
                  className={`aspect-square flex items-center justify-center rounded-lg transition-all duration-300 cursor-pointer font-medium relative overflow-hidden ${
                    isToday
                      ? `bg-gradient-to-r ${
                          isDarkMode ? 'from-green-400 to-emerald-500' : 'from-green-500 to-emerald-600'
                        } text-black shadow-lg transform scale-110`
                      : isClicked
                      ? `${
                          isDarkMode ? 'bg-green-400/20 text-green-400' : 'bg-green-500/20 text-green-600'
                        } shadow-md`
                      : i % 7 === 0 || i % 7 === 6
                      ? `${
                          isDarkMode ? 'text-gray-500 hover:bg-green-400/10' : 'text-gray-400 hover:bg-green-500/10'
                        }`
                      : `${
                          isDarkMode ? 'text-white hover:bg-green-400/10' : 'text-gray-700 hover:bg-green-500/10'
                        } hover:scale-110`
                  }`}
                  style={{ animationDelay: `${i * 0.03}s` }}
                  onClick={() => dateNum <= 30 && handleDateClick(i)}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  {dateNum <= 30 ? dateNum : ''}
                  {isClicked && (
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${
                        isDarkMode ? 'from-green-400 to-emerald-500' : 'from-green-500 to-emerald-600'
                      } opacity-30 animate-ping rounded-lg`}
                    />
                  )}
                </div>
                {showEventCreated === i && (
                  <div
                    className={`absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gradient-to-r ${
                      isDarkMode ? 'from-green-400 to-emerald-500' : 'from-green-500 to-emerald-600'
                    } text-black px-2 py-1 rounded text-xs font-semibold animate-bounce whitespace-nowrap z-10`}
                  >
                    <Plus className="w-3 h-3 inline mr-1" />
                    Event Created!
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CalendarPreview;
