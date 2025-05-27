import React from 'react';
import { MousePointer } from 'lucide-react';

const UsageInstructions = ({ isDarkMode }) => {
  return (
    <div className={`${isDarkMode ? 'bg-black/40' : 'bg-white/40'} backdrop-blur-xl border-2 ${isDarkMode ? 'border-green-400/30' : 'border-green-500/40'} rounded-3xl p-6`}>
      <div className="flex items-center space-x-2 mb-4">
        <MousePointer className={`w-5 h-5 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
        <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          How to Use
        </h3>
      </div>
      
      <div className="space-y-3">
        <div className={`p-3 ${isDarkMode ? 'bg-green-400/10 border border-green-400/20' : 'bg-green-500/10 border border-green-500/20'} rounded-xl`}>
          <ul className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} space-y-2`}>
            <li className="flex items-start space-x-2">
              <span className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-green-400' : 'bg-green-600'} mt-2 flex-shrink-0`}></span>
              <span><strong>Click</strong> any event to view, edit, or delete</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-green-400' : 'bg-green-600'} mt-2 flex-shrink-0`}></span>
              <span><strong>Drag & Drop</strong> events to reschedule</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-green-400' : 'bg-green-600'} mt-2 flex-shrink-0`}></span>
              <span><strong>Click +</strong> on any day to add new events</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-green-400' : 'bg-green-600'} mt-2 flex-shrink-0`}></span>
              <span><strong>Double-click</strong> empty space to quick-add</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UsageInstructions;