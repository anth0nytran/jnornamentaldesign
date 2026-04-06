/**
 * Shared spam-detection utility for all form submissions.
 * Returns { blocked: true, reason } or { blocked: false }.
 */

interface SpamCheckInput {
    name?: string;
    phone?: string;
    email?: string;
    message?: string;
    website?: string;         // honeypot field
    _formLoadedAt?: number;   // timestamp when form was rendered
}

interface SpamResult {
    blocked: boolean;
    reason?: string;
}

// ── Blocklisted email domain patterns ──────────────────────────
const BLOCKED_DOMAIN_PATTERNS = [
    /^search-/i,
    /^seo-/i,
    /^register-/i,
    /^indexing-/i,
    /^ranking-/i,
    /^boost-/i,
    /^submit-/i,
    /^listing-/i,
    /^directory-/i,
    /^webmaster-/i,
    /^marketing-/i,
    /^leads?-/i,
    /web.?design/i,
    /web.?develop/i,
    /seo/i,
    /marketing/i,
];

const BLOCKED_DOMAINS_EXACT = new Set([
    'searchregister.info',
    'search-landeroselectrical.com',
    'webcrawler-index.com',
    'seosearchindex.com',
    'google-index-now.com',
    'submitwebsite.info',
    'addurl.info',
    'wpwebbdesignings.com',
]);

// ── Blocklisted message phrases ────────────────────────────────
const BLOCKED_PHRASES = [
    // SEO / indexing spam
    'search indexing',
    'web search results',
    'enlist',
    'searchregister',
    'add your site',
    'submit your url',
    'boost your ranking',
    'google search indexing',
    'displayed in web search',
    'index your website',
    'index your site',
    'search engine registration',
    'search engine submission',
    'be displayed in',
    'web crawl',
    'website indexing',
    'get indexed',
    'google indexing',
    'website submission',
    'domain registration',
    'link building',
    'backlink',
    'seo service',
    'page rank',
    'search ranking',
    // Web design / marketing solicitation spam
    'web design service',
    'app design service',
    'website redesign',
    'web and app design',
    'wordpress web design',
    'i recently visited your website',
    'i visited your website',
    'noticed a few areas',
    'improve your website',
    'enhance user experience',
    'samples of my past work',
    'client testimonials',
    'company profile',
    'modern redesign',
    'mobile-friendly',
    'google compliance',
    'web security and google',
    // Opt-out / unsubscribe language (hallmark of bulk spam)
    'respond with stop',
    'reply stop',
    'reply with stop',
    'opt out',
    'optout',
    'unsubscribe',
    // Generic marketing / lead-gen spam
    'digital marketing service',
    'social media marketing',
    'increase your traffic',
    'grow your business online',
    'online presence',
    'lead generation',
    'marketing strategy',
    'marketing campaign',
    'i can help your business',
    'we can help your business',
    'affordable web',
    'free consultation',
    'free quote for',
    'free audit',
    'complimentary audit',
];

export function checkSpam(input: SpamCheckInput): SpamResult {
    // 1. Honeypot — hidden field should be empty
    if (input.website) {
        return { blocked: true, reason: 'honeypot' };
    }

    // 2. Timing — form submitted too fast (< 3 seconds)
    if (input._formLoadedAt) {
        const elapsed = Date.now() - input._formLoadedAt;
        if (elapsed < 3000) {
            return { blocked: true, reason: 'timing' };
        }
    }

    // 3. Phone format — must be exactly 10 digits after stripping formatting
    if (input.phone) {
        const digits = input.phone.replace(/\D/g, '');
        if (digits.length !== 10) {
            return { blocked: true, reason: 'invalid-phone' };
        }
    }

    // 4. Email domain blocklist
    if (input.email) {
        const domain = input.email.split('@')[1]?.toLowerCase();
        if (domain) {
            if (BLOCKED_DOMAINS_EXACT.has(domain)) {
                return { blocked: true, reason: 'blocked-domain' };
            }
            for (const pattern of BLOCKED_DOMAIN_PATTERNS) {
                if (pattern.test(domain)) {
                    return { blocked: true, reason: 'blocked-domain-pattern' };
                }
            }
        }
    }

    // 5. Message keyword blocklist
    if (input.message) {
        const lower = input.message.toLowerCase();
        for (const phrase of BLOCKED_PHRASES) {
            if (lower.includes(phrase)) {
                return { blocked: true, reason: 'blocked-phrase' };
            }
        }

        // 6. URL detection — real customers don't paste links
        if (/https?:\/\//i.test(input.message)) {
            return { blocked: true, reason: 'url-in-message' };
        }

        // 7. Email address in message body — solicitors embed contact info
        if (/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i.test(input.message)) {
            return { blocked: true, reason: 'email-in-message' };
        }

        // 8. Phone number in message body (7+ consecutive digits)
        if (/(?:\d[\s\-.()]*){7,}/.test(input.message)) {
            return { blocked: true, reason: 'phone-in-message' };
        }

        // 9. Bare domain / URL without protocol (e.g. "example.com")
        if (/\b[a-z0-9-]+\.(com|net|org|io|info|biz|co|us|uk)\b/i.test(input.message)) {
            return { blocked: true, reason: 'domain-in-message' };
        }
    }

    // 10. Service mismatch — "Other" service with no real project details is suspicious
    //     (most legitimate "Other" inquiries still describe what they need)

    return { blocked: false };
}
