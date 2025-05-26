import React from 'react';
import { Eye, Edit, Trash2, X, Calendar, Clock, MapPin } from 'lucide-react';

const EventActionDialog = ({
  isOpen,
  onClose,
  event,
  onView,
  onEdit,
  onDelete,
  isDarkMode
}) => {
  if (!isOpen || !event) return null;

  const formatTime = (time) => {
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

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-lg flex items-center justify-center z-50 p-4">
      <div className={`${isDarkMode ? 'bg-black/90' : 'bg-white/90'} backdrop-blur-xl border-2 ${isDarkMode ? 'border-green-400/30' : 'border-green-500/40'} rounded-3xl p-6 max-w-md w-full shadow-2xl transform transition-all duration-500 scale-100 opacity-100`}>
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 ${event.color || 'bg-green-500'} rounded-xl flex items-center justify-center`}>
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {event.title}
              </h3>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {formatDate(event.date)}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className={`p-2 ${isDarkMode ? 'text-gray-400 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-gray-900 hover:bg-black/10'} rounded-xl transition-all duration-300 hover:scale-110`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Event Details */}
        <div className="space-y-4 mb-6">
          {/* Time */}
          <div className="flex items-center space-x-3">
            <Clock className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
            <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {formatTime(event.time)} - {formatTime(event.endTime)}
            </span>
          </div>

          {/* Location */}
          {event.location && (
            <div className="flex items-center space-x-3">
              <MapPin className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
              <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {event.location}
              </span>
            </div>
          )}

          {/* Description */}
          {event.description && (
            <div className={`p-3 ${isDarkMode ? 'bg-black/40' : 'bg-white/40'} rounded-xl`}>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-sm`}>
                {event.description}
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button
            onClick={() => {
              onView(event);
              onClose();
            }}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white rounded-xl font-medium transition-all duration-300 hover:scale-105`}
          >
            <Eye className="w-4 h-4" />
            <span>Day View</span>
          </button>
          
          <button
            onClick={() => {
              onEdit();
              onClose();
            }}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 ${isDarkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'} text-white rounded-xl font-medium transition-all duration-300 hover:scale-105`}
          >
            <Edit className="w-4 h-4" />
            <span>Edit</span>
          </button>
          
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to delete this event?')) {
                onDelete();
                onClose();
              }
            }}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 ${isDarkMode ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'} text-white rounded-xl font-medium transition-all duration-300 hover:scale-105`}
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventActionDialog;