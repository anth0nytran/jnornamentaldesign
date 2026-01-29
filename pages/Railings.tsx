import React from 'react';
import { SERVICE_CATEGORIES, BUSINESS_INFO } from '../constants';
import ContactForm from '../components/ContactForm';
import {
    CheckCircleIcon,
    PhoneIcon,
    ServiceIcons,
    StarIcon,
    ArrowRightIcon
} from '../components/Icons';

const Railings: React.FC = () => {
    const category = SERVICE_CATEGORIES.find(c => c.slug === 'railings');

    if (!category) return null;

    return (
        <div className="bg-white">
            {/* Hero Section - Split Layout (No Form) */}
            <section className="relative flex flex-col lg:flex-row min-h-[60vh]">
                {/* Left Column: Text */}
                <div className="lg:w-1/2 bg-navy-950 flex items-center p-12 lg:p-24 relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 bg-grid-white/[0.05] pointer-events-none"></div>

                    <div className="relative z-10 max-w-xl">
                        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8">
                            <span className="flex gap-1 text-amber-500">
                                <StarIcon className="w-3.5 h-3.5" filled />
                                <StarIcon className="w-3.5 h-3.5" filled />
                                <StarIcon className="w-3.5 h-3.5" filled />
                                <StarIcon className="w-3.5 h-3.5" filled />
                                <StarIcon className="w-3.5 h-3.5" filled />
                            </span>
                            <span className="text-sm font-medium text-white/90 tracking-wide border-l border-white/20 pl-2 ml-1">
                                Top Rated Ironwork
                            </span>
                        </div>

                        <h1 className="font-display text-5xl lg:text-7xl font-bold text-white leading-none mb-6">
                            Custom <br />
                            <span className="text-amber-500">Railings</span>
                        </h1>

                        <p className="text-lg text-slate-300 leading-relaxed mb-10 font-light">
                            Safety meets artistry. We fabricate interior and exterior railings that comply with building codes and elevate your design.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <a href="#contact" className="bg-amber-500 hover:bg-amber-400 text-navy-950 px-8 py-4 font-bold rounded-lg transition-colors flex items-center gap-2">
                                Get A Quote <ArrowRightIcon className="w-5 h-5" />
                            </a>
                            <a href="#details" className="border-2 border-slate-700 text-white hover:border-white px-8 py-4 font-bold rounded-lg transition-colors">
                                View Types
                            </a>
                        </div>
                    </div>
                </div>

                {/* Right Column: Large Hero Image */}
                <div className="lg:w-1/2 bg-slate-200 relative min-h-[400px]">
                    <img
                        src={category.heroImage}
                        alt="Custom Railing Fabrication"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-navy-950/10"></div>
                </div>
            </section>

            {/* Intro Stats */}
            <section className="bg-navy-900 border-b border-white/5 text-white py-12">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/10">
                        <div>
                            <div className="text-3xl font-display font-bold text-amber-500 mb-1">Code</div>
                            <div className="text-xs text-slate-400 uppercase tracking-widest">Compliant</div>
                        </div>
                        <div>
                            <div className="text-3xl font-display font-bold text-amber-500 mb-1">Solid</div>
                            <div className="text-xs text-slate-400 uppercase tracking-widest">Installation</div>
                        </div>
                        <div>
                            <div className="text-3xl font-display font-bold text-amber-500 mb-1">Custom</div>
                            <div className="text-xs text-slate-400 uppercase tracking-widest">Finish Options</div>
                        </div>
                        <div>
                            <div className="text-3xl font-display font-bold text-amber-500 mb-1">Interior</div>
                            <div className="text-xs text-slate-400 uppercase tracking-widest">& Exterior</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Detailed Services Section */}
            <section id="details" className="py-24 bg-white">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="text-center mb-20">
                        <span className="text-amber-600 font-bold uppercase tracking-widest text-xs mb-3 block">Railing Types</span>
                        <h2 className="font-display text-4xl font-bold text-navy-950">Safety & Style Options</h2>
                        <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
                            We specialize in all types of metal railing fabrication, from modern horizontal bars to traditional ornamental scrolls.
                        </p>
                    </div>

                    <div className="space-y-20">
                        {category.services.map((service, idx) => {
                            const Icon = ServiceIcons[service.icon] || ServiceIcons.rail;
                            const isEven = idx % 2 === 0;

                            return (
                                <div key={idx} className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-start`}>
                                    {/* Icon/Visual Side */}
                                    <div className="md:w-1/3 flex-shrink-0">
                                        <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 text-center relative overflow-hidden group hover:border-amber-200 transition-colors">
                                            <div className="w-20 h-20 bg-white rounded-full mx-auto flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform">
                                                <Icon className="w-10 h-10 text-amber-600" />
                                            </div>
                                            <h3 className="font-display text-2xl font-bold text-navy-950 mb-2">{service.title}</h3>
                                            <div className="inline-block px-3 py-1 bg-navy-100 text-navy-800 text-xs font-bold rounded-full uppercase tracking-wide">
                                                Precision Made
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content Side */}
                                    <div className="md:w-2/3">
                                        <h3 className="text-2xl font-bold text-navy-950 mb-4 flex items-center gap-3">
                                            {service.title} Specs
                                            <div className="h-px flex-1 bg-slate-200"></div>
                                        </h3>

                                        <p className="text-lg text-slate-600 leading-relaxed mb-8">
                                            {service.description} We ensure proper anchoring to your specific substrate (wood, concrete, or stone) for maximum rigidity and safety.
                                        </p>

                                        <div className="bg-slate-50 p-6 rounded-xl border-l-4 border-amber-500">
                                            <h4 className="font-bold text-navy-900 mb-4 text-sm uppercase tracking-wide">Design & Safety Features</h4>
                                            <div className="grid sm:grid-cols-2 gap-4">
                                                {service.features?.map((f, i) => (
                                                    <div key={i} className="flex items-start gap-2">
                                                        <CheckCircleIcon className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                                        <span className="text-slate-700 text-sm font-medium">{f}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Large Gallery Grid */}
            <section className="py-24 bg-slate-50">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="mb-12">
                        <h2 className="font-display text-4xl font-bold text-navy-950 mb-4">Railing Gallery</h2>
                        <p className="text-slate-500">Examples of our interior and exterior handrail projects.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {category.gallery.map((img, idx) => (
                            <div key={idx} className="group relative aspect-[16/10] overflow-hidden rounded-xl shadow-lg bg-navy-900">
                                <img
                                    src={img}
                                    alt={`Railing ${idx}`}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-white font-bold text-lg">View Details</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bottom Contact Form */}
            <section id="contact" className="py-24 bg-white">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="bg-navy-950 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
                        {/* Background Pattern */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>

                        <div className="relative z-10 text-center mb-12">
                            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6">Start Your Project</h2>
                            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
                                Upload your sketches or photos for a quote, or schedule an on-site consultation.
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl p-6 md:p-8">
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Railings;
