import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BUSINESS_INFO, SERVICE_CATEGORIES, REVIEWS, FEATURED_PROJECTS, STATS } from '../constants';
import ContactForm from '../components/ContactForm';
import heroBackground from '../assets/hero background.png';
import stepsBackground from '../assets/steps.png';
import reviewsBackground from '../assets/reviews.png';
import {
  StarIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  PhoneIcon,
  GoogleIcon,
  ServiceIcons,
} from '../components/Icons';

// Scrolling review snippets - kept text only for cleaner look
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
    title: 'Call + Site Visit',
    copy: 'We listen first, walk the property, and answer questions before we price anything.',
  },
  {
    title: 'Measure + Design',
    copy: 'Precise measurements and a clear plan so you know exactly what you are getting.',
  },
  {
    title: 'Build + Install',
    copy: 'Fabricated in-house, installed cleanly, and scheduled around your life.',
  },
  {
    title: 'Walkthrough + Support',
    copy: 'Final walkthrough, care tips, and a team that answers the phone after the job.',
  },
];

const PARALLAX_RATE = 1;
const PARALLAX_MAX = 44;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const Home: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLElement>(null);
  const heroOffsetRef = useRef(0);
  const stepsOffsetRef = useRef(0);
  const [heroOffset, setHeroOffset] = useState(0);
  const [stepsOffset, setStepsOffset] = useState(0);

  useEffect(() => {
    let rafId = 0;

    const computeOffset = (rect: DOMRect) => {
      const viewport = window.innerHeight;
      const total = rect.height + viewport;
      const progress = clamp((viewport - rect.top) / total, 0, 1);
      const centered = (progress - 0.5) * 2;
      const rawOffset = centered * PARALLAX_MAX * PARALLAX_RATE;
      return Math.round(clamp(rawOffset, -PARALLAX_MAX, PARALLAX_MAX));
    };

    const update = () => {
      rafId = 0;
      const heroEl = heroRef.current;
      const stepsEl = stepsRef.current;

      if (heroEl) {
        const nextHeroOffset = computeOffset(heroEl.getBoundingClientRect());
        if (nextHeroOffset !== heroOffsetRef.current) {
          heroOffsetRef.current = nextHeroOffset;
          setHeroOffset(nextHeroOffset);
        }
      }

      if (stepsEl) {
        const nextStepsOffset = computeOffset(stepsEl.getBoundingClientRect());
        if (nextStepsOffset !== stepsOffsetRef.current) {
          stepsOffsetRef.current = nextStepsOffset;
          setStepsOffset(nextStepsOffset);
        }
      }
    };

    const onScroll = () => {
      if (rafId) {
        return;
      }
      rafId = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <div className="bg-white font-sans selection:bg-amber-100 selection:text-navy-900">

      {/* Hero Section */}
      <section ref={heroRef} className="relative flex items-center bg-navy-950 pt-16 pb-16 lg:pt-24 lg:pb-24 overflow-hidden">

        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={heroBackground}
            alt="Industrial metalwork and custom fencing"
            className="absolute -top-[10%] left-0 right-0 w-full h-[130%] min-h-[130%] object-cover object-center opacity-25"
            style={{ transform: `translate3d(0, ${heroOffset}px, 0)`, willChange: 'transform' }}
          />
          {/* Light black overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 to-navy-950/40"></div>
        </div>

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-8 items-center">

            {/* Left Column: Value Prop */}
            <div className="lg:col-span-7 flex flex-col items-start">

              {/* Premium Trust Pill */}
              <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full pl-2 pr-4 py-1.5 mb-6">
                <div className="flex -space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center border-2 border-navy-950">
                      <StarIcon className="w-3 h-3 text-navy-950" filled />
                    </div>
                  ))}
                </div>
                <span className="text-sm font-medium text-white/90 tracking-wide">
                  Top Rated in Houston
                </span>
              </div>

              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-4">
                JN Ornamental <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                  Design
                </span>
              </h1>
              <p className="font-display text-2xl text-amber-500 font-bold uppercase tracking-widest mb-6">
                Fencing & Fabrication
              </p>

              <p className="text-lg text-slate-300 leading-relaxed max-w-xl mb-8 font-light">
                A family-owned Houston business with {BUSINESS_INFO.yearsExperience} years of crafting beautiful fences, gates, and railings that keep your loved ones safe.
              </p>

              {/* Stats Row - Clean & Divided */}
              <div className="grid grid-cols-3 gap-6 mb-8 border-l-2 border-amber-500/30 pl-6">
                {[
                  { value: 'A+', label: 'BBB Rating' },
                  { value: '4.9', label: 'Average Stars' },
                  { value: '20+', label: 'Years Serving' }
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl md:text-3xl font-display font-bold text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-300 font-medium">
                <span className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                  Licensed & Insured
                </span>
                <span className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                  Lifetime Warranty
                </span>
                <span className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                  Family Owned
                </span>
              </div>
            </div>

            {/* Right Column: High Conversion Form */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl shadow-2xl shadow-navy-950/50 p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-amber-300"></div>
                <div className="mb-4">
                  <h3 className="font-display text-2xl font-bold text-navy-950 mb-1">
                    Get a Free Estimate
                  </h3>
                  <p className="text-slate-500 text-sm">
                    Tell us about your project. We usually reply within 24 hours.
                  </p>
                </div>
                <ContactForm variant="hero" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ticker Banner - Subtle Social Proof */}
      <div className="bg-navy-900 border-b border-white/5 py-3 overflow-hidden relative z-20">
        <div className="flex animate-scroll w-max hover:pause-animation">
          {[...REVIEW_SNIPPETS, ...REVIEW_SNIPPETS].map((snippet, idx) => (
            <div key={idx} className="flex items-center mx-8">
              <div className="flex text-amber-500 mr-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i}><StarIcon className="w-3 h-3" filled /></span>
                ))}
              </div>
              <span className="text-sm font-medium text-slate-300 italic tracking-wide">
                {snippet}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Services Section */}
      <section className="py-20 md:py-28 bg-slate-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <span className="text-amber-600 font-bold uppercase tracking-widest text-xs mb-3 block">
                Expertise
              </span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-navy-950 mb-4">
                Architectural Metalwork
              </h2>
              <p className="text-slate-600 text-lg">
                We design and fabricate custom solutions that blend security with curb appeal.
              </p>
            </div>
            <Link to="/contact" className="hidden md:inline-flex items-center gap-2 text-navy-900 font-semibold hover:text-amber-600 transition-colors group">
              View All Services
              <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {SERVICE_CATEGORIES.map((category) => {
              const Icon = ServiceIcons[category.services[0]?.icon] || ServiceIcons.fence;
              return (
                <Link
                  key={category.slug}
                  to={`/${category.slug}`}
                  className="group relative h-[420px] overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500"
                >
                  <img
                    src={category.heroImage}
                    alt={category.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Permanent gradient for text legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/40 to-transparent group-hover:via-navy-950/60 transition-colors"></div>

                  <div className="absolute inset-0 p-6 flex flex-col justify-end items-start">
                    <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center mb-4 group-hover:bg-amber-500 group-hover:text-navy-950 text-white transition-colors duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-white mb-2 leading-tight">
                      {category.title}
                    </h3>
                    <p className="text-slate-300 text-sm mb-4 line-clamp-3 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                      {category.description}
                    </p>
                    <div className="h-0.5 w-12 bg-amber-500 group-hover:w-full transition-all duration-500"></div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link to="/contact" className="inline-flex items-center justify-center w-full px-6 py-3 border border-gray-300 rounded-lg text-navy-900 font-medium hover:bg-gray-50 transition-colors">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Who We Are Section - Family Values */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Story */}
            <div>
              <span className="text-amber-600 font-bold uppercase tracking-widest text-xs mb-3 block">
                Who We Are
              </span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-navy-950 mb-6">
                Family-Owned. <br />
                <span className="text-amber-600">Houston-Proud.</span>
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                Since 2003, the JN Ornamental family has been crafting ironwork for our Houston neighbors.
                What started as a father's dream to build beautiful, lasting work has grown into a trusted
                name across the Greater Houston area.
              </p>
              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                We're not a big corporation — we're a family who takes pride in every weld, every design,
                and every handshake. When you call us, you talk to us. When we visit your property, we treat
                it like our own. That's the JN difference.
              </p>

              {/* Values */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: '🛡️', label: 'Integrity First' },
                  { icon: '⚒️', label: 'Master Craftsmanship' },
                  { icon: '🤝', label: 'Community Focused' },
                ].map((value) => (
                  <div key={value.label} className="text-center p-4 bg-slate-50 rounded-xl">
                    <div className="text-2xl mb-2">{value.icon}</div>
                    <div className="text-sm font-semibold text-navy-800">{value.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Image with overlay card */}
            <div className="relative">
              <div className="aspect-[4/5] bg-gradient-to-br from-navy-100 to-slate-200 rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800"
                  alt="JN Ornamental craftsman at work"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating stats card */}
              <div className="absolute -bottom-6 -left-6 bg-navy-950 text-white p-6 rounded-xl shadow-2xl">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-display font-bold text-amber-500">20+</div>
                    <div className="text-xs text-white/70 uppercase tracking-wider">Years</div>
                  </div>
                  <div className="w-px h-12 bg-white/20"></div>
                  <div className="text-center">
                    <div className="text-3xl font-display font-bold text-amber-500">1,500+</div>
                    <div className="text-xs text-white/70 uppercase tracking-wider">Happy Families</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section ref={stepsRef} className="relative py-20 md:py-24 bg-navy-950 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={stepsBackground}
            alt=""
            className="absolute -top-[10%] left-0 right-0 w-full h-[130%] min-h-[130%] object-cover object-center"
            style={{ transform: `translate3d(0, ${stepsOffset}px, 0)`, willChange: 'transform' }}
            role="presentation"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-navy-950/88 to-black/90"></div>
          <div className="absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-amber-500/10 blur-3xl"></div>
          <div className="absolute -bottom-32 right-0 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl"></div>
          <div className="absolute inset-x-0 top-0 h-px bg-white/10"></div>
          <div className="absolute inset-x-0 bottom-0 h-px bg-white/10"></div>
        </div>

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <span className="text-amber-400 font-bold uppercase tracking-widest text-xs mb-3 block">
                How We Work
              </span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                We Treat Every Home Like Our Own
              </h2>
              <p className="text-white/70 text-lg">
                Clear communication, honest pricing, and craftsmanship we're proud to put our name on.
              </p>
            </div>
            <div className="text-white/60 text-sm md:text-right">
              <div className="font-semibold text-white">Family owned since 2003</div>
              <div>Licensed and insured. Built in Houston.</div>
            </div>
          </div>

          <div className="relative">
            <div className="hidden md:block relative mb-6">
              <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-px bg-white/15"></div>
              <div className="grid grid-cols-4 gap-6 relative z-10">
                {PROCESS_STEPS.map((step) => (
                  <div key={step.title} className="flex justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-lg shadow-amber-500/40"></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute left-6 top-0 bottom-0 w-px bg-white/15 md:hidden"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {PROCESS_STEPS.map((step, index) => (
                <div
                  key={step.title}
                  className="glass-panel border border-white/15 rounded-2xl p-6 shadow-lg shadow-black/20"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full border border-amber-400/60 text-amber-300 flex items-center justify-center text-sm font-bold">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <div className="text-xs uppercase tracking-[0.2em] text-white/60">
                      Step
                    </div>
                  </div>
                  <h3 className="font-display text-xl font-semibold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-white/70 leading-relaxed">
                    {step.copy}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <span className="text-amber-600 font-bold uppercase tracking-widest text-xs mb-3 block">
              Our Portfolio
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-navy-950 mb-6">
              Built to Last
            </h2>
            <div className="w-20 h-1 bg-amber-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
            {FEATURED_PROJECTS.map((project, idx) => (
              <div
                key={idx}
                className={`group relative overflow-hidden rounded-xl bg-gray-100 ${idx === 0 || idx === 3 ? 'md:col-span-2' : ''
                  }`}
              >
                <img
                  src={project.src}
                  alt={project.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-navy-950/20 group-hover:bg-navy-950/60 transition-colors duration-300"></div>

                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-1 block">
                    {project.category}
                  </span>
                  <p className="text-white font-display text-lg font-semibold">{project.alt}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-3 bg-navy-950 text-white font-semibold rounded hover:bg-navy-800 transition-colors">
              View Project Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews Section - The only place with strong Google Branding */}
      <section className="relative py-20 md:py-24 bg-navy-950 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={reviewsBackground}
            alt=""
            className="absolute -top-[8%] left-0 right-0 w-full h-[125%] min-h-[125%] object-cover object-center"
            role="presentation"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-950/85 via-navy-950/70 to-navy-950/90"></div>
          <div className="absolute inset-0 bg-navy-950/20"></div>
        </div>

        <div className="container mx-auto px-6 max-w-7xl relative z-10">

          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div className="flex items-center gap-4">
              <div className="glass-panel border border-white/20 p-3 rounded-2xl shadow-lg shadow-black/30">
                <GoogleIcon className="w-7 h-7" />
              </div>
              <div className="font-display text-2xl md:text-3xl font-bold text-white">
                Google Reviews
              </div>
            </div>

            <div className="mt-6 md:mt-0 flex items-center gap-6">
              <div className="text-right hidden sm:block">
                <div className="text-3xl font-bold text-white">4.9/5</div>
                <div className="text-xs text-white/60">Thumbtack Top Pro</div>
              </div>
              <div className="h-10 w-px bg-white/20 hidden sm:block"></div>
              {BUSINESS_INFO.socialLinks.thumbtack && (
                <a
                  href={BUSINESS_INFO.socialLinks.thumbtack}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-300 hover:text-amber-200 font-semibold text-sm flex items-center gap-1"
                >
                  See reviews on Thumbtack <ArrowRightIcon className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.map((review, idx) => (
              <div
                key={idx}
                className="glass-panel bg-white/10 p-8 rounded-2xl border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.35)] hover:bg-white/15 hover:border-white/30 transition-all duration-300 h-full flex flex-col"
              >
                <div className="flex items-center justify-between mb-4 text-xs">
                  <div className="flex items-center gap-2 text-white/70">
                    <GoogleIcon className="w-4 h-4" />
                    <span className="font-semibold text-white/80">{review.source}</span>
                  </div>
                  <div className="text-white/50 min-h-[16px]">{review.date || ''}</div>
                </div>

                <div className="flex items-center gap-2 text-amber-300 mb-5">
                  <div className="flex gap-1">
                    {[...Array(review.stars)].map((_, i) => (
                      <span key={i}><StarIcon className="w-4 h-4" filled /></span>
                    ))}
                  </div>
                  <span className="text-xs text-white/70 font-semibold">
                    {review.stars.toFixed(1)}
                  </span>
                </div>

                <p className="text-white/85 leading-relaxed mb-6 line-clamp-4">
                  {review.text}
                </p>

                <div className="flex items-center gap-4 mt-auto pt-6 border-t border-white/10">
                  <div className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center font-bold text-sm border border-white/20">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">{review.name}</div>
                    <div className="text-xs text-white/50 min-h-[16px]">
                      {review.project ? `Project: ${review.project}` : ''}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Clean & Minimal */}
      <section className="py-24 bg-navy-950 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
              Let's Build Something Together
            </h2>
            <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Get a free estimate for your project. No pressure, just honest advice and a fair price.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-10 max-w-2xl mx-auto">
            <ContactForm />
          </div>

          <p className="mt-12 text-sm text-slate-500 flex items-center justify-center gap-2">
            <CheckCircleIcon className="w-4 h-4 text-green-500" />
            Family-owned • Licensed & Insured • Serving Houston Since 2003
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
