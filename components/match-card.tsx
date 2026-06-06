"use client";

import Image from "next/image";
import { Check, Clock3, LockKeyhole, MapPin } from "lucide-react";
import { TEAMS } from "@/lib/data";
import { isCompleteScore } from "@/lib/tournament";
import type { Match, Player, Score } from "@/lib/types";

type Props = {
  match: Match;
  player: Player;
  prediction: Score;
  result: Score;
  isAdmin: boolean;
  predictionLocked: boolean;
  saveState?: "saving" | "saved" | "error";
  resultSaveState?: "saving" | "saved" | "error";
  onPredictionChange: (score: Score) => void;
  onPredictionCommit: () => void;
  onResultChange: (score: Score) => void;
  onResultCommit: () => void;
};

function ScoreInput({
  label,
  value,
  onChange,
  onBlur,
  disabled = false,
}: {
  label: string;
  value: number | null;
  onChange: (value: number | null) => void;
  onBlur: () => void;
  disabled?: boolean;
}) {
  return (
    <input
      aria-label={label}
      inputMode="numeric"
      pattern="[0-9]*"
      maxLength={2}
      value={value ?? ""}
      disabled={disabled}
      onChange={(event) => {
        const next = event.target.value;
        if (next === "") return onChange(null);
        if (/^\d{1,2}$/.test(next)) onChange(Number(next));
      }}
      onBlur={onBlur}
      className="font-tabular h-11 w-11 rounded-lg border border-[var(--border)] bg-[var(--surface-quiet)] text-center text-lg font-extrabold transition focus:border-[var(--accent)] disabled:bg-transparent"
    />
  );
}

function statusLabel(prediction: Score, result: Score) {
  if (!isCompleteScore(prediction) || !isCompleteScore(result)) return null;
  if (prediction.home === result.home && prediction.away === result.away) {
    return { text: "Exact, 10 pts", className: "text-emerald-400" };
  }
  const predictionOutcome = Math.sign(prediction.home - prediction.away);
  const resultOutcome = Math.sign(result.home - result.away);
  if (predictionOutcome === resultOutcome) {
    return { text: "Outcome, 5 pts", className: "text-blue-400" };
  }
  return { text: "No points", className: "text-red-400" };
}

function SaveStatus({
  value,
}: {
  value?: "saving" | "saved" | "error";
}) {
  if (!value) return null;
  return (
    <span
      role={value === "error" ? "alert" : "status"}
      className={`flex items-center gap-1 text-xs font-semibold ${
        value === "error" ? "text-red-400" : "text-[var(--text-muted)]"
      }`}
    >
      {value === "saved" && <Check className="size-3.5" aria-hidden="true" />}
      {value === "saving"
        ? "Saving..."
        : value === "saved"
          ? "Saved"
          : "Save failed, blur to retry"}
    </span>
  );
}

export function MatchCard({
  match,
  player,
  prediction,
  result,
  isAdmin,
  predictionLocked,
  saveState,
  resultSaveState,
  onPredictionChange,
  onPredictionCommit,
  onResultChange,
  onResultCommit,
}: Props) {
  const home = TEAMS[match.home];
  const away = TEAMS[match.away];
  const points = statusLabel(prediction, result);
  const formattedDate = new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    weekday: "short",
    timeZone: "UTC",
  }).format(new Date(`${match.date}T12:00:00Z`));

  return (
    <article className="surface overflow-hidden rounded-2xl transition hover:border-[var(--border-strong)]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border)] bg-[var(--surface-quiet)] px-4 py-2.5 text-xs text-[var(--text-muted)]">
        <div className="flex items-center gap-2 font-bold uppercase tracking-wider">
          <span className="rounded-md bg-[var(--accent-dark)] px-2 py-1 text-[var(--accent)]">
            Match {match.matchNumber}
          </span>
          <span>Group {match.group}</span>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <span className="flex items-center gap-1.5">
            <Clock3 className="size-3.5" aria-hidden="true" />
            {formattedDate}, {match.time} ET
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="size-3.5" aria-hidden="true" />
            {match.venue}
          </span>
        </div>
      </div>

      <div className="grid items-center gap-5 p-4 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:p-5">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          <div className="flex min-w-0 items-center justify-end gap-2 text-right">
            <span className="truncate font-bold">{match.home}</span>
            <Image
              src={`https://flagcdn.com/w80/${home.flag}.png`}
              width={32}
              height={21}
              alt=""
              className="shrink-0 rounded-sm object-cover"
            />
          </div>
          <div className="font-tabular rounded-lg bg-[var(--surface-quiet)] px-3 py-2 text-center font-extrabold text-[var(--accent)]">
            {isCompleteScore(result)
              ? `${result.home}–${result.away}`
              : "vs"}
          </div>
          <div className="flex min-w-0 items-center gap-2">
            <Image
              src={`https://flagcdn.com/w80/${away.flag}.png`}
              width={32}
              height={21}
              alt=""
              className="shrink-0 rounded-sm object-cover"
            />
            <span className="truncate font-bold">{match.away}</span>
          </div>
        </div>

        <div className="hidden h-14 w-px bg-[var(--border)] lg:block" />

        <div className="grid gap-3 sm:grid-cols-2 lg:min-w-[360px]">
          <div>
            <div className="mb-2 flex min-h-5 items-center justify-between gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                {player.name}&apos;s pick
              </span>
              {predictionLocked ? (
                <span className="flex items-center gap-1 text-xs font-bold text-amber-300">
                  <LockKeyhole className="size-3.5" aria-hidden="true" />
                  Locked
                </span>
              ) : saveState === "saving" || saveState === "error" ? (
                <SaveStatus value={saveState} />
              ) : points ? (
                <span className={`text-xs font-bold ${points.className}`}>
                  {points.text}
                </span>
              ) : (
                <SaveStatus value={saveState} />
              )}
            </div>
            <div className="flex items-center gap-2">
              <ScoreInput
                label={`${player.name}, ${match.home} predicted score`}
                value={prediction.home}
                onChange={(homeScore) =>
                  onPredictionChange({ ...prediction, home: homeScore })
                }
                onBlur={onPredictionCommit}
                disabled={predictionLocked}
              />
              <span className="font-bold text-[var(--text-muted)]">:</span>
              <ScoreInput
                label={`${player.name}, ${match.away} predicted score`}
                value={prediction.away}
                onChange={(awayScore) =>
                  onPredictionChange({ ...prediction, away: awayScore })
                }
                onBlur={onPredictionCommit}
                disabled={predictionLocked}
              />
            </div>
            {predictionLocked && (
              <p className="mt-2 text-xs text-[var(--text-muted)]">
                Predictions closed at kickoff.
              </p>
            )}
          </div>

          <div className={isAdmin ? "" : "opacity-80"}>
            <div className="mb-2 flex min-h-5 items-center justify-between gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                Official result
              </span>
              <SaveStatus value={resultSaveState} />
            </div>
            {isAdmin ? (
              <div className="flex items-center gap-2">
                <ScoreInput
                  label={`${match.home} official score`}
                  value={result.home}
                  onChange={(homeScore) =>
                    onResultChange({ ...result, home: homeScore })
                  }
                  onBlur={onResultCommit}
                />
                <span className="font-bold text-[var(--text-muted)]">:</span>
                <ScoreInput
                  label={`${match.away} official score`}
                  value={result.away}
                  onChange={(awayScore) =>
                    onResultChange({ ...result, away: awayScore })
                  }
                  onBlur={onResultCommit}
                />
              </div>
            ) : (
              <p className="flex h-11 items-center text-sm text-[var(--text-muted)]">
                Admin managed
              </p>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
