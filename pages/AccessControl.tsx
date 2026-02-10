import React from 'react';
import { motion } from 'framer-motion';
import { SERVICE_CATEGORIES, REVIEWS } from '../constants';
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
import accessHero from '../assets/access-hero-main.png';
import CTABanner from '../components/CTABanner';
import SEOHead from '../components/SEOHead';
import SchemaMarkup from '../components/SchemaMarkup';
import fencesFooterLuxury from '../assets/fences-footer-luxury.png';
import serviceAccess from '../assets/service-access.png';
import serviceGate from '../assets/service-gate.png';
import serviceRailing from '../assets/service-railing.png';
import serviceFence from '../assets/service-fence.png';

const AccessControl: React.FC = () => {
    const category = SERVICE_CATEGORIES.find(c => c.slug === 'access-control');

    if (!category) return null;

    const accessReviews = REVIEWS.filter(r =>
        r.text.toLowerCase().includes('professional') ||
        r.text.toLowerCase().includes('responsive')
    ).slice(0, 3);

    const serviceImageList = [serviceAccess, serviceGate, serviceRailing, serviceFence];

    return (
        <div className="bg-white font-body selection:bg-amber-500 selection:text-black overflow-x-hidden">
            <SEOHead
                title="Gate Automation & Access Control Houston TX | JN Ornamental Design"
                description="Houston's expert gate automation contractor. Gate openers, keypads, and solar gate operators. Family-owned since 2016. Free estimates."
                canonical="https://jnornamentaldesign.com/access-control"
                keywords="gate automation houston, gate opener installation, access control near me, automatic gate houston tx, keypad gate entry, solar gate opener, gate operator repair houston"
            />
            <SchemaMarkup
                type="Service"
                serviceName="Gate Automation & Access Control Houston TX"
                serviceDescription="Professional gate automation and keypad installation in Houston. Gate openers, keypads, and solar operators."
                pageUrl="https://jnornamentaldesign.com/access-control"
                faqs={[
                    { question: 'Can I automate my existing gate?', answer: 'Yes! In most cases, we can retrofit an automation system to your existing swing or slide gate if the gate is in good structural condition. We inspect hinges and tracks to ensure smooth operation before installation.' },
                    { question: 'What happens if the power goes out?', answer: 'We install systems with battery backup units that allow your gate to cycle multiple times during a power outage. All gates also have a manual release key override for safety.' },
                    { question: 'Is solar power an option for gate openers?', answer: 'Absolutely. Solar-powered gate openers are a great option for driveways far from a main power source. We use high-efficiency solar panels and deep-cycle batteries for reliable year-round operation.' },
                    { question: 'How much does gate automation cost in Houston?', answer: 'Gate automation in Houston typically ranges from $1,200-$5,000+ depending on the operator type (swing vs. slide), gate weight, and accessories (keypad, sensors). We provide free detailed quotes.' },
                    { question: 'Do you install safety sensors?', answer: 'Yes. We include safety sensors (photo eyes) with every installation. These sensors detect vehicles or obstacles in the pathway and prevent the gate from closing on them.' },
                    { question: 'What areas do you serve for gate automation?', answer: 'We install gate automation throughout the Greater Houston area including Katy, Sugar Land, The Woodlands, Cypress, Pearland, Spring, Humble, and all surrounding communities.' },
                ]}
            />

            {/* HERO — Industrial */}
            <section className="relative min-h-[90vh] flex items-center bg-iron-900 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img src={accessHero} alt="Luxury Gate Automation" className="w-full h-full object-cover opacity-60" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-black/30"></div>
                </div>

                <div className="container mx-auto px-6 max-w-7xl relative z-10 pt-24 pb-16">
                    <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">

                        <div className="lg:col-span-7 flex flex-col items-start">
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                                <div className="inline-flex items-center gap-3 bg-amber-500 px-5 py-2 mb-6">
                                    <span className="text-sm font-display font-bold text-black tracking-widest uppercase">
                                        Top Rated Security Integrators
                                    </span>
                                </div>

                                <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-[0.95] mb-6 uppercase">
                                    Gate Automation &amp; Access{' '}
                                    <span className="text-amber-500">Control in Houston TX</span>
                                </h1>

                                <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-xl mb-8 font-body font-light normal-case">
                                    From smartphone-controlled custom gates to commercial keypad systems, we install the technology that secures your perimeter.
                                </p>

                                <div className="flex flex-wrap gap-4 md:gap-8 border-t border-white/20 pt-8 w-full">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-amber-500/20 flex items-center justify-center text-amber-500">
                                            <ShieldCheckIcon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="text-white font-display font-bold text-sm">CERTIFIED TECHS</div>
                                            <div className="text-white/40 text-xs font-body normal-case">Expert Installation</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-amber-500/20 flex items-center justify-center text-amber-500">
                                            <ClockIcon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="text-white font-display font-bold text-sm">RELIABLE SUPPORT</div>
                                            <div className="text-white/40 text-xs font-body normal-case">Maintenance Plans</div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="lg:col-span-5 w-full">
                            <div className="bg-white rounded-lg shadow-2xl shadow-black/60 p-6 md:p-8 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-2 bg-amber-500"></div>
                                <div className="mb-6">
                                    <h3 className="font-display text-2xl font-bold text-iron-900 mb-2">GET A SYSTEM QUOTE</h3>
                                    <p className="text-gray-500 text-sm font-body normal-case">Pricing for gate operators, keypads, and entry systems.</p>
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
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-iron-900 mb-4 uppercase">Why Choose Our Gate Automation</h2>
                        <p className="text-gray-600 text-lg font-body normal-case">
                            We don't just hang gates; we integrate them. Our systems are chosen for reliability in the Texas heat and ease of use for your family.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: ShieldCheckIcon, title: 'Commercial Grade', desc: 'We use high-cycle motors and heavy-duty hardware designed to last thousands of openings without failure.' },
                            { icon: ArrowRightIcon, title: 'Smart Integration', desc: 'Control your gate from your smartphone. Open for guests, check status, and get alerts anywhere in the world.' },
                            { icon: StarIcon, title: 'Backup Power', desc: 'Battery backup systems ensuring your gate still opens during power outages or emergencies.' },
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

            <CTABanner title="Upgrade your security." subtitle="Protect your property with our advanced access control systems." buttonText="Get a Quote" link="/contact#quote" variant="primary" />

            {/* SERVICES — Alternating rows */}
            <section id="services" className="bg-iron-50 py-20 relative overflow-hidden">
                {/* Subtle industrial crosshatch pattern */}
                <div className="absolute inset-0 opacity-[0.05]" style={{
                    backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 30px, #1a1a1a 30px, #1a1a1a 31px), repeating-linear-gradient(-45deg, transparent, transparent 30px, #1a1a1a 30px, #1a1a1a 31px)`
                }}></div>
                <div className="container mx-auto px-6 max-w-7xl relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-iron-900 mb-4 uppercase">Gate Automation &amp; Keypad Options</h2>
                        <div className="h-1.5 w-20 bg-amber-500 mx-auto mb-6"></div>
                        <p className="text-gray-600 font-body normal-case">Select the perfect access solution for your property.</p>
                    </div>

                    <div className="space-y-0">
                        {category.services.map((service, idx) => {
                            const ServiceImage = serviceImageList[idx % serviceImageList.length];
                            const num = String(idx + 1).padStart(2, '0');
                            const isEven = idx % 2 === 0;

                            return (
                                <div key={idx} className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} border border-gray-200 ${idx > 0 ? 'border-t-0' : ''} group hover:border-amber-500 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.08)]`}>
                                    <div className="md:w-1/2 relative overflow-hidden h-72 md:h-auto md:min-h-[320px]">
                                        <img src={ServiceImage} alt={service.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
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

            {/* REVIEWS */}
            <section className="py-24 bg-iron-900 relative overflow-hidden">
                <div className="container mx-auto px-6 max-w-7xl relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 uppercase">Houston Access Control Reviews</h2>
                        <div className="flex items-center justify-center gap-2 text-amber-500 mb-4">
                            {[...Array(5)].map((_, i) => <StarIcon key={i} className="w-5 h-5" filled />)}
                        </div>
                        <p className="text-gray-400 font-body normal-case">Rated 5.0 Stars by Houston Homeowners</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {accessReviews.map((review, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-lg shadow-xl relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1.5 bg-amber-500"></div>
                                <div className="flex gap-1 text-amber-500 mb-4">
                                    {[...Array(5)].map((_, i) => <StarIcon key={i} className="w-4 h-4" filled />)}
                                </div>
                                <p className="text-gray-700 italic mb-6 leading-relaxed font-body normal-case">"{review.text}"</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-iron-900 rounded-md flex items-center justify-center font-display font-bold text-amber-500">{review.name.charAt(0)}</div>
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
                    <h2 className="font-display text-3xl font-bold text-white mb-10 text-center uppercase">Automation <span className="text-amber-500">Questions</span></h2>
                    <div className="grid md:grid-cols-2 gap-5">
                        {[
                            { q: 'Can I automate my existing gate?', a: 'Yes! In most cases, we can retrofit automation to your existing swing or slide gate if it\'s in good structural condition.' },
                            { q: 'What happens if the power goes out?', a: 'We install battery backup units that allow your gate to cycle multiple times during an outage. All gates have a manual release key override.' },
                            { q: 'Is solar power an option?', a: 'Absolutely. Solar-powered openers are great for driveways far from a main power source. We use high-efficiency panels for reliable year-round operation.' },
                            { q: 'How much does gate automation cost?', a: 'Gate automation ranges from $1,200-$5,000+ depending on operator type, gate weight, and accessories. We provide free detailed estimates.' },
                            { q: 'Do you install safety sensors?', a: 'Yes. We include safety sensors (photo eyes) with every installation. These sensors detect vehicles or obstacles in the pathway and prevent the gate from closing on them.' },
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
                            <h2 className="font-display text-3xl font-bold text-iron-900 mb-6 uppercase">For Homeowners Who Want Convenience &amp; Security</h2>
                            <p className="text-gray-600 font-body normal-case leading-relaxed mb-4">
                                You're tired of manually opening your gate every time you come home. Or maybe you need a way to let visitors in from inside your house without walking outside.
                            </p>
                            <p className="text-gray-600 font-body normal-case leading-relaxed">
                                We install reliable gate automation systems—from simple keypad entry to secure remote control access. Every system includes a battery backup so your gate keeps working even during Houston storms.
                            </p>
                        </div>
                        <div className="space-y-4">
                            {['Want to open your gate from the comfort of your car', 'Need a keypad at the driveway', 'Looking for a solar-powered gate opener', 'Need battery backup for power outages', 'Need safety sensors to protect your vehicle'].map((item, idx) => (
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
                        { title: 'Railings', desc: 'Stair railings, balcony rails & handrails.', link: '/railings' },
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
                    <h2 className="font-display text-xl font-bold text-white mb-4 uppercase">Gate Automation Service Areas</h2>
                    <p className="text-gray-400 font-body normal-case text-sm leading-relaxed max-w-3xl mx-auto">
                        JN Ornamental Design installs gate automation and access control systems throughout the Greater Houston metro area. We serve homeowners and businesses in <strong className="text-gray-300">Houston</strong>, <strong className="text-gray-300">Katy</strong>, <strong className="text-gray-300">Sugar Land</strong>, <strong className="text-gray-300">The Woodlands</strong>, <strong className="text-gray-300">Cypress</strong>, <strong className="text-gray-300">Pearland</strong>, <strong className="text-gray-300">Spring</strong>, <strong className="text-gray-300">Missouri City</strong>, <strong className="text-gray-300">Humble</strong>, and all surrounding communities. Contact us for a free gate automation estimate.
                    </p>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0">
                    <img src={fencesFooterLuxury} alt="Luxury Estate Sunset" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/70"></div>
                </div>
                <div className="container mx-auto px-6 max-w-7xl relative z-10">
                    <div className="text-center mb-12">
                        <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 uppercase">Secure Your Entrance Today</h2>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto font-body normal-case">Get a custom quote for your gate automation needs. Professional installation, lasting security.</p>
                    </div>
                    <div className="max-w-xl mx-auto bg-white rounded-lg shadow-2xl p-6 md:p-8">
                        <ContactForm variant="hero" />
                    </div>
                </div>
            </section>

        </div>
    );
};

export default AccessControl;
