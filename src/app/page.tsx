"use client";

import Link from "next/link";
import Image from "next/image";
import { usePlayers } from "@/hooks/usePlayers";
import { useGameSession } from "@/hooks/useGameSession";

export default function HomePage() {
  const { players } = usePlayers();
  const { session } = useGameSession();

  const hasActiveVoting = session?.status === "voting";
  const hasCompletedSession = session?.status === "completed";

  return (
    <div className="min-h-dvh px-4 py-12 max-w-lg mx-auto flex flex-col items-center">
      <div className="flex flex-col items-center gap-3 mb-10">
        <Image src="/ava-logo.png" alt="AVA" width={72} height={72} className="rounded-2xl" />
        <h1 className="text-3xl font-black text-[--ava-snow] tracking-tight">AVA MVP Picker</h1>
        <p className="text-sm uppercase tracking-widest" style={{ color: "var(--ava-ice)" }}>
          Gameday MVP Abstimmung
        </p>
      </div>

      {hasActiveVoting && (
        <div
          className="w-full p-4 rounded-2xl mb-4 flex items-center gap-3"
          style={{ background: "rgba(118,168,211,0.15)", border: "1px solid rgba(118,168,211,0.4)" }}
          data-testid="resume-banner"
        >
          <span className="text-2xl">⏸</span>
          <div className="flex-1">
            <p className="font-semibold text-[--ava-snow]">Abstimmung läuft</p>
            <p className="text-sm" style={{ color: "var(--ava-ice)" }}>
              {session!.votes.length} von {session!.presentPlayerIds.length} Stimmen abgegeben
            </p>
          </div>
          <Link
            href="/game/vote"
            className="px-4 py-2 rounded-xl font-semibold text-[--ava-night] text-sm"
            style={{ background: "linear-gradient(135deg, var(--ava-ice), var(--ava-ice-bright))" }}
            data-testid="resume-vote-btn"
          >
            Weiter
          </Link>
        </div>
      )}

      {hasCompletedSession && (
        <div
          className="w-full p-4 rounded-2xl mb-4 flex items-center gap-3"
          style={{ background: "rgba(118,168,211,0.1)", border: "1px solid rgba(118,168,211,0.3)" }}
          data-testid="results-banner"
        >
          <span className="text-2xl">🏆</span>
          <div className="flex-1">
            <p className="font-semibold text-[--ava-snow]">Abstimmung beendet</p>
            <p className="text-sm" style={{ color: "var(--ava-ice)" }}>Ergebnis ist bereit</p>
          </div>
          <Link
            href="/game/results"
            className="px-4 py-2 rounded-xl font-semibold text-[--ava-night] text-sm"
            style={{ background: "linear-gradient(135deg, var(--ava-ice), var(--ava-ice-bright))" }}
            data-testid="view-results-btn"
          >
            Ergebnis
          </Link>
        </div>
      )}

      <div className="w-full flex flex-col gap-3 mt-2">
        {!hasActiveVoting && !hasCompletedSession && (
          <Link
            href="/game/setup"
            className="w-full py-5 rounded-3xl text-center font-black text-lg text-[--ava-night] hover:brightness-105 transition-all shadow-lg"
            style={{ background: "linear-gradient(135deg, var(--ava-ice), var(--ava-ice-bright))" }}
            data-testid="start-gameday-btn"
          >
            Gameday starten
          </Link>
        )}

        <Link
          href="/players"
          className="w-full py-4 rounded-3xl text-center font-semibold text-base transition-all"
          style={{
            background: "rgba(26,38,53,0.8)",
            border: "1px solid rgba(118,168,211,0.3)",
            color: "var(--ava-ice-bright)",
          }}
          data-testid="manage-players-btn"
        >
          Spieler verwalten
          <span className="ml-2 text-sm opacity-70">({players.length})</span>
        </Link>
      </div>

      {players.length < 2 && !hasActiveVoting && !hasCompletedSession && (
        <p className="mt-6 text-sm text-center" style={{ color: "var(--ava-ice)" }}>
          Füge mindestens 2 Spieler hinzu, um zu starten.
        </p>
      )}
    </div>
  );
}
