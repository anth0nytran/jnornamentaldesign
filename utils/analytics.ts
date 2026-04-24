import { track } from '@vercel/analytics';

type AnalyticsValue = string | number | boolean | null | undefined;
type AnalyticsProperties = Record<string, AnalyticsValue>;

interface SessionAttribution {
  source: string;
  medium: string;
  campaign?: string;
  content?: string;
  term?: string;
  adPlatform?: string;
  referrerHost?: string;
  landingPage: string;
  capturedAt: string;
}

const ATTRIBUTION_STORAGE_KEY = 'jn-ornamental-marketing-attribution';

const SERVICE_PATHS: Record<string, string> = {
  '/fences': 'fences',
  '/gates': 'gates',
  '/railings': 'railings',
  '/access-control': 'access_control',
};

const HIGH_INTENT_PAGE_TYPES: Record<string, string> = {
  '/contact': 'contact',
  '/gallery': 'gallery',
  '/fences': 'service',
  '/gates': 'service',
  '/railings': 'service',
  '/access-control': 'service',
};

const isBrowser = () => typeof window !== 'undefined';

const normalizeValue = (value: string | null | undefined, fallback?: string) => {
  const normalized = value?.trim();
  return normalized ? normalized.slice(0, 80) : fallback;
};

const getReferrerHost = () => {
  if (!isBrowser() || !document.referrer) {
    return undefined;
  }

  try {
    const referrerUrl = new URL(document.referrer);
    return referrerUrl.hostname.replace(/^www\./, '');
  } catch {
    return undefined;
  }
};

const readStoredAttribution = (): SessionAttribution | null => {
  if (!isBrowser()) {
    return null;
  }

  try {
    const rawValue = window.sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    if (!rawValue) {
      return null;
    }

    return JSON.parse(rawValue) as SessionAttribution;
  } catch {
    return null;
  }
};

const writeStoredAttribution = (value: SessionAttribution) => {
  if (!isBrowser()) {
    return;
  }

  try {
    window.sessionStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(value));
  } catch {
    // Ignore storage failures. Analytics still works without persisted attribution.
  }
};

const buildAttributionFromLocation = (pathname: string, search: string): SessionAttribution => {
  const params = new URLSearchParams(search);
  const referrerHost = getReferrerHost();
  const adPlatform = params.has('gclid')
    ? 'google_ads'
    : params.has('fbclid')
      ? 'facebook_ads'
      : params.has('msclkid')
        ? 'microsoft_ads'
        : undefined;

  return {
    source: normalizeValue(params.get('utm_source'), adPlatform ?? referrerHost ?? 'direct') ?? 'direct',
    medium: normalizeValue(params.get('utm_medium'), adPlatform ? 'paid' : referrerHost ? 'referral' : 'direct') ?? 'direct',
    campaign: normalizeValue(params.get('utm_campaign')),
    content: normalizeValue(params.get('utm_content')),
    term: normalizeValue(params.get('utm_term')),
    adPlatform,
    referrerHost,
    landingPage: pathname || '/',
    capturedAt: new Date().toISOString(),
  };
};

export const captureSessionAttribution = (pathname: string, search: string) => {
  const current = readStoredAttribution();
  const params = new URLSearchParams(search);
  const hasCampaignParams = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_content',
    'utm_term',
    'gclid',
    'fbclid',
    'msclkid',
  ].some((key) => params.has(key));

  if (!current || hasCampaignParams) {
    const next = buildAttributionFromLocation(pathname, search);
    writeStoredAttribution(next);
    return next;
  }

  return current;
};

export const getSessionAttribution = (): SessionAttribution => {
  return readStoredAttribution() ?? {
    source: 'direct',
    medium: 'direct',
    landingPage: isBrowser() ? window.location.pathname : '/',
    capturedAt: new Date().toISOString(),
  };
};

export const getServiceFromPath = (pathname: string) => {
  return SERVICE_PATHS[pathname] ?? null;
};

export const getHighIntentPageType = (pathname: string) => {
  return HIGH_INTENT_PAGE_TYPES[pathname] ?? null;
};

const sanitizeProperties = (properties: AnalyticsProperties) => {
  return Object.fromEntries(
    Object.entries(properties)
      .filter(([, value]) => value !== undefined && value !== '')
      .map(([key, value]) => {
        if (typeof value === 'string') {
          return [key, value.trim().slice(0, 120)];
        }

        return [key, value];
      }),
  );
};

export const trackMarketingEvent = (name: string, properties: AnalyticsProperties = {}) => {
  if (!isBrowser()) {
    return;
  }

  const attribution = getSessionAttribution();

  track(
    name,
    sanitizeProperties({
      page: window.location.pathname,
      source: attribution.source,
      campaign: attribution.campaign,
      ...properties,
    }),
  );
};

export const buildLeadAttributionSummary = (conversionPage?: string) => {
  const attribution = getSessionAttribution();
  const parts = [
    `Source: ${attribution.source}`,
    `Medium: ${attribution.medium}`,
    attribution.campaign ? `Campaign: ${attribution.campaign}` : undefined,
    attribution.content ? `Content: ${attribution.content}` : undefined,
    attribution.term ? `Term: ${attribution.term}` : undefined,
    attribution.adPlatform ? `Ad Platform: ${attribution.adPlatform}` : undefined,
    attribution.referrerHost ? `Referrer: ${attribution.referrerHost}` : undefined,
    `Landing Page: ${attribution.landingPage}`,
    conversionPage ? `Conversion Page: ${conversionPage}` : undefined,
  ];

  return parts.filter(Boolean).join(' | ');
};
