import React from 'react';

const CustomCursor = ({
  isDarkMode = true,
  cursorPos = { x: 0, y: 0 },
  isHovering = false
}) => {
  return (
    <>
      <div 
        className="fixed pointer-events-none z-[100] mix-blend-difference"
        style={{
          left: cursorPos.x - 8,
          top: cursorPos.y - 8,
          transform: `scale(${isHovering ? 2 : 1})`,
          transition: 'transform 0.2s ease'
        }}
      >
        <div className={`w-4 h-4 rounded-full ${isDarkMode ? 'bg-green-400' : 'bg-green-600'} animate-pulse`} />
      </div>
      <div 
        className="fixed pointer-events-none z-[99]"
        style={{
          left: cursorPos.x - 20,
          top: cursorPos.y - 20,
          transform: `scale(${isHovering ? 1.5 : 1})`,
          transition: 'transform 0.3s ease'
        }}
      >
        <div className={`w-10 h-10 rounded-full border-2 ${isDarkMode ? 'border-green-400/30' : 'border-green-600/30'}`} />
      </div>
    </>
  );
};

export default CustomCursor;
