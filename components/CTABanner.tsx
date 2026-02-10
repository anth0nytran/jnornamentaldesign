import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from './Icons';

interface CTABannerProps {
    title: string;
    subtitle?: string;
    buttonText: string;
    link: string;
    variant?: 'primary' | 'secondary';
}

const CTABanner: React.FC<CTABannerProps> = ({
    title,
    subtitle,
    buttonText,
    link,
    variant = 'primary'
}) => {
    const isPrimary = variant === 'primary';

    return (
        <section className={`py-16 ${isPrimary ? 'bg-iron-900' : 'bg-iron-50'} relative overflow-hidden`}>
            {/* Subtle diagonal lines for industrial feel */}
            {isPrimary && (
                <div className="absolute inset-0 opacity-5"
                    style={{
                        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 20px, #E8A317 20px, #E8A317 21px)`,
                    }}>
                </div>
            )}

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                    <div className="max-w-2xl">
                        <h2 className={`font-display text-3xl md:text-4xl font-bold mb-4 ${isPrimary ? 'text-white' : 'text-iron-900'}`}>
                            {title}
                        </h2>
                        {subtitle && (
                            <p className={`text-lg font-body normal-case ${isPrimary ? 'text-gray-300' : 'text-gray-600'}`}>
                                {subtitle}
                            </p>
                        )}
                    </div>

                    <div className="flex-shrink-0">
                        <Link
                            to={link}
                            className={`
                                inline-flex items-center gap-3 px-8 py-4 rounded-md font-display font-bold text-lg uppercase tracking-wider transition-all transform hover:scale-105 shadow-lg
                                ${isPrimary
                                    ? 'bg-amber-500 text-black hover:bg-amber-400 shadow-amber-900/20'
                                    : 'bg-iron-900 text-white hover:bg-iron-800 shadow-iron-900/10'}
                            `}
                        >
                            {buttonText}
                            <ArrowRightIcon className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTABanner;
