"use client";

import { v4 as uuidv4 } from "uuid";
import { useLocalStorage } from "./useLocalStorage";
import type { Player } from "@/types";

export function usePlayers() {
  const [players, setPlayers] = useLocalStorage<Player[]>("ava_players", []);

  function addPlayer(name: string, number?: string) {
    const player: Player = { id: uuidv4(), name: name.trim(), number };
    setPlayers((prev) => [...prev, player]);
  }

  function updatePlayer(id: string, partial: Partial<Omit<Player, "id">>) {
    setPlayers((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...partial } : p))
    );
  }

  function deletePlayer(id: string) {
    setPlayers((prev) => prev.filter((p) => p.id !== id));
  }

  return { players, addPlayer, updatePlayer, deletePlayer };
}
