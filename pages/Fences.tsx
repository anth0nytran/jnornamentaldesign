import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SERVICE_CATEGORIES, REVIEWS } from '../constants';
import ContactForm from '../components/ContactForm';
import {
    CheckCircleIcon,
    ServiceIcons,
    StarIcon,
    ArrowRightIcon,
    GoogleIcon,
    ShieldCheckIcon,
    ClockIcon,
    ThumbUpIcon
} from '../components/Icons';
import fencesFooterLuxury from '../assets/fences-footer-luxury.png';
import fenceWood from '../assets/fence-wood-cedar-pro.png';
import fenceIron from '../assets/fence-iron-estate-pro.png';
import fenceChain from '../assets/fence-chainlink-black-pro.png';
import fenceAluminum from '../assets/fence-aluminum-modern-pro.png';

const Fences: React.FC = () => {
    const category = SERVICE_CATEGORIES.find(c => c.slug === 'fences');

    if (!category) return null;

    // Filter reviews relevant to fences (or generic positive ones)
    const fenceReviews = REVIEWS.filter(r =>
        r.text.toLowerCase().includes('fence') ||
        r.text.toLowerCase().includes('professional')
    ).slice(0, 3);

    return (
        <div className="bg-white font-sans selection:bg-amber-100 selection:text-navy-900 overflow-x-hidden">

            {/* 1. HERO SECTION (High Conversion Split Layout) */}
            <section className="relative min-h-[90vh] flex items-center bg-black overflow-hidden">
                {/* Background Image with Gradient Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={category.heroImage}
                        alt="Custom Fencing in Houston"
                        className="w-full h-full object-cover opacity-90"
                    />
                    {/* Gradient to ensure text readability - very subtle to let image shine */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent"></div>
                </div>

                <div className="container mx-auto px-6 max-w-7xl relative z-10 pt-24 pb-16">
                    <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">

                        {/* Left Column: Copy & Trust Signals */}
                        <div className="lg:col-span-7 flex flex-col items-start">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 mb-6">
                                    <div className="flex -space-x-1">
                                        {[...Array(5)].map((_, i) => (
                                            <div key={i} className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center border border-navy-950">
                                                <StarIcon className="w-2.5 h-2.5 text-navy-950" filled />
                                            </div>
                                        ))}
                                    </div>
                                    <span className="text-sm font-semibold text-white tracking-wide ml-2">
                                        Houston's #1 Rated Fence Builder
                                    </span>
                                </div>

                                <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-[1.1] mb-6 drop-shadow-xl">
                                    Privacy. Security. <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                                        Custom Built.
                                    </span>
                                </h1>

                                <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-xl mb-8 font-light">
                                    From rot-resistant cedar to ornamental iron, we build fences that withstand the Houston climate and elevate your property value.
                                </p>

                                {/* Trust Badges */}
                                <div className="flex flex-wrap gap-4 md:gap-8 border-t border-white/10 pt-8 w-full">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500">
                                            <ShieldCheckIcon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="text-white font-bold text-sm">Licensed & Insured</div>
                                            <div className="text-white/40 text-xs">$2M Liability</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500">
                                            <ClockIcon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="text-white font-bold text-sm">Fast Installation</div>
                                            <div className="text-white/40 text-xs">Most Jobs 2-3 Days</div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Right Column: Embedded Quote Form (The "Hook") */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="lg:col-span-5 w-full"
                        >
                            <div className="bg-white rounded-2xl shadow-2xl shadow-black/50 p-6 md:p-8 relative overflow-hidden ring-1 ring-white/10">
                                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-amber-500 to-amber-300"></div>
                                <div className="mb-6">
                                    <h3 className="font-display text-2xl font-bold text-navy-950 mb-2">
                                        Get a Free Fence Quote
                                    </h3>
                                    <p className="text-slate-500 text-sm">
                                        Instant pricing for wood, iron, and chain link.
                                    </p>
                                </div>
                                <ContactForm variant="hero" />
                                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400 bg-slate-50 py-2 rounded-lg">
                                    <CheckCircleIcon className="w-3 h-3 text-green-500" />
                                    No obligation • Local Houston Team
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* 2. VALUE PROPOSITION GRID (The "Logic") */}
            <section className="py-20 bg-slate-50 border-b border-slate-200">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-amber-600 font-bold uppercase tracking-widest text-xs mb-3 block">Why Choose JN Ornamental?</span>
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-950 mb-4">Built Better. Lasts Longer.</h2>
                        <p className="text-slate-600 text-lg">
                            We don't cut corners. Our fencing standards exceed local codes to ensure your investment stands straight and strong for decades.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: ShieldCheckIcon,
                                title: "Superior Materials",
                                desc: "We use thicker gauge steel and prime cedar lumber. No builders-grade materials that warp or rust in a year."
                            },
                            {
                                icon: ArrowRightIcon, // using as placeholder for 'Precision'
                                title: "Precision Installation",
                                desc: "Our posts are set deep in 3000 PSI concrete. Every picket is leveled. Straight lines, every time."
                            },
                            {
                                icon: StarIcon,
                                title: "20+ Years Experience",
                                desc: "Family-owned and operated in Houston since 2003. We treat your property like it's our own."
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 hover:border-amber-500/30 transition-colors group">
                                <div className="w-14 h-14 bg-navy-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-amber-500 group-hover:text-white transition-colors text-navy-900">
                                    <item.icon className="w-7 h-7" />
                                </div>
                                <h3 className="font-display text-xl font-bold text-navy-950 mb-3">{item.title}</h3>
                                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. SERVICE DETAILS (The "Meat") - Consolidated Grid Layout */}
            <section id="services" className="bg-white py-20">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-950 mb-4">Material Options</h2>
                        <p className="text-slate-600">Select the perfect material for your privacy and security needs.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {category.services.map((service, idx) => {
                            // Map service title to specific image
                            let ServiceImage = fenceWood;
                            if (service.title.toLowerCase().includes('iron')) ServiceImage = fenceIron;
                            else if (service.title.toLowerCase().includes('chain')) ServiceImage = fenceChain;
                            else if (service.title.toLowerCase().includes('aluminum')) ServiceImage = fenceAluminum;
                            else if (service.title.toLowerCase().includes('wood')) ServiceImage = fenceWood;

                            return (
                                <div key={idx} className="bg-white rounded-2xl border border-slate-100 shadow-xl overflow-hidden hover:shadow-2xl transition-shadow group flex flex-col h-full">
                                    {/* Image Section */}
                                    <div className="relative h-64 overflow-hidden">
                                        <div className="absolute inset-0 bg-slate-200 animate-pulse"></div>
                                        <img
                                            src={ServiceImage}
                                            alt={service.title}
                                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                                        <h3 className="absolute bottom-4 left-6 text-white font-display text-2xl font-bold tracking-wide drop-shadow-md">
                                            {service.title}
                                        </h3>
                                    </div>

                                    {/* Content Section */}
                                    <div className="p-8 flex flex-col flex-grow">
                                        <p className="text-slate-600 mb-6 flex-grow leading-relaxed">
                                            {service.description}
                                        </p>

                                        <div className="space-y-3">
                                            <p className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-2">Key Features</p>
                                            {service.features?.map((f, i) => (
                                                <li key={i} className="flex items-start gap-3 list-none">
                                                    <CheckCircleIcon className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                                                    <span className="text-sm font-medium text-navy-800">{f}</span>
                                                </li>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 4. REVIEWS (The "Social Proof") */}
            <section className="py-24 bg-navy-50 relative overflow-hidden">
                <div className="container mx-auto px-6 max-w-7xl relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-950 mb-4">Trusted by Your Neighbors</h2>
                        <div className="flex items-center justify-center gap-2 text-amber-500 mb-4">
                            {[...Array(5)].map((_, i) => <StarIcon key={i} className="w-5 h-5" filled />)}
                        </div>
                        <p className="text-slate-600">Perfect 5.0 Rating on Google Reviews</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {fenceReviews.map((review, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
                                <div className="flex gap-1 text-amber-500 mb-4">
                                    {[...Array(5)].map((_, i) => <StarIcon key={i} className="w-4 h-4" filled />)}
                                </div>
                                <p className="text-slate-700 italic mb-6 leading-relaxed">"{review.text}"</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-navy-100 rounded-full flex items-center justify-center font-bold text-navy-700">
                                        {review.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="font-bold text-navy-900 text-sm">{review.name}</div>
                                        <div className="text-xs text-slate-400">Verified Client</div>
                                    </div>
                                    <GoogleIcon className="w-5 h-5 ml-auto opacity-50 grayscale" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. SEO / FAQ BLOCK (The "Authority") */}
            <section className="py-20 bg-white border-t border-slate-100">
                <div className="container mx-auto px-6 max-w-4xl">
                    <h2 className="font-display text-3xl font-bold text-navy-950 mb-10 text-center">Common Fencing Questions</h2>

                    <div className="space-y-6">
                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                            <h3 className="font-bold text-navy-900 text-lg mb-2">Do I need a permit for a new fence in Houston?</h3>
                            <p className="text-slate-600">In most cases, replacing an existing fence on the same line doesn't require a permit. However, new fences, specifically those over 8 feet tall or masonry walls, may require City of Houston review. We handle all permitting and HOA approvals for you.</p>
                        </div>
                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                            <h3 className="font-bold text-navy-900 text-lg mb-2">Which is better: Cedar or Pine fencing?</h3>
                            <p className="text-slate-600">For the Houston climate, we strongly recommend Western Red Cedar. While Pine is cheaper, it is prone to warping and rotting quickly in our humidity. Cedar has natural oils that resist insects and decay, lasting 15-20 years with proper care.</p>
                        </div>
                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                            <h3 className="font-bold text-navy-900 text-lg mb-2">How long does installation take?</h3>
                            <p className="text-slate-600">An average residential fence (150-200 linear feet) takes our crew 2-3 days to complete. Day 1 is demolition and post setting (concrete needs to cure), and Day 2-3 is picketing and finishing.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. FINAL CTA (The "Close") */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0">
                    <img src={fencesFooterLuxury} alt="Luxury Backyard Fence" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
                </div>
                <div className="container mx-auto px-6 max-w-7xl relative z-10">
                    <div className="text-center mb-12">
                        <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">Start Your Fence Project</h2>
                        <p className="text-xl text-slate-300 max-w-2xl mx-auto">Get a firm, accurate price quote with no hidden fees. We respect your property and your time.</p>
                    </div>

                    <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-2xl p-6 md:p-8">
                        <ContactForm variant="hero" />
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Fences;
