/**
 * @fileoverview Main entry point for the TL;DRx React application
 * Initializes and mounts the root React component
 */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ErrorBoundary } from "./components/ErrorBoundary.jsx";
import "./index.css";

/**
 * Initialize and render the React application
 * Uses React 19's createRoot API with concurrent features
 * Wrapped in ErrorBoundary for production error handling
 */
ReactDOM.createRoot(document.getElementById("root")).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
