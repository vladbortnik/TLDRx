/**
 * @fileoverview Results counter display component
 * Shows the number of filtered commands
 */

/**
 * ResultsCounter Component
 * Displays count of filtered commands with proper pluralization
 *
 * @component
 * @param {Object} props - Component props
 * @param {number} props.count - Number of commands found
 * @returns {JSX.Element} Results count display
 */
export function ResultsCounter({ count }) {
  return (
    <div className="mb-4 mt-2">
      <p className="text-sm text-slate-400 font-medium pl-3">
        {count} command{count !== 1 ? "s" : ""} found
      </p>
    </div>
  );
}