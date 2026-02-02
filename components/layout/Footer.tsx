import React from 'react';
import { Link } from 'react-router-dom';
import { BUSINESS_INFO, SERVICE_CATEGORIES } from '../../constants';
import {
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
  ArrowRightIcon
} from '../Icons';
import logoSvg from '../../assets/jn_ornamental_logo_clean.svg';

const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-950 text-white relative">
      {/* Industrial Accent Line Top */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 max-w-7xl py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <img
                src={logoSvg}
                alt="JN Ornamental Design"
                className="h-10 w-auto object-contain brightness-0 invert opacity-90"
              />
              <div>
                <div className="font-display font-bold text-lg tracking-widest text-white">JN ORNAMENTAL</div>
                <div className="text-[10px] text-amber-500/80 uppercase tracking-[0.2em] font-bold">
                  {BUSINESS_INFO.tagline}
                </div>
              </div>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs border-l-2 border-amber-500/20 pl-4">
              Family-owned since 2003. Houston's trusted source for quality
              ironwork access control, and custom fabrication.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {['facebook', 'instagram', 'tiktok'].map((platform) => {
                const link = BUSINESS_INFO.socialLinks[platform as keyof typeof BUSINESS_INFO.socialLinks];
                if (!link) return null;
                const Icon = platform === 'facebook' ? FacebookIcon : platform === 'instagram' ? InstagramIcon : TikTokIcon;
                return (
                  <a
                    key={platform}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/5 border border-white/5 hover:border-amber-500/50 hover:bg-amber-500/10 hover:text-amber-500 text-white/60 rounded-sm flex items-center justify-center transition-all duration-300"
                    aria-label={platform}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-widest mb-8 text-white/90 flex items-center gap-3">
              <span className="w-8 h-px bg-amber-500"></span>
              Our Services
            </h4>
            <ul className="space-y-4">
              {SERVICE_CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    to={`/${cat.slug}`}
                    className="group flex items-center text-white/50 hover:text-amber-500 transition-colors text-sm tracking-wide"
                  >
                    <span className="w-1.5 h-1.5 bg-white/10 group-hover:bg-amber-500 rounded-sm mr-3 transition-colors"></span>
                    {cat.title}
                  </Link>
                </li>
              ))}
              <li className="pt-4">
                <Link
                  to="/contact"
                  className="group inline-flex items-center text-amber-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest border-b border-amber-500/30 hover:border-white/30 pb-1"
                >
                  Get a Free Quote
                  <ArrowRightIcon className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Areas */}
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-widest mb-8 text-white/90 flex items-center gap-3">
              <span className="w-8 h-px bg-amber-500"></span>
              Service Areas
            </h4>
            <ul className="grid grid-cols-1 gap-x-4 gap-y-3">
              {BUSINESS_INFO.serviceAreas.slice(0, 8).map((area) => (
                <li key={area} className="text-white/50 text-sm flex items-center gap-3">
                  <span className="w-1 h-1 bg-white/20 rotate-45"></span>
                  {area}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-widest mb-8 text-white/90 flex items-center gap-3">
              <span className="w-8 h-px bg-amber-500"></span>
              Contact Info
            </h4>
            <ul className="space-y-6">
              <li>
                <a
                  href={`tel:${BUSINESS_INFO.phone}`}
                  className="group block"
                >
                  <div className="flex items-center gap-4 mb-2">
                    <div className="p-2 bg-white/5 border border-white/5 group-hover:border-amber-500/30 transition-colors rounded-sm text-amber-500/80">
                      <PhoneIcon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-white/40 group-hover:text-amber-500 transition-colors">Phone</span>
                  </div>
                  <div className="pl-[52px] font-display text-lg text-white/90 group-hover:text-white transition-colors">
                    {BUSINESS_INFO.phone}
                  </div>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="group block"
                >
                  <div className="flex items-center gap-4 mb-2">
                    <div className="p-2 bg-white/5 border border-white/5 group-hover:border-amber-500/30 transition-colors rounded-sm text-amber-500/80">
                      <MailIcon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-white/40 group-hover:text-amber-500 transition-colors">Email</span>
                  </div>
                  <div className="pl-[52px] text-sm text-white/60 group-hover:text-white transition-colors break-all">
                    {BUSINESS_INFO.email}
                  </div>
                </a>
              </li>
              <li>
                <div className="group block">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="p-2 bg-white/5 border border-white/5 rounded-sm text-amber-500/80">
                      <MapPinIcon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-white/40">Location</span>
                  </div>
                  <div className="pl-[52px] text-sm text-white/60">
                    {BUSINESS_INFO.address}
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Extremely Subtle */}
      <div className="border-t border-white/5 bg-black/40">
        <div className="container mx-auto px-4 max-w-7xl py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-widest text-white/20 font-medium">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <p>
                &copy; {new Date().getFullYear()} {BUSINESS_INFO.name}
              </p>
              <span className="hidden md:inline text-white/5">|</span>
              <a
                href="https://quicklaunchweb.us"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-500/50 transition-colors"
              >
                Made by QuickLaunchWeb
              </a>
            </div>

            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-green-500/50"></span>
                Licensed & Insured
              </span>
              <Link to="/privacy" className="hover:text-white/40 transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-white/40 transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
