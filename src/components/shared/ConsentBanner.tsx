import React, { useEffect, useState } from 'react';
import CookieConsent, { getCookieConsentValue, Cookies } from 'react-cookie-consent';
import { loadScript } from '../../utils/loadScript';
import { useThemeMode } from '../../contexts/ThemeContext';

const HS_PORTAL = import.meta.env.REACT_APP_HUBSPOT_PORTAL_ID as string | undefined;    
const COOKIE_NAME = 'chatapc_cookie_consent';

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

export default function ConsentBanner() {
  const [ready, setReady] = useState(false);
  const { isDark } = useThemeMode();

  // Theme-aware colors
  const bannerBg = isDark ? '#0f172a' : '#f1f5f9';
  const bannerText = isDark ? '#fff' : '#0f172a';
  const acceptBg = isDark ? '#2563EB' : '#2563EB';
  const acceptText = isDark ? '#fff' : '#fff';
  const declineBg = isDark ? '#475569' : '#e2e8f0';
  const declineText = isDark ? '#fff' : '#334155';

  // If consent was granted before, apply the consent granted immediately
  useEffect(() => {
    const c = getCookieConsentValue(COOKIE_NAME);
    if (c === 'true' && window.gtag) {
      window.gtag('consent', 'update', {
        ad_storage: 'granted',
        analytics_storage: 'granted',
        functionality_storage: 'granted',
        personalization_storage: 'granted'
      });
      if (HS_PORTAL) {
        loadScript(`https://js.hs-scripts.com/${HS_PORTAL}.js`, 'hs-script-loader');
      }
    }
    setReady(true);
  }, []);

  if (!ready) return null;

  return (
    <CookieConsent
      location="bottom"
      cookieName={COOKIE_NAME}
      buttonText="Accept all cookies"
      declineButtonText="Decline"
      enableDeclineButton
      expires={180}
      sameSite="Lax"
      style={{
        background: bannerBg,
        color: bannerText,
        fontSize: 14,
        boxShadow: isDark
          ? '0 2px 24px rgba(20,32,76,0.66)'
          : '0 2px 24px rgba(36,77,135,0.08)',
        borderTop: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
        zIndex: 1500,
      }}
      buttonStyle={{
        background: acceptBg,
        color: acceptText,
        borderRadius: 8,
        padding: '8px 16px',
        fontWeight: 700,
        boxShadow: isDark
          ? '0 2px 8px rgba(36,54,120,0.25)'
          : '0 1.5px 6px rgba(34,77,221,0.08)',
        border: 'none',
      }}
      declineButtonStyle={{
        background: declineBg,
        color: declineText,
        borderRadius: 8,
        padding: '8px 16px',
        fontWeight: 700,
        border: 'none',
        marginLeft: 8,
        boxShadow: isDark
          ? '0 1px 3px rgba(0,0,0,0.12)'
          : '0 1px 3px rgba(0,0,0,0.06)',
      }}
      onAccept={async () => {
        if (window.gtag) {
          window.gtag('consent', 'update', {
            ad_storage: 'granted',
            analytics_storage: 'granted',
            functionality_storage: 'granted',
            personalization_storage: 'granted'
          });
        }
        if (HS_PORTAL) {
          await loadScript(`https://js.hs-scripts.com/${HS_PORTAL}.js`, 'hs-script-loader');
        }
      }}
      onDecline={() => {
        try {
          ['_ga', '_gid', '_gat', 'hubspotutk'].forEach(n => Cookies.remove(n, { path: '/' }));
        } catch {}
      }}
    >
      Like most websites, we use cookies to make our site work the way you expect it to, improve your experience on our site, analyze site usage, and assist in our marketing efforts.
    </CookieConsent>
  );
}