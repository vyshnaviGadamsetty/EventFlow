import React from 'react';

const QuickStats = ({ isDarkMode, calendarEvents, currentDate, requestCalendarAccess }) => {
  return (
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
  );
};

export default QuickStats;