import type { Player } from "@/types";

interface HandoffScreenProps {
  nextVoter: Player | null;
  onReady: () => void;
}

export function HandoffScreen({ nextVoter, onReady }: HandoffScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-8 py-12 text-center" data-testid="handoff-screen">
      <div
        className="w-24 h-24 rounded-3xl flex items-center justify-center text-4xl shadow-lg"
        style={{ background: "rgba(118,168,211,0.15)", border: "1px solid rgba(118,168,211,0.3)" }}
      >
        📱
      </div>
      <div>
        <p className="text-sm uppercase tracking-widest mb-2" style={{ color: "var(--ava-ice)" }}>
          Weiter geben an
        </p>
        {nextVoter ? (
          <h2 className="text-3xl font-black text-[--ava-snow]">
            {nextVoter.name}
            {nextVoter.number && (
              <span className="ml-2 text-xl font-semibold" style={{ color: "var(--ava-ice)" }}>
                #{nextVoter.number}
              </span>
            )}
          </h2>
        ) : (
          <h2 className="text-2xl font-black text-[--ava-snow]">Fast fertig!</h2>
        )}
      </div>
      <button
        onClick={onReady}
        className="px-10 py-5 rounded-3xl font-black text-xl text-[--ava-night] hover:brightness-105 transition-all shadow-lg"
        style={{ background: "linear-gradient(135deg, var(--ava-ice), var(--ava-ice-bright))" }}
        data-testid="handoff-ready-btn"
      >
        Ich bin bereit
      </button>
    </div>
  );
}
