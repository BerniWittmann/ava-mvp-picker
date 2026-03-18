"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { usePlayers } from "@/hooks/usePlayers";
import { useGameSession } from "@/hooks/useGameSession";
import { AttendanceToggle } from "@/components/game/AttendanceToggle";

export default function GameSetupPage() {
  const router = useRouter();
  const { players } = usePlayers();
  const { startSession } = useGameSession();
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  function toggle(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function selectAll() {
    setSelectedIds(new Set(players.map((p) => p.id)));
  }

  function handleStart() {
    if (selectedIds.size < 2) return;
    startSession(Array.from(selectedIds));
    router.push("/game/vote");
  }

  return (
    <div className="min-h-dvh px-4 py-8 max-w-lg mx-auto">
      <header className="flex items-center gap-3 mb-8">
        <Link href="/" className="text-[--ava-ice] hover:text-[--ava-ice-bright] transition-colors p-1">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
        <Image src="/ava-mvp-picker/ava-logo.png" alt="AVA" width={32} height={32} className="rounded-full" />
        <h1 className="text-xl font-black text-[--ava-snow]">Wer ist heute dabei?</h1>
      </header>

      <div className="flex items-center justify-between mb-4">
        <span
          className="text-sm font-semibold px-3 py-1 rounded-full"
          style={{ background: "rgba(118,168,211,0.15)", color: "var(--ava-ice-bright)" }}
          data-testid="attendance-count"
        >
          {selectedIds.size} ausgewählt
        </span>
        <button
          onClick={selectAll}
          className="text-sm font-semibold transition-colors"
          style={{ color: "var(--ava-ice)" }}
          data-testid="select-all-btn"
        >
          Alle auswählen
        </button>
      </div>

      {players.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-[--ava-ice] mb-4">Keine Spieler vorhanden.</p>
          <Link
            href="/players"
            className="font-semibold"
            style={{ color: "var(--ava-ice-bright)" }}
          >
            Spieler hinzufügen →
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-2 mb-6" data-testid="attendance-list">
          {players.map((player) => (
            <AttendanceToggle
              key={player.id}
              player={player}
              selected={selectedIds.has(player.id)}
              onToggle={toggle}
            />
          ))}
        </div>
      )}

      <button
        onClick={handleStart}
        disabled={selectedIds.size < 2}
        className="w-full py-5 rounded-3xl font-black text-lg text-[--ava-night] disabled:opacity-40 hover:brightness-105 transition-all shadow-lg"
        style={{ background: "linear-gradient(135deg, var(--ava-ice), var(--ava-ice-bright))" }}
        data-testid="start-voting-btn"
      >
        Abstimmung starten ({selectedIds.size} Spieler)
      </button>

      {selectedIds.size < 2 && players.length >= 2 && (
        <p className="mt-3 text-sm text-center" style={{ color: "var(--ava-ice)" }}>
          Wähle mindestens 2 Spieler aus.
        </p>
      )}
    </div>
  );
}
