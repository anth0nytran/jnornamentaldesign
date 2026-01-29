import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
      {/* Top Bar */}
      <div className="bg-navy-950 text-white py-2 text-sm">
        <div className="container mx-auto px-4 max-w-7xl flex justify-between items-center">
          <div className="flex items-center gap-4 text-white/70">
            <div className="flex items-center gap-2">
              <GoogleIcon className="w-4 h-4" />
              <div className="flex text-yellow-400">
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
      <nav className={`sticky top-0 z-50 transition-all duration-200 ${isScrolled ? 'bg-white shadow-md' : 'bg-white'
        }`}>
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <img
                src={logoSvg}
                alt="JN Ornamental Design"
                className="h-10 w-auto object-contain"
              />
              <div className="leading-tight hidden sm:block">
                <div className="font-display font-bold text-lg text-navy-950">
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
                  className={`px-4 py-2 text-sm font-semibold transition-colors ${isActive(link.path)
                    ? 'text-amber-600'
                    : 'text-navy-700 hover:text-amber-600'
                    }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <Link
                to="/contact"
                className="bg-amber-500 hover:bg-amber-600 text-navy-950 px-6 py-2.5 font-bold text-sm transition-colors"
              >
                Get Free Quote
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-navy-700"
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
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-navy-100 bg-white">
            <div className="container mx-auto px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-4 py-3 font-semibold transition-colors ${isActive(link.path)
                    ? 'bg-amber-500 text-navy-950'
                    : 'text-navy-700 hover:bg-navy-50'
                    }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/contact"
                className="block mt-4 bg-amber-500 text-navy-950 px-4 py-3 font-bold text-center"
              >
                Get Free Quote
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Header;
