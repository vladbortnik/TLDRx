/**
 * @fileoverview Error state display component
 * Shows error messages with consistent styling
 */

/**
 * ErrorState Component
 * Displays error messages in a styled alert box
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.message - Error message to display
 * @returns {JSX.Element|null} Error alert or null if no message
 */
export function ErrorState({ message }) {
  if (!message) return null;

  return (
    <div className="bg-red-900/20 border-l-4 border-red-500 text-red-300 p-4 mb-6 rounded-r-lg">
      <p>{message}</p>
    </div>
  );
}