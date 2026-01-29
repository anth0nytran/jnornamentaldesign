import React from 'react';
import { BUSINESS_INFO, SERVICE_CATEGORIES } from '../constants';
import ContactForm from '../components/ContactForm';
import {
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  ClockIcon,
  CheckCircleIcon,
} from '../components/Icons';

const Contact: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="py-20 bg-navy-950">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-amber-500 font-bold uppercase tracking-widest text-sm mb-4">
              Contact
            </p>
            <h1 className="font-display text-5xl md:text-6xl font-black text-white mb-6">
              Let's Talk About
              <br />
              <span className="text-amber-500">Your Project</span>
            </h1>
            <p className="text-xl text-white/60">
              Get a free, no-obligation quote. We respond within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-8">
              {/* Contact Card */}
              <div className="bg-navy-950 text-white p-8">
                <h3 className="font-display text-xl font-bold mb-6">Get In Touch</h3>

                <div className="space-y-6">
                  <a
                    href={`tel:${BUSINESS_INFO.phone}`}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-10 h-10 bg-amber-500 flex items-center justify-center flex-shrink-0">
                      <PhoneIcon className="w-5 h-5 text-navy-950" />
                    </div>
                    <div>
                      <div className="text-white/50 text-xs mb-1">Call or Text</div>
                      <div className="font-bold group-hover:text-amber-500 transition-colors">
                        {BUSINESS_INFO.phone}
                      </div>
                    </div>
                  </a>

                  <a
                    href={`mailto:${BUSINESS_INFO.email}`}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-10 h-10 bg-white/10 flex items-center justify-center flex-shrink-0">
                      <MailIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-white/50 text-xs mb-1">Email</div>
                      <div className="text-sm group-hover:text-amber-500 transition-colors break-all">
                        {BUSINESS_INFO.email}
                      </div>
                    </div>
                  </a>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white/10 flex items-center justify-center flex-shrink-0">
                      <MapPinIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-white/50 text-xs mb-1">Location</div>
                      <div className="text-sm">{BUSINESS_INFO.address}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white/10 flex items-center justify-center flex-shrink-0">
                      <ClockIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-white/50 text-xs mb-1">Hours</div>
                      <div className="text-sm">
                        Mon-Fri: 8am-6pm
                        <br />
                        Sat: 9am-4pm
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <p className="text-amber-500 font-semibold text-sm">{'Hablamos Espa\u00f1ol'}</p>
                </div>
              </div>

              {/* Service Areas */}
              <div className="bg-slate-100 p-6">
                <h4 className="font-display font-bold text-navy-950 mb-4">
                  Service Areas
                </h4>
                <div className="flex flex-wrap gap-2">
                  {BUSINESS_INFO.serviceAreas.map((area) => (
                    <span
                      key={area}
                      className="text-sm text-navy-600 bg-white px-3 py-1 border border-navy-200"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              {/* What to Expect */}
              <div className="bg-amber-50 p-6 border-l-4 border-amber-500">
                <h4 className="font-display font-bold text-navy-950 mb-4">
                  What to Expect
                </h4>
                <div className="space-y-3">
                  {[
                    'Response within 24 hours',
                    'Free on-site estimates',
                    'No pressure, no obligation',
                    'Detailed written quotes',
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircleIcon className="w-4 h-4 text-amber-600 flex-shrink-0" />
                      <span className="text-navy-700 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-navy-100 p-8 md:p-10">
                <div className="mb-8">
                  <h2 className="font-display text-2xl font-bold text-navy-950 mb-2">
                    Request Your Free Quote
                  </h2>
                  <p className="text-navy-600">
                    Tell us about your project and we'll get back to you with an estimate!
                  </p>
                </div>

                <ContactForm title="Request Your Free Quote" subtitle="Tell us about your project and we'll get back to you with a detailed estimate." />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
