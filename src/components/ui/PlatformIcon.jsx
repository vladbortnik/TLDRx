export function PlatformIcon({ platform }) {
  // Handle both string emojis and JSX/SVG icons
  if (typeof platform.icon === 'string') {
    return <span className="text-base">{platform.icon}</span>;
  }
  
  return platform.icon;
}