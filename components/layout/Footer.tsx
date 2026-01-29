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
} from '../Icons';
import logoSvg from '../../assets/jn_ornamental_logo_clean.svg';

const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-950 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 max-w-7xl py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img
                src={logoSvg}
                alt="JN Ornamental Design"
                className="h-10 w-auto object-contain brightness-0 invert"
              />
              <div>
                <div className="font-display font-bold">JN ORNAMENTAL DESIGN</div>
                <div className="text-xs text-white/50 uppercase tracking-wider">
                  {BUSINESS_INFO.tagline}
                </div>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Family-owned since 2003. Houston's trusted source for quality
              ironwork and custom metalwork.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {BUSINESS_INFO.socialLinks.facebook && (
                <a
                  href={BUSINESS_INFO.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-white/10 hover:bg-amber-500 flex items-center justify-center transition-colors"
                >
                  <FacebookIcon className="w-4 h-4" />
                </a>
              )}
              {BUSINESS_INFO.socialLinks.instagram && (
                <a
                  href={BUSINESS_INFO.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-white/10 hover:bg-amber-500 flex items-center justify-center transition-colors"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
              )}
              {BUSINESS_INFO.socialLinks.tiktok && (
                <a
                  href={BUSINESS_INFO.socialLinks.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-white/10 hover:bg-amber-500 flex items-center justify-center transition-colors"
                >
                  <TikTokIcon className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {SERVICE_CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    to={`/${cat.slug}`}
                    className="text-white/60 hover:text-amber-500 transition-colors text-sm"
                  >
                    {cat.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/contact"
                  className="text-white/60 hover:text-amber-500 transition-colors text-sm"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Areas */}
          <div>
            <h4 className="font-display font-bold mb-6">Service Areas</h4>
            <ul className="space-y-3">
              {BUSINESS_INFO.serviceAreas.map((area) => (
                <li key={area} className="text-white/60 text-sm">
                  {area}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold mb-6">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={`tel:${BUSINESS_INFO.phone}`}
                  className="flex items-center gap-3 text-white/60 hover:text-amber-500 transition-colors"
                >
                  <PhoneIcon className="w-4 h-4 text-amber-500" />
                  <span className="text-sm">{BUSINESS_INFO.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="flex items-center gap-3 text-white/60 hover:text-amber-500 transition-colors"
                >
                  <MailIcon className="w-4 h-4 text-amber-500" />
                  <span className="text-sm break-all">{BUSINESS_INFO.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/60">
                <MapPinIcon className="w-4 h-4 text-amber-500 mt-0.5" />
                <span className="text-sm">{BUSINESS_INFO.address}</span>
              </li>
            </ul>

            {/* Credentials */}
            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="flex flex-wrap gap-2">
                {BUSINESS_INFO.credentials.map((cred) => (
                  <span
                    key={cred}
                    className="text-xs text-white/40 border border-white/20 px-2 py-1"
                  >
                    {cred}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 max-w-7xl py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/40">
            <p>
              &copy; {new Date().getFullYear()} {BUSINESS_INFO.name}
            </p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
