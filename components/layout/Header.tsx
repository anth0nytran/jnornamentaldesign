import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { BUSINESS_INFO, SERVICE_CATEGORIES } from '../../constants';
import { PhoneIcon, MenuIcon, CloseIcon, StarIcon, GoogleIcon, ArrowRightIcon } from '../Icons';
import logoSvg from '../../assets/jn_ornamental_logo_clean.svg';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showBottomCTA, setShowBottomCTA] = useState(true);
  const lastScrollY = useRef(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 20);

      // Hide bottom CTA on scroll down, show on scroll up
      if (currentY > lastScrollY.current && currentY > 100) {
        setShowBottomCTA(false);
      } else {
        setShowBottomCTA(true);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    ...SERVICE_CATEGORIES.map(cat => ({ name: cat.title, path: `/${cat.slug}` })),
    { name: 'Gallery', path: '/gallery' },
    { name: 'Careers', path: '/careers' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* ── ANNOUNCEMENT BAR ── */}
      <div className={`bg-amber-500 text-black transition-all duration-300 ${isScrolled ? 'h-0 py-0 overflow-hidden opacity-0' : 'py-2 opacity-100'}`}>
        <div className="container mx-auto px-4 max-w-7xl flex justify-between items-center">
          {/* Left: Trust signals */}
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <GoogleIcon className="w-4 h-4 text-black/70" />
              <div className="flex text-black">
                {[...Array(5)].map((_, i) => (
                  <span key={i}><StarIcon className="w-3 h-3" filled /></span>
                ))}
              </div>
              <span className="font-display font-bold text-black">{BUSINESS_INFO.rating}</span>
            </div>
            <span className="hidden md:inline text-black/30">|</span>
            <span className="hidden md:inline text-black/70 text-xs font-display font-bold uppercase tracking-widest">BBB Accredited</span>
            <span className="hidden lg:inline text-black/30">|</span>
            <span className="hidden lg:inline text-black/70 text-xs font-display font-bold uppercase tracking-widest">{'Hablamos Espa\u00f1ol'}</span>
          </div>
          {/* Right: Phone */}
          <a
            href={`tel:${BUSINESS_INFO.phone}`}
            className="flex items-center gap-2 text-sm font-display font-bold text-black hover:text-black/70 transition-colors"
          >
            <PhoneIcon className="w-4 h-4" />
            <span className="hidden sm:inline">{BUSINESS_INFO.phone}</span>
          </a>
        </div>
      </div>

      {/* ── MAIN NAVIGATION ── */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-iron-900 shadow-lg shadow-black/30 py-2'
          : 'bg-iron-900 py-3'
          } border-b border-white/10`}
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex justify-between items-center">

            {/* Logo — always visible with name */}
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src={logoSvg}
                alt="JN Ornamental Design"
                className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <div className="leading-tight">
                <div className="font-display font-bold text-sm sm:text-lg text-white tracking-tight">
                  JN ORNAMENTAL
                </div>
                <div className="text-[9px] sm:text-[10px] text-amber-500 font-display font-bold uppercase tracking-[0.2em]">
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
                  className={`relative px-4 py-2 text-sm font-display font-bold uppercase tracking-wider transition-colors group
                    ${isActive(link.path)
                      ? 'text-amber-500'
                      : 'text-white/70 hover:text-white'
                    }`}
                >
                  {link.name}
                  {/* Active indicator — Amber underline */}
                  <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-amber-500 transition-all duration-300
                    ${isActive(link.path) ? 'w-5' : 'w-0 group-hover:w-5'}`}></span>
                </Link>
              ))}
            </div>

            {/* CTA Button (Desktop) */}
            <div className="hidden lg:block">
              <Link
                to="/contact#quote"
                className="bg-amber-500 text-black px-6 py-2.5 font-display font-bold text-sm uppercase tracking-widest rounded transition-all hover:bg-amber-400 hover:shadow-lg hover:shadow-amber-500/20 hover:-translate-y-0.5 active:translate-y-0"
              >
                Get Free Quote
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-white hover:bg-white/10 rounded-md transition-colors"
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
              className="lg:hidden bg-iron-900 border-t border-white/10 overflow-hidden"
            >
              <div className="container mx-auto px-4 py-4 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`block px-4 py-3 font-display font-bold text-sm uppercase tracking-wider rounded transition-colors
                      ${isActive(link.path)
                        ? 'bg-amber-500/10 text-amber-500 border-l-4 border-amber-500'
                        : 'text-white/70 hover:bg-white/5 hover:text-white'
                      }`}
                  >
                    {link.name}
                  </Link>
                ))}

                {/* Divider */}
                <div className="border-t border-white/10 my-3"></div>

                {/* Trust badges row */}
                <div className="flex items-center gap-4 px-4 py-2">
                  <div className="flex items-center gap-2">
                    <GoogleIcon className="w-4 h-4" />
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <span key={i}><StarIcon className="w-3 h-3" filled /></span>
                      ))}
                    </div>
                    <span className="text-white font-display font-bold text-sm">{BUSINESS_INFO.rating}</span>
                  </div>
                  <span className="text-white/20">|</span>
                  <span className="text-white/50 text-xs font-display font-bold uppercase tracking-wider">BBB A+</span>
                </div>

                {/* Mobile phone link */}
                <a
                  href={`tel:${BUSINESS_INFO.phone}`}
                  className="flex items-center gap-3 px-4 py-3 text-amber-400 font-display font-bold uppercase tracking-wider text-sm hover:bg-white/5 rounded transition-colors"
                >
                  <PhoneIcon className="w-5 h-5" />
                  {BUSINESS_INFO.phone}
                </a>

                {/* CTA */}
                <Link
                  to="/contact"
                  className="block mt-2 bg-amber-500 text-black px-4 py-3.5 font-display font-bold text-sm uppercase tracking-widest text-center rounded shadow-lg shadow-amber-500/20 active:scale-[0.98] transition-transform"
                >
                  Get Free Quote
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── STICKY BOTTOM CTA (Mobile only) ── */}
      <div
        className={`lg:hidden fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ${showBottomCTA ? 'translate-y-0' : 'translate-y-full'
          }`}
      >
        <div className="bg-iron-900/95 backdrop-blur-md border-t border-white/10 px-4 py-3 safe-area-inset-bottom">
          <div className="flex gap-3 max-w-lg mx-auto">
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="flex-1 flex items-center justify-center gap-2 bg-white/10 text-white font-display font-bold text-xs uppercase tracking-widest py-3 rounded border border-white/20 active:scale-[0.98] transition-all"
            >
              <PhoneIcon className="w-4 h-4 text-amber-400" />
              Call Now
            </a>
            <Link
              to="/contact"
              className="flex-1 flex items-center justify-center gap-2 bg-amber-500 text-black font-display font-bold text-xs uppercase tracking-widest py-3 rounded active:scale-[0.98] transition-all"
            >
              Free Quote
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
