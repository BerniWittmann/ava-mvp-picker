import type { Player } from "@/types";

interface AttendanceToggleProps {
  player: Player;
  selected: boolean;
  onToggle: (id: string) => void;
}

export function AttendanceToggle({ player, selected, onToggle }: AttendanceToggleProps) {
  return (
    <button
      onClick={() => onToggle(player.id)}
      className="flex items-center gap-3 w-full p-4 rounded-2xl text-left transition-all min-h-14"
      style={{
        background: selected ? "rgba(118,168,211,0.2)" : "rgba(26,38,53,0.8)",
        border: selected ? "2px solid var(--ava-ice)" : "1px solid rgba(118,168,211,0.2)",
        color: selected ? "var(--ava-snow)" : "var(--ava-ice)",
      }}
      data-testid={`attendance-toggle-${player.id}`}
      aria-pressed={selected}
    >
      <span
        className="w-6 h-6 rounded-md flex-shrink-0 flex items-center justify-center transition-all"
        style={{
          background: selected ? "var(--ava-ice)" : "transparent",
          border: selected ? "none" : "2px solid rgba(118,168,211,0.4)",
        }}
      >
        {selected && (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7l4 4 6-6" stroke="var(--ava-night)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      {player.number && (
        <span
          className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-black flex-shrink-0"
          style={{ background: "rgba(118,168,211,0.15)", color: "var(--ava-ice-bright)" }}
        >
          {player.number}
        </span>
      )}
      <span className="font-semibold text-base flex-1" style={{ color: "var(--ava-snow)" }}>
        {player.name}
      </span>
    </button>
  );
}
