import React from 'react';
import { motion } from 'framer-motion';
import { BUSINESS_INFO } from '../constants';
import ContactForm from '../components/ContactForm';
import {
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  ClockIcon,
  CheckCircleIcon,
  StarIcon,
} from '../components/Icons';

const Contact: React.FC = () => {
  return (
    <div className="bg-white font-sans selection:bg-amber-100 selection:text-navy-900">
      {/* Hero */}
      <section className="relative py-24 bg-navy-950 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-amber-500 font-bold uppercase tracking-widest text-sm mb-4 block">
              Contact Us
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Let's Build Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                Vision
              </span>
            </h1>
            <p className="text-xl text-slate-300 font-light leading-relaxed">
              Get a free, no-obligation quote. We usually respond within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 lg:py-28 bg-slate-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">

            {/* Contact Info Sidebar - Static/Subtle Fade */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-4 space-y-8"
            >
              {/* Contact Card */}
              <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
                <div className="bg-navy-950 p-8 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/20 rounded-full blur-2xl -mr-10 -mt-10"></div>
                  <h3 className="font-display text-2xl font-bold mb-2 relative z-10">Get In Touch</h3>
                  <p className="text-slate-400 text-sm relative z-10">We'd love to hear from you.</p>
                </div>

                <div className="p-8 space-y-8">
                  <a
                    href={`tel:${BUSINESS_INFO.phone}`}
                    className="flex items-start gap-5 group"
                  >
                    <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300">
                      <PhoneIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-slate-400 text-xs uppercase tracking-wider font-bold mb-1">Call or Text</div>
                      <div className="font-display font-bold text-navy-900 text-lg group-hover:text-amber-600 transition-colors">
                        {BUSINESS_INFO.phone}
                      </div>
                    </div>
                  </a>

                  <a
                    href={`mailto:${BUSINESS_INFO.email}`}
                    className="flex items-start gap-5 group"
                  >
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                      <MailIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-slate-400 text-xs uppercase tracking-wider font-bold mb-1">Email</div>
                      <div className="font-display font-bold text-navy-900 text-lg group-hover:text-blue-600 transition-colors break-all">
                        {BUSINESS_INFO.email}
                      </div>
                    </div>
                  </a>

                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPinIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-slate-400 text-xs uppercase tracking-wider font-bold mb-1">Location</div>
                      <div className="font-medium text-navy-900">
                        {BUSINESS_INFO.address}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <ClockIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-slate-400 text-xs uppercase tracking-wider font-bold mb-1">Hours</div>
                      <div className="font-medium text-navy-900 text-sm leading-relaxed">
                        <span className="block">Mon-Fri: 8am - 6pm</span>
                        <span className="block">Sat: 9am - 4pm</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 text-center border-t border-slate-100">
                  <p className="text-navy-900 font-bold text-sm flex items-center justify-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    Hablamos Español
                  </p>
                </div>
              </div>

              {/* Service Areas */}
              <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-8">
                <h4 className="font-display font-bold text-navy-900 mb-6 flex items-center gap-3">
                  <MapPinIcon className="w-5 h-5 text-amber-500" />
                  Service Areas
                </h4>
                <div className="flex flex-wrap gap-2">
                  {BUSINESS_INFO.serviceAreas.map((area) => (
                    <span
                      key={area}
                      className="text-sm font-medium text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-amber-400 hover:text-navy-900 transition-colors cursor-default"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Form Side - Static/Subtle Fade */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="lg:col-span-8"
            >
              <div className="bg-white rounded-3xl shadow-2xl shadow-navy-900/10 border border-slate-100 p-8 md:p-12 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-amber-500 via-navy-500 to-amber-500"></div>

                <div className="mb-10">
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-950 mb-4">
                    Request Your Free Quote
                  </h2>
                  <p className="text-lg text-slate-600">
                    Tell us about your project. We'll review your details and get back to you with a preliminary estimate or schedule a site visit.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-10">
                  {[
                    'No pressure, no obligation',
                    'Written estimates',
                    'Fast response times',
                    'Privacy guaranteed'
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm font-medium text-slate-600 bg-slate-50 px-4 py-2 rounded-lg">
                      <CheckCircleIcon className="w-4 h-4 text-green-500" />
                      {item}
                    </div>
                  ))}
                </div>

                <ContactForm />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default Contact;
