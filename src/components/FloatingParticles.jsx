// ✅ FloatingParticles.jsx
// (In src/components/FloatingParticles.jsx)
import React from 'react';

const FloatingParticles = ({ isDarkMode }) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden w-full z-0">

      {[...Array(25)].map((_, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`
          }}
        >
          <div 
            className={`w-1.5 h-1.5 ${isDarkMode ? 'bg-green-400/40' : 'bg-green-600/40'} rounded-full animate-blink`}
            style={{
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        </div>
      ))}

      <div
        className={`absolute inset-0 opacity-5 ${isDarkMode ? 'bg-green-400' : 'bg-green-600'}`}
        style={{
          backgroundImage: `
            linear-gradient(${isDarkMode ? '#22c55e' : '#16a34a'} 1px, transparent 1px),
            linear-gradient(90deg, ${isDarkMode ? '#22c55e' : '#16a34a'} 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />
    </div>
  );
};

export default FloatingParticles;
