"use client";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="grid min-h-screen place-items-center p-6">
      <section className="surface max-w-md rounded-2xl p-8 text-center">
        <p className="mb-2 text-sm font-semibold text-red-400">Loading failed</p>
        <h1 className="text-2xl font-bold">The predictor is temporarily unavailable.</h1>
        <p className="mt-3 text-sm text-[var(--text-muted)]">
          Check the Supabase connection and try once more.
        </p>
        <button
          onClick={reset}
          className="mt-6 rounded-xl bg-[var(--accent)] px-5 py-3 font-bold text-slate-950"
        >
          Try again
        </button>
      </section>
    </main>
  );
}
