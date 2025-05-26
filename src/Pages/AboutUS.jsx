import React from 'react';
import { Calendar, User, Lightbulb, Code, CheckCircle } from 'lucide-react';
import CustomCursor from '../components/CustomCursor';
import FloatingParticles from '../components/FloatingParticles';

const AboutUs = ({ isDarkMode, isHovering, setIsHovering, cursorPos }) => {
  return (
    <div className={`relative min-h-screen ${isDarkMode ? 'bg-black text-white' : 'bg-white text-gray-900'} py-20 cursor-none font-['Space_Grotesk',_monospace]`}>
      {/* Custom Cursor and Floating Particles in Background */}
      
      <FloatingParticles isDarkMode={isDarkMode} />

      <div className="container mx-auto px-6 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div 
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mb-6 transform hover:scale-110 transition-all duration-300"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <Calendar className="w-10 h-10 text-black" />
          </div>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
            About EventFlow
          </h1>
          <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto leading-relaxed`}>
            Born from the struggles of a forgetful student, EventFlow is designed to help you never miss another important task or event again.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-green-400">My Story</h2>
            <div className="space-y-4">
              <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
                Hi! I'm <span className="font-semibold text-green-400">Gadamsetty Sri Vyshnavi</span>, a 3rd-year B.Tech student who has always struggled with remembering tasks and managing my schedule effectively.
              </p>
              <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
                After missing countless assignments, forgetting important meetings, and struggling to keep track of my academic and personal commitments, I decided to create a solution that would work for students like me.
              </p>
              <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
                EventFlow was born as part of my FLAM Frontend Assignment, but it quickly became something much more personal - a tool that actually helps me stay organized and on top of my responsibilities.
              </p>
            </div>
          </div>
          
          <div className="relative">
            <div 
              className={`p-8 rounded-2xl ${isDarkMode ? 'bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-green-500/20' : 'bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200'} transform hover:scale-105 transition-all duration-300`}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="flex items-center mb-4">
                <User className="w-8 h-8 text-green-400 mr-3" />
                <h3 className="text-xl font-semibold">Developer Profile</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Name:</span>
                  <span className="font-medium">Gadamsetty Sri Vyshnavi</span>
                </div>
                <div className="flex justify-between">
                  <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Year:</span>
                  <span className="font-medium">3rd Year B.Tech</span>
                </div>
                <div className="flex justify-between">
                  <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Project:</span>
                  <span className="font-medium">FLAM Frontend Assignment</span>
                </div>
                <div className="flex justify-between">
                  <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Motivation:</span>
                  <span className="font-medium">Never forget tasks again!</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="text-center mb-16">
          <div 
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mb-6 transform hover:scale-110 transition-all duration-300"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <Lightbulb className="w-8 h-8 text-black" />
          </div>
          <h2 className="text-3xl font-bold mb-6 text-green-400">Our Mission</h2>
          <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-4xl mx-auto leading-relaxed`}>
            To create an intuitive, powerful calendar application that helps students and professionals manage their time effectively, 
            reduce stress, and never miss important deadlines or events again.
          </p>
        </div>

        {/* Values Section */}
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Code className="w-8 h-8" />,
              title: "Student-Centric Design",
              description: "Built by a student, for students who understand the struggle of managing academic life."
            },
            {
              icon: <Calendar className="w-8 h-8" />,
              title: "Simplicity First",
              description: "Clean, intuitive interface that doesn't overwhelm but empowers you to stay organized."
            },
            {
              icon: <CheckCircle className="w-8 h-8" />,
              title: "Reliability",
              description: "A tool you can depend on to keep track of what matters most to you."
            }
          ].map((value, index) => (
            <div 
              key={index}
              className={`p-6 rounded-xl ${isDarkMode ? 'bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-green-500/20' : 'bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200'} text-center transform hover:scale-105 transition-all duration-300`}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="text-green-400 mb-4 flex justify-center">
                {value.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
