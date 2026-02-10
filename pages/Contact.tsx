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
  ArrowRightIcon,
} from '../components/Icons';
import SEOHead from '../components/SEOHead';

const Contact: React.FC = () => {
  return (
    <div className="bg-white font-body selection:bg-amber-500 selection:text-black">
      <SEOHead
        title="Contact JN Ornamental Design | Free Estimate | Houston TX"
        description="Get a free estimate for custom iron fences, gates, railings & access control in Houston. Call (346) 302-3770 or fill out our form. Family-owned since 2016."
        canonical="https://jnornamentaldesign.com/contact"
        keywords="free fence estimate houston, contact jn ornamental, gate quote houston tx, railing estimate near me, fence contractor phone number houston"
      />
      {/* Hero */}
      <section className="relative py-24 bg-iron-900 overflow-hidden">
        {/* Industrial diagonal pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.03) 20px, rgba(255,255,255,0.03) 21px)`
        }}></div>

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-3 bg-amber-500 px-5 py-2 mb-6">
              <span className="text-sm font-display font-bold text-black tracking-widest uppercase">
                Contact Us
              </span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6 leading-tight uppercase">
              Get a Free Fence &amp; Gate{' '}
              <span className="text-amber-500">Estimate in Houston</span>
            </h1>
            <p className="text-xl text-gray-300 font-body font-light leading-relaxed normal-case">
              Get a free, no-obligation quote. We usually respond within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 lg:py-28 bg-iron-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">

            {/* Contact Info Sidebar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-4 space-y-8"
            >
              {/* Contact Card */}
              <div className="bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
                <div className="bg-iron-900 p-8 text-white relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-amber-500"></div>
                  <h3 className="font-display text-2xl font-bold mb-2 relative z-10 uppercase">Get in Touch</h3>
                  <p className="text-gray-400 text-sm relative z-10 font-body normal-case">We'd love to hear from you.</p>
                </div>

                <div className="p-8 space-y-8">
                  <a href={`tel:${BUSINESS_INFO.phone}`} className="flex items-start gap-5 group">
                    <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-md flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500 group-hover:text-black transition-all duration-300">
                      <PhoneIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs uppercase tracking-wider font-display font-bold mb-1">Call or Text</div>
                      <div className="font-display font-bold text-iron-900 text-lg group-hover:text-amber-500 transition-colors">
                        {BUSINESS_INFO.phone}
                      </div>
                    </div>
                  </a>

                  <a href={`mailto:${BUSINESS_INFO.email}`} className="flex items-start gap-5 group">
                    <div className="w-12 h-12 bg-iron-900/10 text-iron-900 rounded-md flex items-center justify-center flex-shrink-0 group-hover:bg-iron-900 group-hover:text-amber-500 transition-all duration-300">
                      <MailIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs uppercase tracking-wider font-display font-bold mb-1">Email</div>
                      <div className="font-display font-bold text-iron-900 text-lg group-hover:text-amber-500 transition-colors break-all">
                        {BUSINESS_INFO.email}
                      </div>
                    </div>
                  </a>

                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 bg-gray-100 text-gray-600 rounded-md flex items-center justify-center flex-shrink-0">
                      <MapPinIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs uppercase tracking-wider font-display font-bold mb-1">Location</div>
                      <div className="font-medium text-iron-900 font-body normal-case">{BUSINESS_INFO.address}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 bg-gray-100 text-gray-600 rounded-md flex items-center justify-center flex-shrink-0">
                      <ClockIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs uppercase tracking-wider font-display font-bold mb-1">Hours</div>
                      <div className="font-medium text-iron-900 text-sm leading-relaxed font-body normal-case">
                        <span className="block">Mon-Fri: 8am - 6pm</span>
                        <span className="block">Sat: 9am - 4pm</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-iron-900 p-4 text-center">
                  <p className="text-white font-display font-bold text-sm flex items-center justify-center gap-2">
                    <span className="w-2 h-2 bg-green-500 animate-pulse"></span>
                    HABLAMOS ESPAÑOL
                  </p>
                </div>
              </div>

              {/* Service Areas */}
              <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
                <h4 className="font-display font-bold text-iron-900 mb-6 flex items-center gap-3 uppercase">
                  <MapPinIcon className="w-5 h-5 text-amber-500" />
                  Service Areas
                </h4>
                <div className="flex flex-wrap gap-2">
                  {BUSINESS_INFO.serviceAreas.map((area) => (
                    <span
                      key={area}
                      className="text-sm font-medium text-gray-600 bg-iron-50 px-3 py-1.5 rounded-md border border-gray-200 hover:border-amber-500 hover:text-iron-900 transition-colors cursor-default font-body normal-case"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Form Side */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="lg:col-span-8"
            >
              <div id="quote" className="bg-white rounded-lg shadow-2xl shadow-black/10 border border-gray-200 p-8 md:p-12 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-amber-500"></div>

                <div className="mb-10">
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-iron-900 mb-4 uppercase">
                    Request Your Free Quote
                  </h2>
                  <p className="text-lg text-gray-600 font-body normal-case">
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
                    <div key={i} className="flex items-center gap-2 text-sm font-medium text-gray-600 bg-iron-50 px-4 py-2 rounded-md font-body normal-case">
                      <CheckCircleIcon className="w-4 h-4 text-amber-500" />
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

      {/* Google Maps & GBP Section */}
      <section className="py-16 bg-iron-900">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Map Embed */}
            <div className="rounded-lg overflow-hidden shadow-2xl border border-gray-700">
              <iframe
                src="https://www.google.com/maps?q=410+A+Northville+St,+Houston,+TX+77037&output=embed"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="JN Ornamental Design - Houston TX Location"
              ></iframe>
            </div>
            {/* GBP Info */}
            <div>
              <span className="text-amber-500 font-display font-bold uppercase tracking-widest text-xs mb-3 block">Find Us</span>
              <h2 className="font-display text-3xl font-bold text-white mb-6 uppercase">Visit Our Houston Workshop</h2>
              <p className="text-gray-300 font-body normal-case leading-relaxed mb-6">
                Our fabrication shop is located at 410 A Northville St, Houston, TX 77037. Stop by to see our work in person, discuss your project, or pick up materials. We welcome walk-ins during business hours.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-gray-300">
                  <MapPinIcon className="w-5 h-5 text-amber-500 flex-shrink-0" />
                  <span className="font-body normal-case">410 A Northville St, Houston, TX 77037</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <ClockIcon className="w-5 h-5 text-amber-500 flex-shrink-0" />
                  <span className="font-body normal-case">Mon-Fri: 8am - 6pm &bull; Sat: 9am - 4pm</span>
                </div>
              </div>
              <a
                href="https://share.google/WkPKxf6mf824qJ5bg"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-3 text-base"
              >
                View on Google
                <ArrowRightIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Contact;
