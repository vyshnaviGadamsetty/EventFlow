// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Calendar, Menu, X, Sun, Moon } from 'lucide-react';

// const Header = ({ isDarkMode, setIsDarkMode, isHovering, setIsHovering }) => {
//   const [isMenuOpen, setIsMenuOpen] = React.useState(false);

//   const headerClasses = isDarkMode 
//     ? 'bg-black/80 backdrop-blur-md border-b border-green-500/20' 
//     : 'bg-white/80 backdrop-blur-md border-b border-green-500/20';

//   return (
//     <header className={`relative z-50 ${headerClasses}`}>
//       <div className="container mx-auto px-6 py-4">
//         <div className="flex items-center justify-between">
//           {/* Logo */}
//           <div 
//             className="flex items-center space-x-3 group cursor-pointer"
//             onMouseEnter={() => setIsHovering(true)}
//             onMouseLeave={() => setIsHovering(false)}
//           >
//             <div className={`w-10 h-10 bg-gradient-to-r ${isDarkMode ? 'from-green-400 to-emerald-500' : 'from-green-500 to-emerald-600'} rounded-lg flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}>
//               <Calendar className="w-6 h-6 text-black font-bold" />
//             </div>
//             <span className={`text-2xl font-bold ${isDarkMode ? 'text-green-400' : 'text-green-600'} tracking-wider`}>
//               EventFlow
//             </span>
//           </div>

//           {/* Desktop Nav */}
//           <nav className="hidden md:flex items-center space-x-8">
//             {['Home', 'About Us', 'Features', 'Pricing'].map((item) => (
//               <a
//                 key={item}
//                 href="#"
//                 className={`${isDarkMode ? 'hover:text-green-400' : 'hover:text-green-600'} transition-all duration-300 relative group font-medium tracking-wide`}
//                 onMouseEnter={() => setIsHovering(true)}
//                 onMouseLeave={() => setIsHovering(false)}
//               >
//                 {item}
//                 <span className={`absolute -bottom-1 left-0 w-0 h-0.5 ${isDarkMode ? 'bg-green-400' : 'bg-green-600'} group-hover:w-full transition-all duration-300`} />
//               </a>
//             ))}
//           </nav>

//           {/* Actions */}
//           <div className="flex items-center space-x-4">
//             {/* Theme Toggle */}
//             <button
//               onClick={() => setIsDarkMode(!isDarkMode)}
//               className={`p-2 rounded-full ${isDarkMode ? 'bg-green-400/10 hover:bg-green-400/20' : 'bg-green-600/10 hover:bg-green-600/20'} transition-colors duration-300`}
//               onMouseEnter={() => setIsHovering(true)}
//               onMouseLeave={() => setIsHovering(false)}
//             >
//               {isDarkMode ? <Sun className="w-5 h-5 text-green-400" /> : <Moon className="w-5 h-5 text-green-600" />}
//             </button>

//             {/* ✅ Desktop Login Button */}
//             <Link 
//               to="/auth"
//               className={`hidden md:block px-6 py-2 bg-gradient-to-r ${isDarkMode ? 'from-green-400 to-emerald-500' : 'from-green-500 to-emerald-600'} text-black rounded-lg hover:shadow-lg ${isDarkMode ? 'hover:shadow-green-400/25' : 'hover:shadow-green-500/25'} transform hover:scale-105 transition-all duration-300 font-medium`}
//               onMouseEnter={() => setIsHovering(true)}
//               onMouseLeave={() => setIsHovering(false)}
//             >
//               Login
//             </Link>

//             {/* Hamburger */}
//             <button
//               className="md:hidden"
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               onMouseEnter={() => setIsHovering(true)}
//               onMouseLeave={() => setIsHovering(false)}
//             >
//               {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* ✅ Mobile Nav */}
//       {isMenuOpen && (
//         <div className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden">
//           <div className={`absolute right-0 top-0 h-full w-64 ${isDarkMode ? 'bg-black/90' : 'bg-white/90'} backdrop-blur-md border-l ${isDarkMode ? 'border-green-500/20' : 'border-green-500/20'} transform animate-slide-in-right`}>
//             <div className="p-6 space-y-4 mt-16">
//               {['Home', 'About Us', 'Features', 'Pricing'].map((item) => (
//                 <a
//                   key={item}
//                   href="#"
//                   className={`block py-2 ${isDarkMode ? 'hover:text-green-400' : 'hover:text-green-600'} transition-colors duration-300 font-medium`}
//                   onMouseEnter={() => setIsHovering(true)}
//                   onMouseLeave={() => setIsHovering(false)}
//                 >
//                   {item}
//                 </a>
//               ))}

//               {/* ✅ Mobile Login Link */}
//               <Link
//                 to="/auth"
//                 onClick={() => setIsMenuOpen(false)}
//                 className={`block py-2 ${isDarkMode ? 'hover:text-green-400' : 'hover:text-green-600'} transition-colors duration-300 font-medium`}
//                 onMouseEnter={() => setIsHovering(true)}
//                 onMouseLeave={() => setIsHovering(false)}
//               >
//                 Login
//               </Link>
//             </div>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// };

// export default Header;
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import { Calendar, Menu, X, Sun, Moon } from 'lucide-react';

const Header = ({ isDarkMode, setIsDarkMode, isHovering, setIsHovering }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const headerClasses = isDarkMode 
    ? 'bg-black/80 backdrop-blur-md border-b border-green-500/20' 
    : 'bg-white/80 backdrop-blur-md border-b border-green-500/20';

  // Map of nav items and their paths
  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/aboutus' },
    { label: 'Features', path: '/ft' },   
  ];

  return (
    <header className={`relative z-50 ${headerClasses}`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 group cursor-pointer"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className={`w-10 h-10 bg-gradient-to-r ${isDarkMode ? 'from-green-400 to-emerald-500' : 'from-green-500 to-emerald-600'} rounded-lg flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}>
              <Calendar className="w-6 h-6 text-black font-bold" />
            </div>
            <span className={`text-2xl font-bold ${isDarkMode ? 'text-green-400' : 'text-green-600'} tracking-wider`}>
              EventFlow
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map(({ label, path }) => (
              <Link
                key={label}
                to={path}
                className={`${isDarkMode ? 'hover:text-green-400' : 'hover:text-green-600'} transition-all duration-300 relative group font-medium tracking-wide`}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                {label}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 ${isDarkMode ? 'bg-green-400' : 'bg-green-600'} group-hover:w-full transition-all duration-300`} />
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-full ${isDarkMode ? 'bg-green-400/10 hover:bg-green-400/20' : 'bg-green-600/10 hover:bg-green-600/20'} transition-colors duration-300`}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-green-400" /> : <Moon className="w-5 h-5 text-green-600" />}
            </button>

            {/* Desktop Login Button */}
            <Link 
              to="/auth"
              className={`hidden md:block px-6 py-2 bg-gradient-to-r ${isDarkMode ? 'from-green-400 to-emerald-500' : 'from-green-500 to-emerald-600'} text-black rounded-lg hover:shadow-lg ${isDarkMode ? 'hover:shadow-green-400/25' : 'hover:shadow-green-500/25'} transform hover:scale-105 transition-all duration-300 font-medium`}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              Login
            </Link>

            {/* Hamburger */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden">
          <div className={`absolute right-0 top-0 h-full w-64 ${isDarkMode ? 'bg-black/90' : 'bg-white/90'} backdrop-blur-md border-l ${isDarkMode ? 'border-green-500/20' : 'border-green-500/20'} transform animate-slide-in-right`}>
            <div className="p-6 space-y-4 mt-16">
              {navItems.map(({ label, path }) => (
                <Link
                  key={label}
                  to={path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block py-2 ${isDarkMode ? 'hover:text-green-400' : 'hover:text-green-600'} transition-colors duration-300 font-medium`}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  {label}
                </Link>
              ))}

              {/* Mobile Login Link */}
              <Link
                to="/auth"
                onClick={() => setIsMenuOpen(false)}
                className={`block py-2 ${isDarkMode ? 'hover:text-green-400' : 'hover:text-green-600'} transition-colors duration-300 font-medium`}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
