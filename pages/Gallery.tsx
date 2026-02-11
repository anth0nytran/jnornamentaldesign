import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CloseIcon } from '../components/Icons';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import SchemaMarkup from '../components/SchemaMarkup';
import { GALLERY_IMAGES } from '../galleryData';

// ── Derive category filters from the data ────────────────────
const CATEGORIES = ['All', ...Array.from(new Set(GALLERY_IMAGES.map(img => img.category)))];

const Gallery: React.FC = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    const [lightbox, setLightbox] = useState<number | null>(null);

    const filtered = activeFilter === 'All'
        ? GALLERY_IMAGES
        : GALLERY_IMAGES.filter(img => img.category === activeFilter);

    const openLightbox = (idx: number) => setLightbox(idx);
    const closeLightbox = () => setLightbox(null);
    const nextImage = () => setLightbox(prev => prev !== null ? (prev + 1) % filtered.length : null);
    const prevImage = () => setLightbox(prev => prev !== null ? (prev - 1 + filtered.length) % filtered.length : null);

    return (
        <div className="bg-white font-body selection:bg-amber-500 selection:text-black overflow-x-hidden">
            <SEOHead
                title="Project Gallery | Custom Iron Work Houston | JN Ornamental Design"
                description="Browse completed projects by JN Ornamental Design. Custom iron fences, gates, railings, and access control systems in Houston, TX. See our craftsmanship."
                canonical="https://jnornamentaldesign.com/gallery"
                keywords="iron work gallery houston, custom gate photos, fence portfolio houston tx, railing project photos, ornamental iron examples"
            />
            <SchemaMarkup type="ImageGallery" pageUrl="https://jnornamentaldesign.com/gallery" />

            {/* ── HERO ─────────────────────────────────────────── */}
            <section className="relative py-24 bg-iron-900 overflow-hidden">
                <div className="absolute inset-0 opacity-5" style={{
                    backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.03) 20px, rgba(255,255,255,0.03) 21px)`
                }}></div>

                <div className="container mx-auto px-6 max-w-7xl relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <div className="inline-flex items-center gap-3 bg-amber-500 px-5 py-2 mb-6">
                            <span className="text-sm font-display font-bold text-black tracking-widest uppercase">
                                Our Work
                            </span>
                        </div>
                        <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6 leading-tight uppercase">
                            Our Custom Ironwork <span className="text-amber-500">Projects in Houston TX</span>
                        </h1>
                        <p className="text-xl text-gray-300 font-body font-light leading-relaxed normal-case">
                            Browse our completed projects across Houston. Every gate, fence, railing, and access system is custom fabricated in our shop.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ── FILTER BAR ──────────────────────────────────── */}
            <section className="sticky top-[60px] z-30 bg-white border-b border-gray-200 shadow-sm">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="flex items-center gap-2 py-4 overflow-x-auto no-scrollbar">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveFilter(cat)}
                                className={`px-5 py-2 font-display font-bold text-sm uppercase tracking-widest whitespace-nowrap transition-all
                                    ${activeFilter === cat
                                        ? 'bg-iron-900 text-amber-500'
                                        : 'bg-iron-50 text-gray-500 hover:bg-iron-900 hover:text-white'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                        <div className="ml-auto text-sm text-gray-400 font-body normal-case whitespace-nowrap">
                            {filtered.length} project{filtered.length !== 1 ? 's' : ''}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── MASONRY GALLERY GRID ─────────────────────────── */}
            <section className="py-16 bg-iron-50">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div
                        style={{
                            columnCount: 3,
                            columnGap: '1.5rem',
                        }}
                        className="masonry-gallery"
                    >
                        <AnimatePresence mode="popLayout">
                            {filtered.map((img, idx) => (
                                <motion.div
                                    key={img.alt + img.category}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                    className="group relative overflow-hidden rounded-lg bg-gray-200 shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer mb-6"
                                    style={{ breakInside: 'avoid' }}
                                    onClick={() => openLightbox(idx)}
                                >
                                    {img.type === 'video' ? (
                                        <video
                                            src={img.src}
                                            className="w-full h-auto block transition-transform duration-700 group-hover:scale-105"
                                            muted
                                            loop
                                            playsInline
                                            preload="metadata"
                                            onMouseEnter={(e) => (e.target as HTMLVideoElement).play()}
                                            onMouseLeave={(e) => { const v = e.target as HTMLVideoElement; v.pause(); v.currentTime = 0; }}
                                        />
                                    ) : (
                                        <img
                                            src={img.src}
                                            alt={img.alt}
                                            className="w-full h-auto block transition-transform duration-700 group-hover:scale-110"
                                            loading="lazy"
                                        />
                                    )}

                                    {/* Hover overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                    {/* Caption */}
                                    <div className="absolute bottom-0 left-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                        <span className="text-amber-500 text-xs font-display font-bold uppercase tracking-wider mb-1 block">{img.category}</span>
                                        <h3 className="text-white font-display text-base font-bold leading-tight">{img.alt}</h3>
                                    </div>

                                    {/* Number badge */}
                                    <div className="absolute top-4 right-4 bg-amber-500 text-black font-display font-bold text-xs px-3 py-1 tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                                        {String(idx + 1).padStart(2, '0')}
                                    </div>

                                    {/* Video play icon */}
                                    {img.type === 'video' && (
                                        <div className="absolute top-4 left-4 bg-black/60 text-white rounded-full w-10 h-10 flex items-center justify-center backdrop-blur-sm">
                                            <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 20 20"><polygon points="5,3 19,10 5,17" /></svg>
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {filtered.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-gray-400 font-display text-xl">No projects in this category yet.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* ── CTA ─────────────────────────────────────────── */}
            <section className="py-20 bg-iron-900">
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 uppercase">Ready to Start Your Project?</h2>
                    <p className="text-gray-400 mb-8 font-body normal-case text-lg">Get a free, no-obligation estimate. We'll bring every detail from concept to completion.</p>
                    <Link to="/contact#quote" className="btn-primary inline-flex items-center gap-3 text-base">
                        Request an Estimate
                    </Link>
                </div>
            </section>

            {/* ── LIGHTBOX ────────────────────────────────────── */}
            <AnimatePresence>
                {lightbox !== null && filtered[lightbox] && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center"
                        onClick={closeLightbox}
                    >
                        {/* Close */}
                        <button onClick={closeLightbox} className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors z-10">
                            <CloseIcon className="w-8 h-8" />
                        </button>

                        {/* Prev */}
                        <button
                            onClick={(e) => { e.stopPropagation(); prevImage(); }}
                            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-amber-500 text-white hover:text-black flex items-center justify-center transition-all z-10"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                        </button>

                        {/* Next */}
                        <button
                            onClick={(e) => { e.stopPropagation(); nextImage(); }}
                            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-amber-500 text-white hover:text-black flex items-center justify-center transition-all z-10"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        </button>

                        {/* Content */}
                        <div className="max-w-5xl max-h-[85vh] w-full px-4" onClick={(e) => e.stopPropagation()}>
                            {filtered[lightbox].type === 'video' ? (
                                <video
                                    src={filtered[lightbox].src}
                                    className="w-full max-h-[75vh] object-contain rounded-lg"
                                    controls
                                    autoPlay
                                    playsInline
                                />
                            ) : (
                                <img
                                    src={filtered[lightbox].src}
                                    alt={filtered[lightbox].alt}
                                    className="w-full h-full object-contain rounded-lg"
                                />
                            )}
                            <div className="text-center mt-4">
                                <span className="text-amber-500 text-xs font-display font-bold uppercase tracking-wider">{filtered[lightbox].category}</span>
                                <h3 className="text-white font-display text-xl font-bold mt-1">{filtered[lightbox].alt}</h3>
                                <p className="text-white/40 text-sm mt-2 font-body">{lightbox + 1} / {filtered.length}</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
};

export default Gallery;
