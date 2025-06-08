export default function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert" className="rounded bg-red-100 p-6 text-red-800">
      <p className="mb-2 text-xl font-bold">Something went wrong:</p>
      <pre className="whitespace-pre-wrap">{error.message}</pre>
      <button
        onClick={resetErrorBoundary}
        className="mt-4 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
      >
        Try again
      </button>
    </div>
  );
}
