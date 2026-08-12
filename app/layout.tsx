import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ScrollToTop from '@/components/ui/ScrollToTop'
import Providers from './providers'
import { generateMetadata as genMeta } from '@/lib/seo'
import { SITE_CONFIG } from '@/lib/constants'
import '@/styles/global.css'
import '@/styles/eor-modern.css'
import '@/styles/eor-sections.css'
import '@/styles/service-page.css'

import DelayedContactPopup from '@/components/ui/DelayedContactPopup'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#143369',
}

const base = genMeta({
  title: 'Global HR Solutions - EOR & Payroll',
  description:
    'Hire talent worldwide with fast, compliant global HR solutions. EOR, payroll, and compliance services across 17+ countries. Start today.',
})

export const metadata: Metadata = {
  ...base,
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    template: '%s | Jackson & Frank',
    default: 'Global HR Solutions - EOR & Payroll | Jackson & Frank',
  },
  alternates: { canonical: SITE_CONFIG.url },
  referrer: 'strict-origin-when-cross-origin',
  authors: [{ name: 'Jackson & Frank' }],
  creator: 'Jackson & Frank',
  publisher: 'Jackson & Frank',
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/assets/favicon.ico', sizes: 'any' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  verification: {
    google: process.env.GOOGLE_VERIFICATION_ID,
    other: { 'msvalidate.01': '60E5EC820D7200BA2607ABDCD07B0CFF' },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/*
          DOM reconciliation guard. Browser auto-translation (Chrome/Google
          Translate wraps text nodes in <font> tags), Grammarly, and similar
          extensions mutate DOM nodes that React owns. The next React commit
          then calls removeChild/insertBefore against a node whose parent has
          changed and throws a NotFoundError ("... not a child of this node"),
          which bubbles past every boundary to app/global-error.tsx and shows
          the crash screen. This makes those two Node methods no-op safely when
          the target isn't actually a child, so a diverged tree degrades instead
          of hard-crashing. React-team-acknowledged workaround (facebook/react#11538).
          Must run synchronously before hydration, so it is an inline <head>
          script rather than next/script (whose beforeInteractive does not block
          hydration).
        */}
        <script
          id="jf-dom-reconciliation-guard"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(typeof Node==="undefined"||!Node.prototype||Node.prototype.__jfDomGuard)return;Node.prototype.__jfDomGuard=true;var r=Node.prototype.removeChild;Node.prototype.removeChild=function(c){if(c&&c.parentNode!==this)return c;return r.apply(this,arguments)};var i=Node.prototype.insertBefore;Node.prototype.insertBefore=function(n,ref){if(ref&&ref.parentNode!==this)return n;return i.apply(this,arguments)}}catch(e){}})();`,
          }}
        />

        {/* Google Tag Manager */}
        <Script id="gtm-init" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-W3H7GWCH');`}
        </Script>
        {/* End Google Tag Manager */}

        {/* Ahrefs Analytics */}
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="jhdPOn/H20mv87THGB8MVA"
          strategy="afterInteractive"
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=DM+Serif+Display:ital@0;1&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Commissioner:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />

        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://js-eu1.hs-scripts.com" />
        <link rel="dns-prefetch" href="https://static.hotjar.com" />
        <link rel="dns-prefetch" href="https://www.clarity.ms" />

        <meta name="geo.region" content="NL-GE" />
        <meta name="application-name" content="Jackson & Frank" />
        <meta name="msapplication-TileColor" content="#143369" />
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-W3H7GWCH"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <ScrollToTop />
        </Providers>

        <DelayedContactPopup />

        {/* GA4 / Google Ads with consent mode */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-0SFW22DLWG"
          strategy="afterInteractive"
        />
        <Script id="gtag-config" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              analytics_storage: 'granted'
            });
            gtag('js', new Date());
            gtag('config', 'G-0SFW22DLWG');
          `}
        </Script>
        {/* Google Ads conversion helper: window.gtagSendEvent(url) fires the
            conversion before navigating. Wire on contact/booking actions. */}
        <Script id="gtag-send-event" strategy="afterInteractive">
          {`
            function gtagSendEvent(url) {
              var callback = function () {
                if (typeof url === 'string') { window.location = url; }
              };
              gtag('event', 'ads_conversion_Contact_Us_1', {
                'event_callback': callback,
                'event_timeout': 2000,
              });
              return false;
            }
            window.gtagSendEvent = gtagSendEvent;
          `}
        </Script>

        {/* Hotjar */}
        <Script id="hotjar" strategy="lazyOnload">
          {`(function(h,o,t,j,a,r){h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};h._hjSettings={hjid:5072457,hjsv:6};a=o.getElementsByTagName('head')[0];r=o.createElement('script');r.async=1;r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;a.appendChild(r);})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`}
        </Script>

        {/* Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="lazyOnload">
          {`(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "s2f1owcfae");`}
        </Script>

        {/* HubSpot */}
        <Script
          id="hs-script-loader"
          src="https://js-eu1.hs-scripts.com/145156571.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  )
}
