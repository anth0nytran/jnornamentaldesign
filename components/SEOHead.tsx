import React, { useEffect } from 'react';

interface SEOHeadProps {
    title: string;
    description: string;
    canonical?: string;
    ogImage?: string;
    ogType?: string;
    keywords?: string;
}

/**
 * SEOHead — sets per-page <title>, meta description, canonical, OG & Twitter cards.
 * Works by manipulating document.head directly (no react-helmet dependency).
 */
const SEOHead: React.FC<SEOHeadProps> = ({
    title,
    description,
    canonical,
    ogImage = 'https://jnornamentaldesign.com/og-default.png',
    ogType = 'website',
    keywords,
}) => {
    useEffect(() => {
        // Title
        document.title = title;

        // Helper to upsert a <meta> tag
        const setMeta = (attr: string, key: string, content: string) => {
            let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
            if (!el) {
                el = document.createElement('meta');
                el.setAttribute(attr, key);
                document.head.appendChild(el);
            }
            el.setAttribute('content', content);
        };

        // Helper to upsert a <link> tag
        const setLink = (rel: string, href: string) => {
            let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
            if (!el) {
                el = document.createElement('link');
                el.setAttribute('rel', rel);
                document.head.appendChild(el);
            }
            el.setAttribute('href', href);
        };

        // Standard meta
        setMeta('name', 'description', description);
        if (keywords) setMeta('name', 'keywords', keywords);

        // Canonical
        if (canonical) {
            setLink('canonical', canonical);
        }

        // Open Graph
        setMeta('property', 'og:title', title);
        setMeta('property', 'og:description', description);
        setMeta('property', 'og:type', ogType);
        setMeta('property', 'og:image', ogImage);
        if (canonical) setMeta('property', 'og:url', canonical);
        setMeta('property', 'og:site_name', 'JN Ornamental Design');

        // Twitter Card
        setMeta('name', 'twitter:card', 'summary_large_image');
        setMeta('name', 'twitter:title', title);
        setMeta('name', 'twitter:description', description);
        setMeta('name', 'twitter:image', ogImage);

        // Cleanup: reset to defaults on unmount so stale meta doesn't linger
        return () => {
            document.title = 'JN Ornamental Design | Custom Iron Fencing & Gates | Houston TX';
        };
    }, [title, description, canonical, ogImage, ogType, keywords]);

    return null; // Renders nothing — side-effect only
};

export default SEOHead;
