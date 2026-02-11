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
];

const BLOCKED_DOMAINS_EXACT = new Set([
    'searchregister.info',
    'search-landeroselectrical.com',
    'webcrawler-index.com',
    'seosearchindex.com',
    'google-index-now.com',
    'submitwebsite.info',
    'addurl.info',
]);

// ── Blocklisted message phrases ────────────────────────────────
const BLOCKED_PHRASES = [
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
    }

    return { blocked: false };
}
