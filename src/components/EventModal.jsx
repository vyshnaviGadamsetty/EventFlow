
import React, { useState, useEffect } from 'react';

import { 
  Calendar,
  Clock,
  MapPin,
  X,
  AlertTriangle,
  Repeat,
  Save,
  
} from 'lucide-react';

const EventModal = ({ 
  isOpen,
  onClose,
  editingEvent,
  selectedDate,
  isDarkMode,
  eventTitle,
  setEventTitle,
  eventTime,
  setEventTime,
  eventEndTime,
  setEventEndTime,
  eventDescription,
  setEventDescription,
  eventLocation,
  setEventLocation,
  eventCategory,
  setEventCategory,
  eventColor,
  setEventColor,
  recurrenceType,
  setRecurrenceType,
  recurrenceInterval,
  setRecurrenceInterval,
  recurrenceEndDate,
  setRecurrenceEndDate,
  recurrenceCustomPattern,
  setRecurrenceCustomPattern,
  recurrenceDaysOfWeek,
  setRecurrenceDaysOfWeek,
  onSave,
  isFormValid,
  isConflicting,
  categories,
  eventColors,
  daysOfWeek,
  shortDays,
  setIsHovering
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-lg flex items-center justify-center z-50 p-4">
      <div className={`${isDarkMode ? 'bg-black/90' : 'bg-white/90'} backdrop-blur-xl border-2 ${isDarkMode ? 'border-green-400/30' : 'border-green-500/40'} rounded-3xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all duration-500 scale-100 opacity-100`}>
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 bg-gradient-to-r ${isDarkMode ? 'from-green-400 to-emerald-500' : 'from-green-500 to-emerald-600'} rounded-xl flex items-center justify-center transform hover:scale-110 transition-transform duration-300`}>
              <Calendar className="w-6 h-6 text-black" />
            </div>
            <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {editingEvent ? 'Edit Event' : 'Create Event'}
            </h2>
          </div>
          <button 
            onClick={onClose}
            className={`p-3 ${isDarkMode ? 'text-gray-400 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-gray-900 hover:bg-black/10'} rounded-xl transition-all duration-300 hover:scale-110`}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Event Title */}
          <div className="space-y-2">
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Event Title *
            </label>
            <input
              type="text"
              placeholder="Enter event title..."
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              className={`w-full px-4 py-4 ${isDarkMode ? 'bg-black/40 border-green-400/30 text-white placeholder-gray-400' : 'bg-white/40 border-green-500/40 text-gray-900 placeholder-gray-500'} border-2 rounded-xl focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all duration-300 text-lg`}
              onFocus={() => setIsHovering(true)}
              onBlur={() => setIsHovering(false)}
              autoComplete="off"
            />
          </div>

          {/* Time Selection */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Start Time *
              </label>
              <input
                type="time"
                value={eventTime}
                onChange={(e) => setEventTime(e.target.value)}
                className={`w-full px-4 py-4 ${isDarkMode ? 'bg-black/40 border-green-400/30 text-white' : 'bg-white/40 border-green-500/40 text-gray-900'} border-2 rounded-xl focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all duration-300`}
                onFocus={() => setIsHovering(true)}
                onBlur={() => setIsHovering(false)}
              />
            </div>
            <div className="space-y-2">
              <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                End Time *
              </label>
              <input
                type="time"
                value={eventEndTime}
                onChange={(e) => setEventEndTime(e.target.value)}
                min={eventTime}
                className={`w-full px-4 py-4 ${isDarkMode ? 'bg-black/40 border-green-400/30 text-white' : 'bg-white/40 border-green-500/40 text-gray-900'} border-2 rounded-xl focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all duration-300`}
                onFocus={() => setIsHovering(true)}
                onBlur={() => setIsHovering(false)}
              />
            </div>
          </div>

          {/* Conflict Warning */}
          {isConflicting() && (
            <div className="bg-red-500/20 border-2 border-red-500/40 rounded-xl p-4 transform transition-all duration-500 scale-100 opacity-100">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0 animate-pulse" />
                <div>
                  <p className="font-semibold text-red-400">Time Conflict Detected!</p>
                  <p className="text-sm text-red-300 mt-1">Another event exists during this time. Please choose a different time slot.</p>
                </div>
              </div>
            </div>
          )}

          {/* Description */}
          <div className="space-y-2">
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Description
            </label>
            <textarea
              placeholder="Enter event description..."
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
              rows={3}
              className={`w-full px-4 py-4 ${isDarkMode ? 'bg-black/40 border-green-400/30 text-white placeholder-gray-400' : 'bg-white/40 border-green-500/40 text-gray-900 placeholder-gray-500'} border-2 rounded-xl focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all duration-300 resize-none`}
              onFocus={() => setIsHovering(true)}
              onBlur={() => setIsHovering(false)}
            />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <MapPin className="w-4 h-4 inline mr-2" />
              Location
            </label>
            <input
              type="text"
              placeholder="Enter location (optional)..."
              value={eventLocation}
              onChange={(e) => setEventLocation(e.target.value)}
              className={`w-full px-4 py-4 ${isDarkMode ? 'bg-black/40 border-green-400/30 text-white placeholder-gray-400' : 'bg-white/40 border-green-500/40 text-gray-900 placeholder-gray-500'} border-2 rounded-xl focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all duration-300`}
              onFocus={() => setIsHovering(true)}
              onBlur={() => setIsHovering(false)}
              autoComplete="off"
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Category
            </label>
            <select
              value={eventCategory}
              onChange={(e) => setEventCategory(e.target.value)}
              className={`w-full px-4 py-4 ${isDarkMode ? 'bg-black/40 border-green-400/30 text-white' : 'bg-white/40 border-green-500/40 text-gray-900'} border-2 rounded-xl focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all duration-300`}
              onFocus={() => setIsHovering(true)}
              onBlur={() => setIsHovering(false)}
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id} className={isDarkMode ? 'bg-black text-white' : 'bg-white text-gray-900'}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Color Selection */}
          <div className="space-y-2">
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Event Color
            </label>
            <div className="flex flex-wrap gap-3">
              {eventColors.map((color, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setEventColor(color)}
                  className={`w-8 h-8 rounded-full ${color} transition-all duration-300 hover:scale-110 ${
                    eventColor === color ? 'ring-4 ring-white/50' : ''
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Recurrence */}
          <div className="space-y-4">
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <Repeat className="w-4 h-4 inline mr-2" />
              Recurrence
            </label>
            <select
              value={recurrenceType}
              onChange={(e) => setRecurrenceType(e.target.value)}
              className={`w-full px-4 py-4 ${isDarkMode ? 'bg-black/40 border-green-400/30 text-white' : 'bg-white/40 border-green-500/40 text-gray-900'} border-2 rounded-xl focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all duration-300`}
              onFocus={() => setIsHovering(true)}
              onBlur={() => setIsHovering(false)}
            >
              <option value="none" className={isDarkMode ? 'bg-black text-white' : 'bg-white text-gray-900'}>No Repeat</option>
              <option value="daily" className={isDarkMode ? 'bg-black text-white' : 'bg-white text-gray-900'}>Daily</option>
              <option value="weekly" className={isDarkMode ? 'bg-black text-white' : 'bg-white text-gray-900'}>Weekly</option>
              <option value="monthly" className={isDarkMode ? 'bg-black text-white' : 'bg-white text-gray-900'}>Monthly</option>
              <option value="custom" className={isDarkMode ? 'bg-black text-white' : 'bg-white text-gray-900'}>Custom</option>
            </select>

            {recurrenceType !== 'none' && (
              <div className="grid grid-cols-2 gap-4 transform transition-all duration-500 scale-100 opacity-100">
                <div className="space-y-2">
                  <label className={`block text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Repeat Every
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={recurrenceInterval}
                    onChange={(e) => setRecurrenceInterval(parseInt(e.target.value) || 1)}
                    className={`w-full px-3 py-2 ${isDarkMode ? 'bg-black/40 border-green-400/30 text-white' : 'bg-white/40 border-green-500/40 text-gray-900'} border rounded-lg focus:outline-none focus:border-green-400 transition-all duration-300`}
                  />
                </div>
                <div className="space-y-2">
                  <label className={`block text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    End Date
                  </label>
                  <input
                    type="date"
                    value={recurrenceEndDate}
                    onChange={(e) => setRecurrenceEndDate(e.target.value)}
                    className={`w-full px-3 py-2 ${isDarkMode ? 'bg-black/40 border-green-400/30 text-white' : 'bg-white/40 border-green-500/40 text-gray-900'} border rounded-lg focus:outline-none focus:border-green-400 transition-all duration-300`}
                  />
                </div>
              </div>
            )}

            {/* Weekly days selection */}
            {recurrenceType === 'weekly' && (
              <div className="space-y-2">
                <label className={`block text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Days of Week
                </label>
                <div className="flex flex-wrap gap-2">
                  {daysOfWeek.map((day, index) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => {
                        const newDays = recurrenceDaysOfWeek.includes(index)
                          ? recurrenceDaysOfWeek.filter(d => d !== index)
                          : [...recurrenceDaysOfWeek, index];
                        setRecurrenceDaysOfWeek(newDays);
                      }}
                      className={`px-3 py-2 rounded-lg text-xs font-medium transition-all duration-300 ${
                        recurrenceDaysOfWeek.includes(index)
                          ? 'bg-green-500 text-white'
                          : `${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`
                      }`}
                    >
                      {shortDays[index]}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Custom pattern selection */}
            {recurrenceType === 'custom' && (
              <div className="space-y-2">
                <label className={`block text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Custom Pattern
                </label>
                <select
                  value={recurrenceCustomPattern}
                  onChange={(e) => setRecurrenceCustomPattern(e.target.value)}
                  className={`w-full px-3 py-2 ${isDarkMode ? 'bg-black/40 border-green-400/30 text-white' : 'bg-white/40 border-green-500/40 text-gray-900'} border rounded-lg focus:outline-none focus:border-green-400 transition-all duration-300`}
                >
                  <option value="days" className={isDarkMode ? 'bg-black text-white' : 'bg-white text-gray-900'}>Days</option>
                  <option value="weeks" className={isDarkMode ? 'bg-black text-white' : 'bg-white text-gray-900'}>Weeks</option>
                </select>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-6">
            <button
              onClick={onClose}
              className={`flex-1 px-6 py-4 ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'} rounded-xl font-medium transition-all duration-300 hover:scale-105`}
            >
              Cancel
            </button>
            <button
              onClick={onSave}
              disabled={!isFormValid()}
              className={`flex-1 px-6 py-4 ${
                isFormValid()
                  ? 'bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-black'
                  : 'bg-gray-500 text-gray-300 cursor-not-allowed'
              } rounded-xl font-medium transition-all duration-300 hover:scale-105 disabled:hover:scale-100`}
            >
              <Save className="w-5 h-5 inline mr-2" />
              {editingEvent ? 'Update Event' : 'Create Event'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventModal;