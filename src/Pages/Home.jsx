import React, { useState, useEffect } from 'react';
import CustomCursor from '../components/CustomCursor';
import FloatingParticles from '../components/FloatingParticles';
import HeroSection from '../components/HeroSection';
import CalendarPreview from '../components/CalendarPreview';
import FeaturesSection from '../components/Feauturesection';
import Testimonials from '../components/Testimonals';
import CTASection from '../components/CTASection';

const Home = ({ isDarkMode, isHovering, setIsHovering }) => {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      className={`relative min-h-screen ${
        isDarkMode ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'
      } cursor-none font-['Space_Grotesk',_monospace]`}
    >
      {/* Keep both of these outside the container */}
      <CustomCursor isDarkMode={isDarkMode} cursorPos={cursorPos} isHovering={isHovering} />
      <FloatingParticles isDarkMode={isDarkMode} />

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6">
        {/* Header removed from here since it's in App.jsx */}
        <HeroSection
          isDarkMode={isDarkMode}
          isHovering={isHovering}
          setIsHovering={setIsHovering}
        />
        <CalendarPreview
          isDarkMode={isDarkMode}
          isHovering={isHovering}
          setIsHovering={setIsHovering}
        />
        <FeaturesSection
          isDarkMode={isDarkMode}
          isHovering={isHovering}
          setIsHovering={setIsHovering}
        />
        <Testimonials
          isDarkMode={isDarkMode}
          isHovering={isHovering}
          setIsHovering={setIsHovering}
        />
        <CTASection
          isDarkMode={isDarkMode}
          isHovering={isHovering}
          setIsHovering={setIsHovering}
        />
      </div>
    </div>
  );
};

export default Home;
