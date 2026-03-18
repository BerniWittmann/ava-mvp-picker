import type { Player } from "@/types";

interface VotingBallotProps {
  voter: Player;
  candidates: Player[];
  onVote: (candidateId: string) => void;
}

export function VotingBallot({ voter, candidates, onVote }: VotingBallotProps) {
  return (
    <div className="flex flex-col gap-6" data-testid="voting-ballot">
      <div className="text-center">
        <p className="text-sm uppercase tracking-widest mb-1" style={{ color: "var(--ava-ice)" }}>
          {voter.name}{voter.number ? ` #${voter.number}` : ""}
        </p>
        <h2 className="text-2xl font-black text-[--ava-snow]">Wer ist dein MVP?</h2>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {candidates.map((candidate) => (
          <button
            key={candidate.id}
            onClick={() => onVote(candidate.id)}
            className="flex flex-col items-center justify-center gap-2 p-5 rounded-2xl min-h-24 font-semibold text-base transition-all hover:brightness-110 active:scale-95"
            style={{
              background: "rgba(26,38,53,0.9)",
              border: "1px solid rgba(118,168,211,0.3)",
              color: "var(--ava-snow)",
            }}
            data-testid={`vote-btn-${candidate.id}`}
          >
            {candidate.number && (
              <span
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black"
                style={{ background: "rgba(118,168,211,0.2)", color: "var(--ava-ice-bright)" }}
              >
                {candidate.number}
              </span>
            )}
            <span>{candidate.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
