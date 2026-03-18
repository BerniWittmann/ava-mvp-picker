import { PlayerCard } from "./PlayerCard";
import type { Player } from "@/types";

interface PlayerListProps {
  players: Player[];
  onUpdate: (id: string, name: string, number?: string) => void;
  onDelete: (id: string) => void;
}

export function PlayerList({ players, onUpdate, onDelete }: PlayerListProps) {
  if (players.length === 0) {
    return (
      <p className="text-center py-8 text-sm" style={{ color: "var(--ava-ice)" }}>
        Noch keine Spieler. Füge deinen ersten Spieler hinzu.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-2" data-testid="player-list">
      {players.map((player) => (
        <PlayerCard
          key={player.id}
          player={player}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
