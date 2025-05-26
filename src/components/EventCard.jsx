

import React from 'react';
import { Clock, MapPin, Repeat, Calendar, Briefcase, User, Heart, Coffee, Star } from 'lucide-react';

// Local helper function to format time from "HH:mm" to "h:mm AM/PM"
function formatTime(timeStr) {
  if (!timeStr) return '';
  const [hour, minute] = timeStr.split(':').map(Number);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minute.toString().padStart(2, '0')} ${ampm}`;
}

const EventCard = ({
  event,
  isDraggable = true,
  setIsHovering,
  isDarkMode,
  handleDragStart
}) => {
  const categories = [
    { id: 'work', icon: Briefcase },
    { id: 'personal', icon: User },
    { id: 'health', icon: Heart },
    { id: 'social', icon: Coffee },
    { id: 'important', icon: Star }
  ];
  const categoryInfo = categories.find(cat => cat.id === event.category);
  const IconComponent = categoryInfo?.icon || Calendar;

  return (
    <div
      draggable={isDraggable}
      onDragStart={(e) => handleDragStart && handleDragStart(e, event)}
      className={`${event.color} rounded-lg p-3 mb-2 cursor-move shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group relative overflow-hidden`}
      onMouseEnter={() => setIsHovering && setIsHovering(true)}
      onMouseLeave={() => setIsHovering && setIsHovering(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <IconComponent className="w-4 h-4 text-black/80" />
            <h4 className="font-semibold text-black text-sm truncate flex-1">{event.title}</h4>
          </div>
          {/* Edit and Delete buttons removed */}
        </div>
        <div className="flex items-center space-x-2 text-xs text-black/70">
          <Clock className="w-3 h-3" />
          <span>{formatTime(event.time)}</span>
          {event.endTime && <span>- {formatTime(event.endTime)}</span>}
        </div>
        {event.location && (
          <div className="flex items-center space-x-2 text-xs text-black/70 mt-1">
            <MapPin className="w-3 h-3" />
            <span className="truncate">{event.location}</span>
          </div>
        )}
        {event.isRecurring && (
          <div className="flex items-center space-x-1 text-xs text-black/70 mt-1">
            <Repeat className="w-3 h-3" />
            <span>Recurring</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;