interface ProgressBarProps {
  voted: number;
  total: number;
}

export function ProgressBar({ voted, total }: ProgressBarProps) {
  const pct = total === 0 ? 0 : (voted / total) * 100;
  return (
    <div className="w-full" data-testid="progress-bar">
      <div className="flex justify-between text-sm mb-2" style={{ color: "var(--ava-ice)" }}>
        <span>{voted} von {total} haben abgestimmt</span>
        <span>{Math.round(pct)}%</span>
      </div>
      <div className="w-full h-2 rounded-full" style={{ background: "rgba(118,168,211,0.2)" }}>
        <div
          className="h-2 rounded-full transition-all duration-500"
          style={{
            width: `${pct}%`,
            background: "linear-gradient(135deg, var(--ava-ice), var(--ava-ice-bright))",
          }}
        />
      </div>
    </div>
  );
}
