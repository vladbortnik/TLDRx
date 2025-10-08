/**
 * @fileoverview Main entry point for the TL;DRx React application
 * Initializes and mounts the root React component
 */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

/**
 * Initialize and render the React application
 * Uses React 19's createRoot API with concurrent features
 * StrictMode is disabled in production for optimal performance
 */
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
