export default function ErrorComponent({ error }) {
  if (!error) return null;

  return (
    <div className="rounded-md border border-red-400 bg-red-100 p-3 text-sm font-medium text-red-700">
      {error}
    </div>
  );
}
