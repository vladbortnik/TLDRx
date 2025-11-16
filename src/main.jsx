/**
 * @fileoverview Main entry point for the TL;DRx React application
 * Initializes Sentry error tracking and mounts the root React component
 */

import React from "react";
import ReactDOM from "react-dom/client";
import * as Sentry from "@sentry/react";
import { setupIonicReact } from "@ionic/react";
import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import IonicRoot from "./ionic/IonicRoot.jsx";
import { ErrorBoundary } from "./components/ErrorBoundary.jsx";
import "./index.css";

/**
 * Initialize Sentry for production error tracking
 * Only runs if VITE_SENTRY_DSN is set and in production mode
 */
setupIonicReact();

const sentryDsn = import.meta.env.VITE_SENTRY_DSN;
const isProduction = import.meta.env.PROD;

if (sentryDsn && isProduction) {
  Sentry.init({
    dsn: sentryDsn,

    // Set environment
    environment: import.meta.env.MODE || "production",

    // Release tracking (matches package.json version)
    release: "tldrx@2.7.0",

    // Performance Monitoring
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: false,
        blockAllMedia: false,
      }),
    ],

    // Performance monitoring sample rate (10% of transactions)
    tracesSampleRate: 0.1,

    // Session Replay sample rate
    replaysSessionSampleRate: 0.1, // Sample 10% of sessions
    replaysOnErrorSampleRate: 1.0, // Sample 100% of sessions with errors

    // Ignore common non-critical errors
    ignoreErrors: [
      // Browser extensions
      "top.GLOBALS",
      "chrome-extension://",
      "moz-extension://",
      // Network errors
      "Network request failed",
      "NetworkError",
      "Failed to fetch",
      // Service worker errors
      "ServiceWorkerGlobalScope",
    ],

    // Filter out non-app errors
    beforeSend(event, hint) {
      void hint;
      // Don't send events from browser extensions
      if (
        event.request?.url &&
        (event.request.url.includes("chrome-extension://") ||
          event.request.url.includes("moz-extension://"))
      ) {
        return null;
      }
      return event;
    },
  });

  console.log("✅ Sentry initialized for production error tracking");
} else if (!isProduction) {
  console.log("🔧 Sentry disabled in development mode");
} else {
  console.warn("⚠️ Sentry DSN not configured");
}

/**
 * Initialize and render the React application
 * Uses React 19's createRoot API with concurrent features
 * Wrapped in ErrorBoundary for production error handling
 */
ReactDOM.createRoot(document.getElementById("root")).render(
  <ErrorBoundary>
    <IonicRoot />
  </ErrorBoundary>
);
