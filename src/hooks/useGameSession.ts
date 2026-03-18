"use client";

import { v4 as uuidv4 } from "uuid";
import { useLocalStorage } from "./useLocalStorage";
import type { GameSession } from "@/types";

export function useGameSession() {
  const [session, setSession] = useLocalStorage<GameSession | null>(
    "ava_active_session",
    null
  );

  function startSession(presentPlayerIds: string[]) {
    const newSession: GameSession = {
      id: uuidv4(),
      date: new Date().toISOString(),
      presentPlayerIds,
      votes: [],
      status: "voting",
    };
    setSession(newSession);
    return newSession;
  }

  function castVote(voterId: string, candidateId: string) {
    setSession((prev) => {
      if (!prev) return prev;
      const votes = [...prev.votes, { voterId, candidateId }];
      const allVoted = prev.presentPlayerIds.every((id) =>
        votes.some((v) => v.voterId === id)
      );
      return { ...prev, votes, status: allVoted ? "completed" : "voting" };
    });
  }

  function clearSession() {
    setSession(null);
  }

  return { session, startSession, castVote, clearSession };
}
