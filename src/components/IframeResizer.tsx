"use client";

import { useEffect } from "react";

export function IframeResizer() {
  useEffect(() => {
    // Function to send height to parent
    const sendHeight = () => {
      const height = document.documentElement.scrollHeight;
      window.parent.postMessage({ type: 'setHeight', height }, '*');
    };

    // Send height on load and on any resize/mutation
    sendHeight();

    const observer = new MutationObserver(sendHeight);
    observer.observe(document.body, { 
      attributes: true, 
      childList: true, 
      subtree: true 
    });

    window.addEventListener('resize', sendHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', sendHeight);
    };
  }, []);

  return null;
}
