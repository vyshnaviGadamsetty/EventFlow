
import React, { useState, useEffect } from 'react';
import { Calendar, Eye, EyeOff, Mail, Lock, User, ArrowRight, Sun, Moon, Check, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AnimatedAuthPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  // Floating particles animation
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = [...Array(30)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      speed: Math.random() * 2 + 1,
      opacity: Math.random() * 0.6 + 0.2
    }));
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const CustomCursor = () => (
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

  const FloatingParticles = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.id * 0.1}s`,
            animationDuration: `${particle.speed + 2}s`
          }}
        >
          <div 
            className={`rounded-full ${isDarkMode ? 'bg-green-400/40' : 'bg-green-600/40'} animate-ping`}
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              animationDuration: `${particle.speed + 1}s`
            }}
          />
        </div>
      ))}
      
      {/* Animated Grid */}
      <div className={`absolute inset-0 opacity-5 ${isDarkMode ? 'bg-green-400' : 'bg-green-600'}`}
           style={{
             backgroundImage: `
               linear-gradient(${isDarkMode ? '#22c55e' : '#16a34a'} 1px, transparent 1px),
               linear-gradient(90deg, ${isDarkMode ? '#22c55e' : '#16a34a'} 1px, transparent 1px)
             `,
             backgroundSize: '60px 60px',
             animation: 'grid-move 20s linear infinite'
           }}
      />
    </div>
  );

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Invalid email format';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    if (!isLogin) {
      if (!formData.fullName) {
        errors.fullName = 'Full name is required';
      }
      if (!formData.confirmPassword) {
        errors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }
    }
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);

      if (isLogin) {
        localStorage.setItem('eventflowUserName', 'User');
      } else {
        localStorage.setItem('eventflowUserName', formData.fullName);
      }

      setTimeout(() => {
        setShowSuccess(false);
        navigate('/eventportal');
      }, 1000);
    }, 2000);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ email: '', password: '', confirmPassword: '', fullName: '' });
    setFormErrors({});
  };

  const themeClasses = isDarkMode 
    ? 'min-h-screen bg-black text-white' 
    : 'min-h-screen bg-gray-50 text-gray-900';

  return (
    <div className={`${themeClasses} relative cursor-none font-['Space_Grotesk',_monospace] overflow-hidden`}>
      <CustomCursor />
      <FloatingParticles />

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-6 py-12">
        <div className="w-full max-w-4xl mx-auto">
          {/* Login Card */}
          <div 
            className={`transition-all duration-700 ease-in-out ${isLogin ? 'block' : 'hidden'}`}
          >
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Welcome Side */}
              <div className={`${isDarkMode ? 'bg-gradient-to-br from-green-400/20 to-emerald-500/20' : 'bg-gradient-to-br from-green-500/20 to-emerald-600/20'} backdrop-blur-md border ${isDarkMode ? 'border-green-500/30' : 'border-green-500/40'} rounded-l-2xl p-12 flex flex-col justify-center items-center text-center relative overflow-hidden`}>
                <div className="relative z-10">
                  <h2 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Welcome Back!
                  </h2>
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-8 text-lg font-light`}>
                    Ready to organize your events like never before?
                  </p>
                  <button
                    onClick={toggleMode}
                    className={`px-8 py-3 border-2 ${isDarkMode ? 'border-green-400 text-green-400 hover:bg-green-400' : 'border-green-600 text-green-600 hover:bg-green-600'} hover:text-black rounded-lg transition-all duration-300 font-medium transform hover:scale-105`}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    New Here? Sign Up
                  </button>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-r from-green-400/30 to-emerald-500/30 rounded-full animate-bounce" />
                <div className="absolute bottom-10 right-10 w-16 h-16 bg-gradient-to-r from-emerald-400/30 to-green-500/30 rounded-full animate-pulse" />
                <div className="absolute top-1/2 left-5 w-12 h-12 bg-gradient-to-r from-green-400/20 to-emerald-500/20 rounded-full animate-ping" />
              </div>

              {/* Login Form */}
              <div className={`${isDarkMode ? 'bg-black/40' : 'bg-white/60'} backdrop-blur-md border ${isDarkMode ? 'border-green-500/20' : 'border-green-500/30'} rounded-r-2xl p-12`}>
                <div className="text-center mb-8">
                  <h3 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                    Log in
                  </h3>
                  <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} font-light`}>
                    Enter your credentials to access your account
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email Field */}
                  <div className="relative">
                    <div className="relative">
                      <Mail className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`w-full pl-12 pr-4 py-4 ${isDarkMode ? 'bg-black/20 border-green-500/30 text-white placeholder-gray-400' : 'bg-white/20 border-green-500/40 text-gray-900 placeholder-gray-500'} border rounded-lg focus:outline-none focus:border-green-400 transition-all duration-300 font-medium`}
                        onFocus={() => setIsHovering(true)}
                        onBlur={() => setIsHovering(false)}
                      />
                    </div>
                    {formErrors.email && (
                      <p className="text-red-400 text-sm mt-2 flex items-center">
                        <X className="w-4 h-4 mr-1" />
                        {formErrors.email}
                      </p>
                    )}
                  </div>

                  {/* Password Field */}
                  <div className="relative">
                    <div className="relative">
                      <Lock className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className={`w-full pl-12 pr-12 py-4 ${isDarkMode ? 'bg-black/20 border-green-500/30 text-white placeholder-gray-400' : 'bg-white/20 border-green-500/40 text-gray-900 placeholder-gray-500'} border rounded-lg focus:outline-none focus:border-green-400 transition-all duration-300 font-medium`}
                        onFocus={() => setIsHovering(true)}
                        onBlur={() => setIsHovering(false)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-green-400' : 'text-green-600'} hover:scale-110 transition-transform duration-200`}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {formErrors.password && (
                      <p className="text-red-400 text-sm mt-2 flex items-center">
                        <X className="w-4 h-4 mr-1" />
                        {formErrors.password}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 bg-gradient-to-r ${isDarkMode ? 'from-green-400 to-emerald-500' : 'from-green-500 to-emerald-600'} text-black rounded-lg font-semibold text-lg hover:shadow-xl ${isDarkMode ? 'hover:shadow-green-400/25' : 'hover:shadow-green-500/25'} transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    {isSubmitting ? (
                      <div className="w-6 h-6 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Sign In</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Signup Card */}
          <div 
            className={`transition-all duration-700 ease-in-out ${!isLogin ? 'block' : 'hidden'}`}
          >
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Signup Form */}
              <div className={`${isDarkMode ? 'bg-black/40' : 'bg-white/60'} backdrop-blur-md border ${isDarkMode ? 'border-green-500/20' : 'border-green-500/30'} rounded-l-2xl p-12`}>
                <div className="text-center mb-8">
                  <h3 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                    Create Account
                  </h3>
                  <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} font-light`}>
                    Join EventFlow and start organizing your life
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Full Name Field */}
                  <div className="relative">
                    <div className="relative">
                      <User className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        className={`w-full pl-12 pr-4 py-4 ${isDarkMode ? 'bg-black/20 border-green-500/30 text-white placeholder-gray-400' : 'bg-white/20 border-green-500/40 text-gray-900 placeholder-gray-500'} border rounded-lg focus:outline-none focus:border-green-400 transition-all duration-300 font-medium`}
                        onFocus={() => setIsHovering(true)}
                        onBlur={() => setIsHovering(false)}
                      />
                    </div>
                    {formErrors.fullName && (
                      <p className="text-red-400 text-sm mt-2 flex items-center">
                        <X className="w-4 h-4 mr-1" />
                        {formErrors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="relative">
                    <div className="relative">
                      <Mail className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`w-full pl-12 pr-4 py-4 ${isDarkMode ? 'bg-black/20 border-green-500/30 text-white placeholder-gray-400' : 'bg-white/20 border-green-500/40 text-gray-900 placeholder-gray-500'} border rounded-lg focus:outline-none focus:border-green-400 transition-all duration-300 font-medium`}
                        onFocus={() => setIsHovering(true)}
                        onBlur={() => setIsHovering(false)}
                      />
                    </div>
                    {formErrors.email && (
                      <p className="text-red-400 text-sm mt-2 flex items-center">
                        <X className="w-4 h-4 mr-1" />
                        {formErrors.email}
                      </p>
                    )}
                  </div>

                  {/* Password Field */}
                  <div className="relative">
                    <div className="relative">
                      <Lock className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className={`w-full pl-12 pr-12 py-4 ${isDarkMode ? 'bg-black/20 border-green-500/30 text-white placeholder-gray-400' : 'bg-white/20 border-green-500/40 text-gray-900 placeholder-gray-500'} border rounded-lg focus:outline-none focus:border-green-400 transition-all duration-300 font-medium`}
                        onFocus={() => setIsHovering(true)}
                        onBlur={() => setIsHovering(false)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-green-400' : 'text-green-600'} hover:scale-110 transition-transform duration-200`}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {formErrors.password && (
                      <p className="text-red-400 text-sm mt-2 flex items-center">
                        <X className="w-4 h-4 mr-1" />
                        {formErrors.password}
                      </p>
                    )}
                  </div>

                  {/* Confirm Password Field */}
                  <div className="relative">
                    <div className="relative">
                      <Lock className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        className={`w-full pl-12 pr-12 py-4 ${isDarkMode ? 'bg-black/20 border-green-500/30 text-white placeholder-gray-400' : 'bg-white/20 border-green-500/40 text-gray-900 placeholder-gray-500'} border rounded-lg focus:outline-none focus:border-green-400 transition-all duration-300 font-medium`}
                        onFocus={() => setIsHovering(true)}
                        onBlur={() => setIsHovering(false)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-green-400' : 'text-green-600'} hover:scale-110 transition-transform duration-200`}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {formErrors.confirmPassword && (
                      <p className="text-red-400 text-sm mt-2 flex items-center">
                        <X className="w-4 h-4 mr-1" />
                        {formErrors.confirmPassword}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 bg-gradient-to-r ${isDarkMode ? 'from-green-400 to-emerald-500' : 'from-green-500 to-emerald-600'} text-black rounded-lg font-semibold text-lg hover:shadow-xl ${isDarkMode ? 'hover:shadow-green-400/25' : 'hover:shadow-green-500/25'} transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    {isSubmitting ? (
                      <div className="w-6 h-6 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Create Account</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Welcome Side */}
              <div className={`${isDarkMode ? 'bg-gradient-to-br from-emerald-400/20 to-green-500/20' : 'bg-gradient-to-br from-emerald-500/20 to-green-600/20'} backdrop-blur-md border ${isDarkMode ? 'border-green-500/30' : 'border-green-500/40'} rounded-r-2xl p-12 flex flex-col justify-center items-center text-center relative overflow-hidden`}>
                <div className="relative z-10">
                  <h2 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Join EventFlow!
                  </h2>
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-8 text-lg font-light`}>
                    Already have an account? Welcome back!
                  </p>
                  <button
                    onClick={toggleMode}
                    className={`px-8 py-3 border-2 ${isDarkMode ? 'border-green-400 text-green-400 hover:bg-green-400' : 'border-green-600 text-green-600 hover:bg-green-600'} hover:text-black rounded-lg transition-all duration-300 font-medium transform hover:scale-105`}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    Sign In Instead
                  </button>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute top-10 right-10 w-20 h-20 bg-gradient-to-r from-emerald-400/30 to-green-500/30 rounded-full animate-bounce" />
                <div className="absolute bottom-10 left-10 w-16 h-16 bg-gradient-to-r from-green-400/30 to-emerald-500/30 rounded-full animate-pulse" />
                <div className="absolute top-1/2 right-5 w-12 h-12 bg-gradient-to-r from-emerald-400/20 to-green-500/20 rounded-full animate-ping" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Notification */}
      {showSuccess && (
        <div className="fixed top-4 right-4 z-50 transform transition-all duration-500 animate-slide-in-right">
          <div className={`${isDarkMode ? 'bg-green-400' : 'bg-green-600'} text-black px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3`}>
            <Check className="w-6 h-6" />
            <span className="font-semibold">
              {isLogin ? 'Welcome back!' : 'Account created successfully!'}
            </span>
          </div>
        </div>
      )}

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        
        @keyframes slide-in-right {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in-right { animation: slide-in-right 0.3s ease-out; }
        
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 60px); }
        }
        
        * {
          cursor: none;
        }
      `}</style>
    </div>
  );
};

export default AnimatedAuthPage;