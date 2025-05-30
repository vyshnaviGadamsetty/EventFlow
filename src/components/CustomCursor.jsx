
import React, { useEffect, useState } from 'react';

const CustomCursor = ({
  isDarkMode = true,
  cursorPos = { x: 0, y: 0 },
  isHovering = false
}) => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if the device supports touch events
    const checkTouchDevice = () => {
      setIsTouchDevice(
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0
      );
    };

    checkTouchDevice();
    window.addEventListener('resize', checkTouchDevice);
    
    return () => {
      window.removeEventListener('resize', checkTouchDevice);
    };
  }, []);

  // Don't render custom cursor on touch devices
  if (isTouchDevice) {
    return null;
  }

  return (
    <>
      {/* Inner cursor dot */}
      <div 
        className="fixed pointer-events-none z-[100] mix-blend-difference"
        style={{
          left: `${cursorPos.x - 8}px`,
          top: `${cursorPos.y - 8}px`,
          transform: `scale(${isHovering ? 2 : 1})`,
          transition: 'transform 0.2s ease',
          willChange: 'transform' // Optimize animations
        }}
      >
        <div className={`w-4 h-4 rounded-full ${isDarkMode ? 'bg-green-400' : 'bg-green-600'} ${isHovering ? 'animate-pulse' : ''}`} />
      </div>
      
      {/* Outer cursor ring */}
      <div 
        className="fixed pointer-events-none z-[99]"
        style={{
          left: `${cursorPos.x - 20}px`,
          top: `${cursorPos.y - 20}px`,
          transform: `scale(${isHovering ? 1.5 : 1})`,
          transition: 'transform 0.3s ease',
          willChange: 'transform' // Optimize animations
        }}
      >
        <div className={`w-10 h-10 rounded-full border-2 ${isDarkMode ? 'border-green-400/30' : 'border-green-600/30'}`} />
      </div>
    </>
  );
};

export default CustomCursor;
