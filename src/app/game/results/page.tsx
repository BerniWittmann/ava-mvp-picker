"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { usePlayers } from "@/hooks/usePlayers";
import { useGameSession } from "@/hooks/useGameSession";
import { tallyVotes } from "@/lib/utils";
import { WinnerBanner } from "@/components/results/WinnerBanner";
import { ResultCard } from "@/components/results/ResultCard";

export default function ResultsPage() {
  const router = useRouter();
  const { players } = usePlayers();
  const { session, clearSession } = useGameSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (!session || session.status !== "completed") {
      router.replace("/");
    }
  }, [session, router, mounted]);

  if (!mounted || !session || session.status !== "completed") return null;

  const tally = tallyVotes(session, players);
  const topCount = tally[0]?.voteCount ?? 0;

  function handleNewGame() {
    clearSession();
    router.push("/");
  }

  return (
    <div className="min-h-dvh px-4 py-8 max-w-lg mx-auto">
      <header className="flex items-center gap-3 mb-8">
        <Image src="/ava-mvp-picker/ava-logo.png" alt="AVA" width={32} height={32} className="rounded-full" />
        <h1 className="text-xl font-black text-[--ava-snow]">Ergebnis</h1>
        <span className="ml-auto text-sm" style={{ color: "var(--ava-ice)" }}>
          {new Date(session.date).toLocaleDateString("de-DE")}
        </span>
      </header>

      <WinnerBanner entries={tally} />

      <div className="flex flex-col gap-2 mb-8">
        {tally.map((entry, i) => (
          <ResultCard
            key={entry.player.id}
            entry={entry}
            rank={i + 1}
            isWinner={entry.voteCount === topCount && topCount > 0}
          />
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <button
          onClick={handleNewGame}
          className="w-full py-5 rounded-3xl font-black text-lg text-[--ava-night] hover:brightness-105 transition-all shadow-lg"
          style={{ background: "linear-gradient(135deg, var(--ava-ice), var(--ava-ice-bright))" }}
          data-testid="new-game-btn"
        >
          Neuen Spieltag starten
        </button>
        <Link
          href="/"
          className="w-full py-4 rounded-3xl text-center font-semibold text-base transition-all"
          style={{
            background: "rgba(26,38,53,0.8)",
            border: "1px solid rgba(118,168,211,0.3)",
            color: "var(--ava-ice-bright)",
          }}
          data-testid="back-home-btn"
        >
          Zurück zur Startseite
        </Link>
      </div>
    </div>
  );
}
