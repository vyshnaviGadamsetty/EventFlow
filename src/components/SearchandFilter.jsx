import React from 'react';
import { Search, Filter } from 'lucide-react';

const SearchAndFilter = ({ isDarkMode, searchQuery, setSearchQuery, filterCategory, setFilterCategory, setIsHovering, categories }) => (
  <div className="flex flex-col sm:flex-row gap-4 mb-6">
    <div className="flex-1 relative">
      <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-green-400' : 'text-gray-500'}`} />
      <input
        type="text"
        placeholder="Search events..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 transition-all duration-300
          ${isDarkMode 
            ? 'bg-gray-900 border-green-600 text-green-200 placeholder-green-500 focus:border-green-400 focus:ring-green-400/40' 
            : 'bg-white border-green-500 text-gray-900 placeholder-gray-500 focus:border-green-600 focus:ring-green-600/40'
          }`}
        onFocus={() => setIsHovering(true)}
        onBlur={() => setIsHovering(false)}
        spellCheck={false}
      />
    </div>
    <div className="relative">
      <Filter className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-green-400' : 'text-gray-500'}`} />
      <select
        value={filterCategory}
        onChange={(e) => setFilterCategory(e.target.value)}
        className={`pl-10 pr-8 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 transition-all duration-300 appearance-none
          ${isDarkMode 
            ? 'bg-gray-900 border-green-600 text-green-200 focus:border-green-400 focus:ring-green-400/40' 
            : 'bg-white border-green-500 text-gray-900 focus:border-green-600 focus:ring-green-600/40'
          }`}
        onFocus={() => setIsHovering(true)}
        onBlur={() => setIsHovering(false)}
      >
        <option value="all" className={isDarkMode ? 'bg-gray-900 text-green-200' : 'bg-white text-gray-900'}>All Categories</option>
        {categories.map(cat => (
          <option key={cat.id} value={cat.id} className={isDarkMode ? 'bg-gray-900 text-green-200' : 'bg-white text-gray-900'}>
            {cat.label}
          </option>
        ))}
      </select>
    </div>
  </div>
);

export default SearchAndFilter;
