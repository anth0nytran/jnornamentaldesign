import React, { useState, useMemo, useCallback } from 'react';
import { Review } from '../types';
import { StarIcon, CheckCircleIcon, GoogleIcon, ArrowRightIcon } from './Icons';

interface ReviewCarouselProps {
    reviews: Review[];
    /** Number of cards visible at each breakpoint: [mobile, tablet, desktop] */
    perPage?: [number, number, number];
    /** Background variant */
    variant?: 'dark' | 'light';
    /** Section title */
    title?: string;
    /** Override subtitle */
    subtitle?: string;
}

/* ── Thumbtack icon (inline SVG to avoid adding a dependency) ── */
const ThumbIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.22.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zM18.9 17A9.969 9.969 0 0020 12c0-4.97-3.63-9.08-8.38-9.86v.01C13.05 2.73 14 4.23 14 6v1l4 4v1h-2l-3.27 3.27c.07.34.27.63.56.79L16 17h2.9z" />
    </svg>
);

/* ── Source badge ── */
const SourceBadge: React.FC<{ source: Review['source'] }> = ({ source }) => {
    switch (source) {
        case 'Google':
            return (
                <div className="flex items-center gap-1 text-[10px] font-display font-bold text-gray-500 uppercase tracking-wider bg-gray-100 px-2 py-1">
                    <GoogleIcon className="w-3 h-3" />
                    Google
                </div>
            );
        case 'Yelp':
            return (
                <div className="flex items-center gap-1 text-[10px] font-display font-bold text-red-600 uppercase tracking-wider bg-red-50 px-2 py-1">
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M12.725 2.117C12.156 1.396 10.553 2.259 9.6 2.8c-1.267.72-3.108 1.885-3.21 2.33-.11.476 1.133 3.54 1.587 4.576.19.432.67.52 1.075.29l3.087-1.756c.405-.23.547-.716.345-1.14-.534-1.125-1.33-2.803-1.33-2.803s1.977-1.62 1.571-2.18zM7.56 12.224c-.456-.175-.905.072-1.008.536l-.761 3.454c-.103.464.172.924.62 1.12.93.405 2.652 1.067 3.24 1.024.546-.04.738-.627.484-1.127L7.56 12.224zm.69-2.433c.424.24.95.088 1.178-.34L12.7 3.818c.227-.427.052-.954-.392-1.172C11.378 2.22 9.617 1.6 9.046 1.68c-.532.074-.662.677-.374 1.147l2.578 4.964zm4.15 1.08l-3.087 1.756c-.405.23-.547.716-.345 1.14l2.578 4.964c.288.47.95.553 1.38.19.712-.598 1.884-1.707 2.174-2.149.34-.52-.206-1.065-.615-1.325L7.56 12.224z" /></svg>
                    Yelp
                </div>
            );
        case 'Thumbtack':
            return (
                <div className="flex items-center gap-1 text-[10px] font-display font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-2 py-1">
                    <ThumbIcon className="w-3 h-3" />
                    Thumbtack
                </div>
            );
        default:
            return null;
    }
};

/* ── Review Card ── */
const MAX_TEXT_LENGTH = 220; // characters before truncation

const ReviewCard: React.FC<{ review: Review }> = ({ review }) => {
    const [expanded, setExpanded] = useState(false);
    const isLong = review.text.length > MAX_TEXT_LENGTH;
    const displayText = isLong && !expanded
        ? review.text.slice(0, MAX_TEXT_LENGTH).replace(/\s+\S*$/, '') + '…'
        : review.text;

    return (
        <div className="bg-white rounded-lg p-6 md:p-8 shadow-xl relative overflow-hidden flex flex-col h-full">
            {/* Yellow top bar */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-amber-500" />

            <div className="flex items-center justify-between mb-4">
                <div className="flex gap-1 text-amber-500">
                    {[...Array(review.stars)].map((_, i) => (
                        <StarIcon key={i} className="w-4 h-4" filled />
                    ))}
                </div>
                <SourceBadge source={review.source} />
            </div>

            {review.project && (
                <div className="text-xs font-display font-bold text-amber-600 uppercase tracking-wider mb-3">
                    {review.project}
                </div>
            )}

            <div className="flex-grow mb-6">
                <p className="text-gray-700 leading-relaxed text-sm font-body normal-case italic">
                    "{displayText}"
                </p>
                {isLong && (
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="text-amber-600 font-display font-bold text-xs uppercase tracking-wider mt-2 hover:text-amber-500 transition-colors"
                    >
                        {expanded ? 'Read Less' : 'Read More'}
                    </button>
                )}
            </div>

            <div className="flex items-center gap-4 mt-auto pt-4 border-t border-gray-100">
                <div className="w-10 h-10 bg-iron-900 text-amber-500 font-display font-bold flex items-center justify-center text-lg rounded-md flex-shrink-0">
                    {review.name.charAt(0)}
                </div>
                <div>
                    <div className="font-display font-bold text-iron-900 text-sm">{review.name}</div>
                    <div className="text-xs text-gray-500 font-body normal-case">Houston, TX</div>
                </div>
            </div>
        </div>
    );
};

/* ── Chevron Arrow ── */
const ChevronLeft: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 19l-7-7 7-7" />
    </svg>
);
const ChevronRight: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 5l7 7-7 7" />
    </svg>
);

/* ═══════════════════════════════════════════════════════════
   ReviewCarousel — paginated, responsive, lightweight
   ═══════════════════════════════════════════════════════════ */
const ReviewCarousel: React.FC<ReviewCarouselProps> = ({
    reviews,
    variant = 'dark',
    title = 'What Our Customers Say',
    subtitle,
}) => {
    const [page, setPage] = useState(0);

    // Responsive cards-per-page via CSS class + JS breakpoint detection
    const [cols, setCols] = useState(3);
    React.useEffect(() => {
        const update = () => {
            const w = window.innerWidth;
            if (w < 768) setCols(1);
            else if (w < 1024) setCols(2);
            else setCols(3);
        };
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);

    const totalPages = useMemo(() => Math.ceil(reviews.length / cols), [reviews.length, cols]);

    // Clamp page when cols/reviews change
    React.useEffect(() => {
        setPage((p) => Math.min(p, totalPages - 1));
    }, [totalPages]);

    const currentReviews = useMemo(
        () => reviews.slice(page * cols, page * cols + cols),
        [reviews, page, cols]
    );

    const prev = useCallback(() => setPage((p) => Math.max(0, p - 1)), []);
    const next = useCallback(() => setPage((p) => Math.min(totalPages - 1, p + 1)), [totalPages]);

    const isDark = variant === 'dark';

    return (
        <section className={`py-20 relative overflow-hidden ${isDark ? 'bg-iron-900' : 'bg-iron-50'}`}>
            {isDark && (
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent pointer-events-none" />
            )}

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">
                    <div>
                        <span className={`text-amber-500 font-display font-bold uppercase tracking-widest text-xs mb-3 block`}>
                            Customer Reviews
                        </span>
                        <h2 className={`font-display text-3xl md:text-4xl font-bold uppercase ${isDark ? 'text-white' : 'text-iron-900'}`}>
                            {title}
                        </h2>
                        {subtitle && (
                            <p className={`mt-3 text-base font-body normal-case ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                {subtitle}
                            </p>
                        )}
                    </div>

                    {/* Desktop navigation arrows */}
                    <div className="hidden md:flex items-center gap-3">
                        <span className={`text-sm font-display font-bold mr-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            {page + 1} / {totalPages}
                        </span>
                        <button
                            onClick={prev}
                            disabled={page === 0}
                            className={`w-11 h-11 rounded-md border-2 flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed ${isDark
                                ? 'border-white/20 text-white hover:bg-amber-500 hover:border-amber-500 hover:text-black'
                                : 'border-gray-300 text-iron-900 hover:bg-amber-500 hover:border-amber-500 hover:text-black'
                                }`}
                            aria-label="Previous reviews"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={next}
                            disabled={page === totalPages - 1}
                            className={`w-11 h-11 rounded-md border-2 flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed ${isDark
                                ? 'border-white/20 text-white hover:bg-amber-500 hover:border-amber-500 hover:text-black'
                                : 'border-gray-300 text-iron-900 hover:bg-amber-500 hover:border-amber-500 hover:text-black'
                                }`}
                            aria-label="Next reviews"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Review Cards Grid */}
                <div
                    className="grid gap-6 transition-opacity duration-300"
                    style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
                >
                    {currentReviews.map((review, idx) => (
                        <ReviewCard key={`${review.name}-${page}-${idx}`} review={review} />
                    ))}
                </div>

                {/* Mobile navigation */}
                <div className="flex md:hidden items-center justify-center gap-4 mt-8">
                    <button
                        onClick={prev}
                        disabled={page === 0}
                        className="w-10 h-10 rounded-md border-2 border-white/20 text-white flex items-center justify-center disabled:opacity-30"
                        aria-label="Previous reviews"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    {/* Dot indicators */}
                    <div className="flex gap-1.5">
                        {Array.from({ length: totalPages }).map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setPage(i)}
                                className={`w-2 h-2 rounded-full transition-all ${i === page ? 'bg-amber-500 w-6' : isDark ? 'bg-white/30' : 'bg-gray-300'
                                    }`}
                                aria-label={`Go to page ${i + 1}`}
                            />
                        ))}
                    </div>
                    <button
                        onClick={next}
                        disabled={page === totalPages - 1}
                        className="w-10 h-10 rounded-md border-2 border-white/20 text-white flex items-center justify-center disabled:opacity-30"
                        aria-label="Next reviews"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>

                {/* JSON-LD Structured Data for SEO */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'LocalBusiness',
                            name: 'JN Ornamental Design LLC',
                            aggregateRating: {
                                '@type': 'AggregateRating',
                                ratingValue: '4.9',
                                reviewCount: String(reviews.length),
                                bestRating: '5',
                            },
                            review: reviews.slice(0, 10).map((r) => ({
                                '@type': 'Review',
                                author: { '@type': 'Person', name: r.name },
                                reviewRating: {
                                    '@type': 'Rating',
                                    ratingValue: String(r.stars),
                                    bestRating: '5',
                                },
                                reviewBody: r.text,
                            })),
                        }),
                    }}
                />
            </div>
        </section>
    );
};

export default React.memo(ReviewCarousel);
