import { Shield, AlertTriangle } from "lucide-react";
import { Badge } from "./badge.jsx";

export function CommandCardHeader({
  name,
  subtitle,
  description,
  safety = "safe",
  prerequisites = [],
}) {
  const getSafetyBadge = () => {
    switch (safety) {
      case "safe":
        return (
          <Badge
            variant="secondary"
            className="bg-green-500/20 text-green-400 border-green-500/30"
          >
            <Shield className="w-3 h-3 mr-1" />
            Safe
          </Badge>
        );
      case "caution":
        return (
          <Badge
            variant="secondary"
            className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
          >
            <AlertTriangle className="w-3 h-3 mr-1" />
            Caution
          </Badge>
        );
      case "dangerous":
        return (
          <Badge
            variant="destructive"
            className="bg-red-500/20 text-red-400 border-red-500/30"
          >
            <Shield className="w-3 h-3 mr-1" />
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
            {description && (
              <span className="text-slate-400 text-sm">- {description}</span>
            )}
            {getSafetyBadge()}
          </div>
        </div>
        {prerequisites.length > 0 && (
          <div className="flex flex-wrap gap-1 ml-4">
            {prerequisites.map((prereq, index) => {
              const getPrereqColor = () => {
                switch (safety) {
                  case "safe":
                    return "bg-green-500/20 text-green-300 border-green-500/30";
                  case "caution":
                    return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
                  case "dangerous":
                  case "destructive":
                    return "bg-red-500/20 text-red-300 border-red-500/30";
                  default:
                    return "bg-slate-500/20 text-slate-300 border-slate-500/30";
                }
              };
              return (
                <Badge
                  key={index}
                  variant="secondary"
                  className={`${getPrereqColor()} text-xs px-2 py-1`}
                >
                  {prereq}
                </Badge>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
