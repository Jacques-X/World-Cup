import Image from "next/image";
import type { Standing } from "@/lib/types";

export function GroupTable({ standings }: { standings: Standing[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-[var(--border)] text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
            <th className="py-2">Pos</th>
            <th className="py-2">Team</th>
            <th className="py-2 text-center">P</th>
            <th className="py-2 text-center">GD</th>
            <th className="py-2 text-center">Pts</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((team, index) => (
            <tr
              key={team.name}
              className="border-b border-[var(--border)]/60 text-sm last:border-0"
            >
              <td className="py-3">
                <span
                  className={`inline-grid size-6 place-items-center rounded-md font-bold ${
                    index < 2
                      ? "bg-[var(--accent-dark)] text-[var(--accent)]"
                      : "text-[var(--text-muted)]"
                  }`}
                >
                  {index + 1}
                </span>
              </td>
              <td className="py-3 font-semibold">
                <span className="flex items-center gap-2">
                  <Image
                    src={`https://flagcdn.com/w80/${team.flag}.png`}
                    width={24}
                    height={16}
                    style={{ width: 24, height: 16 }}
                    alt=""
                    className="rounded-sm object-cover"
                  />
                  <span>{team.name}</span>
                </span>
              </td>
              <td className="py-3 text-center text-[var(--text-muted)]">
                {team.played}
              </td>
              <td className="py-3 text-center font-semibold">
                {team.gd > 0 ? `+${team.gd}` : team.gd}
              </td>
              <td className="py-3 text-center font-extrabold">{team.pts}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
