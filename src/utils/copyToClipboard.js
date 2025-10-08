/**
 * @fileoverview Robust clipboard utilities with multiple fallback strategies
 * Supports modern Clipboard API, legacy execCommand, and selection-based copying
 */

/**
 * Copy text to clipboard with automatic fallback chain for maximum compatibility
 * Attempts modern Clipboard API first, then legacy methods for older browsers
 *
 * @param {string} text - Text to copy to clipboard
 * @returns {Promise<boolean>} Promise resolving to true if copy succeeded, false otherwise
 */
export async function copyToClipboard(text) {
  if (!text) {
    console.warn('No text provided to copy');
    return false;
  }

  // Skip modern Clipboard API in insecure contexts and use legacy fallback
  if (!window.isSecureContext || window.location.protocol !== 'https:') {
    return legacyCopyToClipboard(text);
  }

  // Try the modern Clipboard API only in secure contexts
  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return legacyCopyToClipboard(text);
    }
  }

  // Fallback to legacy method
  return legacyCopyToClipboard(text);
}

/**
 * Legacy copy method using document.execCommand for older browser support
 * Creates a temporary textarea element to enable text selection and copying
 *
 * @param {string} text - Text to copy to clipboard
 * @returns {boolean} True if copy succeeded, false otherwise
 */
function legacyCopyToClipboard(text) {
  try {
    // Create a temporary textarea element positioned off-screen
    const textArea = document.createElement('textarea');
    textArea.value = text;

    // Position off-screen but keep accessible for selection
    textArea.style.position = 'absolute';
    textArea.style.left = '-9999px';
    textArea.style.top = '0';
    textArea.style.opacity = '0';
    textArea.style.pointerEvents = 'none';
    textArea.setAttribute('readonly', 'readonly');
    textArea.setAttribute('tabindex', '-1');

    document.body.appendChild(textArea);

    // Select and copy the text
    textArea.focus({ preventScroll: true });
    textArea.select();
    textArea.setSelectionRange(0, text.length);

    // Try execCommand
    const successful = document.execCommand && document.execCommand('copy');

    // Clean up immediately
    document.body.removeChild(textArea);

    if (successful) {
      return true;
    } else {
      console.warn('Legacy copy method not supported');
      return fallbackCopyToClipboard(text);
    }
  } catch (err) {
    console.error('Legacy copy method failed:', err);
    return fallbackCopyToClipboard(text);
  }
}

/**
 * Final fallback copy method using Selection API
 * Last resort for environments where other copy methods fail
 *
 * @param {string} text - Text to copy to clipboard
 * @returns {boolean} True if copy succeeded, false otherwise
 */
function fallbackCopyToClipboard(text) {
  try {
    // Create a span element with the text positioned off-screen
    const span = document.createElement('span');
    span.textContent = text;
    span.style.position = 'absolute';
    span.style.left = '-9999px';
    span.style.whiteSpace = 'pre';

    document.body.appendChild(span);

    // Select the text using Selection API
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(span);
    selection.removeAllRanges();
    selection.addRange(range);

    // Attempt to copy
    let successful = false;
    try {
      successful = document.execCommand('copy');
    } catch {
      console.warn('execCommand not available');
    }

    // Clean up
    selection.removeAllRanges();
    document.body.removeChild(span);

    if (successful) {
      return true;
    } else {
      console.warn('All copy methods failed - clipboard functionality not available');
      return false;
    }
  } catch (err) {
    console.error('Final fallback copy method failed:', err);
    return false;
  }
}