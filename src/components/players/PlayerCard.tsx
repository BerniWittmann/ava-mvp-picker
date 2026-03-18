"use client";

import { useState } from "react";
import { PlayerForm } from "./PlayerForm";
import type { Player } from "@/types";

interface PlayerCardProps {
  player: Player;
  onUpdate: (id: string, name: string, number?: string) => void;
  onDelete: (id: string) => void;
}

export function PlayerCard({ player, onUpdate, onDelete }: PlayerCardProps) {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <div
        className="p-4 rounded-2xl"
        style={{ background: "var(--ava-steel)", border: "1px solid rgba(118,168,211,0.3)" }}
        data-testid={`player-card-edit-${player.id}`}
      >
        <PlayerForm
          initialName={player.name}
          initialNumber={player.number}
          onSubmit={(name, number) => {
            onUpdate(player.id, name, number);
            setEditing(false);
          }}
          onCancel={() => setEditing(false)}
          submitLabel="Speichern"
        />
      </div>
    );
  }

  return (
    <div
      className="flex items-center gap-3 p-4 rounded-2xl"
      style={{ background: "var(--ava-steel)", border: "1px solid rgba(118,168,211,0.2)" }}
      data-testid={`player-card-${player.id}`}
    >
      {player.number && (
        <span
          className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black flex-shrink-0"
          style={{ background: "rgba(118,168,211,0.15)", color: "var(--ava-ice-bright)" }}
        >
          {player.number}
        </span>
      )}
      <span className="flex-1 font-semibold text-[--ava-snow] text-base">{player.name}</span>
      <button
        onClick={() => setEditing(true)}
        className="px-3 py-2 rounded-lg text-sm text-[--ava-ice] hover:bg-white/5 transition-all"
        aria-label={`${player.name} bearbeiten`}
        data-testid={`player-edit-${player.id}`}
      >
        Bearbeiten
      </button>
      <button
        onClick={() => onDelete(player.id)}
        className="px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-all"
        aria-label={`${player.name} löschen`}
        data-testid={`player-delete-${player.id}`}
      >
        Löschen
      </button>
    </div>
  );
}
