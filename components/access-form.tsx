"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, KeyRound } from "lucide-react";

export function AccessForm({ initialError }: { initialError?: string }) {
  const [token, setToken] = useState("");
  const [error, setError] = useState(
    initialError === "invalid" ? "That invite link is not valid." : "",
  );
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const response = await fetch("/api/access", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
    const payload = (await response.json()) as { error?: string };
    if (!response.ok) {
      setError(payload.error ?? "Could not verify the invite.");
      setLoading(false);
      return;
    }
    window.location.assign("/");
  }

  return (
    <form onSubmit={submit} className="surface rounded-2xl p-6 sm:p-8">
      <KeyRound className="mb-5 size-6 text-[var(--accent)]" aria-hidden="true" />
      <h2 className="text-xl font-bold">Enter your pool invite</h2>
      <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
        Use the private token shared by the pool organizer.
      </p>
      <label className="mt-6 block text-sm font-semibold" htmlFor="invite-token">
        Invite token
      </label>
      <input
        id="invite-token"
        type="password"
        autoComplete="current-password"
        value={token}
        onChange={(event) => setToken(event.target.value)}
        className="mt-2 h-12 w-full rounded-xl border border-[var(--border)] bg-[var(--surface-quiet)] px-4"
        required
      />
      {error && (
        <p role="alert" className="mt-3 text-sm font-medium text-red-400">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent)] font-extrabold text-slate-950 transition hover:brightness-105"
      >
        {loading ? "Checking..." : "Open predictor"}
        {!loading && <ArrowRight className="size-4" aria-hidden="true" />}
      </button>
    </form>
  );
}
