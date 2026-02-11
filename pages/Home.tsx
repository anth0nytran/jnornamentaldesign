import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BUSINESS_INFO, SERVICE_CATEGORIES, FEATURED_PROJECTS } from '../constants';
import { ALL_REVIEWS } from '../reviewsData';
import ReviewCarousel from '../components/ReviewCarousel';
import ContactForm from '../components/ContactForm';
import heroBackground from '../assets/hero-luxury-gate-v2.png';

// ── Hero slideshow: landscape gallery images ──
import cedarFence from '../assets/gallery/Cedar Wood fence with 6inch bevel board botton.jpg';
import doubleDrivewayGate from '../assets/gallery/Double Driveway Gate at south of Houston.jpg';
import img0348 from '../assets/gallery/IMG_0348.JPG';
import img0586 from '../assets/gallery/IMG_0586.jpeg';
import img0805 from '../assets/gallery/IMG_0805.JPG';
import img1361 from '../assets/gallery/IMG_1361.JPG';

const HERO_SLIDES = [
  cedarFence,
  doubleDrivewayGate,
  img0348,
  img0586,
  img0805,
  img1361,
];
import artisanWelder from '../assets/artisan-welder.png';
import reviewsLuxuryBg from '../assets/reviews-luxury.png';
import {
  StarIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  GoogleIcon,
  ServiceIcons,
} from '../components/Icons';
import CTABanner from '../components/CTABanner';
import SEOHead from '../components/SEOHead';
import SchemaMarkup from '../components/SchemaMarkup';

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
    copy: 'We listen first. We walk your property, discuss your vision, and provide expert recommendations based on 10+ years of experience.',
    icon: '01'
  },
  {
    title: 'Design & Measure',
    copy: 'Precise measurements and clear design plans ensuring you know exactly what will be built before we cut a single piece of metal.',
    icon: '02'
  },
  {
    title: 'Fabrication',
    copy: 'Crafted in our local Houston workshop using premium steel and high-quality welds, not pre-fabricated panels from a box.',
    icon: '03'
  },
  {
    title: 'Installation',
    copy: 'Professional installation by our own crew (no subcontractors), leaving your property clean and your new addition secure.',
    icon: '04'
  },
];

const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white font-body selection:bg-amber-500 selection:text-black overflow-x-hidden">
      <SEOHead
        title="JN Ornamental Design | Custom Iron Fences, Gates & Railings | Houston TX"
        description="Houston's trusted custom iron fence, gate, railing, and access control contractor. Family-owned since 2016. BBB Accredited. 4.9★ rating. Free estimates."
        canonical="https://jnornamentaldesign.com/"
        keywords="jn ornamental design, iron fence houston, custom gate houston, fence contractor near me, driveway gate installation houston, wrought iron fence houston tx"
      />
      <SchemaMarkup type="LocalBusiness" />

      {/* ═══════════════════════════════════════════════════════════
          HERO SECTION — Bold Industrial
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[90vh] flex items-center bg-iron-900 overflow-hidden">
        {/* Slideshow Background */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="popLayout">
            <motion.img
              key={currentSlide}
              src={HERO_SLIDES[currentSlide]}
              alt="JN Ornamental Design project showcase"
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 0.65, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ opacity: { duration: 1.2, ease: 'easeInOut' }, scale: { duration: 6, ease: 'linear' } }}
            />
          </AnimatePresence>
          {/* Heavy black gradient for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/25 z-[1]"></div>
        </div>

        <div className="container mx-auto px-6 max-w-7xl relative z-10 pt-20 pb-12">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">

            {/* Left Column: Copy */}
            <div className="lg:col-span-7 flex flex-col items-start pt-10 lg:pt-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                {/* Badge — Industrial yellow bar */}
                <div className="inline-flex items-center gap-3 bg-amber-500 px-5 py-2 mb-8">
                  <span className="text-sm font-display font-bold text-black tracking-widest uppercase">
                    Family Owned &amp; Operated Since 2016
                  </span>
                </div>

                <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[0.95] tracking-tight mb-6 uppercase">
                  Custom Iron Fences, Gates &amp;{' '}
                  <span className="text-amber-500">
                    Railings in Houston
                  </span>
                </h1>

                <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-xl mb-10 font-body font-light normal-case">
                  Architectural grade fencing and industrial fabrication
                  for Texas' most secure properties.
                </p>

                {/* CTA Buttons — Industrial squared */}
                <div className="flex flex-wrap gap-4 mb-12">
                  <Link
                    to="/contact#quote"
                    className="btn-primary inline-flex items-center gap-3 text-base"
                  >
                    Request an Estimate
                  </Link>
                  <Link
                    to="/gallery"
                    className="btn-outline inline-flex items-center gap-3 text-base"
                  >
                    View Portfolio
                  </Link>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-6 md:gap-12 border-t border-white/20 pt-8 w-full max-w-lg">
                  <div>
                    <div className="text-3xl font-display font-bold text-amber-500 mb-1">10+</div>
                    <div className="text-xs text-gray-400 uppercase tracking-widest font-semibold font-body">Years Exp.</div>
                  </div>
                  <div>
                    <div className="text-3xl font-display font-bold text-amber-500 mb-1">A+</div>
                    <div className="text-xs text-gray-400 uppercase tracking-widest font-semibold font-body">BBB Rating</div>
                  </div>
                  <div>
                    <div className="text-3xl font-display font-bold text-amber-500 mb-1">1,500+</div>
                    <div className="text-xs text-gray-400 uppercase tracking-widest font-semibold font-body">Projects Done</div>
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
              <div className="bg-white rounded-lg shadow-2xl shadow-black/60 p-6 md:p-8 relative overflow-hidden">
                {/* Yellow top bar — thicker for industrial look */}
                <div className="absolute top-0 left-0 w-full h-2 bg-amber-500"></div>

                <div className="mb-6">
                  <h3 className="font-display text-2xl font-bold text-iron-900 mb-2">
                    GET A FREE ESTIMATE
                  </h3>
                  <p className="text-gray-500 text-sm font-body normal-case">
                    Tell us about your project. We usually reply within 24 hours.
                  </p>
                </div>

                <ContactForm variant="hero" />

                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400 font-body normal-case">
                  <CheckCircleIcon className="w-3 h-3 text-green-500" />
                  Your information is kept private
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          TICKER BANNER — Yellow industrial tape
      ═══════════════════════════════════════════════════════════ */}
      <div className="bg-amber-500 py-3 overflow-hidden relative z-20">
        <div className="flex animate-scroll w-max hover:pause-animation">
          {[...REVIEW_SNIPPETS, ...REVIEW_SNIPPETS].map((snippet, idx) => (
            <div key={idx} className="flex items-center mx-8">
              <div className="flex text-black mr-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i}><StarIcon className="w-3 h-3" filled /></span>
                ))}
              </div>
              <span className="text-sm font-bold text-black tracking-wide font-display uppercase">
                {snippet}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          SERVICES SECTION — Clean white, industrial grid
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-white relative z-10">
        {/* Subtle crosshatch pattern */}
        <div className="absolute inset-0 z-0 opacity-[0.06]"
          style={{
            backgroundImage: `linear-gradient(0deg, #000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}>
        </div>

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="text-amber-500 font-display font-bold uppercase tracking-widest text-xs mb-3 block">
                Our Expertise
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-iron-900 mb-6 uppercase">
                Custom Fence, Gate &amp; Railing Services
              </h2>
              {/* Thick yellow accent bar */}
              <div className="h-1.5 w-24 bg-amber-500 mb-6"></div>
              <p className="text-gray-600 text-lg leading-relaxed font-body normal-case">
                We design and fabricate custom solutions that optimize security without compromising design.
                Every piece is hand-finished in our Houston workshop.
              </p>
            </div>
            <Link to="/contact" className="hidden md:inline-flex items-center gap-3 text-iron-900 font-display font-bold hover:text-amber-500 transition-colors group text-lg uppercase tracking-wider">
              View All Services
              <div className="w-8 h-8 rounded-md border-2 border-current flex items-center justify-center group-hover:bg-amber-500 group-hover:border-amber-500 group-hover:text-black transition-all">
                <ArrowRightIcon className="w-4 h-4" />
              </div>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVICE_CATEGORIES.map((category, idx) => {
              const Icon = ServiceIcons[category.services[0]?.icon] || ServiceIcons.fence;
              const num = String(idx + 1).padStart(2, '0');

              return (
                <div key={category.slug}>
                  <Link
                    to={`/${category.slug}`}
                    className="group relative h-full flex flex-col bg-white border border-gray-200 overflow-hidden rounded-lg shadow-sm hover:shadow-xl hover:border-amber-500 transition-all duration-300"
                  >
                    <div className="h-64 overflow-hidden relative">
                      <img
                        src={category.heroImage}
                        alt={category.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
                      {/* Number badge */}
                      <div className="absolute top-4 left-4 bg-amber-500 text-black font-display font-bold text-xs px-3 py-1 tracking-widest">
                        {num}
                      </div>
                    </div>

                    <div className="p-8 flex flex-col flex-grow">
                      <div className="w-12 h-12 bg-iron-50 text-iron-900 rounded-md flex items-center justify-center mb-6 group-hover:bg-amber-500 group-hover:text-black transition-colors duration-300 border border-gray-200">
                        <Icon className="w-6 h-6" />
                      </div>

                      <h3 className="font-display text-xl font-bold text-iron-900 mb-3 group-hover:text-amber-500 transition-colors">
                        {category.title}
                      </h3>

                      <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed font-body normal-case">
                        {category.description}
                      </p>

                      <div className="mt-auto flex items-center gap-2 text-xs font-display font-bold uppercase tracking-widest text-iron-900 group-hover:text-amber-500 transition-colors">
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

      {/* ═══════════════════════════════════════════════════════════
          ABOUT / VALUES — True black, industrial trust
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-iron-900 relative overflow-hidden">
        {/* Subtle yellow glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left: Text */}
            <div className="order-2 lg:order-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-0.5 bg-amber-500"></div>
                <span className="text-amber-500 font-display font-bold uppercase tracking-widest text-sm">
                  The JN Difference
                </span>
              </div>

              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 leading-tight uppercase">
                Why Houston Homeowners{' '}<br />
                <span className="text-amber-500">
                  Choose JN Ornamental
                </span>
              </h2>

              <p className="text-gray-300 text-lg leading-relaxed mb-8 font-body font-light normal-case">
                Since 2016, JN Ornamental Design has been more than just a welding shop. We are a family
                business dedicated to the safety and beauty of Houston homes. We treat every project—whether
                it's a simple repair or a grand estate gate—with the same level of care and precision.
              </p>

              <div className="space-y-4">
                {[
                  { title: 'Honest Pricing', desc: 'No hidden fees or surprise upcharges. We price fair from the start.' },
                  { title: 'Local Craftsmanship', desc: 'Fabricated right here in Houston by skilled artisans.' },
                  { title: 'Direct Communication', desc: 'You speak directly with the team doing the work.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 border-l-4 border-amber-500 bg-white/5 hover:bg-white/10 transition-colors duration-300">
                    <div className="w-10 h-10 bg-amber-500/20 text-amber-500 flex items-center justify-center flex-shrink-0">
                      <CheckCircleIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-white text-base mb-1">{item.title}</h4>
                      <p className="text-gray-400 text-sm font-body normal-case">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Welder Image */}
            <div className="relative order-1 lg:order-2">
              <div className="aspect-[4/5] rounded-lg overflow-hidden shadow-2xl border border-white/10 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                <img
                  src={artisanWelder}
                  alt="Skilled welder working on custom gate"
                  className="w-full h-full object-cover opacity-90"
                />
              </div>

              {/* Trust Badge */}
              <div className="absolute -bottom-8 -left-8 bg-amber-500 text-black p-6 rounded-lg shadow-xl max-w-[200px] z-20">
                <div className="text-3xl font-display font-bold mb-1">10+</div>
                <div className="text-sm font-bold leading-tight font-body normal-case">Years of Excellence in Houston</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          PROCESS — Industrial numbered steps
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-left max-w-3xl mb-16">
            <span className="text-amber-500 font-display font-bold uppercase tracking-widest text-sm mb-2 block">The Method</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-iron-900 mb-6 uppercase">Our Fence &amp; Gate Installation Process</h2>
            <p className="text-gray-600 text-lg font-body normal-case">
              We've refined our workflow over 20 years to ensure every project runs smoothly from consultation to cleanup.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Yellow connector line (Desktop only) */}
            <div className="hidden lg:block absolute top-10 left-16 right-16 h-0.5 bg-amber-500/30 z-0"></div>

            {PROCESS_STEPS.map((step, idx) => (
              <div key={idx} className="relative z-10 group bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-lg hover:border-amber-500 transition-all">
                {/* Large industrial number */}
                <div className="w-16 h-16 bg-iron-900 rounded-md flex items-center justify-center text-amber-500 font-display font-bold text-2xl mb-6 group-hover:bg-amber-500 group-hover:text-black transition-colors shadow-sm">
                  {step.icon}
                </div>

                <h3 className="font-display text-xl font-bold text-iron-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed font-body normal-case">{step.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic CTA */}
      <CTABanner
        title="Ready to start your project?"
        subtitle="Let's discuss your vision and build something that lasts."
        buttonText="Get Started"
        link="/contact#quote"
        variant="primary"
      />

      {/* ═══════════════════════════════════════════════════════════
          PORTFOLIO — Industrial gallery grid
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-iron-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-iron-900 uppercase">Recent Iron Fence &amp; Gate Projects</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {FEATURED_PROJECTS.slice(0, 4).map((project, idx) => (
              <div key={idx} className="group relative overflow-hidden rounded-lg bg-gray-200 shadow-md hover:shadow-2xl transition-all duration-500 aspect-[4/3]">
                <img src={project.src} alt={project.alt} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 p-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="text-amber-500 text-xs font-display font-bold uppercase tracking-wider mb-2 block">{project.category}</span>
                  <h3 className="text-white font-display text-2xl font-bold">{project.alt}</h3>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link to="/gallery" className="btn-primary inline-flex items-center gap-2">
              View Full Portfolio <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          REVIEWS — Scrollable carousel with ALL reviews
      ═══════════════════════════════════════════════════════════ */}
      <ReviewCarousel
        reviews={ALL_REVIEWS}
        title="Houston Customer Reviews"
        subtitle={`${ALL_REVIEWS.length}+ verified reviews from Google, Thumbtack & Yelp`}
        variant="dark"
      />

      {/* ═══════════════════════════════════════════════════════════
          FINAL CTA — Bold industrial close
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-iron-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBackground} alt="" loading="lazy" className="w-full h-full object-cover opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-iron-900/90"></div>
        </div>
        <div className="container mx-auto px-6 max-w-7xl relative z-10 text-center">
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-6 uppercase">Get a Free Iron Fence Estimate Today</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-body normal-case">Get a free, detailed estimate for your custom fence, gate, or railing. No obligation.</p>
          <Link to="/contact" className="btn-primary inline-flex items-center gap-3 text-lg px-10 py-4">
            Get a Free Quote <ArrowRightIcon className="w-5 h-5" />
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Home;
