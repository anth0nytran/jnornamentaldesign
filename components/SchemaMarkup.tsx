import React, { useEffect } from 'react';
import { BUSINESS_INFO } from '../constants';

type SchemaType = 'LocalBusiness' | 'Service' | 'FAQPage' | 'ContactPage' | 'ImageGallery';

interface FAQItem {
    question: string;
    answer: string;
}

interface SchemaMarkupProps {
    type: SchemaType;
    /** Page-specific data */
    serviceName?: string;
    serviceDescription?: string;
    faqs?: FAQItem[];
    pageUrl?: string;
}

const BASE_URL = 'https://jnornamentaldesign.com';

function buildLocalBusinessSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': `${BASE_URL}/#business`,
        name: BUSINESS_INFO.name,
        alternateName: 'JN Ornamental',
        description: 'Custom wrought iron fences, gates, railings, and access control systems in Houston, TX. Family-owned since 2016.',
        url: BASE_URL,
        telephone: BUSINESS_INFO.phone,
        email: BUSINESS_INFO.email,
        address: {
            '@type': 'PostalAddress',
            streetAddress: '410 Northville St, Unit A',
            addressLocality: 'Houston',
            addressRegion: 'TX',
            postalCode: '77038',
            addressCountry: 'US',
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: 29.8543,
            longitude: -95.3919,
        },
        areaServed: BUSINESS_INFO.serviceAreas.map(area => ({
            '@type': 'City',
            name: area,
        })),
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: String(BUSINESS_INFO.rating),
            reviewCount: String(BUSINESS_INFO.reviewCount),
            bestRating: '5',
        },
        priceRange: '$$',
        openingHoursSpecification: [
            {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                opens: '08:00',
                closes: '18:00',
            },
            {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: 'Saturday',
                opens: '09:00',
                closes: '16:00',
            },
        ],
        sameAs: [
            BUSINESS_INFO.socialLinks.facebook,
            BUSINESS_INFO.socialLinks.instagram,
            BUSINESS_INFO.socialLinks.tiktok,
        ].filter(Boolean),
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Ornamental Iron Services',
            itemListElement: [
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Custom Iron Fences' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Custom Gates & Driveway Gates' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Stair Railings & Handrails' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Gate Automation & Access Control' } },
            ],
        },
    };
}

function buildServiceSchema(name: string, description: string, pageUrl: string) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name,
        description,
        provider: {
            '@type': 'LocalBusiness',
            name: BUSINESS_INFO.name,
            '@id': `${BASE_URL}/#business`,
        },
        areaServed: {
            '@type': 'City',
            name: 'Houston',
            '@id': 'https://www.wikidata.org/wiki/Q16555',
        },
        url: pageUrl,
    };
}

function buildFAQSchema(faqs: FAQItem[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(faq => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    };
}

const SchemaMarkup: React.FC<SchemaMarkupProps> = ({
    type,
    serviceName,
    serviceDescription,
    faqs,
    pageUrl,
}) => {
    const schemas: object[] = [];

    if (type === 'LocalBusiness') {
        schemas.push(buildLocalBusinessSchema());
    }

    if (type === 'Service' && serviceName && serviceDescription && pageUrl) {
        schemas.push(buildServiceSchema(serviceName, serviceDescription, pageUrl));
    }

    if ((type === 'FAQPage' || type === 'Service') && faqs && faqs.length > 0) {
        schemas.push(buildFAQSchema(faqs));
    }

    // For Service, ContactPage, and ImageGallery pages, also append a LocalBusiness reference
    if (type === 'Service' || type === 'ContactPage' || type === 'ImageGallery') {
        schemas.push(buildLocalBusinessSchema());
    }

    return (
        <>
            {schemas.map((schema, idx) => (
                <script
                    key={idx}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                />
            ))}
        </>
    );
};

export default SchemaMarkup;
