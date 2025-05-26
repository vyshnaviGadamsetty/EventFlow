
import React, { useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';  // <-- Import Link here

const HeroSection = ({ isDarkMode, isHovering, setIsHovering }) => {
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting,
          }));
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[id]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative py-20 px-6">
      <div className="container mx-auto text-center">
        <div
          id="hero"
          className={`transform transition-all duration-1000 ${
            isVisible.hero ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight">
            Experience the most
            <br />
            <span className={`${isDarkMode ? 'text-green-400' : 'text-green-600'} animate-pulse`}>
              advanced events
            </span>
          </h1>

          <p
            className={`text-xl md:text-2xl ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            } mb-8 max-w-3xl mx-auto leading-relaxed font-light`}
          >
          
           Take control of every minute — a calendar built to keep pace with your life.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link to="/auth">
              <button
                className={`group px-8 py-4 bg-gradient-to-r ${
                  isDarkMode ? 'from-green-400 to-emerald-500' : 'from-green-500 to-emerald-600'
                } text-black rounded-lg text-lg font-semibold hover:shadow-xl ${
                  isDarkMode ? 'hover:shadow-green-400/25' : 'hover:shadow-green-500/25'
                } transform hover:scale-105 transition-all duration-300 flex items-center space-x-2`}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <span>Start Free Trial</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </Link>
          </div>

         
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
