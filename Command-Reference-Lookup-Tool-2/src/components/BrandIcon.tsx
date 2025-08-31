import { FiCode, FiZap } from 'react-icons/fi';

export function BrandIcon({ size = 'md', className = '' }) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-5 h-5', 
    lg: 'w-6 h-6'
  };

  return (
    <div className={`${sizeClasses[size]} bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg ${className}`}>
      <div className="relative">
        <FiCode className={`${iconSizes[size]} text-white`} />
        <FiZap className={`${iconSizes[size]} text-emerald-200 absolute -top-0.5 -right-0.5 scale-50`} />
      </div>
    </div>
  );
}