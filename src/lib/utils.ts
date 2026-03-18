import type { GameSession, Player } from "@/types";

export interface TallyEntry {
  player: Player;
  voteCount: number;
}

export function tallyVotes(session: GameSession, players: Player[]): TallyEntry[] {
  const counts = new Map<string, number>();
  for (const pid of session.presentPlayerIds) {
    counts.set(pid, 0);
  }
  for (const vote of session.votes) {
    counts.set(vote.candidateId, (counts.get(vote.candidateId) ?? 0) + 1);
  }
  return session.presentPlayerIds
    .map((id) => ({
      player: players.find((p) => p.id === id)!,
      voteCount: counts.get(id) ?? 0,
    }))
    .filter((e) => e.player)
    .sort((a, b) => b.voteCount - a.voteCount);
}
