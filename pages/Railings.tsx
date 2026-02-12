import React from 'react';
import { motion } from 'framer-motion';
import { SERVICE_CATEGORIES } from '../constants';
import { RAILING_REVIEWS } from '../reviewsData';
import ReviewCarousel from '../components/ReviewCarousel';
import ContactForm from '../components/ContactForm';
import {
    CheckCircleIcon,
    ServiceIcons,
    StarIcon,
    ArrowRightIcon,
    GoogleIcon,
    ShieldCheckIcon,
    ClockIcon
} from '../components/Icons';
import CTABanner from '../components/CTABanner';
import SEOHead from '../components/SEOHead';
import SchemaMarkup from '../components/SchemaMarkup';
import fencesFooterLuxury from '../assets/fences-footer-luxury.png';

import serviceSteps from '../assets/gallery/IMG_4194.png';
import serviceBalcony from '../assets/gallery/IMG_4927.png';
import serviceSpiral from '../assets/gallery/IMG_0003.png';
import serviceHandrail from '../assets/gallery/IMG_5159.png';

const Railings: React.FC = () => {
    const category = SERVICE_CATEGORIES.find(c => c.slug === 'railings');

    if (!category) return null;



    const serviceImages: Record<string, string> = {
        'Stair Rail': serviceSteps,
        'Balcony': serviceBalcony,
        'Spiral': serviceSpiral,
        'Handrail': serviceHandrail,
    };

    const getServiceImage = (title: string) => {
        const key = Object.keys(serviceImages).find(k => title.includes(k));
        return key ? serviceImages[key] : serviceSteps;
    };

    return (
        <div className="bg-white font-body selection:bg-amber-500 selection:text-black overflow-x-hidden">
            <SEOHead
                title="Custom Iron Railings & Staircases Houston TX | JN Ornamental Design"
                description="Houston's premier railing contractor. Stair railings, balcony railings, spiral staircases & handrails. Custom iron & steel. Family-owned since 2016. Free estimates."
                canonical="https://jnornamentaldesign.com/railings"
                keywords="stair railing houston, iron railing installation, handrail contractor near me, balcony railing houston tx, spiral staircase houston, custom iron railing, railing company near me"
            />
            <SchemaMarkup
                type="Service"
                serviceName="Custom Railing Installation Houston TX"
                serviceDescription="Professional custom railing fabrication and installation in Houston. Stair railings, balcony railings, spiral staircases, handrails. Code-compliant. Locally fabricated."
                pageUrl="https://jnornamentaldesign.com/railings"
                faqs={[
                    { question: 'Are your railings building code compliant?', answer: 'Yes. We are experts in Houston and Texas building codes. We ensure all baluster spacing (4-inch sphere rule) and handrail heights meet current safety regulations for inspection and Certificate of Occupancy.' },
                    { question: 'Can you replace wood rails with iron?', answer: 'Absolutely. Replacing dated wood balusters with modern iron spindles is one of our most popular interior upgrades. It modernizes the home instantly and is often completed in just 1-2 days.' },
                    { question: 'How do you mount exterior railings?', answer: 'For concrete steps or patios, we core drill and set posts in epoxy or rocknite for maximum strength. For wood decks, we block and bolt through the detailed framing for a secure installation.' },
                    { question: 'How much do custom iron stair railings cost in Houston?', answer: 'Custom iron stair railings in Houston typically range from $100-$300 per linear foot installed, depending on design complexity, number of turns, and decorative elements. We provide free estimates.' },
                    { question: 'Can you build ADA-compliant handrails?', answer: 'Yes. We fabricate ADA-compliant handrails for commercial and residential properties, meeting all federal accessibility requirements for diameter, height, extension, and grip surface.' },
                    { question: 'What areas do you serve for railing installation?', answer: 'We install custom railings throughout the Greater Houston area including Katy, Sugar Land, The Woodlands, Cypress, Pearland, Spring, Humble, and surrounding communities.' },
                ]}
            />

            {/* MOBILE HERO IMAGE (Visible < lg) */}
            <div className="block lg:hidden relative w-full h-[45vh] bg-iron-900 overflow-hidden">
                <img
                    src={category.heroImage}
                    alt="Custom Handrails and Staircases Houston"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Gradient Fade */}
                <div className="absolute inset-0 bg-gradient-to-t from-iron-900 via-iron-900/60 to-transparent"></div>
            </div>

            {/* HERO — Industrial */}
            <section className="relative min-h-[50vh] lg:min-h-[90vh] flex items-start lg:items-center bg-iron-900 overflow-visible lg:overflow-hidden -mt-6 lg:mt-0 pt-0 lg:pt-24 pb-16">
                {/* Floating Orange Bar at Top of Content */}
                <div className="block lg:hidden absolute top-0 left-0 w-full h-1 bg-amber-500 z-20 shadow-[0_0_15px_rgba(245,158,11,0.5)]"></div>

                {/* DESKTOP BACKGROUND (Visible >= lg) */}
                <div className="hidden lg:block absolute inset-0 z-0">
                    <img src={category.heroImage} alt="Custom Handrails and Staircases Houston" className="w-full h-full object-cover opacity-60" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/25"></div>
                </div>

                <div className="container mx-auto px-6 max-w-7xl relative z-30 pt-0 pb-16 lg:pt-24">
                    <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">

                        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                                <div className="inline-flex items-center gap-3 bg-amber-500 px-5 py-2 mb-6 -mt-10 relative z-30 shadow-lg shadow-black/20">
                                    <span className="text-sm font-display font-bold text-black tracking-widest uppercase">
                                        Houston's Custom Metal Experts
                                    </span>
                                </div>

                                <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-[0.95] mb-6 uppercase">
                                    Custom Iron Railings &amp;{' '}
                                    <span className="text-amber-500">Stair Rails in Houston TX</span>
                                </h1>

                                <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-xl mb-8 font-body font-light normal-case mx-auto lg:mx-0">
                                    From modern balcony rails to intricate spiral staircases, we design and install custom metalwork that elevates your home's safety and style.
                                </p>

                                <div className="flex flex-wrap justify-center lg:justify-start gap-4 md:gap-8 border-t border-white/20 pt-8 w-full">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-amber-500/20 flex items-center justify-center text-amber-500">
                                            <ShieldCheckIcon className="w-5 h-5" />
                                        </div>
                                        <div className="text-left">
                                            <div className="text-white font-display font-bold text-sm">CODE COMPLIANT</div>
                                            <div className="text-white/40 text-xs font-body normal-case">Exceeds Safety Standards</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-amber-500/20 flex items-center justify-center text-amber-500">
                                            <ClockIcon className="w-5 h-5" />
                                        </div>
                                        <div className="text-left">
                                            <div className="text-white font-display font-bold text-sm">PRECISE FIT</div>
                                            <div className="text-white/40 text-xs font-body normal-case">Laser Measured</div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="lg:col-span-5 w-full">
                            <div className="bg-white rounded-lg shadow-2xl shadow-black/60 p-6 md:p-8 relative overflow-hidden text-left">
                                <div className="absolute top-0 left-0 w-full h-2 bg-amber-500"></div>
                                <div className="mb-6">
                                    <h3 className="font-display text-2xl font-bold text-iron-900 mb-2">GET A RAILING QUOTE</h3>
                                    <p className="text-gray-500 text-sm font-body normal-case">Pricing for staircases, balconies, and handrails.</p>
                                </div>
                                <ContactForm variant="hero" />
                                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400 font-body normal-case">
                                    <CheckCircleIcon className="w-3 h-3 text-green-500" />
                                    No obligation • Local Houston Team
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* VALUE PROPS */}
            <section className="py-20 bg-iron-50 border-b border-gray-200">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-amber-500 font-display font-bold uppercase tracking-widest text-xs mb-3 block">Why Choose JN Ornamental?</span>
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-iron-900 mb-4 uppercase">Why Choose Our Custom Railings</h2>
                        <p className="text-gray-600 text-lg font-body normal-case">
                            Railings aren't just decorative; they are safety devices. We fabricate to strict tolerances to ensure zero wobble and maximum load bearing.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: ShieldCheckIcon, title: 'Structural Integrity', desc: 'Our welds are clean, deep, and inspected. We anchor into concrete or wood blocking with industrial-grade fasteners.' },
                            { icon: ArrowRightIcon, title: 'Complex Geometries', desc: 'Spiral stairs? Radius balconies? We can fabricate curved rails that follow the exact contour of your architecture.' },
                            { icon: StarIcon, title: 'Premium Finishes', desc: 'From satin black powder coat to custom bronze finishes, we ensure your railing looks furniture-grade.' },
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 hover:border-amber-500 transition-colors group">
                                <div className="w-14 h-14 bg-iron-900 rounded-md flex items-center justify-center mb-6 group-hover:bg-amber-500 transition-colors text-amber-500 group-hover:text-black">
                                    <item.icon className="w-7 h-7" />
                                </div>
                                <h3 className="font-display text-xl font-bold text-iron-900 mb-3">{item.title}</h3>
                                <p className="text-gray-600 leading-relaxed font-body normal-case">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <CTABanner title="Safety meets style." subtitle="Enhance your property with our custom railing solutions." buttonText="View Options" link="/contact#quote" variant="primary" />

            {/* SERVICES — Alternating rows */}
            <section id="services" className="bg-iron-50 py-20 relative overflow-hidden">
                {/* Subtle industrial crosshatch pattern */}
                <div className="absolute inset-0 opacity-[0.05]" style={{
                    backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 30px, #1a1a1a 30px, #1a1a1a 31px), repeating-linear-gradient(-45deg, transparent, transparent 30px, #1a1a1a 30px, #1a1a1a 31px)`
                }}></div>
                <div className="container mx-auto px-6 max-w-7xl relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-iron-900 mb-4 uppercase">Custom Railing &amp; Stair Rail Services</h2>
                        <div className="h-1.5 w-20 bg-amber-500 mx-auto mb-6"></div>
                        <p className="text-gray-600 font-body normal-case">Custom metalwork for every part of your property.</p>
                    </div>

                    <div className="space-y-0">
                        {category.services.map((service, idx) => {
                            const ServiceImage = getServiceImage(service.title);
                            const num = String(idx + 1).padStart(2, '0');
                            const isEven = idx % 2 === 0;

                            return (
                                <div key={idx} className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} border border-gray-200 ${idx > 0 ? 'border-t-0' : ''} group hover:border-amber-500 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.08)]`}>
                                    <div className="md:w-1/2 relative overflow-hidden h-72 md:h-full md:min-h-[450px]">
                                        <img src={ServiceImage} alt={service.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                                        <div className="absolute top-6 left-6 bg-amber-500 text-black font-display font-bold text-lg px-4 py-2 tracking-widest">{num}</div>
                                    </div>
                                    <div className={`md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white ${isEven ? 'border-r-4 border-r-amber-500/20' : 'border-l-4 border-l-amber-500/20'}`}>
                                        <h3 className="font-display text-2xl md:text-3xl font-bold text-iron-900 mb-4 group-hover:text-amber-500 transition-colors">{service.title}</h3>
                                        <p className="text-gray-600 mb-6 leading-relaxed font-body normal-case">{service.description}</p>
                                        <div className="space-y-3">
                                            <p className="text-xs font-display font-bold text-amber-500 uppercase tracking-widest mb-2">Key Features</p>
                                            {service.features?.map((f, i) => (
                                                <div key={i} className="flex items-start gap-3">
                                                    <CheckCircleIcon className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                                                    <span className="text-sm font-medium text-iron-800 font-body normal-case">{f}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* REVIEWS — Scrollable carousel */}
            <ReviewCarousel
                reviews={RAILING_REVIEWS}
                title="Houston Railing Installation Reviews"
                variant="dark"
            />

            {/* FAQ — Dark Industrial, 2-col grid */}
            <section className="py-20 bg-iron-900">
                <div className="container mx-auto px-6 max-w-6xl">
                    <h2 className="font-display text-3xl font-bold text-white mb-10 text-center uppercase">Railing &amp; Stair <span className="text-amber-500">FAQ</span></h2>
                    <div className="grid md:grid-cols-2 gap-5">
                        {[
                            { q: 'Are your railings building code compliant?', a: 'Yes. We ensure all baluster spacing (4-inch sphere rule) and handrail heights meet current Houston and Texas safety regulations for inspection.' },
                            { q: 'Can you replace wood rails with iron?', a: 'Absolutely. Replacing dated wood balusters with modern iron spindles is one of our most popular upgrades. Often completed in just 1-2 days.' },
                            { q: 'How do you mount exterior rails?', a: 'For concrete, we core drill and set posts in epoxy for maximum strength. For wood decks, we block and bolt through the framing.' },
                            { q: 'How much do stair railings cost?', a: 'Custom iron stair railings range from $100-$300 per linear foot installed, depending on design complexity and decorative elements. Free estimates available.' },
                            { q: 'Can you build ADA-compliant handrails?', a: 'Yes. We fabricate ADA-compliant handrails meeting all federal requirements for diameter, height, extension, and grip surface.' },
                            { q: 'What areas do you serve?', a: 'We serve the Greater Houston area including Katy, Sugar Land, The Woodlands, Cypress, Pearland, Spring, Humble, Missouri City, and surrounding communities.' },
                        ].map((item, idx) => (
                            <div key={idx} className="p-5 rounded-lg border border-white/10 bg-white/5 hover:border-amber-500/50 transition-colors">
                                <h3 className="font-display font-bold text-amber-500 text-base mb-2">{item.q}</h3>
                                <p className="text-gray-400 font-body normal-case text-sm leading-relaxed">{item.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* WHO THIS IS FOR */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <span className="text-amber-500 font-display font-bold uppercase tracking-widest text-sm mb-2 block">IS THIS YOU?</span>
                            <h2 className="font-display text-3xl font-bold text-iron-900 mb-6 uppercase">Perfect for Homeowners Upgrading Their Interiors</h2>
                            <p className="text-gray-600 font-body normal-case leading-relaxed mb-4">
                                Your builder-grade wood balusters are dated and you're ready for a modern upgrade. Or maybe you need safe, code-compliant railings for a new staircase, balcony, or deck.
                            </p>
                            <p className="text-gray-600 font-body normal-case leading-relaxed">
                                We custom-design and fabricate every railing in our Houston shop to match your home's architecture. From classic wrought iron to sleek modern designs—every piece is built to code and built to last.
                            </p>
                        </div>
                        <div className="space-y-4">
                            {['Replacing dated wood balusters with iron', 'Need code-compliant railings for inspections', 'Building or renovating a staircase', 'Want ADA-compliant handrails', 'Looking for a custom spiral staircase'].map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3 p-3 bg-iron-50 rounded-lg border border-gray-200">
                                    <CheckCircleIcon className="w-5 h-5 text-amber-500 flex-shrink-0" />
                                    <span className="text-iron-900 font-body font-medium text-sm normal-case">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CROSS-SERVICE LINKS */}
            <section className="py-16 bg-iron-50">
                <div className="container mx-auto px-6 max-w-5xl text-center">
                    <h2 className="font-display text-2xl font-bold text-iron-900 mb-8 uppercase">Other Custom Metalwork Services</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {[{ title: 'Custom Fences', desc: 'Iron, wood, chain link & aluminum fencing.', link: '/fences' },
                        { title: 'Custom Gates', desc: 'Driveway & pedestrian gates.', link: '/gates' },
                        { title: 'Access Control', desc: 'Gate automation & keypad entry systems.', link: '/access-control' },
                        ].map((svc, idx) => (
                            <a key={idx} href={svc.link} className="group p-6 rounded-lg border border-gray-200 bg-white hover:border-amber-500 hover:shadow-lg transition-all flex flex-col h-full">
                                <h3 className="font-display font-bold text-iron-900 mb-2 group-hover:text-amber-600 transition-colors">{svc.title}</h3>
                                <p className="text-gray-500 text-sm font-body normal-case mb-4 flex-grow">{svc.desc}</p>
                                <span className="text-amber-500 font-display font-bold text-sm uppercase tracking-wider mt-auto">Learn More →</span>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* SERVICE AREAS */}
            <section className="py-12 bg-iron-900">
                <div className="container mx-auto px-6 max-w-5xl text-center">
                    <h2 className="font-display text-xl font-bold text-white mb-4 uppercase">Railing Installation Service Areas</h2>
                    <p className="text-gray-400 font-body normal-case text-sm leading-relaxed max-w-3xl mx-auto">
                        JN Ornamental Design crafts and installs custom railings throughout the Greater Houston metro area. We serve homeowners and businesses in <strong className="text-gray-300">Houston</strong>, <strong className="text-gray-300">Katy</strong>, <strong className="text-gray-300">Sugar Land</strong>, <strong className="text-gray-300">The Woodlands</strong>, <strong className="text-gray-300">Cypress</strong>, <strong className="text-gray-300">Pearland</strong>, <strong className="text-gray-300">Spring</strong>, <strong className="text-gray-300">Missouri City</strong>, <strong className="text-gray-300">Humble</strong>, and all surrounding communities. Contact us for a free railing installation estimate.
                    </p>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0">
                    <img src={fencesFooterLuxury} alt="Luxury Estate Staircase" loading="lazy" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/70"></div>
                </div>
                <div className="container mx-auto px-6 max-w-7xl relative z-10">
                    <div className="text-center mb-12">
                        <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 uppercase">Elevate Your Space Today</h2>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto font-body normal-case">Get a firm price quote for custom railings or staircases. Safety, style, and professional installation.</p>
                    </div>
                    <div className="max-w-xl mx-auto bg-white rounded-lg shadow-2xl p-6 md:p-8">
                        <ContactForm variant="hero" />
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Railings;
