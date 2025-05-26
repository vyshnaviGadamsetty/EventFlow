import React, { useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';  // <-- Import Link here

const CTASection = ({ isDarkMode, isHovering, setIsHovering }) => {
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
    <section className="py-20 px-6">
      <div className="container mx-auto text-center">
        <div
          id="cta"
          className={`transform transition-all duration-1000 ${
            isVisible.cta ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <h2
            className={`text-4xl md:text-5xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            } tracking-tight`}
          >
            Ready to Transform Your Schedule?
          </h2>
          <p
            className={`text-xl ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            } mb-8 max-w-2xl mx-auto font-light`}
          >
            Join thousands of professionals who've revolutionized their productivity with EventFlow
          </p>
          <Link to="/auth" className="mx-auto inline-block">
            <button
              className={`group px-10 py-4 bg-gradient-to-r ${
                isDarkMode ? 'from-green-400 to-emerald-500' : 'from-green-500 to-emerald-600'
              } text-black rounded-lg text-xl font-semibold hover:shadow-xl ${
                isDarkMode ? 'hover:shadow-green-400/25' : 'hover:shadow-green-500/25'
              } transform hover:scale-105 transition-all duration-300 flex items-center space-x-3`}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <span>Get Started Now</span>
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
