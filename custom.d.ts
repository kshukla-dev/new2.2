// Google Ads conversion helpers exposed on window by app/layout.tsx
interface Window {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  gtag?: (...args: any[]) => void;
  /** Fires the 'ads_conversion_Contact_Us_1' conversion, then navigates to `url`. Returns false. */
  gtagSendEvent?: (url?: string) => boolean;
}
