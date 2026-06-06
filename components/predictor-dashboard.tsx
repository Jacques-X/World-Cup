"use client";

import {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  CalendarDays,
  ChartNoAxesColumnIncreasing,
  Check,
  Download,
  LayoutGrid,
  LockKeyhole,
  LogOut,
  Search,
  Settings,
  ShieldCheck,
  Trash2,
  Trophy,
  UserRound,
} from "lucide-react";
import { GroupTable } from "@/components/group-table";
import { MatchCard } from "@/components/match-card";
import { TEAMS } from "@/lib/data";
import {
  buildStandings,
  calculatePoints,
  GROUPS,
  predictionScores,
  scoreKey,
} from "@/lib/tournament";
import type {
  GroupCode,
  Player,
  PoolState,
  Prediction,
  Score,
} from "@/lib/types";

type Tab = "groups" | "schedule" | "tables" | "settings";
type SaveState = "saving" | "saved" | "error";

const tabs: Array<{ id: Tab; label: string; icon: typeof LayoutGrid }> = [
  { id: "groups", label: "Groups", icon: LayoutGrid },
  { id: "schedule", label: "Schedule", icon: CalendarDays },
  { id: "tables", label: "Tables", icon: ChartNoAxesColumnIncreasing },
  { id: "settings", label: "Settings", icon: Settings },
];

async function api<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
    cache: "no-store",
  });
  const body = (await response.json()) as T & { error?: string };
  if (!response.ok) throw new Error(body.error ?? "Request failed.");
  return body;
}

export function PredictorDashboard({
  initialState,
}: {
  initialState: PoolState;
}) {
  const [data, setData] = useState<PoolState>(initialState);
  const [tab, setTab] = useState<Tab>("groups");
  const [group, setGroup] = useState<GroupCode>("A");
  const [selectedPlayerId, setSelectedPlayerId] = useState(
    initialState.players[0]?.id ?? "",
  );
  const [tableSource, setTableSource] = useState<string>("actual");
  const [query, setQuery] = useState("");
  const [saveStates, setSaveStates] = useState<Record<string, SaveState>>({});
  const [globalError, setGlobalError] = useState("");
  const activeSaves = useRef(0);
  const dirtyKeys = useRef(new Set<string>());

  const refresh = useCallback(async (quiet = false) => {
    if (activeSaves.current > 0 || dirtyKeys.current.size > 0) return;
    try {
      const next = await api<PoolState>("/api/pool");
      setData(next);
      setSelectedPlayerId((current) => current || next.players[0]?.id || "");
      if (!quiet) setGlobalError("");
    } catch (error) {
      setGlobalError(
        error instanceof Error ? error.message : "Could not load the pool.",
      );
    }
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => void refresh(true), 20_000);
    return () => window.clearInterval(interval);
  }, [refresh]);

  const selectedPlayer =
    data.players.find((player) => player.id === selectedPlayerId) ??
    data.players[0];

  const predictionMap = useMemo(
    () =>
      Object.fromEntries(
        data.predictions.map((prediction) => [
          scoreKey(prediction.matchId, prediction.playerId),
          prediction,
        ]),
      ) as Record<string, Prediction>,
    [data.predictions],
  );

  const stats = useMemo(
    () =>
      calculatePoints(data.players, data.predictions, data.results),
    [data],
  );

  const standings = useMemo(() => {
    const scores =
      tableSource === "actual"
        ? data.results
        : predictionScores(data.predictions, tableSource);
    return buildStandings(data.matches, TEAMS, scores);
  }, [data, tableSource]);

  function updatePrediction(matchId: string, score: Score) {
    if (!data || !selectedPlayer) return;
    const key = scoreKey(matchId, selectedPlayer.id);
    setData({
      ...data,
      predictions: [
        ...data.predictions.filter(
          (prediction) =>
            scoreKey(prediction.matchId, prediction.playerId) !== key,
        ),
        {
          matchId,
          playerId: selectedPlayer.id,
          home: score.home,
          away: score.away,
        },
      ],
    });
    setSaveStates((current) => ({ ...current, [key]: "saving" }));
    dirtyKeys.current.add(key);
  }

  async function savePrediction(matchId: string) {
    if (!data || !selectedPlayer) return;
    const key = scoreKey(matchId, selectedPlayer.id);
    const score = data.predictions.find(
      (prediction) =>
        prediction.matchId === matchId &&
        prediction.playerId === selectedPlayer.id,
    ) ?? { home: null, away: null };
    activeSaves.current += 1;
    setSaveStates((current) => ({ ...current, [key]: "saving" }));
    try {
      await api("/api/predictions", {
        method: "PUT",
        body: JSON.stringify({
          playerId: selectedPlayer.id,
          matchId,
          home: score.home,
          away: score.away,
        }),
      });
      setSaveStates((current) => ({ ...current, [key]: "saved" }));
      dirtyKeys.current.delete(key);
    } catch {
      setSaveStates((current) => ({ ...current, [key]: "error" }));
    } finally {
      activeSaves.current -= 1;
    }
  }

  function updateResult(matchId: string, score: Score) {
    if (!data) return;
    setData({ ...data, results: { ...data.results, [matchId]: score } });
    setSaveStates((current) => ({
      ...current,
      [`result:${matchId}`]: "saving",
    }));
    dirtyKeys.current.add(`result:${matchId}`);
  }

  async function saveResult(matchId: string) {
    if (!data) return;
    const score = data.results[matchId] ?? { home: null, away: null };
    const key = `result:${matchId}`;
    activeSaves.current += 1;
    try {
      await api("/api/results", {
        method: "PUT",
        body: JSON.stringify({ matchId, ...score }),
      });
      setSaveStates((current) => ({ ...current, [key]: "saved" }));
      dirtyKeys.current.delete(key);
    } catch {
      setSaveStates((current) => ({ ...current, [key]: "error" }));
    } finally {
      activeSaves.current -= 1;
    }
  }

  if (!selectedPlayer) {
    return (
      <main className="grid min-h-screen place-items-center p-6">
        <p>No seeded players were found. Run the Supabase migration.</p>
      </main>
    );
  }

  const selectedPrediction = (matchId: string): Score =>
    predictionMap[scoreKey(matchId, selectedPlayer.id)] ?? {
      home: null,
      away: null,
    };

  const filteredMatches = data.matches.filter((match) => {
    const normalized = query.trim().toLowerCase();
    return (
      !normalized ||
      match.home.toLowerCase().includes(normalized) ||
      match.away.toLowerCase().includes(normalized) ||
      match.venue.toLowerCase().includes(normalized) ||
      match.group.toLowerCase() === normalized
    );
  });

  const matchCard = (match: PoolState["matches"][number]) => (
    <MatchCard
      key={match.id}
      match={match}
      player={selectedPlayer}
      prediction={selectedPrediction(match.id)}
      result={data.results[match.id] ?? { home: null, away: null }}
      isAdmin={data.isAdmin}
      saveState={saveStates[scoreKey(match.id, selectedPlayer.id)]}
      resultSaveState={saveStates[`result:${match.id}`]}
      onPredictionChange={(score) => updatePrediction(match.id, score)}
      onPredictionCommit={() => void savePrediction(match.id)}
      onResultChange={(score) => updateResult(match.id, score)}
      onResultCommit={() => void saveResult(match.id)}
    />
  );

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-[var(--surface-quiet)]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="grid size-11 place-items-center rounded-xl bg-[var(--accent)] font-black text-slate-950">
              26
            </div>
            <div>
              <h1 className="text-lg font-extrabold sm:text-xl">
                World Cup Predictor
              </h1>
              <p className="text-xs text-[var(--text-muted)]">
                Shared five-player pool
              </p>
            </div>
          </div>

          <div className="flex min-w-[240px] flex-1 items-center justify-end gap-3">
            <label className="hidden text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] sm:block">
              Editing as
            </label>
            <select
              value={selectedPlayer.id}
              onChange={(event) => {
                setSelectedPlayerId(event.target.value);
                setTableSource(event.target.value);
              }}
              className="h-11 max-w-56 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 font-bold"
              aria-label="Select player to edit"
            >
              {data.players.map((player) => (
                <option key={player.id} value={player.id}>
                  {player.name}
                </option>
              ))}
            </select>
            {data.isAdmin && (
              <span className="hidden items-center gap-1.5 rounded-lg bg-blue-500/10 px-2.5 py-2 text-xs font-bold text-blue-300 sm:flex">
                <ShieldCheck className="size-4" aria-hidden="true" />
                Admin
              </span>
            )}
          </div>
        </div>

        <div className="mx-auto flex max-w-[1600px] items-center gap-2 overflow-x-auto px-4 pb-3 sm:px-6">
          {tabs.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                aria-current={tab === item.id ? "page" : undefined}
                className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold transition ${
                  tab === item.id
                    ? "bg-[var(--accent)] text-slate-950"
                    : "text-[var(--text-muted)] hover:bg-white/5 hover:text-[var(--text)]"
                }`}
              >
                <Icon className="size-4" aria-hidden="true" />
                {item.label}
              </button>
            );
          })}
          <span className="ml-auto hidden shrink-0 items-center gap-1.5 text-xs text-[var(--text-muted)] md:flex">
            <Check className="size-3.5 text-[var(--accent)]" aria-hidden="true" />
            Cloud synced every 20 seconds
          </span>
        </div>
      </header>

      {globalError && (
        <div
          role="alert"
          className="border-b border-red-500/30 bg-red-500/10 px-4 py-2 text-center text-sm font-semibold text-red-300"
        >
          {globalError}
        </div>
      )}

      <main className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6">
        <Leaderboard players={data.players} stats={stats} />

        {tab === "groups" && (
          <section className="mt-7">
            <div className="mb-5 flex gap-1 overflow-x-auto rounded-xl border border-[var(--border)] bg-[var(--surface-quiet)] p-1.5">
              {GROUPS.map((groupCode) => (
                <button
                  key={groupCode}
                  onClick={() => setGroup(groupCode)}
                  className={`min-w-12 flex-1 rounded-lg px-3 py-2 text-sm font-extrabold transition ${
                    group === groupCode
                      ? "bg-[var(--accent)] text-slate-950"
                      : "text-[var(--text-muted)] hover:bg-white/5 hover:text-[var(--text)]"
                  }`}
                  aria-label={`Show Group ${groupCode}`}
                >
                  {groupCode}
                </button>
              ))}
            </div>
            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
              <div className="space-y-4">
                <SectionHeading
                  title={`Group ${group} matches`}
                  description="Enter the selected player's predictions."
                />
                {data.matches
                  .filter((match) => match.group === group)
                  .map(matchCard)}
              </div>
              <aside>
                <SectionHeading
                  title="Live table"
                  description="Switch between predictions and results."
                />
                <div className="surface mt-4 rounded-2xl p-5">
                  <TableSource
                    value={tableSource}
                    onChange={setTableSource}
                    players={data.players}
                  />
                  <div className="mt-4">
                    <GroupTable standings={standings[group]} />
                  </div>
                </div>
              </aside>
            </div>
          </section>
        )}

        {tab === "schedule" && (
          <section className="mt-7">
            <div className="mb-5 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <SectionHeading
                title="Full schedule"
                description="All 72 group-stage matches in chronological order."
              />
              <label className="relative block w-full md:w-80">
                <Search
                  className="pointer-events-none absolute left-3 top-3.5 size-4 text-[var(--text-muted)]"
                  aria-hidden="true"
                />
                <span className="sr-only">Search matches</span>
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Nation, venue, or group"
                  className="h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] pl-10 pr-4"
                />
              </label>
            </div>
            <div className="space-y-4">
              {filteredMatches.length ? (
                filteredMatches.map(matchCard)
              ) : (
                <div className="rounded-2xl border border-dashed border-[var(--border)] py-16 text-center">
                  <Search className="mx-auto size-6 text-[var(--text-muted)]" />
                  <p className="mt-3 font-bold">No matching fixtures</p>
                  <p className="mt-1 text-sm text-[var(--text-muted)]">
                    Try a country, stadium, or group letter.
                  </p>
                </div>
              )}
            </div>
          </section>
        )}

        {tab === "tables" && (
          <section className="mt-7">
            <div className="mb-5 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <SectionHeading
                title="Simulated tables"
                description="Compare every group from one prediction model."
              />
              <TableSource
                value={tableSource}
                onChange={setTableSource}
                players={data.players}
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {GROUPS.map((groupCode) => (
                <div key={groupCode} className="surface rounded-2xl p-5">
                  <h3 className="mb-3 text-sm font-extrabold uppercase tracking-[0.16em] text-[var(--accent)]">
                    Group {groupCode}
                  </h3>
                  <GroupTable standings={standings[groupCode]} />
                </div>
              ))}
            </div>
          </section>
        )}

        {tab === "settings" && (
          <SettingsPanel data={data} onRefresh={() => refresh()} />
        )}
      </main>

      <footer className="mt-10 border-t border-[var(--border)] px-4 py-6 text-center text-xs text-[var(--text-muted)]">
        World Cup 2026 group-stage predictor. Times shown in Eastern Time.
      </footer>
    </div>
  );
}

function Leaderboard({
  players,
  stats,
}: {
  players: Player[];
  stats: ReturnType<typeof calculatePoints>;
}) {
  return (
    <section aria-labelledby="leaderboard-title">
      <div className="mb-3 flex items-center gap-2">
        <Trophy className="size-4 text-[var(--accent)]" aria-hidden="true" />
        <h2
          id="leaderboard-title"
          className="text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--text-muted)]"
        >
          Points race
        </h2>
      </div>
      <div className="grid gap-px overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--border)] sm:grid-cols-5">
        {[...players]
          .sort((a, b) => stats[b.id].total - stats[a.id].total)
          .map((player, index) => (
            <div
              key={player.id}
              className="flex items-center justify-between gap-3 bg-[var(--surface)] px-4 py-4"
            >
              <div className="min-w-0">
                <p className="truncate font-bold">{player.name}</p>
                <p className="mt-0.5 text-xs text-[var(--text-muted)]">
                  {index + 1}. {stats[player.id].exact} exact
                </p>
              </div>
              <span className="font-tabular text-xl font-black text-[var(--accent)]">
                {stats[player.id].total}
              </span>
            </div>
          ))}
      </div>
    </section>
  );
}

function SectionHeading({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <h2 className="text-xl font-extrabold">{title}</h2>
      <p className="mt-1 text-sm text-[var(--text-muted)]">{description}</p>
    </div>
  );
}

function TableSource({
  value,
  onChange,
  players,
}: {
  value: string;
  onChange: (value: string) => void;
  players: Player[];
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
        Table based on
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 text-sm font-bold"
      >
        <option value="actual">Official results</option>
        {players.map((player) => (
          <option key={player.id} value={player.id}>
            {player.name}&apos;s predictions
          </option>
        ))}
      </select>
    </label>
  );
}

function SettingsPanel({
  data,
  onRefresh,
}: {
  data: PoolState;
  onRefresh: () => Promise<void>;
}) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [names, setNames] = useState(
    Object.fromEntries(data.players.map((player) => [player.id, player.name])),
  );

  async function login(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      await api("/api/admin/login", {
        method: "POST",
        body: JSON.stringify({ password }),
      });
      setPassword("");
      await onRefresh();
    } catch (loginError) {
      setError(
        loginError instanceof Error ? loginError.message : "Login failed.",
      );
    } finally {
      setBusy(false);
    }
  }

  async function logout() {
    setBusy(true);
    await api("/api/admin/logout", { method: "POST" });
    await onRefresh();
    setBusy(false);
  }

  async function saveName(playerId: string) {
    setBusy(true);
    setError("");
    try {
      await api(`/api/players/${playerId}`, {
        method: "PATCH",
        body: JSON.stringify({ name: names[playerId] }),
      });
      await onRefresh();
    } catch (nameError) {
      setError(
        nameError instanceof Error ? nameError.message : "Name save failed.",
      );
    } finally {
      setBusy(false);
    }
  }

  async function reset() {
    if (
      !window.confirm(
        "Delete every prediction and official result? Player names will remain.",
      )
    ) {
      return;
    }
    setBusy(true);
    setError("");
    try {
      await api("/api/admin/reset", { method: "DELETE" });
      await onRefresh();
    } catch (resetError) {
      setError(
        resetError instanceof Error ? resetError.message : "Reset failed.",
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="mx-auto mt-7 max-w-4xl">
      <SectionHeading
        title="Pool settings"
        description="Participant play stays simple. Administrative controls require the organizer password."
      />
      {error && (
        <p
          role="alert"
          className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm font-semibold text-red-300"
        >
          {error}
        </p>
      )}

      {!data.isAdmin ? (
        <form onSubmit={login} className="surface mt-5 rounded-2xl p-6">
          <LockKeyhole
            className="mb-4 size-5 text-[var(--accent)]"
            aria-hidden="true"
          />
          <h3 className="text-lg font-extrabold">Organizer access</h3>
          <p className="mt-1 max-w-xl text-sm text-[var(--text-muted)]">
            Sign in to edit player names, enter official results, export data,
            or clear the pool.
          </p>
          <div className="mt-5 flex max-w-lg flex-col gap-3 sm:flex-row">
            <label className="flex-1">
              <span className="sr-only">Admin password</span>
              <input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Admin password"
                className="h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--surface-quiet)] px-4"
                required
              />
            </label>
            <button
              type="submit"
              disabled={busy}
              className="h-11 rounded-xl bg-[var(--accent)] px-5 font-extrabold text-slate-950"
            >
              {busy ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>
      ) : (
        <div className="mt-5 space-y-5">
          <div className="surface rounded-2xl p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="flex items-center gap-2 text-lg font-extrabold">
                  <UserRound className="size-5 text-[var(--accent)]" />
                  Player names
                </h3>
                <p className="mt-1 text-sm text-[var(--text-muted)]">
                  Names update across every participant&apos;s browser.
                </p>
              </div>
              <button
                onClick={() => void logout()}
                disabled={busy}
                className="flex items-center gap-2 rounded-xl border border-[var(--border)] px-3 py-2 text-sm font-bold text-[var(--text-muted)] hover:text-[var(--text)]"
              >
                <LogOut className="size-4" aria-hidden="true" />
                Log out
              </button>
            </div>
            <div className="mt-5 grid gap-3">
              {data.players.map((player) => (
                <div
                  key={player.id}
                  className="flex flex-col gap-2 border-b border-[var(--border)] pb-3 last:border-0 last:pb-0 sm:flex-row sm:items-center"
                >
                  <span className="w-20 text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                    Player {player.slot}
                  </span>
                  <input
                    value={names[player.id]}
                    onChange={(event) =>
                      setNames({ ...names, [player.id]: event.target.value })
                    }
                    maxLength={40}
                    className="h-11 flex-1 rounded-xl border border-[var(--border)] bg-[var(--surface-quiet)] px-4"
                  />
                  <button
                    onClick={() => void saveName(player.id)}
                    disabled={busy || names[player.id] === player.name}
                    className="h-11 rounded-xl bg-[var(--accent)] px-4 font-bold text-slate-950"
                  >
                    Save
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="surface rounded-2xl p-6">
            <h3 className="text-lg font-extrabold">Data management</h3>
            <p className="mt-1 text-sm text-[var(--text-muted)]">
              Download a complete JSON backup or clear scores for a fresh start.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <a
                href="/api/admin/export"
                className="flex h-11 items-center justify-center gap-2 rounded-xl border border-[var(--border)] px-4 font-bold hover:bg-white/5"
              >
                <Download className="size-4" aria-hidden="true" />
                Export JSON
              </a>
              <button
                onClick={() => void reset()}
                disabled={busy}
                className="flex h-11 items-center justify-center gap-2 rounded-xl bg-red-600 px-4 font-bold text-white hover:bg-red-500"
              >
                <Trash2 className="size-4" aria-hidden="true" />
                Delete all scores
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
