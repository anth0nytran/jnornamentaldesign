import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BUSINESS_INFO, SERVICE_CATEGORIES, REVIEWS, FEATURED_PROJECTS } from '../constants';
import ContactForm from '../components/ContactForm';
import heroBackground from '../assets/hero-luxury-gate-v2.png';
import artisanWelder from '../assets/artisan-welder.png';
import step1Background from '../assets/steps.png';
import reviewsLuxuryBg from '../assets/reviews-luxury.png';
import {
  StarIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  GoogleIcon,
  ServiceIcons,
} from '../components/Icons';

// ... (rest of imports)

// ...




// Scrolling review snippets
const REVIEW_SNIPPETS = [
  'Excellent service and top quality! - Crystal F.',
  'Professional, custom design in 10 days - Ross K.',
  'Good people, good quote, choose JN! - Norvil S.',
  'Punctual, professional, excellent communication - Gina T.',
  'Outstanding craftsmanship - Marcus J.',
  'On time, excellent work, fair pricing - Gene G.',
];

const PROCESS_STEPS = [
  {
    title: 'Consultation',
    copy: 'We listen first. We walk your property, discuss your vision, and provide expert recommendations based on 20+ years of experience.',
    icon: '1'
  },
  {
    title: 'Design & Measure',
    copy: 'Precise measurements and clear design plans ensuring you know exactly what will be built before we cut a single piece of metal.',
    icon: '2'
  },
  {
    title: 'Fabrication',
    copy: 'Crafted in our local Houston workshop using premium steel and high-quality welds, not pre-fabricated panels from a box.',
    icon: '3'
  },
  {
    title: 'Installation',
    copy: 'Professional installation by our own crew (no subcontractors), leaving your property clean and your new addition secure.',
    icon: '4'
  },
];

const Home: React.FC = () => {
  return (
    <div className="bg-white font-sans selection:bg-amber-100 selection:text-navy-900 overflow-x-hidden">

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-black overflow-hidden">
        {/* Background - Static for sleekness */}
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full">
            <img
              src={heroBackground}
              alt="Industrial metalwork and custom fencing"
              className="w-full h-full object-cover opacity-80"
            />
          </div>
          {/* Lighter, clearer gradient: High contrast for text, clear for image */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent"></div>
        </div>

        <div className="container mx-auto px-6 max-w-7xl relative z-10 pt-20 pb-12">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">

            {/* Left Column: Copy */}
            <div className="lg:col-span-7 flex flex-col items-start pt-10 lg:pt-0">
              {/* Fade in wrapper for content */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-4 py-1.5 mb-8">
                  <div className="flex -space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center border border-navy-950">
                        <StarIcon className="w-2.5 h-2.5 text-navy-950" filled />
                      </div>
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-white tracking-wide border-l border-white/10 pl-2 ml-1">
                    Top Rated in Houston
                  </span>
                </div>

                <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95] tracking-tight mb-6 drop-shadow-xl">
                  Iron <span className="text-amber-500">Security.</span> <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-400">
                    Custom Style.
                  </span>
                </h1>

                <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-xl mb-10 font-light drop-shadow-md">
                  Houston's premier fabricator of custom gates, fences, and railings.
                  We blend heavy-duty security with architectural beauty.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-6 md:gap-12 border-t border-white/10 pt-8 w-full max-w-lg">
                  <div>
                    <div className="text-3xl font-display font-bold text-white mb-1">20+</div>
                    <div className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Years Exp.</div>
                  </div>
                  <div>
                    <div className="text-3xl font-display font-bold text-white mb-1">A+</div>
                    <div className="text-xs text-slate-400 uppercase tracking-widest font-semibold">BBB Rating</div>
                  </div>
                  <div>
                    <div className="text-3xl font-display font-bold text-white mb-1">Top</div>
                    <div className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Pro Status</div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Form */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 w-full"
            >
              <div className="bg-white rounded-2xl shadow-2xl shadow-black/50 p-6 md:p-8 relative overflow-hidden group hover:shadow-amber-900/20 transition-shadow">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-amber-500 to-amber-300"></div>

                <div className="mb-6">
                  <h3 className="font-display text-2xl font-bold text-navy-950 mb-2">
                    Get a Free Estimate
                  </h3>
                  <p className="text-slate-500 text-sm">
                    Tell us about your project. We usually reply within 24 hours.
                  </p>
                </div>

                <ContactForm variant="hero" />

                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
                  <CheckCircleIcon className="w-3 h-3 text-green-500" />
                  Your information is kept private
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Ticker Banner - polished animation and glass effect, blue background */}
      <div className="bg-navy-900/95 backdrop-blur-md border-b border-navy-800 py-3 overflow-hidden relative z-20">
        <div className="flex animate-scroll w-max hover:pause-animation">
          {[...REVIEW_SNIPPETS, ...REVIEW_SNIPPETS].map((snippet, idx) => (
            <div key={idx} className="flex items-center mx-8 opacity-80 hover:opacity-100 transition-opacity">
              <div className="flex text-amber-500 mr-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i}><StarIcon className="w-3 h-3" filled /></span>
                ))}
              </div>
              <span className="text-sm font-medium text-slate-300 italic tracking-wide">
                "{snippet}"
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Services Section - Logic & Options (Light + Grid) */}
      <section className="py-24 bg-white relative z-10 transition-colors duration-500">
        {/* Engineering Grid Pattern - Subtle Technical Feel */}
        <div className="absolute inset-0 z-0 opacity-[0.4]"
          style={{
            backgroundImage: `radial-gradient(#cbd5e1 1px, transparent 1px)`,
            backgroundSize: '32px 32px'
          }}>
        </div>

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="text-amber-600 font-bold uppercase tracking-widest text-xs mb-3 block">
                Our Expertise
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-navy-950 mb-6">
                Architectural Metalwork
              </h2>
              <div className="h-1 w-20 bg-amber-500 mb-6"></div>
              <p className="text-slate-600 text-lg leading-relaxed">
                We design and fabricate custom solutions that optimize security without compromising design.
                Every piece is hand-finished in our Houston workshop.
              </p>
            </div>
            <Link to="/contact" className="hidden md:inline-flex items-center gap-3 text-navy-900 font-bold hover:text-amber-600 transition-colors group text-lg">
              View All Services
              <div className="w-8 h-8 rounded-full border border-current flex items-center justify-center group-hover:bg-amber-600 group-hover:border-amber-600 group-hover:text-white transition-all">
                <ArrowRightIcon className="w-4 h-4" />
              </div>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVICE_CATEGORIES.map((category, idx) => {
              const Icon = ServiceIcons[category.services[0]?.icon] || ServiceIcons.fence;

              return (
                <div key={category.slug}>
                  <Link
                    to={`/${category.slug}`}
                    className="group relative h-full flex flex-col bg-white border border-slate-200 overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-xl hover:border-amber-500/50 transition-all duration-300"
                  >
                    <div className="h-64 overflow-hidden relative">
                      <img
                        src={category.heroImage}
                        alt={category.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-navy-950/0 group-hover:bg-navy-950/10 transition-colors"></div>
                    </div>

                    <div className="p-8 flex flex-col flex-grow">
                      <div className="w-12 h-12 bg-navy-50 text-navy-900 rounded-lg flex items-center justify-center mb-6 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300">
                        <Icon className="w-6 h-6" />
                      </div>

                      <h3 className="font-display text-2xl font-bold text-navy-950 mb-3 group-hover:text-amber-600 transition-colors">
                        {category.title}
                      </h3>

                      <p className="text-slate-600 text-sm mb-6 line-clamp-3 leading-relaxed">
                        {category.description}
                      </p>

                      <div className="mt-auto flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-navy-900 group-hover:text-amber-600 transition-colors">
                        Learn More
                        <ArrowRightIcon className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About / Values Section - Trust & Authority (Deep Navy) */}
      <section className="py-24 bg-navy-950 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left: Text */}
            <div className="order-2 lg:order-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-px bg-amber-500"></div>
                <span className="text-amber-500 font-bold uppercase tracking-widest text-sm">
                  The JN Difference
                </span>
              </div>

              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Family Values. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                  Built on Trust.
                </span>
              </h2>

              <p className="text-slate-300 text-lg leading-relaxed mb-8 font-light">
                Since 2003, JN Ornamental Design has been more than just a welding shop. We are a family
                business dedicated to the safety and beauty of Houston homes. We treat every project—whether
                it's a simple repair or a grand estate gate—with the same level of care and precision.
              </p>

              <div className="space-y-4">
                {[
                  { title: 'Honest Pricing', desc: 'No hidden fees or surprise upcharges. We price fair from the start.' },
                  { title: 'Local Craftsmanship', desc: 'Fabricated right here in Houston by skilled artisans.' },
                  { title: 'Direct Communication', desc: 'You speak directly with the team doing the work.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-300">
                    <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-500 flex items-center justify-center flex-shrink-0 border border-amber-500/30">
                      <CheckCircleIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base mb-1">{item.title}</h4>
                      <p className="text-slate-400 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Authentic Welder Image */}
            <div className="relative order-1 lg:order-2">
              <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-2xl border border-white/10 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 to-transparent z-10"></div>
                <img
                  src={artisanWelder}
                  alt="Skilled welder working on custom gate"
                  className="w-full h-full object-cover opacity-90"
                />
              </div>

              {/* Trust Badge - Inverted for Dark Theme */}
              <div className="absolute -bottom-8 -left-8 bg-white text-navy-950 p-6 rounded-lg shadow-xl max-w-[200px] z-20 border-l-4 border-amber-500">
                <div className="text-3xl font-display font-bold text-navy-900 mb-1">20+</div>
                <div className="text-sm font-semibold leading-tight text-slate-600">Years of Excellence in Houston</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section - Technical Clean Style (White) */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-left max-w-3xl mb-16">
            <span className="text-amber-600 font-bold uppercase tracking-widest text-sm mb-2 block">How It Works</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-navy-950 mb-6">Simple, Transparent Process</h2>
            <p className="text-slate-600 text-lg">
              We've refined our workflow over 20 years to ensure every project runs smoothly from consultation to cleanup.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Horizontal Line connector (Desktop only) */}
            <div className="hidden lg:block absolute top-8 left-16 right-16 h-px bg-slate-200 z-0"></div>

            {PROCESS_STEPS.map((step, idx) => (
              <div key={idx} className="relative z-10 group bg-white p-6 rounded-lg border border-slate-200 shadow-sm hover:shadow-md hover:border-amber-500/50 transition-all">
                <div className="w-16 h-16 bg-navy-50 border border-navy-100 rounded-lg flex items-center justify-center text-navy-900 font-display font-bold text-2xl mb-6 group-hover:bg-amber-500 group-hover:text-white transition-colors shadow-sm">
                  {step.icon}
                </div>

                <h3 className="font-display text-xl font-bold text-navy-950 mb-3">{step.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{step.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Highlight */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-navy-950">Project Showcase</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {FEATURED_PROJECTS.slice(0, 4).map((project, idx) => (
              <div key={idx} className="group relative overflow-hidden rounded-2xl bg-gray-200 shadow-md hover:shadow-2xl transition-all duration-500 aspect-[4/3]">
                <img src={project.src} alt={project.alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 p-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-2 block">{project.category}</span>
                  <h3 className="text-white font-display text-2xl font-bold">{project.alt}</h3>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
              View Full Portfolio <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews Section - Authentic Official (Dark Luxury) */}
      {/* Reviews Section - Authentic Official (Dark Luxury) */}
      <section className="py-24 relative overflow-hidden">
        {/* Background Image with Heavy Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={reviewsLuxuryBg}
            alt="Luxury home with custom iron fence at sunset"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-navy-950/90 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between mb-16">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-xs font-bold uppercase tracking-widest text-white">
                  <CheckCircleIcon className="w-3 h-3 text-amber-500" />
                  Verified Business
                </div>
              </div>
              <h2 className="font-display text-4xl font-bold text-white mb-3">What Our Neighbors Say</h2>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => <StarIcon key={i} className="w-4 h-4" filled />)}
                  </div>
                  <span className="font-bold text-white ml-2">5.0</span>
                </div>
                <span className="text-slate-400 text-sm">Based on 40+ Verified Reviews</span>
              </div>
            </div>

            <a
              href="https://www.google.com/maps"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 md:mt-0 group flex items-center gap-3 bg-white text-navy-950 px-6 py-3 rounded-lg font-bold transition-all shadow-lg hover:shadow-amber-500/20 hover:scale-105"
            >
              <div className="w-6 h-6 flex items-center justify-center">
                <GoogleIcon className="w-5 h-5" />
              </div>
              Read Google Reviews
              <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform text-amber-600" />
            </a>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REVIEWS.map((review, idx) => (
              <div key={idx} className="bg-white rounded-xl p-8 shadow-xl relative overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
                {/* Clean Industrial Accent - Amber Brand Color */}
                <div className="absolute top-0 left-0 w-full h-1 bg-amber-500"></div>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex gap-1 text-amber-500">
                    {[...Array(review.stars)].map((_, i) => <StarIcon key={i} className="w-4 h-4" filled />)}
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-slate-100 px-2 py-1 rounded-md">
                    <CheckCircleIcon className="w-3 h-3 text-slate-400" />
                    Verified Client
                  </div>
                </div>

                <p className="text-slate-700 italic mb-8 leading-relaxed text-lg">
                  "{review.text}"
                </p>

                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-12 h-12 rounded-full bg-navy-50 text-navy-900 font-bold flex items-center justify-center text-lg border border-slate-100">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-navy-900">{review.name}</div>
                    <div className="text-xs text-slate-500">Houston, TX</div>
                  </div>
                  <div className="ml-auto opacity-30 grayscale">
                    <GoogleIcon className="w-5 h-5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-navy-950 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBackground} alt="" className="w-full h-full object-cover opacity-10 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-navy-950/90"></div>
        </div>
        <div className="container mx-auto px-6 max-w-7xl relative z-10 text-center">
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-6">Start Your Project Today</h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">Get a free, detailed estimate for your custom fence, gate, or railing. No obligation.</p>
          <Link to="/contact" className="inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-400 text-navy-950 px-8 py-4 text-lg font-bold rounded-full transition-all hover:scale-105 shadow-[0_0_20px_rgba(245,158,11,0.5)]">
            Get a Free Quote <ArrowRightIcon className="w-5 h-5" />
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Home;
