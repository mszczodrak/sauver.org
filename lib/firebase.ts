import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAnalytics, isSupported, Analytics } from "firebase/analytics";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

let app: FirebaseApp | undefined;

if (typeof window !== 'undefined' || getApps().length === 0) {
  if (getApps().length === 0) {
    try {
      // 1. Firebase App Hosting Automatic Initialization
      app = initializeApp();
      console.log("🔥 Initialized Firebase with App Hosting automatic configuration.");
    } catch (e) {
      console.error("⚠️ Failed to initialize Firebase automatically. Ensure this is running in Firebase App Hosting.");
    }
  } else {
    // Reuse existing app instance (for hot-reloading)
    console.log("♻️ Reusing existing Firebase app instance.");
    app = getApps()[0];
  }

  // Initialize Firebase App Check
  // Uses the environment variable in production, falls back to the hardcoded public key locally.
  const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6LdXCY8sAAAAAJvXvg2Y5Hdp8GgRdeu_-ecRpibg';
  
  if (app && RECAPTCHA_SITE_KEY) {
    if (process.env.NODE_ENV !== 'production' && typeof self !== 'undefined') {
      // Enable the App Check debug token in local development
      (self as any).FIREBASE_APPCHECK_DEBUG_TOKEN = true;
    }
    try {
      initializeAppCheck(app, {
        provider: new ReCaptchaV3Provider(RECAPTCHA_SITE_KEY),
        isTokenAutoRefreshEnabled: true
      });
      console.log("🛡️ Firebase App Check initialized.");
    } catch (err) {
      console.error("❌ Failed to initialize Firebase App Check:", err);
    }
  }
}

// Analytics instance cache
let analyticsInstance: Analytics | null = null;

/**
 * Gets the Firebase Analytics instance.
 * Initializes it if it doesn't exist and the browser supports it.
 * This function should only be called on the client side.
 */
export const getAnalyticsInstance = async () => {
  if (analyticsInstance) {
    return analyticsInstance;
  }

  if (!app) {
    return null;
  }

  if (typeof window !== 'undefined') {
    try {
      const isSupportedResult = await isSupported();
      if (isSupportedResult) {
        console.log("✅ Firebase Analytics is supported and has been initialized.");
        analyticsInstance = getAnalytics(app);
        return analyticsInstance;
      }
    } catch (err) {
      console.error("❌ Failed to initialize Firebase Analytics:", err);
    }
  }

  return null;
};

export { app };