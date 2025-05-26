// ✅ Testimonials.jsx
// (In src/components/Testimonials.jsx)
import React, { useEffect, useState } from 'react';
import { Star } from 'lucide-react';

const Testimonials = ({ isDarkMode, isHovering, setIsHovering }) => {
  const [isVisible, setIsVisible] = useState({});
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Product Manager',
      content:
        'EventFlow transformed how our team manages meetings. The AI suggestions are incredibly accurate!',
      avatar: 'SJ',
      rating: 5,
    },
    {
      name: 'Mike Chen',
      role: 'Startup Founder',
      content:
        'The drag-and-drop interface is so intuitive. I can reorganize my entire week in seconds.',
      avatar: 'MC',
      rating: 5,
    },
    {
      name: 'Emily Davis',
      role: 'Designer',
      content:
        "Beautiful interface with powerful features. It's like having a personal assistant for scheduling.",
      avatar: 'ED',
      rating: 5,
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

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
          id="testimonials"
          className={`text-center mb-16 transform transition-all duration-1000 ${
            isVisible.testimonials ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <h2
            className={`text-4xl md:text-5xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            } tracking-tight`}
          >
            What Our Users Say
          </h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div
                    className={`${
                      isDarkMode ? 'bg-black/40' : 'bg-white/60'
                    } backdrop-blur-md rounded-2xl p-8 border ${
                      isDarkMode ? 'border-green-500/20' : 'border-green-500/30'
                    } text-center`}
                  >
                    <div className="flex justify-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            isDarkMode ? 'text-green-400' : 'text-green-600'
                          } fill-current`}
                        />
                      ))}
                    </div>
                    <p
                      className={`text-lg ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      } mb-6 italic font-light`}
                    >
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center justify-center space-x-4">
                      <div
                        className={`w-12 h-12 bg-gradient-to-r ${
                          isDarkMode ? 'from-green-400 to-emerald-500' : 'from-green-500 to-emerald-600'
                        } rounded-full flex items-center justify-center font-bold text-black`}
                      >
                        {testimonial.avatar}
                      </div>
                      <div>
                        <p
                          className={`font-semibold ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}
                        >
                          {testimonial.name}
                        </p>
                        <p
                          className={`${
                            isDarkMode ? 'text-green-400' : 'text-green-600'
                          }`}
                        >
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? `${isDarkMode ? 'bg-green-400' : 'bg-green-600'} scale-125`
                    : `${isDarkMode ? 'bg-green-400/30' : 'bg-green-600/30'}`
                }`}
                onClick={() => setCurrentSlide(index)}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;