/**
 * Copy text to clipboard with fallback for environments where Clipboard API is blocked
 * @param {string} text - Text to copy to clipboard
 * @returns {Promise<boolean>} - Success status
 */
export async function copyToClipboard(text) {
  if (!text) {
    console.warn('No text provided to copy');
    return false;
  }

  // Skip modern Clipboard API in development/insecure contexts and go straight to fallback
  if (!window.isSecureContext || window.location.protocol !== 'https:') {
    console.info('Using legacy copy method due to insecure context');
    return legacyCopyToClipboard(text);
  }

  // Try the modern Clipboard API only in secure contexts
  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text);
      console.info('Text copied using Clipboard API');
      return true;
    } catch (err) {
      console.info('Clipboard API failed, using legacy method');
      return legacyCopyToClipboard(text);
    }
  }

  // Fallback to legacy method
  return legacyCopyToClipboard(text);
}

/**
 * Legacy copy method using document.execCommand
 * @param {string} text - Text to copy
 * @returns {boolean} - Success status
 */
function legacyCopyToClipboard(text) {
  try {
    // Create a temporary textarea element
    const textArea = document.createElement('textarea');
    textArea.value = text;
    
    // Position it off-screen but keep it accessible
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
      console.info('Text copied using legacy method');
      return true;
    } else {
      console.warn('Legacy copy method not supported');
      // Final fallback - attempt to use selection API
      return fallbackCopyToClipboard(text);
    }
  } catch (err) {
    console.error('Legacy copy method failed:', err);
    return fallbackCopyToClipboard(text);
  }
}

/**
 * Final fallback copy method using selection API
 * @param {string} text - Text to copy
 * @returns {boolean} - Success status
 */
function fallbackCopyToClipboard(text) {
  try {
    // Create a span element with the text
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
    } catch (execErr) {
      console.warn('execCommand not available');
    }
    
    // Clean up
    selection.removeAllRanges();
    document.body.removeChild(span);
    
    if (successful) {
      console.info('Text copied using selection fallback');
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