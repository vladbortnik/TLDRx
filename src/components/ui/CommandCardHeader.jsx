import { FiShield, FiAlertTriangle } from 'react-icons/fi';
import { Badge } from './ui/badge.jsx';

export function CommandCardHeader({ name, subtitle, description, safety = 'safe' }) {
  const getSafetyBadge = () => {
    switch (safety) {
      case 'safe':
        return (
          <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
            <FiShield className="w-3 h-3 mr-1" />
            Safe
          </Badge>
        );
      case 'caution':
        return (
          <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
            <FiAlertTriangle className="w-3 h-3 mr-1" />
            Caution
          </Badge>
        );
      case 'dangerous':
        return (
          <Badge variant="destructive" className="bg-red-500/20 text-red-400 border-red-500/30">
            <FiShield className="w-3 h-3 mr-1" />
            Dangerous
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mb-4">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <h3 className="text-xl font-semibold text-emerald-400">{name}</h3>
            {getSafetyBadge()}
          </div>
          <p className="text-slate-300 text-sm font-medium">{subtitle}</p>
        </div>
      </div>
      <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
    </div>
  );
}