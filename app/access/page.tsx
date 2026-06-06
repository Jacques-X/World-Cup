import { AccessForm } from "@/components/access-form";

export default async function AccessPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  return (
    <main className="grid min-h-screen place-items-center p-5">
      <section className="w-full max-w-md">
        <div className="mb-8 flex items-center gap-4">
          <div className="grid size-14 place-items-center rounded-2xl bg-[var(--accent)] text-2xl font-black text-slate-950">
            26
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
              Private pool
            </p>
            <h1 className="text-2xl font-extrabold">World Cup Predictor</h1>
          </div>
        </div>
        <AccessForm initialError={params.error} />
      </section>
    </main>
  );
}
