import React from 'react';
import { motion } from 'framer-motion';
import { SERVICE_CATEGORIES } from '../constants';
import { GATE_REVIEWS } from '../reviewsData';
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

import serviceGateDriveway from '../assets/gallery/IMG_5137.png';
import serviceGatePedestrian from '../assets/gallery/IMG_0447.png';
import serviceGateSecurity from '../assets/gallery/IMG_0805.JPG';
import serviceGateDecorative from '../assets/gallery/IMG_0348.JPG';

const Gates: React.FC = () => {
    const category = SERVICE_CATEGORIES.find(c => c.slug === 'gates');

    if (!category) return null;



    const serviceImages: Record<string, string> = {
        'Driveway': serviceGateDriveway,
        'Pedestrian': serviceGatePedestrian,
        'Security': serviceGateSecurity,
        'Decorative': serviceGateDecorative,
    };

    const getServiceImage = (title: string) => {
        const key = Object.keys(serviceImages).find(k => title.includes(k));
        return key ? serviceImages[key] : serviceGateDriveway;
    };

    return (
        <div className="bg-white font-body selection:bg-amber-500 selection:text-black overflow-x-hidden">
            <SEOHead
                title="Custom Driveway Gates Houston TX | Iron & Steel Gates | JN Ornamental Design"
                description="Houston's premier custom gate fabricator. Driveway gates, pedestrian gates, security gates & decorative iron gates. Family-owned since 2016. Free estimates. Serving Houston, Katy, Sugar Land & The Woodlands."
                canonical="https://jnornamentaldesign.com/gates"
                keywords="custom driveway gate houston, iron gate installation, gate contractor near me, wrought iron gate houston, sliding gate houston tx, swing gate installation, custom steel gate houston"
            />
            <SchemaMarkup
                type="Service"
                serviceName="Custom Gate Installation Houston TX"
                serviceDescription="Professional custom gate fabrication and installation in Houston. Driveway gates, pedestrian gates, security gates, decorative iron gates. Locally fabricated."
                pageUrl="https://jnornamentaldesign.com/gates"
                faqs={[
                    { question: 'How heavy are custom iron gates?', answer: 'Our custom steel gates typically weigh 300-800+ lbs depending on size and design. We use heavy-duty ball bearing hinges and set posts deep in concrete reinforced with rebar for lasting stability.' },
                    { question: 'Can you match my existing fence style?', answer: 'Yes. We specialize in custom fabrication and can replicate the style, picket finials, and scrollwork of your existing perimeter fence to create a seamless look for your new gate.' },
                    { question: 'Do you offer powder coating for gates?', answer: 'Yes. We recommend powder coating over traditional paint for driveway gates. It provides a much harder, more durable finish that resists chipping, scratching, and fading in the Texas sun.' },
                    { question: 'How much does a custom driveway gate cost in Houston?', answer: 'Custom driveway gates in Houston range from $2,500 to $10,000+ depending on size, material, design complexity, and automation. We provide free detailed quotes with exact pricing.' },
                    { question: 'Should I get a swing gate or a sliding gate?', answer: 'Swing gates work best with slightly inclined driveways and smaller openings (up to 16 ft). Sliding gates are ideal for flat driveways with limited space for the gate arc, and can span wider openings.' },
                    { question: 'What areas near Houston do you install gates?', answer: 'We install custom gates throughout the Greater Houston area including Katy, Sugar Land, The Woodlands, Cypress, Pearland, Spring, Humble, and all surrounding communities.' },
                ]}
            />

            {/* MOBILE HERO IMAGE (Visible < lg) */}
            <div className="block lg:hidden relative w-full h-[45vh] bg-iron-900 overflow-hidden">
                <img
                    src={category.heroImage}
                    alt="Custom Driveway Gates Houston"
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
                    <img src={category.heroImage} alt="Custom Driveway Gates Houston" className="w-full h-full object-cover opacity-60" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/25"></div>
                </div>

                <div className="container mx-auto px-6 max-w-7xl relative z-30 text-center lg:text-left pt-0 pb-16">
                    <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">

                        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                                <div className="inline-flex items-center gap-3 bg-amber-500 px-5 py-2 mb-6 -mt-10 relative z-30 shadow-lg shadow-black/20">
                                    <span className="text-sm font-display font-bold text-black tracking-widest uppercase">
                                        Houston's #1 Gate Fabricator
                                    </span>
                                </div>

                                <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-[0.95] mb-6 uppercase">
                                    Custom Driveway &amp; Entry{' '}
                                    <span className="text-amber-500">Gates in Houston TX</span>
                                </h1>

                                <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-xl mb-8 font-body font-light normal-case mx-auto lg:mx-0">
                                    Make a statement with a driveway gate that combines artistic ironwork with rock-solid security. Hand-forged in Houston.
                                </p>

                                <div className="flex flex-wrap justify-center lg:justify-start gap-4 md:gap-8 border-t border-white/20 pt-8 w-full">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-amber-500/20 flex items-center justify-center text-amber-500">
                                            <ShieldCheckIcon className="w-5 h-5" />
                                        </div>
                                        <div className="text-left">
                                            <div className="text-white font-display font-bold text-sm">HEAVY GAUGE STEEL</div>
                                            <div className="text-white/40 text-xs font-body normal-case">Built to Last</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-amber-500/20 flex items-center justify-center text-amber-500">
                                            <ClockIcon className="w-5 h-5" />
                                        </div>
                                        <div className="text-left">
                                            <div className="text-white font-display font-bold text-sm">CUSTOM DESIGN</div>
                                            <div className="text-white/40 text-xs font-body normal-case">Any Style or Size</div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="lg:col-span-5 w-full">
                            <div className="bg-white rounded-lg shadow-2xl shadow-black/60 p-6 md:p-8 relative overflow-hidden text-left">
                                <div className="absolute top-0 left-0 w-full h-2 bg-amber-500"></div>
                                <div className="mb-6">
                                    <h3 className="font-display text-2xl font-bold text-iron-900 mb-2">GET A GATE QUOTE</h3>
                                    <p className="text-gray-500 text-sm font-body normal-case">Pricing for slide, swing, and pedestrian gates.</p>
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
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-iron-900 mb-4 uppercase">Why Choose Our Custom Gates</h2>
                        <p className="text-gray-600 text-lg font-body normal-case">
                            A gate is the first thing people see. We ensure it leaves a lasting impression of quality and security.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: ShieldCheckIcon, title: 'Solid Steel Construction', desc: 'We fabricate everything in-house using heavy-duty tube steel. No flimsy pre-fab panels that rattle.' },
                            { icon: ArrowRightIcon, title: 'Custom Scrollwork', desc: 'Our artisans can match existing ironwork or create a completely unique design featuring your family crest or logo.' },
                            { icon: StarIcon, title: 'Automation Ready', desc: 'Every gate is built with the structural integrity required for heavy-duty automatic openers.' },
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

            <CTABanner title="Automate your entry today." subtitle="Secure your home with our custom gate solutions." buttonText="Get a Quote" link="/contact#quote" variant="primary" />

            {/* SERVICES — Alternating rows */}
            <section id="services" className="bg-iron-50 py-20 relative overflow-hidden">
                {/* Subtle industrial crosshatch pattern */}
                <div className="absolute inset-0 opacity-[0.05]" style={{
                    backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 30px, #1a1a1a 30px, #1a1a1a 31px), repeating-linear-gradient(-45deg, transparent, transparent 30px, #1a1a1a 30px, #1a1a1a 31px)`
                }}></div>
                <div className="container mx-auto px-6 max-w-7xl relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-iron-900 mb-4 uppercase">Gate Styles &amp; Designs</h2>
                        <div className="h-1.5 w-20 bg-amber-500 mx-auto mb-6"></div>
                        <p className="text-gray-600 font-body normal-case">Select the perfect entry system for your property.</p>
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
                reviews={GATE_REVIEWS}
                title="Houston Gate Installation Reviews"
                variant="dark"
            />

            {/* FAQ — Dark Industrial, 2-col grid */}
            <section className="py-20 bg-iron-900">
                <div className="container mx-auto px-6 max-w-6xl">
                    <h2 className="font-display text-3xl font-bold text-white mb-10 text-center uppercase">Gate Questions <span className="text-amber-500">Answered</span></h2>
                    <div className="grid md:grid-cols-2 gap-5">
                        {[
                            { q: 'How heavy are custom iron gates?', a: 'Our custom steel gates typically weigh 300-800+ lbs depending on size and design. We use heavy-duty ball bearing hinges and set posts deep in concrete reinforced with rebar.' },
                            { q: 'Can you match my existing fence?', a: 'Yes. We can replicate the style, picket finials, and scrollwork of your existing fence to create a seamless look for your new gate.' },
                            { q: 'Do you offer powder coating?', a: 'Yes. Powder coating provides a much harder, more durable finish than paint—resisting chipping, scratching, and fading in the Texas sun.' },
                            { q: 'How much does a driveway gate cost?', a: 'Custom driveway gates in Houston range from $2,500 to $10,000+ depending on size, material, design complexity, and automation. We provide free detailed quotes.' },
                            { q: 'Swing gate or sliding gate?', a: 'Swing gates work best with inclined driveways and smaller openings (up to 16 ft). Sliding gates are ideal for flat driveways with limited arc space.' },
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
                            <h2 className="font-display text-3xl font-bold text-iron-900 mb-6 uppercase">Designed for Homeowners Who Value Security &amp; Style</h2>
                            <p className="text-gray-600 font-body normal-case leading-relaxed mb-4">
                                You're tired of getting out of your car to manually open your gate. Or maybe you want to add a grand entrance to your property that makes a statement while keeping your family secure.
                            </p>
                            <p className="text-gray-600 font-body normal-case leading-relaxed">
                                We custom-design every gate in our Houston shop to fit your exact driveway width, slope, and aesthetic preferences. From simple pedestrian gates to elaborate estate-style driveway entrances with automation—we build it to last.
                            </p>
                        </div>
                        <div className="space-y-4">
                            {['Want a gate that matches your existing fence', 'Need automated entry with remote or keypad', 'Building a new home and need an entrance gate', 'Replacing an old, rusted, or damaged gate', 'Want heavy-duty security for your property'].map((item, idx) => (
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
                        { title: 'Railings', desc: 'Stair railings, balcony rails & handrails.', link: '/railings' },
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
                    <h2 className="font-display text-xl font-bold text-white mb-4 uppercase">Gate Installation Service Areas</h2>
                    <p className="text-gray-400 font-body normal-case text-sm leading-relaxed max-w-3xl mx-auto">
                        JN Ornamental Design builds and installs custom gates throughout the Greater Houston metro area. We serve homeowners and businesses in <strong className="text-gray-300">Houston</strong>, <strong className="text-gray-300">Katy</strong>, <strong className="text-gray-300">Sugar Land</strong>, <strong className="text-gray-300">The Woodlands</strong>, <strong className="text-gray-300">Cypress</strong>, <strong className="text-gray-300">Pearland</strong>, <strong className="text-gray-300">Spring</strong>, <strong className="text-gray-300">Missouri City</strong>, <strong className="text-gray-300">Humble</strong>, and all surrounding communities. Contact us for a free gate installation estimate.
                    </p>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0">
                    <img src={fencesFooterLuxury} alt="Luxury Estate Gate" loading="lazy" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/70"></div>
                </div>
                <div className="container mx-auto px-6 max-w-7xl relative z-10">
                    <div className="text-center mb-12">
                        <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 uppercase">Upgrade Your Entrance Today</h2>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto font-body normal-case">Get a firm price quote for a custom gate that adds value and security to your property.</p>
                    </div>
                    <div className="max-w-xl mx-auto bg-white rounded-lg shadow-2xl p-6 md:p-8">
                        <ContactForm variant="hero" />
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Gates;
