export default function Loading() {
  return (
    <main className="mx-auto max-w-7xl p-4 sm:p-6" aria-busy="true">
      <div className="mb-6 h-20 animate-pulse rounded-2xl bg-white/5" />
      <div className="mb-6 h-12 animate-pulse rounded-xl bg-white/5" />
      <div className="grid gap-4 lg:grid-cols-2">
        {Array.from({ length: 6 }, (_, index) => (
          <div
            key={index}
            className="h-44 animate-pulse rounded-2xl bg-white/5"
          />
        ))}
      </div>
    </main>
  );
}
