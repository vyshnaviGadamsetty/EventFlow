import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Home, Sun, Moon, PlusCircle } from 'lucide-react';

const NavigationHeader = ({ 
  isDarkMode, 
  setIsDarkMode, 
  handleNewEventClick, 
  addButtonClicked, 
  setIsHovering 
}) => {
  const navigate = useNavigate();

  return (
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
  );
};

export default NavigationHeader;