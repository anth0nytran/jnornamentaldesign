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
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* ── ANNOUNCEMENT BAR ── */}
      <div className={`bg-navy-900 text-white transition-all duration-300 ${isScrolled ? 'h-0 py-0 overflow-hidden opacity-0' : 'py-2.5 opacity-100'}`}>
        <div className="container mx-auto px-4 max-w-7xl flex justify-between items-center">
          {/* Left: Trust signals */}
          <div className="flex items-center gap-5 text-sm">
            <div className="flex items-center gap-2">
              <GoogleIcon className="w-4 h-4 text-white/60" />
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <span key={i}><StarIcon className="w-3 h-3" filled /></span>
                ))}
              </div>
              <span className="font-bold text-white">{BUSINESS_INFO.rating}</span>
            </div>
            <span className="hidden md:inline text-navy-400">|</span>
            <span className="hidden md:inline text-navy-200 text-xs font-semibold tracking-wide">BBB Accredited</span>
            <span className="hidden lg:inline text-navy-400">|</span>
            <span className="hidden lg:inline text-navy-200 text-xs font-semibold tracking-wide">{'Hablamos Espa\u00f1ol'}</span>
          </div>
          {/* Right: Phone */}
          <a
            href={`tel:${BUSINESS_INFO.phone}`}
            className="flex items-center gap-2 text-sm font-bold text-white hover:text-amber-400 transition-colors"
          >
            <PhoneIcon className="w-4 h-4" />
            <span className="hidden sm:inline">{BUSINESS_INFO.phone}</span>
          </a>
        </div>
      </div>

      {/* ── MAIN NAVIGATION ── */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 border-t-4 border-amber-500 ${isScrolled
          ? 'bg-white shadow-lg shadow-navy-900/5 py-2'
          : 'bg-white py-3'
          } border-b border-navy-100`}
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
                <div className="font-display font-bold text-lg text-navy-900 tracking-tight">
                  JN ORNAMENTAL DESIGN
                </div>
                <div className="text-[10px] text-navy-400 font-semibold uppercase tracking-[0.2em]">
                  {BUSINESS_INFO.tagline}
                </div>
              </div>
            </Link>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-4 py-2 text-sm font-bold transition-colors group
                    ${isActive(link.path)
                      ? 'text-navy-900'
                      : 'text-navy-600 hover:text-navy-900'
                    }`}
                >
                  {link.name}
                  {/* Active indicator — Amber underline */}
                  <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-amber-500 transition-all duration-300
                    ${isActive(link.path) ? 'w-5' : 'w-0 group-hover:w-5'}`}></span>
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <Link
                to="/contact#quote"
                className="bg-amber-500 text-navy-950 px-6 py-2.5 font-bold text-sm rounded transition-all hover:bg-amber-400 hover:shadow-lg hover:shadow-amber-500/20 hover:-translate-y-0.5 active:translate-y-0"
              >
                Get Free Quote
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-navy-700 hover:bg-navy-50 rounded-md transition-colors"
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

        {/* ── MOBILE MENU ── */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="lg:hidden bg-white border-t border-navy-100 overflow-hidden"
            >
              <div className="container mx-auto px-4 py-4 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`block px-4 py-3 font-semibold rounded-lg transition-colors
                      ${isActive(link.path)
                        ? 'bg-amber-50 text-navy-900 border-l-4 border-amber-500'
                        : 'text-navy-600 hover:bg-navy-50 hover:text-navy-900'
                      }`}
                  >
                    {link.name}
                  </Link>
                ))}
                {/* Mobile phone link */}
                <a
                  href={`tel:${BUSINESS_INFO.phone}`}
                  className="flex items-center gap-3 px-4 py-3 text-navy-600 font-semibold hover:bg-navy-50 rounded-lg transition-colors"
                >
                  <PhoneIcon className="w-5 h-5 text-amber-500" />
                  {BUSINESS_INFO.phone}
                </a>
                <Link
                  to="/contact"
                  className="block mt-3 bg-amber-500 text-navy-950 px-4 py-3 font-bold text-center rounded-lg shadow-md active:scale-[0.98] transition-transform"
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
