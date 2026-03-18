import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAnalytics, isSupported, Analytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Check if the configuration is complete enough to initialize
const isConfigValid = !!firebaseConfig.apiKey && !!firebaseConfig.projectId && !!firebaseConfig.appId;

let app: FirebaseApp | undefined;

if (typeof window !== 'undefined' || getApps().length === 0) {
  if (isConfigValid) {
    if (getApps().length === 0) {
      console.log("🔥 Initializing Firebase with environment variables...");
      app = initializeApp(firebaseConfig);
    } else {
      // Reuse existing app instance (for hot-reloading)
      console.log("♻️ Reusing existing Firebase app instance.");
      app = getApps()[0];
    }
  } else {
    console.warn("⚠️ Firebase configuration is incomplete. Skipping initialization. Check your environment variables.");
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