import { useState, useCallback } from 'react';
import { copyToClipboard } from '../utils/copyToClipboard.js';

export function useCopyWithFeedback() {
  const [copyState, setCopyState] = useState({
    isVisible: false,
    isSuccess: false,
    message: ''
  });

  const copy = useCallback(async (text, customSuccessMessage, customFailMessage) => {
    const success = await copyToClipboard(text);
    
    setCopyState({
      isVisible: true,
      isSuccess: success,
      message: success 
        ? (customSuccessMessage || 'Copied to clipboard!')
        : (customFailMessage || 'Copy functionality not available in this environment')
    });

    return success;
  }, []);

  const closeFeedback = useCallback(() => {
    setCopyState(prev => ({ ...prev, isVisible: false }));
  }, []);

  return {
    copyState,
    copy,
    closeFeedback
  };
}