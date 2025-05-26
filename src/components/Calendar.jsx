// import React from 'react';
// import { Plus } from 'lucide-react';
// import EventCard from './EventCard';

// const CalendarDay = ({
//   day,
//   events,
//   isToday,
//   isSelected,
//   onClick,
//   handleDragOver,
//   handleDrop,
//   handleDragStart,
//   isDarkMode,
//   setSelectedDate,
//   setShowEventModal
// }) => (
//   <div
//     onClick={() => onClick(day.date)}
//     onDragOver={handleDragOver}
//     onDrop={(e) => handleDrop(e, day.date)}
//     className={`min-h-[120px] p-2 border-2 transition-all duration-300 cursor-pointer relative group overflow-hidden ${
//       day.isCurrentMonth
//         ? isDarkMode
//           ? 'border-green-400/20 hover:border-green-400/40 bg-black/30 hover:bg-black/50'
//           : 'border-green-500/30 hover:border-green-500/50 bg-white/50 hover:bg-white/70'
//         : isDarkMode
//           ? 'border-gray-700/30 bg-gray-900/50 text-gray-600'
//           : 'border-gray-300/30 bg-gray-100/50 text-gray-400'
//     } ${
//       isToday
//         ? 'ring-2 ring-green-400 ring-opacity-50'
//         : ''
//     } ${
//       isSelected
//         ? isDarkMode
//           ? 'bg-green-400/20 border-green-400'
//           : 'bg-green-500/20 border-green-500'
//         : ''
//     }`}
//   >
//     <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//     <div className="relative z-10">
//       <div className="flex justify-between items-start mb-2">
//         <span className={`text-lg font-semibold ${
//           isToday 
//             ? 'text-green-400' 
//             : day.isCurrentMonth 
//               ? isDarkMode ? 'text-white' : 'text-gray-900'
//               : isDarkMode ? 'text-gray-600' : 'text-gray-400'
//         }`}>
//           {day.date.getDate()}
//         </span>
//         {day.isCurrentMonth && (
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               setSelectedDate(day.date);
//               setShowEventModal(true);
//             }}
//             className="opacity-0 group-hover:opacity-100 p-1 bg-green-400 hover:bg-green-500 rounded-full text-black transition-all duration-300 hover:scale-110"
//           >
//             <Plus className="w-4 h-4" />
//           </button>
//         )}
//       </div>
//       <div className="space-y-1">
//         {events.slice(0, 3).map((event) => (
//           <EventCard
//             key={event.id}
//             event={event}
//             onEdit={() => {
//               setSelectedDate(new Date(event.date));
//               setShowEventModal(true);
//             }}
//             onDelete={() => {}}
//             isDraggable={true}                // Enable dragging
//             handleDragStart={(e) => handleDragStart(event.id)}  // Pass drag start handler
//           />
//         ))}
//         {events.length > 3 && (
//           <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} px-2 py-1 rounded`}>
//             +{events.length - 3} more
//           </div>
//         )}
//       </div>
//     </div>
//   </div>
// );

// export default CalendarDay;
import React from 'react';
import { Plus } from 'lucide-react';
import EventCard from './EventCard';

const CalendarDay = ({
  day,
  events,
  isToday,
  isSelected,
  onClick,
  handleDragOver,
  handleDrop,
  handleDragStart,
  isDarkMode,
  setSelectedDate,
  setShowEventModal
}) => (
  <div
    onClick={() => onClick(day.date)}
    onDragOver={handleDragOver}
    onDrop={(e) => handleDrop(e, day.date)}
    className={`min-h-[120px] p-2 border-2 transition-all duration-300 cursor-pointer relative group overflow-hidden ${
      day.isCurrentMonth
        ? isDarkMode
          ? 'border-green-400/20 hover:border-green-400/40 bg-black/30 hover:bg-black/50'
          : 'border-green-500/30 hover:border-green-500/50 bg-white/50 hover:bg-white/70'
        : isDarkMode
          ? 'border-gray-700/30 bg-gray-900/50 text-gray-600'
          : 'border-gray-300/30 bg-gray-100/50 text-gray-400'
    } ${
      isToday
        ? 'ring-2 ring-green-400 ring-opacity-50'
        : ''
    } ${
      isSelected
        ? isDarkMode
          ? 'bg-green-400/20 border-green-400'
          : 'bg-green-500/20 border-green-500'
        : ''
    }`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <div className="relative z-10">
      <div className="flex justify-between items-start mb-2">
        <span className={`text-lg font-semibold ${
          isToday 
            ? 'text-green-400' 
            : day.isCurrentMonth 
              ? isDarkMode ? 'text-white' : 'text-gray-900'
              : isDarkMode ? 'text-gray-600' : 'text-gray-400'
        }`}>
          {day.date.getDate()}
        </span>
        {day.isCurrentMonth && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedDate(day.date);
              setShowEventModal(true);
            }}
            className="sm:opacity-0 sm:group-hover:opacity-100 opacity-60 p-1 bg-green-400 hover:bg-green-500 rounded-full text-black transition-all duration-300 hover:scale-110"
          >
            <Plus className="w-4 h-4" />
          </button>
        )}
      </div>
      <div className="space-y-1">
        {events.slice(0, 3).map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onEdit={() => {
              setSelectedDate(new Date(event.date));
              setShowEventModal(true);
            }}
            onDelete={() => {}}
            isDraggable={true}
            handleDragStart={(e) => handleDragStart(event.id)}
          />
        ))}
        {events.length > 3 && (
          <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} px-2 py-1 rounded`}>
            +{events.length - 3} more
          </div>
        )}
      </div>
    </div>
  </div>
);

export default CalendarDay;