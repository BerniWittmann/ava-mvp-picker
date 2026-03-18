"use client";

import { useState } from "react";

interface PlayerFormProps {
  initialName?: string;
  initialNumber?: string;
  onSubmit: (name: string, number?: string) => void;
  onCancel?: () => void;
  submitLabel?: string;
}

export function PlayerForm({
  initialName = "",
  initialNumber = "",
  onSubmit,
  onCancel,
  submitLabel = "Hinzufügen",
}: PlayerFormProps) {
  const [name, setName] = useState(initialName);
  const [number, setNumber] = useState(initialNumber);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit(name.trim(), number.trim() || undefined);
    setName("");
    setNumber("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 flex-wrap">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
        className="flex-1 min-w-0 px-4 py-3 rounded-xl text-[--ava-snow] placeholder-[--ava-ice]/60 focus:outline-none focus:ring-2 focus:ring-[--ava-ice-bright] text-base"
        style={{ background: "var(--ava-steel)", border: "1px solid rgba(118,168,211,0.3)" }}
        data-testid="player-name-input"
      />
      <input
        type="text"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        placeholder="#Nr"
        maxLength={3}
        className="w-20 px-4 py-3 rounded-xl text-[--ava-snow] placeholder-[--ava-ice]/60 focus:outline-none focus:ring-2 focus:ring-[--ava-ice-bright] text-base text-center"
        style={{ background: "var(--ava-steel)", border: "1px solid rgba(118,168,211,0.3)" }}
        data-testid="player-number-input"
      />
      <button
        type="submit"
        disabled={!name.trim()}
        className="px-5 py-3 rounded-xl font-semibold text-[--ava-night] text-base disabled:opacity-50 hover:brightness-105 transition-all"
        style={{ background: "linear-gradient(135deg, var(--ava-ice), var(--ava-ice-bright))" }}
        data-testid="player-submit-btn"
      >
        {submitLabel}
      </button>
      {onCancel && (
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-3 rounded-xl font-semibold text-[--ava-ice] text-base hover:bg-white/5 transition-all"
          data-testid="player-cancel-btn"
        >
          Abbrechen
        </button>
      )}
    </form>
  );
}
