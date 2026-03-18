import type { TallyEntry } from "@/lib/utils";

interface WinnerBannerProps {
  entries: TallyEntry[];
}

export function WinnerBanner({ entries }: WinnerBannerProps) {
  if (entries.length === 0) return null;

  const topCount = entries[0].voteCount;
  const winners = entries.filter((e) => e.voteCount === topCount);
  const isTie = winners.length > 1;

  return (
    <div
      className="w-full p-6 rounded-3xl text-center mb-6"
      style={{
        background: "linear-gradient(135deg, rgba(118,168,211,0.25), rgba(155,195,229,0.15))",
        border: "2px solid rgba(118,168,211,0.5)",
      }}
      data-testid="winner-banner"
    >
      <div className="text-4xl mb-3">🏆</div>
      <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "var(--ava-ice)" }}>
        {isTie ? "Unentschieden!" : "MVP des Spieltags"}
      </p>
      {winners.map((w) => (
        <div key={w.player.id} className="mb-1">
          <p className="text-2xl font-black text-[--ava-snow]">
            {w.player.name}
            {w.player.number && (
              <span className="ml-2 text-lg font-semibold" style={{ color: "var(--ava-ice)" }}>
                #{w.player.number}
              </span>
            )}
          </p>
        </div>
      ))}
      <p className="text-sm mt-2" style={{ color: "var(--ava-ice-bright)" }}>
        {topCount} {topCount === 1 ? "Stimme" : "Stimmen"}
      </p>
    </div>
  );
}
