
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Header from './components/Header';
import CustomCursor from './components/CustomCursor';  // import here
import Home from './Pages/Home';
import AboutUs from './Pages/AboutUS';
import Features from './Pages/Feautures';
import AnimatedAuthPage from './Pages/AnimatedAuth';
import EventCalendarPortal from './Pages/EventCalendarPortal';

// Wrapper to conditionally render header based on route
function AppWrapper({ isDarkMode, setIsDarkMode, isHovering, setIsHovering }) {
  const location = useLocation();
  const showHeader = location.pathname !== '/eventportal';

  return (
    <>
      {showHeader && (
        <Header
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          isHovering={isHovering}
          setIsHovering={setIsHovering}
        />
      )}
      <Routes>
        <Route 
          path="/" 
          element={<Home 
            isDarkMode={isDarkMode} 
            isHovering={isHovering} 
            setIsHovering={setIsHovering} 
          />} 
        />
        <Route 
          path="/auth" 
          element={<AnimatedAuthPage 
            isDarkMode={isDarkMode} 
            isHovering={isHovering} 
            setIsHovering={setIsHovering} 
          />} 
        />
        <Route 
          path="/eventportal" 
          element={<EventCalendarPortal 
            isDarkMode={isDarkMode} 
            isHovering={isHovering} 
            setIsHovering={setIsHovering} 
          />} 
        />
        <Route 
          path="/aboutus" 
          element={<AboutUs 
            isDarkMode={isDarkMode} 
            isHovering={isHovering} 
            setIsHovering={setIsHovering} 
          />} 
        />
        <Route 
          path="/ft" 
          element={<Features 
            isDarkMode={isDarkMode} 
            isHovering={isHovering} 
            setIsHovering={setIsHovering} 
          />} 
        />
      </Routes>
    </>
  );
}

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className={`${isDarkMode ? 'bg-black text-white' : 'bg-white text-gray-900'} min-h-screen`}>
      <Router>
        {/* Add CustomCursor here just once */}
        <CustomCursor 
          isDarkMode={isDarkMode} 
          isHovering={isHovering} 
          cursorPos={cursorPos} 
        />
        <AppWrapper
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          isHovering={isHovering}
          setIsHovering={setIsHovering}
          cursorPos={cursorPos} // optional, in case AppWrapper or pages need it
        />
      </Router>
    </div>
  );
}

export default App;
