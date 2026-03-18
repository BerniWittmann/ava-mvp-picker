import type { TallyEntry } from "@/lib/utils";

interface ResultCardProps {
  entry: TallyEntry;
  rank: number;
  isWinner: boolean;
}

export function ResultCard({ entry, rank, isWinner }: ResultCardProps) {
  return (
    <div
      className="flex items-center gap-4 p-4 rounded-2xl"
      style={{
        background: isWinner ? "rgba(118,168,211,0.15)" : "rgba(26,38,53,0.8)",
        border: isWinner ? "1px solid rgba(118,168,211,0.4)" : "1px solid rgba(118,168,211,0.15)",
      }}
      data-testid={`result-card-${entry.player.id}`}
    >
      <span
        className="w-8 text-center font-black text-lg"
        style={{ color: isWinner ? "var(--ava-ice-bright)" : "var(--ava-ice)" }}
      >
        {rank}
      </span>
      {entry.player.number && (
        <span
          className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-black flex-shrink-0"
          style={{ background: "rgba(118,168,211,0.15)", color: "var(--ava-ice-bright)" }}
        >
          {entry.player.number}
        </span>
      )}
      <span className="flex-1 font-semibold text-[--ava-snow]">{entry.player.name}</span>
      <span
        className="text-2xl font-black"
        style={{ color: isWinner ? "var(--ava-ice-bright)" : "var(--ava-ice)" }}
      >
        {entry.voteCount}
      </span>
      <span className="text-xs" style={{ color: "var(--ava-ice)" }}>
        {entry.voteCount === 1 ? "Stimme" : "Stimmen"}
      </span>
    </div>
  );
}
