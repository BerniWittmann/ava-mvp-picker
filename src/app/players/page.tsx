"use client";

import Link from "next/link";
import Image from "next/image";
import { usePlayers } from "@/hooks/usePlayers";
import { PlayerForm } from "@/components/players/PlayerForm";
import { PlayerList } from "@/components/players/PlayerList";

export default function PlayersPage() {
  const { players, addPlayer, updatePlayer, deletePlayer } = usePlayers();

  return (
    <div className="min-h-dvh px-4 py-8 max-w-lg mx-auto">
      <header className="flex items-center gap-3 mb-8">
        <Link href="/" className="text-[--ava-ice] hover:text-[--ava-ice-bright] transition-colors p-1" data-testid="back-home">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
        <Image src="/ava-mvp-picker/ava-logo.png" alt="AVA" width={32} height={32} className="rounded-full" />
        <h1 className="text-xl font-black text-[--ava-snow]">Spieler verwalten</h1>
        <span
          className="ml-auto text-sm font-semibold px-3 py-1 rounded-full"
          style={{ background: "rgba(118,168,211,0.15)", color: "var(--ava-ice-bright)" }}
        >
          {players.length} Spieler
        </span>
      </header>

      <section
        className="p-4 rounded-3xl mb-6"
        style={{ background: "rgba(26,38,53,0.8)", border: "1px solid rgba(118,168,211,0.2)" }}
      >
        <h2 className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--ava-ice)" }}>
          Neuen Spieler hinzufügen
        </h2>
        <PlayerForm onSubmit={addPlayer} />
      </section>

      <PlayerList
        players={players}
        onUpdate={(id, name, number) => updatePlayer(id, { name, number })}
        onDelete={deletePlayer}
      />
    </div>
  );
}
