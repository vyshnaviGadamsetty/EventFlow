import React from 'react';
import {
  Calendar,
  CheckCircle,
  Repeat,
  Move,
  AlertTriangle,
  Search,
  Clock,
  Globe,
  RefreshCw,
  Smartphone
} from 'lucide-react';

import CustomCursor from '../components/CustomCursor';
import FloatingParticles from '../components/FloatingParticles';

const Features = ({ isDarkMode, isHovering, setIsHovering, cursorPos }) => {
  const features = [
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Monthly View Calendar",
      description: "Traditional monthly calendar view with current day highlighting and easy month navigation",
      details: [
        "Display traditional monthly calendar grid",
        "Highlight current day with special styling",
        "Easy navigation between months with arrow buttons",
        "Clean, organized layout for better visibility"
      ]
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Event Management",
      description: "Complete event lifecycle management with intuitive controls",
      details: [
        "Add events by clicking on specific days",
        "Comprehensive event form with title, date/time, description",
        "Edit existing events with a simple click",
        "Delete events from calendar or modal interface"
      ]
    },
    {
      icon: <Repeat className="w-8 h-8" />,
      title: "Recurring Events",
      description: "Support for various recurrence patterns to handle repeating tasks",
      details: [
        "Daily recurrence for routine tasks",
        "Weekly recurrence for regular meetings",
        "Monthly recurrence for periodic events",
        "Custom recurrence patterns for flexible scheduling"
      ]
    },
    {
      icon: <Move className="w-8 h-8" />,
      title: "Drag-and-Drop Rescheduling",
      description: "Intuitive drag-and-drop interface for easy event rescheduling",
      details: [
        "Drag events to reschedule quickly",
        "Visual feedback during drag operations",
        "Drop zones for easy event placement",
        "Conflict handling during rescheduling"
      ]
    },
    {
      icon: <AlertTriangle className="w-8 h-8" />,
      title: "Event Conflict Management",
      description: "Smart conflict detection to prevent scheduling overlaps",
      details: [
        "Automatic conflict detection algorithm",
        "Warning displays for potential conflicts",
        "Prevention of double-booking",
        "Visual indicators for conflicting events"
      ]
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: "Event Filtering & Search",
      description: "Powerful search and filtering capabilities for large event collections",
      details: [
        "Real-time event search functionality",
        "Filter events by categories",
        "Dynamic filtering as you type",
        "Advanced search options"
      ]
    },
   {
      icon: <RefreshCw className="w-8 h-8" />,
      title: "Google Calendar Integration",
      description: "Seamless two-way synchronization with your Google Calendar account",
      details: [
        "Connect and sync with your Google Calendar",
        "View Google Calendar events in EventFlow",
        "Create events that appear in both platforms",
        "Real-time bidirectional synchronization",
        "Import existing Google Calendar events",
        "Export EventFlow events to Google Calendar"
      ]
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Public Events Integration",
      description: "Discover and integrate public events from Google Calendar API",
      details: [
        "Browse public events and holidays",
        "Integrate local community events",
        "Access regional and national holidays",
        "Subscribe to public event feeds",
        "Filter public events by category and location",
        "Add public events directly to your calendar"
      ]
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Responsive Design",
      description: "Optimized experience across all devices and screen sizes",
      details: [
        "Mobile-friendly interface",
        "Tablet optimization",
        "Desktop full-screen experience",
        "Adaptive layout switching"
      ]
    }
  ];

  return (
    <div className={`relative min-h-screen ${isDarkMode ? 'bg-black text-white' : 'bg-white text-gray-900'} py-20 cursor-none font-['Space_Grotesk',_monospace]`}>
      {/* Custom Cursor and Floating Particles in Background */}
      
      <FloatingParticles isDarkMode={isDarkMode} />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div 
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mb-6 transform hover:scale-110 transition-all duration-300"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <CheckCircle className="w-10 h-10 text-black" />
          </div>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
            Powerful Features
          </h1>
          <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto leading-relaxed`}>
            EventFlow comes packed with features designed to make event management effortless and intuitive.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`p-8 rounded-2xl ${isDarkMode ? 'bg-gradient-to-br from-green-900/10 to-emerald-900/10 border border-green-500/20' : 'bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200'} transform hover:scale-105 transition-all duration-300 hover:shadow-2xl ${isDarkMode ? 'hover:shadow-green-500/10' : 'hover:shadow-green-500/20'}`}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="text-green-400 mr-4">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  </div>
                </div>
              </div>

              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-6 leading-relaxed`}>
                {feature.description}
              </p>

              <div className="space-y-2">
                <h4 className="font-semibold text-green-400 mb-3">Key Capabilities:</h4>
                {feature.details.map((detail, i) => (
                  <div key={i} className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {detail}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
