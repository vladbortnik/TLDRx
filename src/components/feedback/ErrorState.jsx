export function ErrorState({ message }) {
  if (!message) return null;

  return (
    <div className="bg-red-900/20 border-l-4 border-red-500 text-red-300 p-4 mb-6 rounded-r-lg">
      <p>{message}</p>
    </div>
  );
}