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
import CTABanner from '../components/CTABanner';
import SEOHead from '../components/SEOHead';
import SchemaMarkup from '../components/SchemaMarkup';

const Fences: React.FC = () => {
    const category = SERVICE_CATEGORIES.find(c => c.slug === 'fences');

    if (!category) return null;

    const fenceReviews = REVIEWS.filter(r =>
        r.text.toLowerCase().includes('fence') ||
        r.text.toLowerCase().includes('professional')
    ).slice(0, 3);

    // Map service titles to images
    const serviceImages: Record<string, string> = {
        'iron': fenceIron,
        'chain': fenceChain,
        'aluminum': fenceAluminum,
        'wood': fenceWood,
    };

    const getServiceImage = (title: string) => {
        const key = Object.keys(serviceImages).find(k => title.toLowerCase().includes(k));
        return key ? serviceImages[key] : fenceWood;
    };

    return (
        <div className="bg-white font-body selection:bg-amber-500 selection:text-black overflow-x-hidden">
            <SEOHead
                title="Custom Iron & Wood Fences Houston TX | JN Ornamental Design"
                description="Houston's top-rated fence contractor. Custom wrought iron, wood cedar, chain link, and aluminum fences. Family-owned since 2016. Free estimates. Serving Houston, Katy, Sugar Land & The Woodlands."
                canonical="https://jnornamentaldesign.com/fences"
                keywords="iron fence houston, wood fence installation houston, fence contractor near me, chain link fence houston, aluminum fence houston tx, wrought iron fence cost houston, cedar fence houston, fence company near me"
            />
            <SchemaMarkup
                type="Service"
                serviceName="Custom Fence Installation Houston TX"
                serviceDescription="Professional custom fence installation in Houston. Wrought iron, wood cedar, chain link, and aluminum fencing. Locally fabricated. Free estimates."
                pageUrl="https://jnornamentaldesign.com/fences"
                faqs={[
                    { question: 'Do I need a permit for a new fence in Houston?', answer: 'In most cases, replacing an existing fence on the same line doesn\'t require a permit. However, new fences over 8 feet tall or masonry walls may require City of Houston review. We handle all permitting and HOA approvals for you.' },
                    { question: 'Which is better for Houston: Cedar or Pine fencing?', answer: 'For the Houston climate, we strongly recommend Western Red Cedar. While Pine is cheaper, it warps and rots quickly in our humidity. Cedar has natural oils that resist insects and decay, lasting 15-20 years with proper care.' },
                    { question: 'How long does fence installation take?', answer: 'An average residential fence (150-200 linear feet) takes our crew 2-3 days. Day 1 is demolition and post setting (concrete needs to cure), Days 2-3 are picketing and finishing.' },
                    { question: 'How much does an iron fence cost per foot in Houston?', answer: 'Wrought iron fence pricing in Houston typically ranges from $30-$75 per linear foot installed, depending on height, design complexity, and decorative elements. We provide free, no-obligation estimates with exact pricing.' },
                    { question: 'Do you build pool-code-compliant fences?', answer: 'Yes. All of our pool fences meet or exceed City of Houston pool barrier requirements, including minimum height, maximum gap spacing, and self-closing/self-latching gate requirements.' },
                    { question: 'What areas near Houston do you serve for fence installation?', answer: 'We install fences throughout the Greater Houston area including Katy, Sugar Land, The Woodlands, Cypress, Pearland, Spring, Humble, and surrounding communities.' },
                ]}
            />

            {/* HERO — Industrial */}
            <section className="relative min-h-[90vh] flex items-center bg-iron-900 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img src={category.heroImage} alt="Custom Fencing in Houston" className="w-full h-full object-cover opacity-60" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-black/30"></div>
                </div>

                <div className="container mx-auto px-6 max-w-7xl relative z-10 pt-24 pb-16">
                    <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">

                        <div className="lg:col-span-7 flex flex-col items-start">
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                                <div className="inline-flex items-center gap-3 bg-amber-500 px-5 py-2 mb-6">
                                    <span className="text-sm font-display font-bold text-black tracking-widest uppercase">
                                        Houston's #1 Rated Fence Builder
                                    </span>
                                </div>

                                <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-[0.95] mb-6 uppercase">
                                    Custom Fence Installation{' '}
                                    <span className="text-amber-500">in Houston TX</span>
                                </h1>

                                <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-xl mb-8 font-body font-light normal-case">
                                    From rot-resistant cedar to ornamental iron, we build fences that withstand the Houston climate and elevate your property value.
                                </p>

                                {/* Trust Badges */}
                                <div className="flex flex-wrap gap-4 md:gap-8 border-t border-white/20 pt-8 w-full">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-amber-500/20 flex items-center justify-center text-amber-500">
                                            <ShieldCheckIcon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="text-white font-display font-bold text-sm">LICENSED & INSURED</div>
                                            <div className="text-white/40 text-xs font-body normal-case">$2M Liability</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-amber-500/20 flex items-center justify-center text-amber-500">
                                            <ClockIcon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="text-white font-display font-bold text-sm">FAST INSTALLATION</div>
                                            <div className="text-white/40 text-xs font-body normal-case">Most Jobs 2-3 Days</div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Quote Form */}
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="lg:col-span-5 w-full">
                            <div className="bg-white rounded-lg shadow-2xl shadow-black/60 p-6 md:p-8 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-2 bg-amber-500"></div>
                                <div className="mb-6">
                                    <h3 className="font-display text-2xl font-bold text-iron-900 mb-2">GET A FREE FENCE QUOTE</h3>
                                    <p className="text-gray-500 text-sm font-body normal-case">Instant pricing for wood, iron, and chain link.</p>
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

            {/* VALUE PROPS — Industrial */}
            <section className="py-20 bg-iron-50 border-b border-gray-200">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-amber-500 font-display font-bold uppercase tracking-widest text-xs mb-3 block">Why Choose JN Ornamental?</span>
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-iron-900 mb-4 uppercase">Why Choose Our Houston Fence Company</h2>
                        <p className="text-gray-600 text-lg font-body normal-case">
                            We don't cut corners. Our fencing standards exceed local codes to ensure your investment stands straight and strong for decades.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: ShieldCheckIcon, title: 'Superior Materials', desc: 'We use thicker gauge steel and prime cedar lumber. No builders-grade materials that warp or rust in a year.' },
                            { icon: ArrowRightIcon, title: 'Precision Installation', desc: 'Our posts are set deep in 3000 PSI concrete. Every picket is leveled. Straight lines, every time.' },
                            { icon: StarIcon, title: '10+ Years Experience', desc: 'Family-owned and operated in Houston since 2016. We treat your property like it\'s our own.' },
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

            {/* Strategic CTA */}
            <CTABanner
                title="Unsure about materials?"
                subtitle="We can help you choose the best option for your budget and style."
                buttonText="Compare Options"
                link="/contact#quote"
                variant="primary"
            />

            {/* SERVICES — Redesigned: Alternating rows with industrial numbering */}
            <section id="services" className="bg-iron-50 py-20 relative overflow-hidden">
                {/* Subtle industrial crosshatch pattern */}
                <div className="absolute inset-0 opacity-[0.05]" style={{
                    backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 30px, #1a1a1a 30px, #1a1a1a 31px), repeating-linear-gradient(-45deg, transparent, transparent 30px, #1a1a1a 30px, #1a1a1a 31px)`
                }}></div>
                <div className="container mx-auto px-6 max-w-7xl relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-iron-900 mb-4 uppercase">Fence Materials: Iron, Wood, Aluminum &amp; Chain Link</h2>
                        <div className="h-1.5 w-20 bg-amber-500 mx-auto mb-6"></div>
                        <p className="text-gray-600 font-body normal-case">Select the perfect material for your privacy and security needs.</p>
                    </div>

                    <div className="space-y-0">
                        {category.services.map((service, idx) => {
                            const ServiceImage = getServiceImage(service.title);
                            const num = String(idx + 1).padStart(2, '0');
                            const isEven = idx % 2 === 0;

                            return (
                                <div key={idx} className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} border border-gray-200 ${idx > 0 ? 'border-t-0' : ''} group hover:border-amber-500 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.08)]`}>
                                    {/* Image Side */}
                                    <div className="md:w-1/2 relative overflow-hidden h-72 md:h-auto md:min-h-[320px]">
                                        <img src={ServiceImage} alt={service.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                                        {/* Number badge */}
                                        <div className="absolute top-6 left-6 bg-amber-500 text-black font-display font-bold text-lg px-4 py-2 tracking-widest">
                                            {num}
                                        </div>
                                    </div>

                                    {/* Content Side */}
                                    <div className={`md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white ${isEven ? 'border-r-4 border-r-amber-500/20' : 'border-l-4 border-l-amber-500/20'}`}>
                                        <h3 className="font-display text-2xl md:text-3xl font-bold text-iron-900 mb-4 group-hover:text-amber-500 transition-colors">
                                            {service.title}
                                        </h3>
                                        <p className="text-gray-600 mb-6 leading-relaxed font-body normal-case">
                                            {service.description}
                                        </p>

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

            {/* REVIEWS — Industrial dark */}
            <section className="py-24 bg-iron-900 relative overflow-hidden">
                <div className="container mx-auto px-6 max-w-7xl relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 uppercase">Houston Fence Installation Reviews</h2>
                        <div className="flex items-center justify-center gap-2 text-amber-500 mb-4">
                            {[...Array(5)].map((_, i) => <StarIcon key={i} className="w-5 h-5" filled />)}
                        </div>
                        <p className="text-gray-400 font-body normal-case">Perfect 5.0 Rating on Google Reviews</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {fenceReviews.map((review, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-lg shadow-xl relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1.5 bg-amber-500"></div>
                                <div className="flex gap-1 text-amber-500 mb-4">
                                    {[...Array(5)].map((_, i) => <StarIcon key={i} className="w-4 h-4" filled />)}
                                </div>
                                <p className="text-gray-700 italic mb-6 leading-relaxed font-body normal-case">"{review.text}"</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-iron-900 rounded-md flex items-center justify-center font-display font-bold text-amber-500">
                                        {review.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="font-display font-bold text-iron-900 text-sm">{review.name}</div>
                                        <div className="text-xs text-gray-400 font-body normal-case">Verified Client</div>
                                    </div>
                                    <GoogleIcon className="w-5 h-5 ml-auto opacity-50 grayscale" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ — Dark Industrial, 2-col grid */}
            <section className="py-20 bg-iron-900">
                <div className="container mx-auto px-6 max-w-6xl">
                    <h2 className="font-display text-3xl font-bold text-white mb-10 text-center uppercase">Common Fencing <span className="text-amber-500">Questions</span></h2>

                    <div className="grid md:grid-cols-2 gap-5">
                        {[
                            { q: 'Do I need a permit for a new fence in Houston?', a: 'In most cases, replacing an existing fence on the same line doesn\'t require a permit. However, new fences over 8 feet tall or masonry walls may require City of Houston review. We handle all permitting and HOA approvals for you.' },
                            { q: 'Which is better for Houston: Cedar or Pine?', a: 'We strongly recommend Western Red Cedar. Pine is cheaper but warps and rots quickly in our humidity. Cedar has natural oils that resist insects and decay, lasting 15-20 years with proper care.' },
                            { q: 'How long does fence installation take?', a: 'An average residential fence (150-200 linear feet) takes our crew 2-3 days. Day 1 is demolition and post setting, Days 2-3 are picketing and finishing.' },
                            { q: 'How much does an iron fence cost per foot?', a: 'Wrought iron fencing in Houston typically ranges from $30-$75 per linear foot installed, depending on height, design complexity, and decorative elements. We provide free estimates with exact pricing.' },
                            { q: 'Do you build pool-code-compliant fences?', a: 'Absolutely. All pool fences meet or exceed City of Houston pool barrier requirements, including minimum 48-inch height, maximum gap spacing, and self-closing/self-latching gate mechanisms.' },
                            { q: 'What areas do you serve?', a: 'We serve the Greater Houston area including Katy, Sugar Land, The Woodlands, Cypress, Pearland, Spring, Humble, Missouri City, and all surrounding communities.' },
                        ].map((item, idx) => (
                            <div key={idx} className="p-5 rounded-lg border border-white/10 bg-white/5 hover:border-amber-500/50 transition-colors">
                                <h3 className="font-display font-bold text-amber-500 text-base mb-2">{item.q}</h3>
                                <p className="text-gray-400 font-body normal-case text-sm leading-relaxed">{item.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* WHO THIS IS FOR — White bg for contrast after dark FAQ */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <span className="text-amber-500 font-display font-bold uppercase tracking-widest text-sm mb-2 block">IS THIS YOU?</span>
                            <h2 className="font-display text-3xl font-bold text-iron-900 mb-6 uppercase">Fence Installation for Houston Homeowners</h2>
                            <p className="text-gray-600 font-body normal-case leading-relaxed mb-4">
                                You're a Houston homeowner who wants more than a basic fence from a big-box store. You want something that adds real curb appeal, provides lasting security, and stands up to Houston's heat and humidity without falling apart in a few years.
                            </p>
                            <p className="text-gray-600 font-body normal-case leading-relaxed">
                                Whether you're replacing a storm-damaged fence, enclosing a new pool, or upgrading to ornamental iron, we custom-fabricate every panel in our Houston workshop and install it with our own crew—no subcontractors, no surprises.
                            </p>
                        </div>
                        <div className="space-y-4">
                            {['Need a fence that survives Houston weather', 'Want a seamless HOA-approved design', 'Need pool-code-compliant fencing', 'Looking for iron, wood, aluminum, or chain link', 'Want honest pricing with no hidden fees'].map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3 p-3 bg-iron-50 rounded-lg border border-gray-200">
                                    <CheckCircleIcon className="w-5 h-5 text-amber-500 flex-shrink-0" />
                                    <span className="text-iron-900 font-body font-medium text-sm normal-case">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CROSS-SERVICE LINKS — iron-50 for subtle variation */}
            <section className="py-16 bg-iron-50">
                <div className="container mx-auto px-6 max-w-5xl text-center">
                    <h2 className="font-display text-2xl font-bold text-iron-900 mb-8 uppercase">Other Custom Metalwork Services</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {[{ title: 'Custom Gates', desc: 'Driveway & pedestrian gates to match your fence.', link: '/gates' },
                        { title: 'Railings', desc: 'Stair railings, balcony rails & handrails.', link: '/railings' },
                        { title: 'Access Control', desc: 'Gate automation & keypad entry systems.', link: '/access-control' },
                        ].map((svc, idx) => (
                            <Link key={idx} to={svc.link} className="group p-6 rounded-lg border border-gray-200 bg-white hover:border-amber-500 hover:shadow-lg transition-all flex flex-col h-full">
                                <h3 className="font-display font-bold text-iron-900 mb-2 group-hover:text-amber-600 transition-colors">{svc.title}</h3>
                                <p className="text-gray-500 text-sm font-body normal-case mb-4 flex-grow">{svc.desc}</p>
                                <span className="text-amber-500 font-display font-bold text-sm uppercase tracking-wider inline-flex items-center gap-1 mt-auto">Learn More <ArrowRightIcon className="w-3 h-3" /></span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* SERVICE AREAS — Keyword-rich */}
            <section className="py-12 bg-iron-900">
                <div className="container mx-auto px-6 max-w-5xl text-center">
                    <h2 className="font-display text-xl font-bold text-white mb-4 uppercase">Fence Installation Service Areas</h2>
                    <p className="text-gray-400 font-body normal-case text-sm leading-relaxed max-w-3xl mx-auto">
                        JN Ornamental Design installs custom fences throughout the Greater Houston metro area. We proudly serve homeowners and businesses in <strong className="text-gray-300">Houston</strong>, <strong className="text-gray-300">Katy</strong>, <strong className="text-gray-300">Sugar Land</strong>, <strong className="text-gray-300">The Woodlands</strong>, <strong className="text-gray-300">Cypress</strong>, <strong className="text-gray-300">Pearland</strong>, <strong className="text-gray-300">Spring</strong>, <strong className="text-gray-300">Missouri City</strong>, <strong className="text-gray-300">Humble</strong>, and all surrounding communities. Contact us for a free fence installation estimate in your area.
                    </p>
                </div>
            </section>

            {/* FINAL CTA — Industrial dark */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0">
                    <img src={fencesFooterLuxury} alt="Luxury Backyard Fence" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/70"></div>
                </div>
                <div className="container mx-auto px-6 max-w-7xl relative z-10">
                    <div className="text-center mb-12">
                        <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 uppercase">Start Your Fence Project Today</h2>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto font-body normal-case">Get a firm, accurate price quote with no hidden fees. We respect your property and your time.</p>
                    </div>

                    <div className="max-w-xl mx-auto bg-white rounded-lg shadow-2xl p-6 md:p-8">
                        <ContactForm variant="hero" />
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Fences;
