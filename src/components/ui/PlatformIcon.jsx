export function PlatformIcon({ platform }) {
  // Special case for macOS - use Apple logo style
  if (platform.id === 'macos' || platform.id === 'mac') {
    return (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
      </svg>
    );
  }

  // Special case for Windows - use Windows logo style
  if (platform.id === 'windows') {
    return (
      // <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
      //   <path d="M3 5.45l7.9-1.15v7.6H3V5.45zm7.9 6.45v7.6l-7.9-1.15V11.9h7.9zm1-.01h9.1V5.45L12 3.95v7.94zm9.1 1.01L12 12.9v7.95l9.1-1.5V12.9z"/>
      // </svg>
      <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
          <path fill="#00b0ff" d="M20 25.026L5.011 25 5.012 37.744 20 39.818zM22 25.03L22 40.095 42.995 43 43 25.066zM20 8.256L5 10.38 5.014 23 20 23zM22 7.973L22 23 42.995 23 42.995 5z"></path>
      </svg>
    );
  }

  // Handle both string emojis and JSX/SVG icons
  if (typeof platform.icon === 'string') {
    return <span className="text-base">{platform.icon}</span>;
  }

  return platform.icon;
}