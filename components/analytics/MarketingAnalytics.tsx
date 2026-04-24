import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { captureSessionAttribution, getHighIntentPageType, getServiceFromPath, trackMarketingEvent } from '../../utils/analytics';

const SOCIAL_HOSTS = ['facebook.com', 'instagram.com', 'tiktok.com', 'thumbtack.com'];

const getElementLabel = (element: HTMLElement) => {
  return element.dataset.analyticsLabel || element.textContent?.replace(/\s+/g, ' ').trim().slice(0, 80) || undefined;
};

const getUrlFromHref = (href: string) => {
  try {
    return new URL(href, window.location.origin);
  } catch {
    return null;
  }
};

const getSocialNetwork = (host: string) => {
  if (host.includes('facebook.com')) {
    return 'facebook';
  }

  if (host.includes('instagram.com')) {
    return 'instagram';
  }

  if (host.includes('tiktok.com')) {
    return 'tiktok';
  }

  if (host.includes('thumbtack.com')) {
    return 'thumbtack';
  }

  return host;
};

const MarketingAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    captureSessionAttribution(location.pathname, location.search);
  }, [location.pathname, location.search]);

  useEffect(() => {
    const pageType = getHighIntentPageType(location.pathname);
    if (!pageType) {
      return;
    }

    trackMarketingEvent('High Intent Page Viewed', {
      page_type: pageType,
      service: getServiceFromPath(location.pathname) ?? undefined,
    });
  }, [location.pathname]);

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const element = target?.closest('a,button') as HTMLElement | null;
      if (!element) {
        return;
      }

      const placement = element.dataset.analyticsPlacement;
      const label = getElementLabel(element);
      const explicitEvent = element.dataset.analyticsEvent;
      const explicitTarget = element.dataset.analyticsTarget;

      if (explicitEvent) {
        trackMarketingEvent(explicitEvent, {
          placement,
          label,
          target: explicitTarget,
        });
        return;
      }

      if (element.tagName !== 'A') {
        return;
      }

      const anchor = element as HTMLAnchorElement;
      const rawHref = anchor.getAttribute('href') || anchor.href || '';
      if (!rawHref) {
        return;
      }

      if (rawHref.startsWith('tel:')) {
        trackMarketingEvent('Phone Link Clicked', {
          placement,
          label,
        });
        return;
      }

      if (rawHref.startsWith('mailto:')) {
        trackMarketingEvent('Email Link Clicked', {
          placement,
          label,
        });
        return;
      }

      const url = getUrlFromHref(rawHref);
      if (!url) {
        return;
      }

      const host = url.hostname.replace(/^www\./, '');

      if (url.origin !== window.location.origin) {
        if (host.includes('share.google') || host.includes('google.')) {
          trackMarketingEvent('Google Business Profile Clicked', {
            placement,
            label: label || 'google_business_profile',
            target: host,
          });
          return;
        }

        if (SOCIAL_HOSTS.some((socialHost) => host.includes(socialHost))) {
          trackMarketingEvent('Social Link Clicked', {
            placement,
            label: getSocialNetwork(host),
            target: host,
          });
          return;
        }

        trackMarketingEvent('Outbound Link Clicked', {
          placement,
          label: label || host,
          target: host,
        });
        return;
      }

      if (url.pathname === '/contact' || url.hash === '#quote' || rawHref.includes('/contact#quote')) {
        trackMarketingEvent('Quote CTA Clicked', {
          placement,
          label,
        });
        return;
      }

      if (url.pathname === '/gallery') {
        trackMarketingEvent('Portfolio CTA Clicked', {
          placement,
          label,
        });
        return;
      }

      const service = getServiceFromPath(url.pathname);
      if (service) {
        trackMarketingEvent('Service Navigation Clicked', {
          placement,
          label: label || service,
          service,
        });
      }
    };

    document.addEventListener('click', handleDocumentClick, true);

    return () => {
      document.removeEventListener('click', handleDocumentClick, true);
    };
  }, []);

  return null;
};

export default MarketingAnalytics;
