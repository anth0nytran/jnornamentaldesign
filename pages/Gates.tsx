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

const Gates: React.FC = () => {
    const category = SERVICE_CATEGORIES.find(c => c.slug === 'gates');

    if (!category) return null;

    return (
        <div className="bg-white">
            {/* Hero Section - Full Width, Immersive */}
            <section className="relative h-[65vh] min-h-[500px] flex items-center justify-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={category.heroImage}
                        alt="Custom Gates"
                        className="w-full h-full object-cover"
                    />
                    {/* Dark Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-navy-950/70"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-8 shadow-lg">
                        <div className="flex -space-x-1">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center border border-navy-950">
                                    <StarIcon className="w-2.5 h-2.5 text-navy-950" filled />
                                </div>
                            ))}
                        </div>
                        <span className="text-sm font-semibold text-white tracking-wide ml-2">
                            Top Rated Gates
                        </span>
                    </div>

                    <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight drop-shadow-xl">
                        Grand <span className="text-amber-500">Entrances</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-slate-100 font-light max-w-2xl mx-auto mb-10 leading-relaxed shadow-black drop-shadow-md">
                        Custom designed iron gates. Engineered for smooth operation and timeless beauty.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="#contact" className="bg-amber-500 hover:bg-amber-400 text-navy-950 px-10 py-4 font-bold rounded-lg transition-transform hover:scale-105 shadow-xl flex items-center justify-center gap-2">
                            Design Your Gate <ArrowRightIcon className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </section>

            {/* STRIPED Services Section - Zero Whitespace */}
            <section id="services">
                {/* Intro */}
                <div className="bg-white py-16 text-center px-6">
                    <span className="text-amber-600 font-bold uppercase tracking-widest text-xs mb-3 block">Design Collection</span>
                    <h2 className="font-display text-4xl font-bold text-navy-950">Gate Styles</h2>
                    <div className="w-20 h-1 bg-amber-500 mx-auto mt-6"></div>
                </div>

                {/* Full-Width Service Rows */}
                <div className="flex flex-col">
                    {category.services.map((service, idx) => {
                        const Icon = ServiceIcons[service.icon] || ServiceIcons.gate;
                        const isEven = idx % 2 === 0;
                        const bgClass = isEven ? 'bg-slate-50' : 'bg-white';

                        return (
                            <div key={idx} className={`${bgClass} py-20 lg:py-24 border-b border-slate-100`}>
                                <div className="container mx-auto px-6 max-w-7xl">
                                    <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-center`}>

                                        {/* Visual Side */}
                                        <div className="lg:w-1/2 w-full">
                                            {/* Placeholder for service specific image - using hero image if no service image, but styled nicely */}
                                            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group">
                                                <div className="absolute inset-0 bg-navy-900/10 group-hover:bg-transparent transition-colors"></div>
                                                <img src={category.heroImage} alt={service.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />

                                                {/* Floating Icon Card */}
                                                <div className="absolute -bottom-6 -right-6 lg:bottom-8 lg:-left-8 bg-white p-6 rounded-xl shadow-xl border border-slate-100 z-10 hidden md:block">
                                                    <Icon className="w-12 h-12 text-amber-600" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Text Side */}
                                        <div className="lg:w-1/2 w-full">
                                            <div className="inline-block p-3 bg-amber-100 rounded-lg mb-6">
                                                <Icon className="w-8 h-8 text-amber-600" />
                                            </div>

                                            <h3 className="font-display text-3xl md:text-4xl font-bold text-navy-950 mb-6">
                                                {service.title}
                                            </h3>

                                            <p className="text-lg text-slate-600 leading-relaxed mb-8">
                                                {service.description} Handcrafted in our Houston workshop with attention to every joint and scroll.
                                            </p>

                                            <div className="bg-white/50 rounded-xl border border-slate-200 p-6">
                                                <h4 className="font-bold text-navy-900 mb-4 text-sm uppercase tracking-wide flex items-center gap-2">
                                                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                                                    Design & Engineering
                                                </h4>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                                                    {service.features?.map((f, i) => (
                                                        <div key={i} className="flex items-center gap-3">
                                                            <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                                                            <span className="text-slate-700 font-medium text-sm">{f}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Full Width Gallery Grid - No Padding Whitespace */}
            <section className="bg-navy-950 text-white py-24">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                        <div className="max-w-xl">
                            <h2 className="font-display text-4xl font-bold mb-4">Masterpiece Collection</h2>
                            <p className="text-slate-400 text-lg">
                                A showcase of our finest custom driveway and estate gates.
                            </p>
                        </div>
                        <a href="#contact" className="text-amber-500 font-bold hover:text-amber-400 transition-colors flex items-center gap-2">
                            Get A Quote <ArrowRightIcon className="w-5 h-5" />
                        </a>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                        {category.gallery.map((img, idx) => (
                            <div key={idx} className="group relative h-80 md:h-[500px] overflow-hidden bg-navy-900 grayscale-[20%] hover:grayscale-0 transition-all duration-500">
                                <img
                                    src={img}
                                    alt={`Project ${idx}`}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                                />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-300"></div>
                                <div className="absolute bottom-6 left-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                    <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-white text-sm font-bold">
                                        View Details
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bottom Contact Form */}
            <section id="contact" className="relative bg-white py-24 lg:py-32">
                <div className="container mx-auto px-6 max-w-4xl relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="font-display text-4xl md:text-6xl font-bold text-navy-950 mb-6">Let's Build It</h2>
                        <p className="text-xl text-slate-500 max-w-2xl mx-auto">
                            From sketch to installation, we handle the entire gate fabrication process.
                        </p>
                    </div>

                    <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-8 md:p-12 relative overflow-hidden">
                        <div className="absolute top-0 w-full h-2 bg-gradient-to-r from-amber-500 via-navy-600 to-amber-500"></div>
                        <ContactForm />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Gates;
