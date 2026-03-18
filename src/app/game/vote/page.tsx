"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { usePlayers } from "@/hooks/usePlayers";
import { useGameSession } from "@/hooks/useGameSession";
import { VotingBallot } from "@/components/game/VotingBallot";
import { HandoffScreen } from "@/components/game/HandoffScreen";
import { ProgressBar } from "@/components/game/ProgressBar";

type UIState = "ballot" | "handoff";

export default function VotePage() {
  const router = useRouter();
  const { players } = usePlayers();
  const { session, castVote } = useGameSession();
  const [uiState, setUIState] = useState<UIState>("ballot");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (!session) {
      router.replace("/");
    } else if (session.status === "completed") {
      router.replace("/game/results");
    }
  }, [session, router, mounted]);

  if (!mounted || !session || session.status !== "voting") return null;

  const votedIds = new Set(session.votes.map((v) => v.voterId));
  const pendingVoters = session.presentPlayerIds
    .filter((id) => !votedIds.has(id))
    .map((id) => players.find((p) => p.id === id))
    .filter(Boolean) as typeof players;

  const currentVoter = pendingVoters[0];
  // In handoff state, session has already been updated so pendingVoters[0] is the next person to vote.
  // Pass currentVoter to HandoffScreen so it shows who the phone should go to next.
  const nextVoterForHandoff = currentVoter ?? null;

  if (!currentVoter) return null;

  const candidates = session.presentPlayerIds
    .filter((id) => id !== currentVoter.id)
    .map((id) => players.find((p) => p.id === id))
    .filter(Boolean) as typeof players;

  function handleVote(candidateId: string) {
    castVote(currentVoter.id, candidateId);
    setUIState("handoff");
  }

  function handleHandoffReady() {
    setUIState("ballot");
  }

  return (
    <div className="min-h-dvh px-4 py-8 max-w-lg mx-auto">
      <header className="flex items-center gap-3 mb-6">
        <Image src="/ava-mvp-picker/ava-logo.png" alt="AVA" width={32} height={32} className="rounded-full" />
        <h1 className="text-xl font-black text-[--ava-snow]">MVP Abstimmung</h1>
      </header>

      <div className="mb-8">
        <ProgressBar
          voted={session.votes.length}
          total={session.presentPlayerIds.length}
        />
      </div>

      {uiState === "ballot" ? (
        <VotingBallot
          voter={currentVoter}
          candidates={candidates}
          onVote={handleVote}
        />
      ) : (
        <HandoffScreen nextVoter={nextVoterForHandoff} onReady={handleHandoffReady} />
      )}
    </div>
  );
}
