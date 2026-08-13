import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Camera, ChevronRight, UserPlus } from 'lucide-react';

const NAV_LINKS = [
  { path: '/', label: 'HOME' },
  { path: '/about', label: 'ABOUT' },
  { path: '/teams', label: 'TEAMS' },
  { path: '/gallery', label: 'GALLERY' },
  { path: '/videos', label: 'VIDEOS' },
  { path: '/events', label: 'EVENTS' },
  { path: '/stories', label: 'STORIES' },
  { path: '/achievements', label: 'ACHIEVEMENTS' },
  { path: '/contact', label: 'CONTACT' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? 'py-3 bg-navy-950/85 backdrop-blur-xl border-b border-amber-500/20 shadow-2xl'
          : 'py-5 bg-gradient-to-b from-navy-950/90 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Branding */}
          <Link to="/" className="group flex items-center space-x-3 focus:outline-none">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400 via-gold-500 to-flame-500 p-0.5 shadow-gold-glow group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-navy-950 rounded-[10px] flex items-center justify-center">
                <Camera className="w-5 h-5 text-gold-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div>
              <span className="block text-xs font-bold uppercase tracking-widest text-gold-400">
                SREYAS INSTITUTE
              </span>
              <span className="block text-lg font-extrabold font-heading text-slate-100 tracking-tight leading-tight group-hover:text-gold-300 transition-colors">
                MEDIA CLUB
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-1 bg-navy-900/60 p-1.5 rounded-full border border-amber-500/15 backdrop-blur-md">
            {NAV_LINKS.map(link => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-3.5 py-1.5 text-xs font-semibold tracking-wider transition-colors rounded-full ${
                    isActive ? 'text-navy-950 font-bold' : 'text-slate-300 hover:text-gold-400'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavTab"
                      transition={{ type: 'spring', duration: 0.5 }}
                      className="absolute inset-0 bg-gold-400 rounded-full shadow-gold-glow z-0"
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Side JOIN Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              to="/join"
              className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-navy-950 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 shadow-gold-glow hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <UserPlus className="w-4 h-4" />
              <span>JOIN THE CLUB</span>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex xl:hidden items-center space-x-3">
            <Link
              to="/join"
              className="px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider text-navy-950 bg-gold-400"
            >
              JOIN
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className="p-2 rounded-lg bg-navy-900 border border-amber-500/20 text-slate-200 hover:text-gold-400 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="xl:hidden border-b border-amber-500/20 bg-navy-950/95 backdrop-blur-2xl overflow-hidden"
          >
            <div className="px-4 pt-4 pb-6 space-y-2 max-h-[80vh] overflow-y-auto">
              {NAV_LINKS.map(link => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold tracking-wider transition-all ${
                      isActive
                        ? 'bg-gold-500/10 border border-gold-500/30 text-gold-400'
                        : 'text-slate-300 hover:bg-navy-900 hover:text-white'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronRight className={`w-4 h-4 ${isActive ? 'text-gold-400' : 'text-slate-600'}`} />
                  </Link>
                );
              })}

              <div className="pt-4 border-t border-amber-500/15">
                <Link
                  to="/join"
                  className="flex items-center justify-center space-x-2 w-full py-3.5 rounded-xl font-bold text-navy-950 bg-gradient-to-r from-gold-400 to-gold-500 shadow-gold-glow text-sm tracking-wider uppercase"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>JOIN THE MEDIA CLUB</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
