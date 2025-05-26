// ✅ FeaturesSection.jsx
// (In src/components/FeaturesSection.jsx)
import React, { useEffect, useState } from 'react';
import { Calendar, Clock, Users, Zap } from 'lucide-react';

const FeaturesSection = ({ isDarkMode, isHovering, setIsHovering }) => {
  const [isVisible, setIsVisible] = useState({});

  const features = [
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Smart Scheduling",
      description:
        "AI-powered scheduling that learns your preferences and suggests optimal meeting times.",
      color: isDarkMode ? "from-green-400 to-emerald-500" : "from-green-500 to-teal-600",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Time Management",
      description:
        "Advanced time tracking with productivity insights and automated time blocking.",
      color: isDarkMode ? "from-cyan-400 to-blue-500" : "from-blue-500 to-indigo-600",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Team Collaboration",
      description:
        "Seamless team scheduling with conflict resolution and availability matching.",
      color: isDarkMode ? "from-emerald-400 to-green-500" : "from-emerald-500 to-green-600",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Sync",
      description:
        "Real-time synchronization across all devices with offline support.",
      color: isDarkMode ? "from-yellow-400 to-orange-500" : "from-orange-500 to-red-600",
    },
  ];

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
      <div className="container mx-auto">
        <div
          id="features"
          className={`text-center mb-16 transform transition-all duration-1000 ${
            isVisible.features ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <h2
            className={`text-4xl md:text-5xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            } tracking-tight`}
          >
            Powerful Features
          </h2>
          <p
            className={`text-xl ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            } max-w-2xl mx-auto font-light`}
          >
            Everything you need to master your time and boost productivity
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group cursor-pointer transform transition-all duration-500 hover:scale-105 ${
                isVisible.features ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div
                className={`${
                  isDarkMode ? 'bg-black/40' : 'bg-white/60'
                } backdrop-blur-md rounded-2xl p-6 border ${
                  isDarkMode
                    ? 'border-green-500/20 hover:border-green-400/40'
                    : 'border-green-500/30 hover:border-green-500/50'
                } ${
                  isDarkMode ? 'hover:bg-black/60' : 'hover:bg-white/80'
                } hover:shadow-xl ${
                  isDarkMode ? 'hover:shadow-green-400/10' : 'hover:shadow-green-500/10'
                } transition-all duration-300`}
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}
                >
                  {feature.icon}
                </div>
                <h3
                  className={`text-xl font-semibold mb-3 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {feature.title}
                </h3>
                <p
                  className={`${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  } leading-relaxed font-light`}
                >
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;