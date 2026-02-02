import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { BUSINESS_INFO, SERVICE_CATEGORIES } from '../../constants';
import { PhoneIcon, MenuIcon, CloseIcon, StarIcon, GoogleIcon } from '../Icons';
import logoSvg from '../../assets/jn_ornamental_logo_clean.svg';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    ...SERVICE_CATEGORIES.map(cat => ({ name: cat.title, path: `/${cat.slug}` })),
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Top Bar - Hidden on scroll for cleaner look, or kept small? Let's keep it but make it sleek */}
      <div className={`bg-navy-950 text-white py-2 text-sm transition-all duration-300 ${isScrolled ? 'h-0 py-0 overflow-hidden opacity-0' : 'h-auto opacity-100'}`}>
        <div className="container mx-auto px-4 max-w-7xl flex justify-between items-center">
          <div className="flex items-center gap-4 text-white/70">
            <div className="flex items-center gap-2">
              <GoogleIcon className="w-4 h-4" />
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <span key={i}><StarIcon className="w-3 h-3" filled /></span>
                ))}
              </div>
              <span className="font-semibold text-white">{BUSINESS_INFO.rating}</span>
            </div>
            <span className="hidden md:inline text-white/30">|</span>
            <span className="hidden md:inline">BBB Accredited</span>
            <span className="hidden lg:inline text-white/30">|</span>
            <span className="hidden lg:inline">{'Hablamos Espa\u00f1ol'}</span>
          </div>
          <a
            href={`tel:${BUSINESS_INFO.phone}`}
            className="flex items-center gap-2 font-bold hover:text-amber-500 transition-colors"
          >
            <PhoneIcon className="w-4 h-4" />
            {BUSINESS_INFO.phone}
          </a>
        </div>
      </div>

      {/* Main Navigation */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 border-b ${isScrolled
            ? 'bg-white/90 backdrop-blur-md shadow-md border-gray-200 py-2'
            : 'bg-white border-transparent py-4'
          }`}
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src={logoSvg}
                alt="JN Ornamental Design"
                className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <div className="leading-tight hidden sm:block">
                <div className="font-display font-bold text-lg text-navy-950 tracking-tight">
                  JN ORNAMENTAL DESIGN
                </div>
                <div className="text-[10px] text-navy-500 font-semibold uppercase tracking-widest">
                  {BUSINESS_INFO.tagline}
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-4 py-2 text-sm font-semibold transition-colors group ${isActive(link.path) ? 'text-amber-600' : 'text-navy-700 hover:text-amber-600'
                    }`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-amber-500 transform origin-left transition-transform duration-300 ${isActive(link.path) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <Link
                to="/contact"
                className="relative overflow-hidden bg-amber-500 text-navy-950 px-6 py-2.5 font-bold text-sm rounded transition-all hover:bg-amber-400 hover:shadow-lg hover:-translate-y-0.5"
              >
                Get Free Quote
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-navy-700 hover:bg-gray-100 rounded-md transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <CloseIcon className="w-6 h-6" />
              ) : (
                <MenuIcon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
            >
              <div className="container mx-auto px-4 py-4 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`block px-4 py-3 font-semibold rounded-lg transition-colors ${isActive(link.path)
                        ? 'bg-amber-50 text-amber-700'
                        : 'text-navy-700 hover:bg-gray-50'
                      }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <Link
                  to="/contact"
                  className="block mt-4 bg-amber-500 text-navy-950 px-4 py-3 font-bold text-center rounded-lg shadow-md active:scale-95 transition-transform"
                >
                  Get Free Quote
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Header;
