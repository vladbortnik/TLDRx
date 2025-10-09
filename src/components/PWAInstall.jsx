/**
 * @fileoverview PWA installation prompt component
 * Displays a native-like install prompt for Progressive Web App functionality
 */

import { useState, useEffect } from 'react';

/**
 * PWA Install Component
 * Displays installation prompt when PWA installation is available
 * Handles beforeinstallprompt and appinstalled events
 *
 * @component
 * @returns {JSX.Element|null} Install prompt UI or null if not available
 */
export default function PWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstall, setShowInstall] = useState(false);

  useEffect(() => {
    /**
     * Handle beforeinstallprompt event
     * Prevents default browser prompt and shows custom UI
     */
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstall(true);
    };

    /**
     * Handle appinstalled event
     * Clears install prompt when app is successfully installed
     */
    const handleAppInstalled = () => {
      setShowInstall(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Check if already installed
    if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) {
      setShowInstall(false);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  /**
   * Handle install button click
   * Triggers the browser's native PWA installation flow
   */
  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    await deferredPrompt.userChoice;

    // Clear the deferred prompt
    setDeferredPrompt(null);
    setShowInstall(false);
  };

  if (!showInstall || !deferredPrompt) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-slate-800 border border-slate-700 rounded-lg p-4 shadow-lg z-50 max-w-sm">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <svg 
            className="w-8 h-8 text-emerald-500" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" 
            />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="text-white font-medium text-sm mb-1">Install TL;DRx</h3>
          <p className="text-slate-400 text-xs mb-3">
            Get offline access to 500 commands and install as a native app
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleInstallClick}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs px-3 py-1.5 rounded-md transition-colors"
            >
              Install
            </button>
            <button
              onClick={() => setShowInstall(false)}
              className="bg-slate-700 hover:bg-slate-600 text-slate-300 text-xs px-3 py-1.5 rounded-md transition-colors"
            >
              Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
